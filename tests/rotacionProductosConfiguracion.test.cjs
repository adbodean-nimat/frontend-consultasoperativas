const { before, describe, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

let core;

before(async () => {
  const source = fs.readFileSync(path.resolve(
    __dirname,
    "../src/services/rotacionGeneralProductosConfiguracionCore.js",
  ), "utf8");
  core = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
});

describe("configuración de rotación de productos", () => {
  test("define y permite seleccionar los siete recursos REST", () => {
    assert.equal(core.ROTACION_CONFIG_RECURSOS.length, 7);
    assert.deepEqual(core.ROTACION_CONFIG_RECURSOS.map(({ resource }) => resource), [
      "articulos-omitidos",
      "compradores",
      "depositos-excluidos",
      "depositos-exhibidos",
      "tipos-articulo",
      "tipos-comprobante-recepcion",
      "tipos-npca",
    ]);
    assert.equal(core.obtenerDefinicionConfiguracion("compradores").descriptionField, "nombre_comprador");
  });

  test("mapea códigos, descripciones, estado y actualización según cada categoría", () => {
    const definition = core.obtenerDefinicionConfiguracion("tipos-articulo");
    assert.deepEqual(core.normalizarFilaConfiguracion({
      codigo_tipo_articulo: " PT ",
      nombre_tipo_articulo: " Producto terminado ",
      activo: 1,
      actualizado_en: "2026-08-31T12:00:00.000Z",
    }, definition), {
      codigo: "PT",
      descripcion: "Producto terminado",
      activo: true,
      actualizadoEn: "2026-08-31T12:00:00.000Z",
      original: {
        codigo_tipo_articulo: " PT ",
        nombre_tipo_articulo: " Producto terminado ",
        activo: 1,
        actualizado_en: "2026-08-31T12:00:00.000Z",
      },
    });
  });

  test("valida obligatorios y códigos enteros de depósitos", () => {
    const depositos = core.obtenerDefinicionConfiguracion("depositos-excluidos");
    assert.deepEqual(core.validarRegistroConfiguracion({ codigo: "", descripcion: "" }, depositos), {
      codigo: "El código es obligatorio.",
      descripcion: "Nombre es obligatorio.",
    });
    assert.match(
      core.validarRegistroConfiguracion({ codigo: "2.5", descripcion: "Central" }, depositos).codigo,
      /entero válido/,
    );
  });

  test("crea con código pero al editar no permite renombrarlo en el payload", () => {
    const definition = core.obtenerDefinicionConfiguracion("compradores");
    const record = { codigo: " EGE ", descripcion: " Gabriel ", activo: true };
    assert.deepEqual(core.crearPayloadConfiguracion(record, definition), {
      codigo_comprador: "EGE",
      nombre_comprador: "Gabriel",
      activo: true,
    });
    assert.deepEqual(core.crearPayloadConfiguracion(record, definition, { editando: true }), {
      nombre_comprador: "Gabriel",
      activo: true,
    });
    const form = fs.readFileSync(path.resolve(
      __dirname,
      "../src/components/rotacion-productos-config/ConfiguracionFormulario.vue",
    ), "utf8");
    assert.match(form, /:disabled="editando \|\| guardando"/);
  });

  test("ejecuta altas, ediciones, cambios de estado y bajas por el cliente inyectado", async () => {
    const calls = [];
    const http = {
      get: async (...args) => { calls.push(["get", ...args]); return { data: { ok: true, total: 0, rows: [] } }; },
      post: async (...args) => { calls.push(["post", ...args]); return { data: { ok: true, row: { codigo_comprador: "A" } } }; },
      put: async (...args) => { calls.push(["put", ...args]); return { data: { ok: true, row: { codigo_comprador: "A" } } }; },
      delete: async (...args) => { calls.push(["delete", ...args]); return { data: { ok: true } }; },
    };
    const client = core.crearClienteConfiguracion(http);
    for (const { resource } of core.ROTACION_CONFIG_RECURSOS) await client.listar(resource);
    await client.crear("compradores", { codigo_comprador: "A" });
    await client.actualizar("compradores", "A/B", { activo: false });
    await client.eliminar("compradores", "A/B");
    assert.deepEqual(calls.slice(0, 7).map((call) => call[1]), core.ROTACION_CONFIG_RECURSOS.map(
      ({ resource }) => `/api/rotaciongeneralproductos/configuracion/${resource}`,
    ));
    assert.deepEqual(calls.slice(7).map((call) => [call[0], call[1]]), [
      ["post", "/api/rotaciongeneralproductos/configuracion/compradores"],
      ["put", "/api/rotaciongeneralproductos/configuracion/compradores/A%2FB"],
      ["delete", "/api/rotaciongeneralproductos/configuracion/compradores/A%2FB"],
    ]);
  });

  test("refresca sólo después de que una mutación termina correctamente", async () => {
    const order = [];
    await core.ejecutarYRecargar(
      async () => { order.push("mutar"); return { ok: true }; },
      async () => { order.push("recargar-categoria-activa"); },
    );
    assert.deepEqual(order, ["mutar", "recargar-categoria-activa"]);
  });

  test("presenta mensajes 400 y oculta detalles de errores 500", () => {
    assert.equal(core.mensajeErrorConfiguracion({
      response: { status: 400, data: { message: "El código ya existe" } },
    }), "El código ya existe");
    assert.equal(core.mensajeErrorConfiguracion({
      response: { status: 500, data: { message: "password=secreto" } },
    }), "No se pudo completar la operación. Intente nuevamente.");
  });

  test("no contiene conexiones directas a PostgreSQL o SQL Server y exige confirmación visual", () => {
    const sources = [
      "../src/services/rotacionGeneralProductosConfiguracion.js",
      "../src/services/rotacionGeneralProductosConfiguracionCore.js",
      "../src/composables/useRotacionProductosConfiguracion.js",
    ].map((file) => fs.readFileSync(path.resolve(__dirname, file), "utf8")).join("\n");
    assert.doesNotMatch(sources, /pg\.|postgres|mssql|sqlserver|tedious/i);
    const view = fs.readFileSync(path.resolve(
      __dirname,
      "../src/views/RotacionGeneralProductosConfiguracion.vue",
    ), "utf8");
    assert.match(view, /confirm\.require/);
    assert.match(view, /Se recomienda desactivarlo/);
  });
});
