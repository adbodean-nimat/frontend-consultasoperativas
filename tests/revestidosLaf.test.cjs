const { before, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { family, response } = require('./revestidosLaf.fixture.cjs');
let utils, config;
before(async () => {
  const read = file => import(`data:text/javascript;base64,${Buffer.from(fs.readFileSync(path.resolve(__dirname, file), 'utf8')).toString('base64')}`);
  utils = await read('../src/utils/revestidosLaf.js');
  config = await read('../src/utils/revestidosLafConfiguracion.js');
});
test('defaults, límites y URL: solo enteros válidos', () => {
  assert.deepEqual(utils.parametrosConsulta(), { months: 12, rotationDays: 120 });
  assert.deepEqual(utils.filtrosDesdeQuery({ months: '24', rotationDays: '180' }), { months: 24, rotationDays: 180 });
  assert.deepEqual(utils.filtrosDesdeQuery({ months: 'invalid' }), utils.DEFAULT_FILTERS);
  for (const value of [0, -1, 61, 1.5, '', null, '1e1', ['12'], true]) assert.throws(() => utils.parametrosConsulta({ months: value }));
  assert.throws(() => utils.parametrosConsulta({ rotationDays: 3661 }));
});
test('months=12 incluye mes actual y doce anteriores; períodos y columnas cronológicos', () => {
  const data = response();
  const result = utils.adaptarRespuesta({ ...data, periods: data.periods.slice().reverse() });
  assert.equal(result.periods.length, data.parameters.months + 1);
  assert.equal(result.periods[0], '2025-10');
  assert.equal(result.periods.at(-1), '2026-10');
  const consumption = result.columns.find(c => c.headerClass === 'laf-consumos');
  assert.equal(consumption.children.length, 13);
  assert.deepEqual(consumption.children[0].children.map(c => c.field), ['2025-10.productionTon', '2025-10.salesRemittancesTon', '2025-10.totalConsumptionTon']);
  assert.throws(() => utils.ordenarPeriodos(['2026-13']));
});
test('formatos es-AR: toneladas, unidades, cero y nulos', () => {
  assert.equal(utils.formatoNumero(1234.5), '1.234,50');
  assert.equal(utils.formatoNumero(12.345, 2), '12,35');
  assert.equal(utils.formatoNumero(0), '0,00');
  assert.equal(utils.formatoNumero(12), '12,00');
  for (const value of [null, undefined, '', NaN, Infinity]) assert.equal(utils.formatoNumero(value), '—');
});
test('orden de Compras y agrupación contigua conservados', () => {
  const { rows } = utils.adaptarRespuesta(response());
  assert.deepEqual(rows.map(r => r.classifier5), ['0027', '0025', '0080']);
  assert.deepEqual(rows.map(r => r.originalIndex), [0, 1, 2]);
  assert.ok(rows[0].groupLabel);
  assert.equal(rows[1].groupLabel, '');
  assert.ok(rows[2].groupLabel);
  assert.equal(rows[0]['2026-09.salesRemittancesTon'], 0);
  assert.equal(rows[0]['2025-10.productionTon'], null);
});
test('familia sin movimientos conserva ceros; días no calculables conservan nulo y explicación', () => {
  const f = family('0001', 'Sin movimientos');
  f.consumption.forEach(c => { c.productionTon = 0; c.salesRemittancesTon = 0; c.totalConsumptionTon = 0; });
  f.stock.ton.days = 0; f.stock.ton.daysStatus = 'NO_CONSUMPTION';
  const { rows } = utils.adaptarRespuesta({ ...response(), families: [f] });
  assert.equal(rows[0]['2026-10.totalConsumptionTon'], 0);
  assert.equal(rows[0]['stock.ton.days'], null);
  assert.match(rows[0].daysExplanation, /no calculable/);
  assert.match(rows[0].statusLabel, /Advertencias/);
});
test('advertencias de referencia, factores y clasificador visibles con contexto', () => {
  for (const code of ['CODE_NOT_FOUND', 'INVALID_FACTOR', 'MULTIPLE_FACTORS', 'MULTIPLE_CLASSIFIER4']) {
    const f = family('0001', 'Prueba', { warnings: [{ code, block: 'data', articleCode: '00002' }] });
    assert.match(utils.textoAdvertencias(f), /00002/);
    const row = utils.adaptarRespuesta({ ...response(), families: [f] }).rows[0];
    assert.match(row.statusLabel, /⚠/);
    assert.ok(row.warningText.includes(utils.ESTADOS[code]));
  }
});
test('totales suman únicamente magnitudes aditivas y propagan valores desconocidos', () => {
  const data = response();
  data.families[1].pendingSalesOrderTon = null;
  const { totals } = utils.adaptarRespuesta(data);
  assert.equal(totals['stock.ton.total'], 12);
  assert.equal(totals['2026-10.totalConsumptionTon'], 3.375);
  assert.equal(totals.pendingSalesOrderTon, null);
  assert.equal(totals['stock.ton.days'], undefined);
  assert.equal(totals['data.factorHomogeneousStock'], undefined);
  assert.equal(totals.classifier5, undefined);
});

test('subtotal de cada clasificador 4 cierra su grupo sin duplicar el total general', () => {
  const { rows, displayRows, totals, columns } = utils.adaptarRespuesta(response());
  assert.deepEqual(displayRows.filter(r => r.originalIndex !== undefined), rows);
  assert.deepEqual(displayRows.map(r => r.classifier5 ?? r.name), [
    '0027', '0025', 'TOTAL 01 · Chapas revestidas', '% del total general', undefined,
    '0080', 'TOTAL 02 · Laminados', '% del total general', undefined,
  ]);
  const subtotals = displayRows.filter(r => r.isSubtotal);
  assert.equal(subtotals[0]['2026-10.totalConsumptionTon'], 2.25);
  assert.equal(subtotals[0]['stock.ton.total'], 8);
  assert.equal(subtotals[0]['stock.units13m.total'], 44);
  assert.equal(subtotals[0]['purchaseOrders.pendingTon'], 4.9);
  assert.equal(subtotals[1]['stock.ton.total'], 4);
  assert.equal(totals['stock.ton.total'], 12);
  assert.equal(subtotals[0]['stock.ton.days'], undefined);
  assert.equal(subtotals[0]['data.factorHomogeneousStock'], undefined);
  assert.equal(subtotals[0].classifier5, undefined);
  const days = utils.columnasHoja(columns).find(c => c.field === 'stock.ton.days');
  assert.equal(days.valueFormatter({ data: subtotals[0], value: undefined }), '');
  assert.equal(days.valueFormatter({ data: rows[0], value: null }), '—');
  assert.equal(new Set(subtotals.map(r => r.subtotalId)).size, subtotals.length);
});

test('subtotales distinguen cero de desconocido y no reordenan grupos repetidos', () => {
  const data = response();
  data.families[0].pendingSalesOrderTon = null;
  data.families.push(family('0999', 'Última familia'));
  const { displayRows, totals } = utils.adaptarRespuesta(data);
  const subtotals = displayRows.filter(r => r.isSubtotal);
  assert.equal(subtotals.length, 3);
  assert.equal(subtotals[0].pendingSalesOrderTon, null);
  assert.equal(subtotals[1].pendingSalesOrderTon, 0);
  assert.equal(subtotals[2].pendingSalesOrderTon, 0);
  assert.equal(totals.pendingSalesOrderTon, null);
  assert.deepEqual(displayRows.filter(r => r.originalIndex !== undefined).map(r => r.classifier5), ['0027', '0025', '0080', '0999']);
  assert.deepEqual(utils.adaptarRespuesta({ ...data, families: [] }).displayRows, []);
  const unclassified = utils.adaptarRespuesta({ ...data, families: [family('0001', 'Sin grupo', { classifier4: null, classifier4Name: null })] });
  assert.equal(unclassified.displayRows[1].name, 'TOTAL Sin clasificador 4');
});

test('participación mensual sigue al subtotal y precede al separador sin alterar totales', () => {
  const { displayRows, totals, columns } = utils.adaptarRespuesta(response());
  const percentages = displayRows.filter(r => r.isPercentage);
  assert.equal(percentages.length, 2);
  assert.equal(percentages[0]['2026-10.totalConsumptionTon'], 2 / 3);
  assert.equal(percentages[1]['2026-10.totalConsumptionTon'], 1 / 3);
  assert.equal(percentages[0]['2025-10.totalConsumptionTon'], null);
  assert.equal(percentages[0]['2026-10.productionTon'], undefined);
  assert.equal(percentages[0]['stock.ton.total'], undefined);
  assert.equal(totals['2026-10.totalConsumptionTon'], 3.375);
  displayRows.forEach((row, i) => {
    if (row.isSubtotal) {
      assert.ok(displayRows[i + 1].isPercentage);
      assert.ok(displayRows[i + 2].isSeparator);
    }
  });
  const ids = displayRows.map(r => r.presentationId ?? r.subtotalId ?? String(r.originalIndex));
  assert.equal(new Set(ids).size, ids.length);
  const monthlyTotal = utils.columnasHoja(columns).find(c => c.field === '2026-10.totalConsumptionTon');
  assert.equal(monthlyTotal.valueFormatter({ data: percentages[0], value: 2 / 3 }), utils.formatoPorcentaje(2 / 3));
  const production = utils.columnasHoja(columns).find(c => c.field === '2026-10.productionTon');
  assert.equal(production.valueFormatter({ data: percentages[0], value: undefined }), '');
  assert.equal(monthlyTotal.valueFormatter({ data: { isSeparator: true }, value: undefined }), '');
});

test('porcentajes: cero real, divisor cero, nulos y formato es-AR', () => {
  assert.equal(utils.calcularPorcentaje(46.89, 107.18), 46.89 / 107.18);
  assert.match(utils.formatoPorcentaje(46.89 / 107.18), /^43,75\s*%$/);
  assert.match(utils.formatoPorcentaje(utils.calcularPorcentaje(0, 10)), /^0,00\s*%$/);
  for (const [subtotal, total] of [[0, 0], [1, 0], [null, 10], [1, null], [1, undefined], [Infinity, 10]]) {
    assert.equal(utils.calcularPorcentaje(subtotal, total), null);
    assert.equal(utils.formatoPorcentaje(utils.calcularPorcentaje(subtotal, total)), '—');
  }
  const data = response();
  data.families.forEach(f => f.consumption.forEach(c => { c.totalConsumptionTon = 0; }));
  const result = utils.adaptarRespuesta(data);
  assert.equal(result.displayRows.find(r => r.isPercentage)['2026-10.totalConsumptionTon'], null);
  assert.equal(result.totals['2026-10.totalConsumptionTon'], 0);
});
test('servicio envía una sola llamada consolidada con parámetros y señal', async () => {
  const calls = [], signal = new AbortController().signal;
  const http = { get: async (...args) => { calls.push(args); return { data: response() }; } };
  const result = await utils.consultarConCliente(http, { months: '12', rotationDays: '120' }, signal);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], '/api/gdc/revestidos-laf');
  assert.deepEqual(calls[0][1].params, { months: 12, rotationDays: 120 });
  assert.strictEqual(calls[0][1].signal, signal);
  assert.equal(result.rows.length, 3);
});
test('errores HTTP y contratos inválidos nunca generan resultados con ceros', async () => {
  const error = { response: { status: 503, data: { message: 'ERP no disponible' } } };
  await assert.rejects(utils.consultarConCliente({ get: async () => { throw error; } }, utils.DEFAULT_FILTERS), err => err === error);
  assert.equal(utils.mensajeError(error), 'ERP no disponible');
  assert.match(utils.mensajeError({ code: 'ERR_NETWORK' }), /comunicación/);
  assert.match(utils.mensajeError({ code: 'ECONNABORTED' }), /tiempo de espera/);
  assert.throws(() => utils.adaptarRespuesta({ ok: false }), /formato/);
  assert.deepEqual(utils.adaptarRespuesta({ ...response(), families: [] }).rows, []);
});
test('configuración permite solo campos autorizados y conserva códigos y pareja de referencias', () => {
  const values = { nombre: 'Familia', codigo_ref_hl: '0001', codigo_ref_13m: null, codigo_ref_1050: null, notas: null, orden: 1, activo: false, updated_by: 'forbidden' };
  const payload = config.payloadConfiguracion('familias', values);
  assert.equal(payload.codigo_ref_hl, '0001');
  assert.equal(payload.activo, false);
  assert.equal(payload.updated_by, undefined);
  assert.equal(payload.clasificador_5, undefined);
  assert.throws(() => config.payloadConfiguracion('familias', { ...values, codigo_ref_13m: '0013' }), /juntas/);
  assert.throws(() => config.payloadConfiguracion('familias', { ...values, codigo_ref_hl: null }), /referencia/);
  assert.throws(() => config.recursoConfiguracion('../otro'));
});

test('altas validan los códigos reales de cada recurso y preservan ceros iniciales', () => {
  const cases = [
    ['familias', '0027', { nombre: 'Familia', codigo_ref_hl: '00001', codigo_ref_13m: null, codigo_ref_1050: null, notas: null, orden: 1, activo: true }],
    ['tipos-articulo-chapa', '003', { nombre: 'Tipo', activo: true }],
    ['depositos-excluidos', '973', { nombre: 'Depósito', activo: true }],
    ['comprobantes-consumo-ventas', 'F01', { nombre: 'Comprobante', activo: true }],
    ['tipos-np', 'NP1', { nombre: 'Pedido', activo: false }],
  ];
  for (const [resource, code, fields] of cases) {
    const key = config.recursoConfiguracion(resource).key;
    const payload = config.payloadCreacion(resource, { [key]: code, ...fields, updated_by: 'ignored' });
    assert.equal(payload[key], resource === 'depositos-excluidos' ? 973 : code);
    assert.equal(payload.activo, fields.activo);
    assert.equal(payload.updated_by, undefined);
    assert.throws(() => config.payloadCreacion(resource, { [key]: '../', ...fields }));
    assert.throws(() => config.payloadCreacion(resource, { ...fields }));
  }
  assert.throws(() => config.payloadCreacion('familias', { clasificador_5: '27' }));
  assert.throws(() => config.payloadCreacion('tipos-articulo-chapa', { codigo: 'A01' }));
  assert.throws(() => config.payloadCreacion('general', {}), /única/);
});

test('API administrativa: POST de alta, DELETE físico y errores sin inventar endpoints', async () => {
  const asUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  const apiUrl = asUrl(`export const calls = []; let failure; export function fail(error) { failure = error; }
    async function request(method, url, body) { calls.push({ method, url, body }); if (failure) { const e = failure; failure = null; throw e; }
      return { data: { ok: true, row: method === 'DELETE' ? { codigo: '003', nombre: 'Tipo', activo: true } : body } }; }
    export default { post: (u,b) => request('POST',u,b), delete: u => request('DELETE',u), put: (u,b) => request('PUT',u,b) };`);
  const configUrl = asUrl(fs.readFileSync(path.resolve(__dirname, '../src/utils/revestidosLafConfiguracion.js'), 'utf8'));
  const source = fs.readFileSync(path.resolve(__dirname, '../src/services/revestidosLafConfiguracion.js'), 'utf8')
    .replace("'@/services/api'", JSON.stringify(apiUrl)).replace("'@/utils/revestidosLafConfiguracion'", JSON.stringify(configUrl));
  const service = await import(asUrl(source));
  const mock = await import(apiUrl);
  const added = await service.crearConfiguracion('tipos-articulo-chapa', { codigo: '003', nombre: 'Tipo', activo: true });
  assert.equal(added.codigo, '003');
  assert.deepEqual(mock.calls[0], { method: 'POST', url: `${config.CONFIG_BASE}/tipos-articulo-chapa`, body: added });
  const deleted = await service.eliminarConfiguracion('tipos-articulo-chapa', added);
  assert.deepEqual(deleted, added);
  assert.equal(mock.calls[1].url, `${config.CONFIG_BASE}/tipos-articulo-chapa/003`);
  assert.equal(mock.calls[1].method, 'DELETE');
  await assert.rejects(service.crearConfiguracion('general', {}), /única/);
  await assert.rejects(service.eliminarConfiguracion('general', { id: 1 }), /única/);
  assert.equal(mock.calls.length, 2);
  const duplicate = { response: { status: 409, data: { message: 'Ya existe ese código' } } };
  mock.fail(duplicate);
  await assert.rejects(service.crearConfiguracion('tipos-articulo-chapa', added), e => e === duplicate);
  const missing = { response: { status: 404, data: { message: 'Registro de configuración inexistente' } } };
  mock.fail(missing);
  await assert.rejects(service.eliminarConfiguracion('tipos-articulo-chapa', added), e => e === missing);
});

test('estado administrativo elimina físicamente activos e inactivos, conserva errores y evita duplicados', async () => {
  const asUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  const serviceUrl = asUrl(`let rows = [{ codigo: '001', nombre: 'Original', activo: true }];
    export const calls = []; let failure, resume;
    export function fail(e) { failure = e; } export function hold() { return new Promise(r => { resume = r; }); }
    export function release() { resume?.(); } let gate;
    export function pause() { gate = hold(); }
    export async function listarConfiguracion() { return rows.slice(); }
    export async function crearConfiguracion(resource, values) { calls.push('create'); if (gate) { await gate; gate = null; }
      if (failure) { const e = failure; failure = null; throw e; } rows.push(values); return values; }
    export async function eliminarConfiguracion(resource, row) { calls.push('delete');
      if (gate) { await gate; gate = null; }
      if (failure) { const e = failure; failure = null; throw e; }
      rows = rows.filter(r => r.codigo !== row.codigo); return row; }
    export async function guardarConfiguracion(resource, row, values) { return { ...row, ...values }; }`);
  const vueUrl = asUrl(`export const ref = value => ({ value }); export const onBeforeUnmount = () => {};`);
  const utilsUrl = asUrl(fs.readFileSync(path.resolve(__dirname, '../src/utils/revestidosLaf.js'), 'utf8'));
  const configUrl = asUrl(fs.readFileSync(path.resolve(__dirname, '../src/utils/revestidosLafConfiguracion.js'), 'utf8'));
  const source = fs.readFileSync(path.resolve(__dirname, '../src/composables/useRevestidosLafConfiguracion.js'), 'utf8')
    .replace("'vue'", JSON.stringify(vueUrl)).replace("'@/services/revestidosLafConfiguracion'", JSON.stringify(serviceUrl))
    .replace("'@/utils/revestidosLaf'", JSON.stringify(utilsUrl))
    .replace("'@/utils/revestidosLafConfiguracion'", JSON.stringify(configUrl));
  const { useRevestidosLafConfiguracion } = await import(asUrl(source));
  const mock = await import(serviceUrl);
  const state = useRevestidosLafConfiguracion();
  await state.cargar('tipos-articulo-chapa');
  mock.pause();
  const added = state.crear('tipos-articulo-chapa', { codigo: '002', nombre: 'Nuevo', activo: false });
  assert.equal(state.saving.value, true);
  assert.equal(await state.crear('tipos-articulo-chapa', {}), false);
  mock.release(); assert.equal(await added, true);
  assert.equal(mock.calls.filter(c => c === 'create').length, 1);
  assert.equal(state.rows.value.length, 2);
  const row = state.rows.value[1];
  mock.fail({ response: { data: { message: 'No disponible' } } });
  assert.equal(await state.eliminar('tipos-articulo-chapa', row), false);
  assert.equal(state.rows.value[1].activo, false);
  assert.equal(state.error.value, 'No disponible');
  mock.pause();
  const removed = state.eliminar('tipos-articulo-chapa', { ...row });
  assert.equal(state.rows.value.length, 2);
  assert.equal(await state.eliminar('tipos-articulo-chapa', row), false);
  mock.release(); assert.equal(await removed, true);
  assert.equal(state.rows.value.length, 1);
  assert.equal(state.rows.value[0].codigo, '001');
  assert.equal(state.error.value, '');
  assert.equal(state.saving.value, false);
  await state.cargar('tipos-articulo-chapa');
  assert.equal(state.rows.value.length, 1);
  assert.equal(await state.eliminar('tipos-articulo-chapa', state.rows.value[0]), true);
  assert.deepEqual(state.rows.value, []);
  assert.equal(await state.crear('tipos-articulo-chapa', row), true);
  assert.equal(state.rows.value[0].codigo, '002');
});

test('composable ignora respuestas antiguas, evita duplicados y permite reintento', async () => {
  const asUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  const serviceUrl = asUrl(`export const calls = []; export function obtenerRevestidosLaf(filters, signal) { return new Promise((resolve, reject) => calls.push({ filters, signal, resolve, reject })); }`);
  const vueUrl = asUrl(`export const ref = value => ({ value }); export let dispose; export const onBeforeUnmount = fn => { dispose = fn; };`);
  const utilsUrl = asUrl(fs.readFileSync(path.resolve(__dirname, '../src/utils/revestidosLaf.js'), 'utf8'));
  const source = fs.readFileSync(path.resolve(__dirname, '../src/composables/useRevestidosLaf.js'), 'utf8')
    .replace('"vue"', JSON.stringify(vueUrl)).replace("'vue'", JSON.stringify(vueUrl))
    .replace("'@/services/revestidosLaf'", JSON.stringify(serviceUrl)).replace("'@/utils/revestidosLaf'", JSON.stringify(utilsUrl));
  const { useRevestidosLaf } = await import(asUrl(source));
  const { calls } = await import(serviceUrl);
  const state = useRevestidosLaf();
  const old = state.cargar({ months: 12, rotationDays: 120 });
  await state.cargar({ months: 12, rotationDays: 120 });
  assert.equal(calls.length, 1);
  const latest = state.cargar({ months: 6, rotationDays: 120 });
  assert.equal(calls[0].signal.aborted, true);
  calls[1].resolve({ rows: ['latest'] }); await latest;
  calls[0].resolve({ rows: ['obsolete'] }); await old;
  assert.deepEqual(state.resultado.value.rows, ['latest']);
  assert.equal(state.cargando.value, false);
  const failed = state.cargar({ months: 6, rotationDays: 120 });
  calls[2].reject({ response: { data: { message: 'ERP no disponible' } } }); await failed;
  assert.equal(state.error.value, 'ERP no disponible');
  assert.equal(state.resultado.value, null);
  const retried = state.cargar({ months: 6, rotationDays: 120 });
  calls[3].resolve({ rows: ['retry'] }); await retried;
  assert.equal(state.error.value, '');
  assert.ok(state.ultimaActualizacion.value instanceof Date);
  const pending = state.cargar({ months: 1, rotationDays: 120 });
  (await import(vueUrl)).dispose();
  assert.equal(calls[4].signal.aborted, true);
  calls[4].reject(new Error('aborted')); await pending;
});
