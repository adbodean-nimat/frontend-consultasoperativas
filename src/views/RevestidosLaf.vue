<template>
  <main class="container-fluid laf-page">
    <div class="laf-sticky">
      <div class="encabezado-titulo">
        <h1><i class="pi pi-table me-2" aria-hidden="true"></i>Chapas Revestidas y LAF</h1>
      </div>
      <Panel class="mb-2" toggleable style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
        <template #header>
          <div class="flex items-center gap-2">
            <i class="pi pi-filter me-2"></i>
            <span class="font-bold">Filtros de búsqueda</span>
          </div>
        </template>
        <template #toggleicon="{ collapsed }">
          <i class="pi pi-angle-down" v-if="collapsed"></i>
          <i class="pi pi-angle-up" v-else></i>
        </template>
        <template #icons>
          <router-link class="config-link" :to="{ name: 'revestidos-laf-configuracion' }"
            title="Configuración de Chapas Revestidas y LAF">
            <i class="pi pi-sliders-h me-1" aria-hidden="true"></i>
          </router-link>
        </template>
        <RevestidosLafFiltros v-model="filters" :cargando="cargando" @consultar="consultar" />
      </Panel>
    </div>
    <Message v-if="error || validationError" severity="error" :closable="false" class="my-2" role="alert">
      {{ error || validationError }}
      <Button v-if="error" label="Reintentar" icon="pi pi-refresh" class="ms-3" :disabled="cargando"
        @click="consultar" />
    </Message>
    <Toolbar v-if="resultado" class="my-2 bg-transparent border-0 text-white">
      <template #start>
        <div class="d-flex flex-row align-items-center gap-2">
          <span>
            Fecha de emisión: <Badge severity="secondary" size="large"> {{ fechaActualizacion }} </Badge>
          </span>
        </div>
      </template>
      <template #center>
        <div class="d-flex flex-row align-items-center gap-2">
          <Badge severity="secondary" size="large"> {{ periodo }} </Badge>
        </div>
      </template>
      <template #end>
        <div class="d-flex flex-row align-item-center gap-2">
          <Badge severity="secondary" size="large">{{ resultado.rows.length }} familias</Badge>
        </div>
      </template>
    </Toolbar>
    <section ref="fullscreenTarget" class="laf-results">
      <Toolbar class="laf-toolbar">
        <template #start>
          <div class="result-info" aria-live="polite">
            <span v-if="resultado"></span>
            <span v-else>{{ cargando ? 'Consultando consumos, pedidos y stock…' : 'Sin resultados disponibles' }}</span>
            <!-- <small v-if="ultimaActualizacion">Última consulta exitosa:</small> -->
          </div>
        </template>
        <template #end>
          <Button type="button" label="Exportar CSV" icon="pi pi-download" outlined
            :disabled="!resultado?.rows.length || cargando" @click="grid?.exportar()" size="small" />
          <Button type="button" v-fullscreen="FullScreenGrid" class="ms-2 mr-2" :disabled="!resultado || cargando"
            :aria-label="fullscreengrid ? 'Salir de pantalla completa' : 'Pantalla completa'"
            :title="fullscreengrid ? 'Salir de pantalla completa (Escape)' : 'Pantalla completa'"
            :aria-pressed="fullscreengrid">
            <span v-show="fullscreengrid" class="pi pi-arrow-down-left-and-arrow-up-right-to-center"></span>
            <span v-show="!fullscreengrid" class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></span>
          </Button>
        </template>
      </Toolbar>
      <div v-if="cargando" class="loading-state" role="status">
        <ProgressSpinner style="width: 42px; height: 42px" /><span>Cargando consulta consolidada…</span>
      </div>
      <template v-if="resultado">
        <Message v-if="resultado.warnings.length" severity="warn" :closable="false">{{ globalWarnings }}</Message>
        <RevestidosLafGrilla ref="grid" :resultado="resultado" />
        <p class="laf-help">Valores numéricos: 2 decimales · —: dato inexistente o no calculable.
          Los totales con datos no calculables también muestran —. ⚠: ver detalle al pasar el cursor por Estado técnico.
          % del total general: participación del subtotal en el consumo total de cada mes; — si el total es cero.
          Se conserva el orden de Compras.</p>
      </template>
    </section>
  </main>
</template>
<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { directive as vFullscreen, api as fullscreenApi } from 'vue-fullscreen';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Toolbar from 'primevue/toolbar';
import Message from 'primevue/message';
import Badge from 'primevue/badge';
import ProgressSpinner from 'primevue/progressspinner';
import RevestidosLafFiltros from '@/components/revestidos-laf/RevestidosLafFiltros.vue';
import RevestidosLafGrilla from '@/components/revestidos-laf/RevestidosLafGrilla.vue';
import { useRevestidosLaf } from '@/composables/useRevestidosLaf';
import { filtrosDesdeQuery, parametrosConsulta, etiquetaPeriodo, ESTADOS } from '@/utils/revestidosLaf';
const route = useRoute();
const router = useRouter();
const filters = ref(filtrosDesdeQuery(route.query));
const validationError = ref('');
const grid = ref(null);
const fullscreenTarget = ref(null);
const fullscreengrid = ref(false);
const FullScreenGrid = computed(() => ({
  target: fullscreenTarget.value,
  callback: isFullscreen => { fullscreengrid.value = isFullscreen; },
  pageOnly: true,
  teleport: true,
}));
onBeforeUnmount(() => {
  if (fullscreenApi.element === fullscreenTarget.value) fullscreenApi.exit();
});
const { resultado, cargando, error, ultimaActualizacion, cargar } = useRevestidosLaf();
const periodo = computed(() => resultado.value?.periods.length
  ? `${etiquetaPeriodo(resultado.value.periods[0])} a ${etiquetaPeriodo(resultado.value.periods.at(-1))} · ${resultado.value.parameters.rotationDays} días de rotación`
  : 'Sin períodos');
const fechaActualizacion = computed(() => new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'America/Argentina/Buenos_Aires' }).format(ultimaActualizacion.value));
const globalWarnings = computed(() => resultado.value?.warnings.map(w => ESTADOS[w.code] ?? w.code).join('; '));
async function consultar() {
  if (cargando.value) return;
  try {
    const params = parametrosConsulta(filters.value);
    validationError.value = '';
    const changed = Number(route.query.months) !== params.months || Number(route.query.rotationDays) !== params.rotationDays;
    if (changed) await router.replace({ query: { ...route.query, ...params } });
    else await cargar(params);
  } catch (err) { validationError.value = err.message; }
}
watch(() => [route.query.months, route.query.rotationDays], () => {
  filters.value = filtrosDesdeQuery(route.query);
  validationError.value = '';
  cargar(filters.value);
}, { immediate: true });
</script>
<style scoped>
.laf-page {
  background: #2c3e50;
  padding-bottom: 1rem;
  min-height: calc(100vh - 100px);
}

.laf-sticky {
  position: sticky;
  top: 0;
  z-index: 5;
  background: #2c3e50;
  padding-top: 1px;
}

h1 {
  color: white;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

.config-link {
  color: currentColor;
  font-size: .85rem;
}

.laf-panel {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.laf-toolbar {
  margin-top: .5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  gap: .5rem;
}

.laf-results.fullscreen {
  display: flex;
  flex-direction: column;
  background: #2c3e50;
  padding: .5rem;
  z-index: 9999;
  min-height: 0;
}

.laf-results.fullscreen .laf-toolbar {
  flex-shrink: 0;
  margin-top: 0;
}

.laf-results.fullscreen :deep(.laf-grid) {
  flex: 1;
  height: 0;
  min-height: 0;
}

.laf-results.fullscreen .laf-help {
  flex-shrink: 0;
}

.result-info {
  display: grid;
  gap: .2rem;
}

.result-info small {
  color: #526173;
}

.loading-state {
  min-height: 380px;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 1rem;
  background: white;
}

.laf-help {
  color: #f0f3f5;
  font-size: .8rem;
  margin: .5rem 0 0;
}

@media (max-width: 700px) {
  .encabezado-titulo {
    flex-wrap: wrap;
    gap: .5rem;
  }
}
</style>
