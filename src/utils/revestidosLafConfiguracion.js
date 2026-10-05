export const CONFIG_BASE = '/api/gdc/revestidos-laf/configuracion';
const text = (key, label, nullable = false, max = 150) => ({ key, label, type: 'text', nullable, max });
const integer = (key, label, max = 2147483647, nullable = false) => ({ key, label, type: 'number', max, nullable });
const common = [text('nombre', 'Nombre'), { key: 'activo', label: 'Activo', type: 'boolean' }];
export const CONFIG_RECURSOS = [
  { resource: 'familias', label: 'Familias', key: 'clasificador_5', fields: [
    text('nombre', 'Nombre'), text('codigo_ref_hl', 'Referencia HL', true, 20),
    text('codigo_ref_1050', 'Referencia 10,50 m', true, 20), text('codigo_ref_13m', 'Referencia 13 m', true, 20),
    text('notas', 'Observaciones', true, 10000), integer('orden', 'Orden', 32767), common[1],
  ] },
  { resource: 'tipos-articulo-chapa', label: 'Tipos de artículo chapa', key: 'codigo', fields: common },
  { resource: 'depositos-excluidos', label: 'Depósitos excluidos', key: 'codigo_deposito', fields: common },
  { resource: 'comprobantes-consumo-ventas', label: 'Comprobantes de consumo ventas', key: 'codigo_comprobante', fields: common },
  { resource: 'tipos-np', label: 'Tipos de nota de pedido', key: 'codigo_tipo_np', fields: common },
  { resource: 'general', label: 'Configuración general', key: 'id', fields: [
    integer('meses_consumo_default', 'Meses anteriores por defecto', 60), integer('dias_rotacion_default', 'Días de rotación por defecto', 3660),
    integer('deposito_principal', 'Depósito principal'), integer('proveedor_oc', 'Proveedor OC (vacío: todos)', 2147483647, true),
    { ...text('clasificador_8_excluido_stock', 'Clasificador 8 excluido', false, 4), pattern: '[0-9]{4}' },
  ] },
];
export function recursoConfiguracion(resource) {
  const definition = CONFIG_RECURSOS.find(r => r.resource === resource);
  if (!definition) throw new Error('Recurso de configuración no admitido.');
  return definition;
}
export function campoCodigo(resource) {
  const definition = recursoConfiguracion(resource);
  if (resource === 'general') throw new Error('La configuración general es única y solo admite edición.');
  if (definition.key === 'codigo_deposito') return integer(definition.key, 'Código de depósito');
  const length = resource === 'familias' ? 4 : 3;
  return { ...text(definition.key, 'Código', false, length),
    pattern: ['clasificador_5', 'codigo'].includes(definition.key) ? `[0-9]{${length}}` : '[A-Za-z0-9]{1,3}' };
}
export function payloadCreacion(resource, values) {
  const field = campoCodigo(resource);
  const raw = values[field.key];
  let key;
  if (field.type === 'number') {
    if (!['string', 'number'].includes(typeof raw) || !/^\d+$/.test(String(raw)) ||
      !Number.isSafeInteger(Number(raw)) || Number(raw) < 1 || Number(raw) > field.max)
      throw new Error(`${field.label}: entero positivo inválido.`);
    key = Number(raw);
  } else {
    if (typeof raw !== 'string' || !new RegExp(`^${field.pattern}$`).test(raw))
      throw new Error(`${field.label}: formato inválido.`);
    key = raw;
  }
  return { [field.key]: key, ...payloadConfiguracion(resource, values) };
}
export function payloadConfiguracion(resource, values) {
  const definition = recursoConfiguracion(resource);
  const result = {};
  definition.fields.forEach(field => {
    const value = values[field.key];
    if (field.nullable && (value === '' || value === null || value === undefined)) result[field.key] = null;
    else if (field.type === 'boolean') {
      if (typeof value !== 'boolean') throw new Error(`${field.label}: valor inválido.`);
      result[field.key] = value;
    } else if (field.type === 'number') {
      if (!/^\d+$/.test(String(value)) || !Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > field.max) throw new Error(`${field.label}: entero entre 1 y ${field.max}.`);
      result[field.key] = Number(value);
    } else {
      if (typeof value !== 'string' || (!field.nullable && !value.trim()) || value.length > field.max || (field.pattern && !new RegExp(`^${field.pattern}$`).test(value))) throw new Error(`${field.label}: texto inválido.`);
      result[field.key] = value.trim();
    }
  });
  if (resource === 'familias') {
    if (!result.codigo_ref_hl && !result.codigo_ref_13m) throw new Error('Debe existir una referencia HL o 13 m.');
    if (Boolean(result.codigo_ref_1050) !== Boolean(result.codigo_ref_13m)) throw new Error('Las referencias 10,50 m y 13 m deben completarse juntas.');
  }
  return result;
}
