import api from "@/services/api";
import {
  normalizarCompradoresRotacion,
  normalizarClasificacionRotacion,
  normalizarFiltrosRotacion,
} from "@/services/rotacionGeneralProductosFiltros";

const ENDPOINT = "/api/rotaciongeneralproductos";
const COMPRADORES_ENDPOINT = "/api/rotaciongeneralproductos/compradores";

export async function obtenerCompradoresRotacion({ signal } = {}) {
  const { data } = await api.get(COMPRADORES_ENDPOINT, { signal });
  if (!data?.ok || !Array.isArray(data.rows)) {
    throw new Error("La respuesta de compradores no tiene el formato esperado.");
  }
  return normalizarCompradoresRotacion(data.rows);
}

export async function obtenerClasificacionRotacion(numero, { signal } = {}) {
  const number = Number(numero);
  if (![4, 5, 6, 8].includes(number)) {
    throw new Error("Número de clasificación no admitido.");
  }
  const { data } = await api.get(`${ENDPOINT}/clasif${number}`, { signal });
  if (!data?.ok || !Array.isArray(data.rows)) {
    throw new Error(`La respuesta de clasificación ${number} no tiene el formato esperado.`);
  }
  return normalizarClasificacionRotacion(data.rows, number);
}

export async function obtenerRotacionGeneralProductos({ filtros = {}, signal } = {}) {
  const params = normalizarFiltrosRotacion(filtros);
  const { data } = await api.get(ENDPOINT, {
    signal,
    params,
    paramsSerializer: { indexes: false },
  });

  if (!data?.ok || !Array.isArray(data.rows)) {
    throw new Error("La respuesta de rotación de productos no tiene el formato esperado.");
  }

  return data;
}

export function normalizarProductos(rows) {
  return rows.map((row) => ({
    codigoArticulo: row["Cód Art"],
    nombreArticulo: row["Nombre Art"],
    stockUnidades: row["Stock Uni"],
    stockDisponible: row["Stock Disp"],
    exhibido: row["Exhibido"],
    ultimaVenta: row["Ultima Vta"],
    ultimaEntradaProveedor: row["Ult Entr Proveed"],
    cantidadUltimaEntrada: row["Cant Ult Ent Prov"],
    diasSinVenta: row["Días sin venta"],
    diasUltimaEntrada: row["Días Ult Ent Prov"],
    diasUltimoMovimiento: row["Días Ult Mov"],
    costoUnitarioSinIva: row["Costo Uni sin IVA"],
    costoTotalSinIva: row["Costo item sin IVA"],
    ventaContadoConIva: row["Venta Uni Cdo con IVA L1"],
    bloqueoVenta: row["Bloq Vta 1SI 0NO"],
    clasificacion4: row.CA04_NOMBRE,
    clasificacion5: row.CA05_NOMBRE,
    clasificacion6: row.CA06_NOMBRE,
    clasificacion8: row.CA08_NOMBRE,
    nombreComprador: row["Nombre Comprador"],
    ventasUltimoAnio: row["Vtas Ult Año"],
  }));
}
