<template>
  <div class="page-chatbot-conversaciones container-fluid">
    <div class="encabezado-titulo">
      <div style="margin-left: 5px; color: white;" class="icon-title">

        <span style="margin-left: 5px; color: white;" class="k-icon k-i-comment"></span>
        <span style="color: white; margin-left: 5px;">{{ title }}</span>
      </div>
    </div>
    <main class="chatbot-history container-full p-3" aria-label="Conversaciones del chatbot">

      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 class="h3 mt-2"></h1>
          <!-- <p class="text-secondary mb-0">Consulta interna · Solo lectura · Horario de Argentina</p> -->
        </div>
        <button class="btn btn-success" :disabled="loading || detailLoading || loadingOlder"
          @click="refresh">Actualizar</button>
      </div>
      <p class="alert alert-info">Los precios y la disponibilidad reflejan lo mostrado durante el chat y pueden haber
        cambiado.</p>
      <div class="history-layout">
        <section class="history-panel" aria-label="Lista de conversaciones" :aria-busy="loading">
          <label for="chatbot-search" class="form-label fw-bold">Buscar por mensaje, producto o SKU</label>
          <input id="chatbot-search" v-model="search" type="search" maxlength="500" class="form-control mb-3"
            placeholder="Ingresá un texto o SKU" />
          <p v-if="listError" class="alert alert-danger" role="alert">{{ listError }} <button
              class="btn btn-sm btn-outline-danger" @click="loadList">Reintentar</button></p>
          <p v-if="loading" role="status">Cargando conversaciones…</p>
          <p v-else-if="!listError && !items.length" role="status">No se encontraron conversaciones.</p>
          <div v-if="!loading && !listError" class="chat-list">
            <button v-for="chat in items" :key="chat.id" class="chat-item" :class="{ selected: selectedId === chat.id }"
              :aria-pressed="selectedId === chat.id" @click="selectChat(chat.id)">
              <span class="d-block fw-bold">{{ chat.preview || 'Sin vista previa' }}</span>
              <span class="d-block small text-secondary">Última actividad: {{ argentinaDate(chat.updatedAt) }}</span>
              <span class="d-block small">Creada: {{ argentinaDate(chat.createdAt) }}</span>
              <span class="d-block small">{{ chat.messageCount }} mensajes · {{ chat.productCount }} productos</span>
            </button>
          </div>
          <nav class="d-flex justify-content-between align-items-center gap-2 mt-3"
            aria-label="Páginas de conversaciones">
            <button class="btn btn-outline-success btn-sm" :disabled="loading || page === 1"
              @click="changePage(-1)">Anterior</button>
            <span class="small text-white" aria-live="polite">Página {{ page }} · {{ total }} conversaciones</span>
            <button class="btn btn-outline-success btn-sm" :disabled="loading || !!listError || !hasMore"
              @click="changePage(1)">Siguiente</button>
          </nav>
        </section>
        <section class="history-panel detail-panel" aria-label="Detalle de conversación" :aria-busy="detailLoading">
          <p v-if="!selectedId">Seleccioná una conversación para ver sus mensajes y productos.</p>
          <p v-if="detailLoading" role="status">Cargando conversación…</p>
          <p v-if="detailError" class="alert alert-danger" role="alert">{{ detailError }} <button
              class="btn btn-sm btn-outline-danger" @click="selectChat(selectedId)">Reintentar</button></p>
          <template v-if="detail && !detailLoading && !detailError">
            <h2 class="h5">Conversación {{ detail.id }}</h2>
            <p class="small text-secondary">Creada: {{ argentinaDate(detail.createdAt) }} · Última actividad: {{
              argentinaDate(detail.updatedAt) }} · {{ detail.messageCount }} mensajes</p>
            <button v-if="detail.hasMore" class="btn btn-outline-success mb-3" :disabled="loadingOlder"
              @click="loadOlder">{{ loadingOlder ? 'Cargando…' : 'Cargar mensajes anteriores' }}</button>
            <p v-if="olderError" class="alert alert-danger" role="alert">{{ olderError }}</p>
            <p v-if="!detail.messages.length">Esta conversación no tiene mensajes.</p>
            <div ref="messagesElement" class="messages">
              <article v-for="message in detail.messages" :key="message.id" class="message"
                :class="{ visitor: message.role === 'user' || message.role === 'visitor' }">
                <div class="d-flex flex-wrap justify-content-between gap-2 mb-2">
                  <strong>{{ roleLabel(message.role) }}</strong>
                  <span class="small text-secondary">{{ argentinaDate(message.createdAt) }}</span>
                </div>
                <p class="message-text">{{ message.text }}</p>
                <ul v-if="message.products.length" class="products list-unstyled mb-0">
                  <li v-for="(product, index) in message.products" :key="`${product.sku}-${index}`" class="product">
                    <strong class="d-block">{{ product.title }}</strong>
                    <span class="d-block">SKU: {{ product.sku }}</span>
                    <span class="d-block">{{ historicalPrice(product.price) }}<span
                        v-if="product.price !== null && product.price !== undefined && product.price !== ''">
                        (histórico)</span></span>
                    <span class="d-block">{{ product.available === true ? 'Disponible durante el chat' :
                      product.available
                        === false ? 'No disponible durante el chat' : 'Disponibilidad no informada' }}</span>
                    <span v-if="product.outlet === true" class="d-block">Outlet</span>
                    <span v-if="product.snapshotAt" class="d-block small text-secondary">Registro: {{
                      argentinaDate(product.snapshotAt) }}</span>
                    <a v-if="nimatLink(product.url)" :href="nimatLink(product.url)" target="_blank"
                      rel="noopener noreferrer" class="text-success">Ver en NIMAT ↗</a>
                    <span v-else class="text-secondary">Enlace no disponible</span>
                  </li>
                </ul>
              </article>
            </div>
            <section class="mt-4" aria-label="Resumen de productos">
              <h3 class="h5">Productos por SKU</h3>
              <p class="small text-secondary">Resumen de toda la conversación.</p>
              <p v-if="!detail.products.length">No se mostraron productos.</p>
              <ul v-else class="list-unstyled products">
                <li v-for="product in summaryProducts" :key="product.sku" class="product">
                  <strong>{{ product.title }}</strong><span class="d-block">SKU: {{ product.sku }} · {{
                    product.appearances }} apariciones</span>
                  <a v-if="nimatLink(product.url)" :href="nimatLink(product.url)" target="_blank"
                    rel="noopener noreferrer" class="text-success">Ver en NIMAT ↗</a>
                  <span v-else class="text-secondary">Enlace no disponible</span>
                </li>
              </ul>
            </section>
          </template>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { chatbotHistory } from '@/services/chatbotHistory';
import { argentinaDate, historicalPrice, nimatLink, mergeMessages, historyError } from '@/utils/chatbotHistory';

const title = 'Conversaciones del chatbot';
const search = ref(''), page = ref(1), items = ref([]), total = ref(0), hasMore = ref(false);
const selectedId = ref(null), detail = ref(null);
const loading = ref(false), detailLoading = ref(false), loadingOlder = ref(false);
const listError = ref(''), detailError = ref(''), olderError = ref('');
const messagesElement = ref(null);
let debounce, listController, detailController, olderController;
let listVersion = 0, detailVersion = 0;
const summaryProducts = computed(() => {
  const grouped = new Map();
  for (const product of detail.value?.products || []) {
    const existing = grouped.get(product.sku);
    if (existing) existing.appearances += Number(product.appearances) || 0;
    else grouped.set(product.sku, { ...product, appearances: Number(product.appearances) || 0 });
  }
  return [...grouped.values()];
});

function roleLabel(role) {
  if (role === 'assistant') return 'Asistente';
  if (role === 'user' || role === 'visitor') return 'Visitante';
  return 'Sistema';
}

async function loadList() {
  clearTimeout(debounce);
  listController?.abort();
  const version = ++listVersion;
  const controller = listController = new AbortController();
  loading.value = true;
  listError.value = '';
  try {
    const result = await chatbotHistory.list({ page: page.value, limit: 25, q: search.value }, controller.signal);
    if (version !== listVersion) return;
    items.value = result.items;
    total.value = result.total;
    hasMore.value = result.hasMore;
    page.value = result.page;
  } catch (error) {
    if (version === listVersion && !controller.signal.aborted) {
      items.value = []; total.value = 0; hasMore.value = false;
      listError.value = historyError(error);
    }
  } finally { if (version === listVersion) loading.value = false; }
}

function clearDetail() {
  ++detailVersion;
  detailController?.abort(); olderController?.abort();
  selectedId.value = null; detail.value = null;
  detailError.value = ''; olderError.value = '';
  detailLoading.value = false; loadingOlder.value = false;
}

async function selectChat(id) {
  clearDetail();
  selectedId.value = id;
  const version = detailVersion;
  const controller = detailController = new AbortController();
  detailLoading.value = true;
  try {
    const result = await chatbotHistory.detail(id, undefined, controller.signal);
    if (version === detailVersion) detail.value = result;
  } catch (error) {
    if (version === detailVersion && !controller.signal.aborted) detailError.value = historyError(error);
  } finally { if (version === detailVersion) detailLoading.value = false; }
}

async function loadOlder() {
  if (!detail.value?.hasMore || loadingOlder.value) return;
  const version = detailVersion, id = selectedId.value, cursor = detail.value.nextBefore;
  const controller = olderController = new AbortController();
  loadingOlder.value = true; olderError.value = '';
  try {
    const result = await chatbotHistory.detail(id, cursor, controller.signal);
    if (version !== detailVersion) return;
    if (result.hasMore && String(result.nextBefore) === String(cursor)) throw new Error('Cursor sin avance');
    const element = messagesElement.value;
    const previousHeight = element?.scrollHeight || 0;
    const previousTop = element?.scrollTop || 0;
    detail.value = { ...detail.value, messages: mergeMessages(result.messages, detail.value.messages), hasMore: result.hasMore, nextBefore: result.nextBefore };
    await nextTick();
    if (element && version === detailVersion) element.scrollTop = previousTop + element.scrollHeight - previousHeight;
  } catch (error) {
    if (version === detailVersion && !controller.signal.aborted) olderError.value = historyError(error);
  } finally { if (version === detailVersion) loadingOlder.value = false; }
}

function changePage(delta) { page.value += delta; clearDetail(); loadList(); }
function refresh() { loadList(); if (selectedId.value) selectChat(selectedId.value); }
watch(search, () => {
  clearTimeout(debounce);
  ++listVersion; listController?.abort();
  page.value = 1; items.value = []; total.value = 0; hasMore.value = false;
  listError.value = ''; loading.value = true; clearDetail();
  debounce = setTimeout(loadList, 350);
});
onMounted(loadList);
onBeforeUnmount(() => {
  clearTimeout(debounce); ++listVersion; ++detailVersion;
  listController?.abort(); detailController?.abort(); olderController?.abort();
});
</script>

<style scoped>
.page-chatbot-conversaciones {
  background: currentColor;
}

.chatbot-history {
  background: #f4f6f5;
  color: #212529;
  min-height: 100vh;
}

.history-layout {
  display: grid;
  grid-template-columns: minmax(270px, 1fr) minmax(0, 2fr);
  gap: 1.25rem;
  align-items: start;
}

.history-panel {
  background: white;
  border: 1px solid #dce3df;
  border-radius: .5rem;
  padding: 1rem;
  min-width: 0;
}

.chat-list {
  max-height: 65vh;
  overflow-y: auto;
}

.chat-item {
  width: 100%;
  text-align: left;
  padding: .85rem;
  border: 0;
  border-bottom: 1px solid #dce3df;
  background: white;
  overflow-wrap: anywhere;
}

.chat-item:hover,
.chat-item.selected {
  background: #e7f3ed;
}

.chat-item.selected {
  box-shadow: inset 4px 0 #007c3b;
}

.messages {
  max-height: 65vh;
  overflow-y: auto;
  overflow-anchor: none;
}

.message {
  margin: .75rem 1rem .75rem 0;
  background: #f1f4f2;
  border-left: 3px solid #007c3b;
  border-radius: .4rem;
  padding: 1rem;
  overflow-wrap: anywhere;
}

.message.visitor {
  margin: .75rem 0 .75rem 1rem;
  background: #eef3fa;
  border-left-color: #426da9;
}

.message-text {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
  gap: .75rem;
}

.product {
  padding: .75rem;
  border: 1px solid #dce3df;
  border-radius: .4rem;
  background: white;
  overflow-wrap: anywhere;
  font-size: .9rem;
}

button:focus-visible,
a:focus-visible {
  outline: 3px solid #007c3b;
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .history-layout {
    grid-template-columns: 1fr;
  }

  .chat-list {
    max-height: 40vh;
  }

  .history-panel {
    padding: .75rem;
  }
}
</style>
