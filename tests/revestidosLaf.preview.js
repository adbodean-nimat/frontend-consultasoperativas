// Isolated UI harness: synthetic data only; does not mount the production router
// or change its guards, and the HTTP adapter never contacts an external backend.
import { createApp, h, ref } from 'vue';
import { createRouter, createWebHistory, RouterView } from 'vue-router';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import api from '../src/services/api';
import RevestidosLaf from '../src/views/RevestidosLaf.vue';
import Configuracion from '../src/views/RevestidosLafConfiguracion.vue';
import { CONFIG_RECURSOS } from '../src/utils/revestidosLafConfiguracion';
import { family, response } from './revestidosLaf.fixture.cjs';
import '../src/style.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const calls = ref([]);
const configurationRows = new Map();
api.defaults.adapter = async config => {
  calls.value.push(`${config.method.toUpperCase()} ${config.url} ${JSON.stringify(config.params ?? {})}`);
  await new Promise(resolve => setTimeout(resolve, 200));
  if (config.url.includes('/configuracion/')) {
    const resource = config.url.split('/configuracion/')[1].split('/')[0];
    const definition = CONFIG_RECURSOS.find(r => r.resource === resource);
    if (!configurationRows.has(resource)) {
      const row = Object.fromEntries(definition.fields.map(f => [f.key, f.type === 'boolean' ? true : f.type === 'number' ? 1 : f.nullable ? null : f.key === 'clasificador_8_excluido_stock' ? '0145' : 'Prueba']));
      row[definition.key] = resource === 'general' || resource === 'depositos-excluidos' ? 1 : resource === 'familias' ? '0001' : '001';
      if (resource === 'familias') row.codigo_ref_hl = '00001';
      configurationRows.set(resource, [row]);
    }
    const rows = configurationRows.get(resource);
    if (config.method === 'get') return { data: { ok: true, rows: rows.slice() }, status: 200, config, headers: {} };
    const payload = config.data ? JSON.parse(config.data) : {};
    let row;
    if (config.method === 'post') {
      if (rows.some(r => String(r[definition.key]) === String(payload[definition.key])))
        throw { response: { status: 409, data: { message: 'Ya existe ese código' } } };
      row = { ...payload }; rows.push(row);
    } else {
      const key = decodeURIComponent(config.url.split('/').at(-1));
      const index = rows.findIndex(r => resource === 'general' || String(r[definition.key]) === key);
      if (index < 0) throw { response: { status: 404, data: { message: 'Registro de configuración inexistente' } } };
      if (config.method === 'delete') {
        if (resource === 'general') throw { response: { status: 405, data: { message: 'La configuración general no se elimina' } } };
        [row] = rows.splice(index, 1);
      } else {
        row = { ...rows[index], ...payload };
        rows[index] = row;
      }
    }
    return { data: { ok: true, row }, status: config.method === 'post' ? 201 : 200, config, headers: {} };
  }
  if (config.url !== '/api/gdc/revestidos-laf') throw new Error('El harness solo admite la API GDC simulada.');
  if (config.params.months === 60) throw { response: { status: 503, data: { message: 'ERP no disponible (error simulado)' } } };
  const data = response();
  data.parameters.months = config.params.months;
  data.parameters.rotationDays = config.params.rotationDays;
  data.periods = Array.from({ length: config.params.months + 1 }, (_, i) => new Date(Date.UTC(2026, 9 - config.params.months + i, 1)).toISOString().slice(0, 7));
  data.parameters.dateFrom = `${data.periods[0]}-01`;
  data.families = Array.from({ length: 120 }, (_, i) => {
    const f = family(String(i + 1).padStart(4, '0'), ['Chapa galvanizada', 'Chapa prepintada', 'LAF'][i % 3]);
    f.classifier4 = i < 60 ? '01' : '02';
    f.classifier4Name = i < 60 ? 'Chapas revestidas' : 'Laminados';
    f.consumption = data.periods.map(period => ({ period, productionTon: i % 5 === 0 ? 0 : 1.125, salesRemittancesTon: 0, totalConsumptionTon: i % 5 === 0 ? 0 : 1.125 }));
    if (i === 1) { f.data.status = 'INVALID_FACTOR'; f.data.factorHomogeneousStock = null; f.data.kgPerMeterOrHl = null; f.warnings = [{ code: 'INVALID_FACTOR', block: 'stock', articleCode: '00002' }]; f.stock.ton.total = null; }
    if (i === 0) { f.stock.ton.days = null; f.stock.ton.daysStatus = 'NO_CONSUMPTION'; }
    return f;
  });
  return { data, status: 200, config, headers: {} };
};
const router = createRouter({ history: createWebHistory(), routes: [
  { path: '/gdc/revestidos-laf', name: 'revestidos-laf', component: RevestidosLaf },
  { path: '/gdc/revestidos-laf/configuracion', name: 'revestidos-laf-configuracion', component: Configuracion },
] });
createApp({ render: () => h('div', [h('p', { style: 'margin:0;padding:6px;background:#fff2cc', 'data-testid': 'preview-calls' }, `VISTA DE PRUEBA · datos simulados · ${calls.value.length} solicitudes · ${calls.value.at(-1) ?? ''}`), h(RouterView)]) })
  .use(router).use(PrimeVue, { theme: { preset: Lara, options: { darkModeSelector: 'none' } } }).mount('#app');
