const { before, describe, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const axios = require("axios");

let filtros;
let rotacionUtils;

before(async () => {
  const sourcePath = path.resolve(__dirname, "../src/services/rotacionGeneralProductosFiltros.js");
  const source = fs.readFileSync(sourcePath, "utf8");
  const dataUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  filtros = await import(dataUrl);
  const utilsSource = fs.readFileSync(path.resolve(__dirname, "../src/utils/rotacionProductos.js"), "utf8");
  rotacionUtils = await import(`data:text/javascript;base64,${Buffer.from(utilsSource).toString("base64")}`);
});

describe("copiado de la grilla", () => {
  test("genera texto tabulado con encabezados y conserva ceros iniciales", () => {
    const text = rotacionUtils.crearTextoGrillaProductos([{
      codigoArticulo: "00123",
      nombreArticulo: "Producto\tde prueba",
      stockUnidades: 10,
    }]);
    const [headers, row] = text.split("\n");
    assert.match(headers, /^Código\tArtículo\tStock/);
    assert.match(row, /^="00123"\tProducto de prueba\t10/);
  });
});

describe("filtros de rotación general de productos", () => {
  test("serializa multiselecciones como arrays con corchetes de Axios", () => {
    const params = filtros.normalizarFiltrosRotacion({
      compradores: ["Comprador A", "Comprador B"],
      clasificacion4: ["PISOS"],
    });

    assert.deepEqual(params.compradores, ["Comprador A", "Comprador B"]);
    const uri = decodeURIComponent(axios.getUri({
      url: "/api/rotaciongeneralproductos",
      params,
      paramsSerializer: { indexes: false },
    }));
    assert.match(uri, /compradores\[\]=Comprador\+A/);
    assert.match(uri, /compradores\[\]=Comprador\+B/);
    assert.match(uri, /clasificacion4\[\]=PISOS/);
  });

  test("omite arrays vacíos, null, undefined y Todos/Todas", () => {
    const params = filtros.normalizarFiltrosRotacion({
      compradores: [],
      clasificacion4: ["Todos"],
      clasificacion5: ["Todas", ""],
      clasificacion6: null,
      clasificacion8: undefined,
      stock: null,
      exhibicion: undefined,
    });
    assert.deepEqual(params, {});
  });

  test("envía enums válidos y días enteros no negativos", () => {
    assert.deepEqual(filtros.normalizarFiltrosRotacion({
      stock: "positivo",
      exhibicion: "con",
      diasDesde: "30",
      diasHasta: 365,
    }), {
      stock: "positivo",
      exhibicion: "con",
      diasDesde: 30,
      diasHasta: 365,
    });

    assert.deepEqual(filtros.normalizarFiltrosRotacion({
      stock: "invalido",
      exhibicion: "todos",
      diasDesde: -1,
      diasHasta: 2.5,
    }), {});
  });

  test("el estado restaurado por Limpiar deja todos los filtros vacíos", () => {
    const estadoInicial = filtros.crearFiltrosRotacionIniciales();
    assert.equal(estadoInicial.busqueda, "");
    assert.deepEqual(filtros.normalizarFiltrosRotacion(estadoInicial), {});
  });

  test("conserva el catálogo base al recibir resultados filtrados", () => {
    const catalogoBase = [{ codigoArticulo: "001" }, { codigoArticulo: "002" }];
    const filtrados = [{ codigoArticulo: "002" }];
    assert.strictEqual(
      filtros.resolverCatalogoProductos(catalogoBase, filtrados, { stock: "positivo" }),
      catalogoBase,
    );
    assert.strictEqual(
      filtros.resolverCatalogoProductos([], catalogoBase, {}),
      catalogoBase,
    );
  });

  test("normaliza compradores usando nombre como valor y código en la etiqueta", () => {
    const compradores = filtros.normalizarCompradoresRotacion([
      { codigo_comprador: "SCC", nombre_comprador: "Carolina", activo: true },
      { codigo_comprador: "EGE", nombre_comprador: "Gabriel", activo: false },
    ]);
    assert.deepEqual(compradores.map(({ label, value, disabled }) => ({ label, value, disabled })), [
      { label: "SCC - Carolina", value: "Carolina", disabled: false },
      { label: "EGE - Gabriel", value: "Gabriel", disabled: true },
    ]);
  });

  test("normaliza clasificaciones dinámicas y respeta UTILIZABLE", () => {
    const clasificacion8 = filtros.normalizarClasificacionRotacion([
      { CA08_CLASIF_8: "0003", CA08_NOMBRE: "CHAPA", CA08_UTILIZABLE: 1 },
      { CA08_CLASIF_8: "0002", CA08_NOMBRE: "_NO APLICA", CA08_UTILIZABLE: 0 },
    ], 8);
    assert.deepEqual(clasificacion8.map(({ label, value, disabled }) => ({ label, value, disabled })), [
      { label: "0002 - _NO APLICA", value: "_NO APLICA", disabled: true },
      { label: "0003 - CHAPA", value: "CHAPA", disabled: false },
    ]);

    const clasificacion4 = filtros.normalizarClasificacionRotacion([
      { CA04_CLASIF_4: "01", CA04_NOMBRE: "PISOS", CA04_UTILIZABLE: 1 },
    ], 4);
    assert.equal(clasificacion4[0].value, "PISOS");
    assert.deepEqual(filtros.normalizarClasificacionRotacion([], 7), []);
  });

  test("presenta el message del backend para respuestas 400", () => {
    const error = { response: { status: 400, data: { message: "Rango de días inválido" } } };
    assert.equal(filtros.mensajeErrorRotacion(error), "Rango de días inválido");
    assert.match(filtros.mensajeErrorRotacion(new Error("falló")), /No pudimos cargar/);
  });

  test("separa el caché por combinación y normaliza el orden de multiselecciones", () => {
    const keyA = filtros.crearClaveFiltrosRotacion({ compradores: ["B", "A"], stock: "positivo" });
    const keyAReordered = filtros.crearClaveFiltrosRotacion({ stock: "positivo", compradores: ["A", "B"] });
    const keyB = filtros.crearClaveFiltrosRotacion({ compradores: ["A"], stock: "positivo" });
    assert.equal(keyA, keyAReordered);
    assert.notEqual(keyA, keyB);

    const cache = new Map([[keyA, "respuesta A"], [keyB, "respuesta B"]]);
    assert.equal(cache.get(keyA), "respuesta A");
    assert.equal(cache.get(keyB), "respuesta B");
  });
});
