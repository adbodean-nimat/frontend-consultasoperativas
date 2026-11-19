const { before, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const read = file => fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');
const asUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const utilsUrl = asUrl(read('src/utils/chatbotHistory.js'));
let utils, createService;
const message = (id, seq) => ({ id, seq, role: 'assistant', text: '<script>alert(1)</script>', createdAt: null, products: [{ sku: 'SKU-123', title: 'Cemento', price: null, url: 'https://nimat.com.ar/producto' }] });
const detail = (id = 'chat-1') => ({ id, createdAt: null, updatedAt: null, messageCount: 102, messages: [message('m101', 101), message('m102', 102)], products: [{ sku: 'SKU-123', title: 'Cemento', url: 'https://nimat.com.ar/producto', appearances: 5 }], hasMore: true, nextBefore: 101 });
const listing = () => ({ items: [{ id: 'chat-1', preview: 'Cemento', updatedAt: '2026-11-17T15:00:00Z', createdAt: null, messageCount: 102, productCount: 1 }], total: 26, page: 1, limit: 25, hasMore: true });
before(async () => {
  utils = await import(utilsUrl);
  const source = read('src/services/chatbotHistory.js').replace("import api from './api';", 'const api = {};').replace("'@/utils/chatbotHistory'", JSON.stringify(utilsUrl));
  createService = (await import(asUrl(source))).createChatbotHistoryService;
});

test('valida límites, búsqueda, IDs y cursores sin admitir destinos arbitrarios', () => {
  assert.deepEqual(utils.listParams(), { page: 1, limit: 25, q: '' });
  assert.equal(utils.listParams({ limit: 100, q: ' SKU-123 ' }).q, 'SKU-123');
  for (const value of [0, -1, 101, 1.5, [], [1], {}, true, null, '1e1']) assert.throws(() => utils.listParams({ limit: value }));
  assert.throws(() => utils.listParams({ q: 'x'.repeat(501) }));
  assert.throws(() => utils.listParams({ q: ['SKU'] }));
  for (const id of ['../chats', 'https://evil.test', 'a/b', 'a?url=evil', '', null]) assert.throws(() => utils.chatId(id));
  assert.deepEqual(utils.detailParams(0), { limit: 100, before: '0' });
  for (const cursor of ['', {}, [], 'a\n', 'x'.repeat(1001)]) assert.throws(() => utils.detailParams(cursor));
});

test('solo permite enlaces HTTPS del dominio exacto NIMAT', () => {
  for (const url of ['https://nimat.com.ar/p', 'https://www.nimat.com.ar/p?q=123']) assert.ok(utils.nimatLink(url));
  for (const url of ['http://nimat.com.ar', 'javascript:alert(1)', '//nimat.com.ar', 'https://nimat.com.ar.evil.test', 'https://evilnimat.com.ar', 'https://nimat.com.ar@evil.test', 'https://user:pass@nimat.com.ar', 'https://nimat.com.ar:444', 'data:text/html,hi', null]) assert.equal(utils.nimatLink(url), null);
});

test('fecha Argentina, nulos y precio ausente distinto de cero', () => {
  assert.equal(utils.argentinaDate(null), 'Fecha no disponible');
  assert.match(utils.argentinaDate('2026-11-17T01:30:00Z'), /16\/11\/26.*22:30/);
  for (const value of [null, undefined, '', '  ', false, {}, 'abc']) assert.equal(utils.historicalPrice(value), 'Precio no informado');
  assert.match(utils.historicalPrice(0), /0,00/);
  assert.match(utils.historicalPrice(1234.5), /1\.234,50/);
});

test('listado por actividad, detalle y paginación cronológica sin duplicados', () => {
  assert.deepEqual(utils.sortChats([{ id: 'a', updatedAt: null }, { id: 'b', updatedAt: '2026-11-17' }]).map(x => x.id), ['b', 'a']);
  assert.deepEqual(utils.mergeMessages([message('m1', 1), message('m101', 101)], detail().messages).map(x => x.id), ['m1', 'm101', 'm102']);
  assert.throws(() => utils.validateList({ items: [] }));
  assert.throws(() => utils.validateDetail({ ...detail(), nextBefore: null }, 'chat-1'));
  assert.throws(() => utils.validateDetail(detail(), 'another-chat'));
});

test('cliente solicita solo rutas internas, búsqueda SKU y cursor con timeout y sin cookies', async () => {
  const calls = [];
  const service = createService({ get: async (url, options) => { calls.push({ url, options }); return { data: url === '/api/chatbot/chats' ? listing() : detail() }; } });
  const controller = new AbortController();
  await service.list({ page: 2, q: 'SKU-123' }, controller.signal);
  await service.detail('chat-1', undefined, controller.signal);
  await service.detail('chat-1', '100&url=https://evil.test', controller.signal);
  assert.deepEqual(calls.map(x => x.url), ['/api/chatbot/chats', '/api/chatbot/chats/chat-1', '/api/chatbot/chats/chat-1']);
  assert.deepEqual(calls[0].options.params, { page: 2, limit: 25, q: 'SKU-123' });
  assert.deepEqual(calls[1].options.params, { limit: 100 });
  assert.equal(calls[2].options.params.before, '100&url=https://evil.test');
  for (const { options } of calls) {
    assert.equal(options.timeout, 15000);
    assert.equal(options.withCredentials, false);
    assert.match(options.headers['Cache-Control'], /no-store/);
    assert.equal(options.signal, controller.signal);
    assert.equal(options.headers.Authorization, undefined);
  }
  await assert.rejects(service.detail('../evil'));
  assert.equal(calls.length, 3);
  const failure = createService({ get: async () => { throw new Error('private upstream details'); } });
  await assert.rejects(failure.list());
  assert.doesNotMatch(utils.historyError(new Error('private upstream details')), /private/);
  assert.match(utils.historyError({ response: { status: 403 } }), /permiso/);
});

test('router: sin sesión, sesión vencida, sectores permitidos y rechazo sin bucle', () => {
  let token = null, expired = false, roles = [];
  const source = read('src/router/index.js').replace(/^import .*;\r?\n/gm, '').replace('export default router;', 'globalThis.result = router;');
  const componentNames = [...read('src/router/index.js').matchAll(/^import (\w+) from "@\/views\//gm)].map(m => m[1]);
  const context = {
    ...Object.fromEntries(componentNames.map(name => [name, {}])),
    CHATBOT_ROLES: ['Gerencia', 'Ventas', 'Sistemas'],
    createWebHistory: () => ({}),
    createRouter: config => ({ config, beforeEach(fn) { this.guard = fn; } }),
    getToken: () => token, clearToken() { token = null; }, isTokenExpired: () => expired,
    decodeJwt: () => ({ user: { memberOf: roles.map(role => `CN=${role},OU=Usuarios,DC=local`) } }),
    document: { querySelectorAll: () => [], head: { appendChild() {} } },
    StockRotOCPreciosArtPyRTerminacion: {},
  };
  vm.runInNewContext(source, context);
  const router = context.result;
  const route = router.config.routes.find(r => r.path === '/co').children.find(r => r.name === 'chatbot-conversaciones');
  const to = { ...route, fullPath: '/co/chatbot/conversaciones', matched: [] }, from = { matched: [] };
  assert.equal(router.guard(to, from).name, 'Login');
  token = 'internal-site-token'; expired = true;
  assert.equal(router.guard(to, from).name, 'SessionExpired');
  token = 'internal-site-token'; expired = false;
  for (const role of utils.CHATBOT_ROLES) { roles = [role]; assert.equal(router.guard(to, from), true); }
  roles = ['Compras'];
  assert.equal(router.guard(to, from).name, 'tablero');
});

test('vista: debounce, paginación, selección, productos, errores, reintento y respuestas obsoletas', async () => {
  const { createRenderer, nextTick } = require('vue');
  const { parse, compileScript, compileTemplate } = require('@vue/compiler-sfc');
  const vueUrl = pathToFileURL(require.resolve('vue')).href;
  const serviceUrl = asUrl(`export const calls = []; export let handler; export const setHandler = fn => handler = fn;
    export const chatbotHistory = { list: (...args) => { calls.push(['list', ...args]); return handler('list', ...args); },
      detail: (...args) => { calls.push(['detail', ...args]); return handler('detail', ...args); } };`);
  const service = await import(serviceUrl);
  let fail = false;
  service.setHandler(async (kind, id, before) => {
    if (fail) throw new Error('secret internal connection error');
    if (kind === 'list') return listing();
    if (before !== undefined) return { ...detail(id), messages: [message('m1', 1), message('m101', 101)], hasMore: false, nextBefore: null };
    return detail(id);
  });
  const { descriptor } = parse(read('src/views/ChatbotConversaciones.vue'));
  assert.equal(compileTemplate({ source: descriptor.template.content, filename: 'ChatbotConversaciones.vue', id: 'chatbot' }).errors.length, 0);
  assert.doesNotMatch(descriptor.template.content, /v-html/);
  const source = compileScript(descriptor, { id: 'chatbot-test' }).content.replace("'vue'", JSON.stringify(vueUrl)).replace("'@/services/chatbotHistory'", JSON.stringify(serviceUrl)).replace("'@/utils/chatbotHistory'", JSON.stringify(utilsUrl));
  const View = (await import(asUrl(source))).default;
  const renderer = createRenderer({ createComment: text => ({ text }), insert() {}, remove() {}, parentNode() {}, nextSibling() {} });
  const app = renderer.createApp({ ...View, render: () => null }); app.mount({});
  const flush = async () => { await new Promise(resolve => setImmediate(resolve)); await nextTick(); };
  const state = app._instance.setupState;
  try {
    await flush();
    assert.equal(state.items.length, 1);
    state.search = 'SKU-123'; await nextTick();
    state.search = 'SKU-1234'; await nextTick();
    const count = service.calls.length;
    await new Promise(resolve => setTimeout(resolve, 400)); await flush();
    assert.equal(service.calls.length, count + 1);
    assert.equal(service.calls.at(-1)[1].q, 'SKU-1234');
    await state.selectChat('chat-1');
    assert.equal(state.detail.messages[0].products[0].sku, 'SKU-123');
    assert.equal(state.summaryProducts[0].appearances, 5);
    fail = true; await state.loadOlder();
    assert.ok(state.olderError); assert.equal(state.detail.messages.length, 2);
    fail = false; await state.loadOlder();
    assert.deepEqual(state.detail.messages.map(m => m.id), ['m1', 'm101', 'm102']);
    assert.equal(state.detail.hasMore, false);
    assert.equal(state.summaryProducts[0].appearances, 5);
    state.changePage(1); await flush();
    assert.equal(service.calls.at(-1)[1].page, 2);
    assert.equal(state.selectedId, null);
    fail = true; await state.loadList();
    assert.ok(state.listError); assert.doesNotMatch(state.listError, /secret/);
    fail = false; await state.loadList(); assert.equal(state.listError, '');
    fail = true; await state.selectChat('chat-1'); assert.ok(state.detailError);
    fail = false; await state.selectChat('chat-1'); assert.equal(state.detailError, '');
    let resolveOld;
    service.setHandler((kind, id) => id === 'old' ? new Promise(resolve => { resolveOld = resolve; }) : Promise.resolve(detail(id)));
    const pending = state.selectChat('old');
    await state.selectChat('new');
    resolveOld(detail('old')); await pending;
    assert.equal(state.detail.id, 'new');
    assert.equal(state.detailLoading, false);
  } finally { app.unmount(); }
});

test('código de navegador sin referencias a credenciales privadas ni endpoints upstream', () => {
  for (const file of ['src/services/chatbotHistory.js', 'src/utils/chatbotHistory.js', 'src/views/ChatbotConversaciones.vue', 'src/components/ChatbotHistoryCard.vue']) {
    assert.doesNotMatch(read(file), /NIMAT_CHATBOT_(?:URL|HISTORY_KEY)|\/api\/h\/chats|v-html/);
  }
});
