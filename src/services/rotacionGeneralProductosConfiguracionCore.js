export const ROTACION_CONFIG_BASE = "/api/rotaciongeneralproductos/configuracion";

export const ROTACION_CONFIG_RECURSOS = [
  {
    key: "articulosOmitidos",
    resource: "articulos-omitidos",
    label: "Artículos omitidos",
    codeField: "codigo_articulo",
    descriptionField: "descripcion",
    codeLabel: "Código de artículo",
    descriptionLabel: "Descripción",
  },
  {
    key: "compradores",
    resource: "compradores",
    label: "Compradores",
    codeField: "codigo_comprador",
    descriptionField: "nombre_comprador",
    codeLabel: "Código de comprador",
    descriptionLabel: "Nombre",
  },
  {
    key: "depositosExcluidos",
    resource: "depositos-excluidos",
    label: "Depósitos excluidos",
    codeField: "codigo_deposito",
    descriptionField: "nombre_deposito",
    codeLabel: "Código de depósito",
    descriptionLabel: "Nombre",
    integerCode: true,
  },
  {
    key: "depositosExhibidos",
    resource: "depositos-exhibidos",
    label: "Depósitos de exhibición",
    codeField: "codigo_deposito",
    descriptionField: "descripcion",
    codeLabel: "Código de depósito",
    descriptionLabel: "Descripción",
    integerCode: true,
  },
  {
    key: "tiposArticulo",
    resource: "tipos-articulo",
    label: "Tipos de artículo",
    codeField: "codigo_tipo_articulo",
    descriptionField: "nombre_tipo_articulo",
    codeLabel: "Código de tipo",
    descriptionLabel: "Nombre",
  },
  {
    key: "tiposComprobanteRecepcion",
    resource: "tipos-comprobante-recepcion",
    label: "Comprobantes de recepción",
    codeField: "codigo_tipo_comprobante",
    descriptionField: "nombre_tipo_comprobante",
    codeLabel: "Código de comprobante",
    descriptionLabel: "Nombre",
  },
  {
    key: "tiposNpca",
    resource: "tipos-npca",
    label: "Tipos de nota de pedido",
    codeField: "codigo_tipo_npca",
    descriptionField: "nombre_tipo_npca",
    codeLabel: "Código de nota de pedido",
    descriptionLabel: "Nombre",
  },
];

export const ROTACION_CONFIG_POR_RECURSO = Object.fromEntries(
  ROTACION_CONFIG_RECURSOS.map((item) => [item.resource, item]),
);

export function obtenerDefinicionConfiguracion(resource) {
  const definition = ROTACION_CONFIG_POR_RECURSO[resource];
  if (!definition) throw new Error("Recurso de configuración no admitido.");
  return definition;
}

export function normalizarFilaConfiguracion(row, definition) {
  return {
    codigo: String(row?.[definition.codeField] ?? "").trim(),
    descripcion: String(row?.[definition.descriptionField] ?? "").trim(),
    activo: row?.activo === true || row?.activo === 1,
    actualizadoEn: row?.actualizado_en ?? null,
    original: row,
  };
}

export function validarRegistroConfiguracion(registro, definition) {
  const codigo = String(registro?.codigo ?? "").trim();
  const descripcion = String(registro?.descripcion ?? "").trim();
  const errors = {};
  if (!codigo) errors.codigo = "El código es obligatorio.";
  if (definition.integerCode && codigo && !/^\d+$/.test(codigo)) {
    errors.codigo = "El código de depósito debe ser un entero válido.";
  }
  if (!descripcion) errors.descripcion = `${definition.descriptionLabel} es obligatorio.`;
  return errors;
}

export function crearPayloadConfiguracion(registro, definition, { editando = false } = {}) {
  const payload = {
    [definition.descriptionField]: String(registro?.descripcion ?? "").trim(),
    activo: Boolean(registro?.activo),
  };
  if (!editando) payload[definition.codeField] = String(registro?.codigo ?? "").trim();
  return payload;
}

export function mensajeErrorConfiguracion(error) {
  if (error?.response?.status === 400 && error?.response?.data?.message) {
    return error.response.data.message;
  }
  return "No se pudo completar la operación. Intente nuevamente.";
}

function validarListado(data) {
  if (!data?.ok || !Array.isArray(data.rows)) {
    throw new Error("La respuesta de configuración no tiene el formato esperado.");
  }
  return data;
}

function validarEscritura(data) {
  if (!data?.ok || !data.row) {
    throw new Error("La respuesta de escritura no tiene el formato esperado.");
  }
  return data;
}

export function crearClienteConfiguracion(http, baseUrl = ROTACION_CONFIG_BASE) {
  const url = (resource, codigo) => {
    obtenerDefinicionConfiguracion(resource);
    const base = `${baseUrl}/${resource}`;
    return codigo === undefined ? base : `${base}/${encodeURIComponent(codigo)}`;
  };

  return {
    async listar(resource, { signal } = {}) {
      const { data } = await http.get(url(resource), { signal });
      return validarListado(data);
    },
    async crear(resource, payload) {
      const { data } = await http.post(url(resource), payload);
      return validarEscritura(data);
    },
    async actualizar(resource, codigo, payload) {
      const { data } = await http.put(url(resource, codigo), payload);
      return validarEscritura(data);
    },
    async eliminar(resource, codigo) {
      const { data } = await http.delete(url(resource, codigo));
      if (!data?.ok) throw new Error("La respuesta de eliminación no tiene el formato esperado.");
      return data;
    },
  };
}

export async function ejecutarYRecargar(operacion, recargar) {
  const result = await operacion();
  await recargar();
  return result;
}
