<template>
  <div class="rotation-page">
    <div class="container-fluid page-grid min-vh-100 d-flex flex-column" aria-labelledby="rotation-title">
      <div class="encabezado-titulo">
        <div class="icon-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-repeat"
            viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36A.25.25 0 0 1 11.534 7m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
            <path fill-rule="evenodd"
              d="M8 3a5 5 0 0 0-3.546 1.474.5.5 0 1 1-.708-.708A6 6 0 0 1 13.466 7H12.45A5 5 0 0 0 8 3m-3.466 6H3.55A5 5 0 0 0 11.546 11.526a.5.5 0 0 1 .708.708A6 6 0 0 1 2.534 9" />
          </svg>
          <span id="rotation-title">Rotación general de productos</span>
        </div>
      </div>

      <Dialog v-model:visible="configuracionVisible" modal
        header="Editar los parámetros de rotación general de productos" class="rotation-config-dialog"
        :style="{ width: 'min(96vw, 1180px)' }" :contentStyle="{ maxHeight: '78vh', overflow: 'auto' }">
        <RotacionGeneralProductosConfiguracion v-if="configuracionVisible" />
      </Dialog>

      <Panel class="mb-2 filters-panel" toggleable>
        <template #header>
          <div class="d-flex align-items-center gap-2">
            <i class="pi pi-filter me-2"></i>
            <span class="fw-bold">Filtros de búsqueda</span>
          </div>
        </template>
        <template #toggleicon="{ collapsed }">
          <i class="pi pi-angle-down" v-if="collapsed"></i>
          <i class="pi pi-angle-up" v-else></i>
        </template>
        <template #icons>
          <Button icon="pi pi-sliders-h" severity="secondary" rounded text
            aria-label="Configurar rotación general de productos" v-tooltip.left="'Editar parámetros'"
            @click.stop="configuracionVisible = true" />
        </template>

        <div class="filters-content">
          <RotacionProductosFiltros :modelValue="filtros" :opciones="opciones"
            :compradoresCargando="cargandoCompradores" :clasificacionesCargando="cargandoClasificaciones"
            @update:modelValue="actualizarFiltros" />
          <Message v-if="errorCompradores" severity="warn" :closable="false" class="buyers-warning">
            <div class="d-flex align-items-center justify-content-between gap-3">
              <span>{{ errorCompradores }}</span>
              <Button label="Reintentar" icon="pi pi-refresh" size="small" severity="secondary"
                @click="cargarCompradores" />
            </div>
          </Message>
          <Message v-if="errorClasificaciones" severity="warn" :closable="false" class="buyers-warning">
            <div class="d-flex align-items-center justify-content-between gap-3">
              <span>{{ errorClasificaciones }}</span>
              <Button label="Reintentar" icon="pi pi-refresh" size="small" severity="secondary"
                @click="cargarClasificaciones" />
            </div>
          </Message>
          <div class="actions">
            <Button label="Consultar" icon="pi pi-play" :loading="cargando" :disabled="cargando" @click="consultar()" />
            <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarFiltros" />
          </div>
        </div>
      </Panel>

      <Message v-if="error" severity="error" :closable="false" role="alert" class="error-message">
        <div class="error-content">
          <span>{{ error }}</span>
          <Button label="Reintentar" icon="pi pi-refresh" size="small" @click="consultar({ forzar: true })" />
        </div>
      </Message>

      <Toolbar v-if="respuestaOriginal" class="my-2 bg-transparent border-0 text-white">
        <template #start>
          <div class="d-flex flex-row align-items-center gap-2">
            <span>Fecha de emisión:
              <Badge severity="secondary" size="large">{{ formatDateTime(ultimaActualizacion) }}</Badge>
            </span>
          </div>
        </template>
        <template #end>
          <div class="d-flex flex-row align-items-center gap-2">
            <span>Total de artículos de esta vista:
              <Badge severity="secondary" size="large">{{ productosFiltrados.length }}</Badge>
            </span>
          </div>
        </template>
      </Toolbar>

      <Toolbar v-if="respuestaOriginal" class="results-toolbar">
        <template #start>
          <label for="rotacion-busqueda-tabla" class="visually-hidden">Buscar por código o nombre</label>
          <InputText id="rotacion-busqueda-tabla" v-model="filtros.busqueda" placeholder="Buscar por código o nombre"
            class="table-search" />
        </template>
        <template #end>
          <Button label="Copiar la grilla" icon="pi pi-table" severity="success" outlined size="small"
            :disabled="!productosFiltrados.length || cargando" @click="copiarGrilla"
            v-tooltip.bottom="'Copia todas las filas filtradas para pegar en Excel'" />
          <Button label="Exportar CSV" icon="pi pi-download" severity="secondary" outlined size="small" class="ms-2"
            :disabled="!productosFiltrados.length || cargando" @click="exportarProductosCsv(productosFiltrados)" />
          <Button v-fullscreen="fullScreenGrid" type="button" class="ms-2" size="small"
            aria-label="Alternar pantalla completa" v-tooltip.bottom="'Alternar pantalla completa'">
            <span v-show="fullscreengrid" class="pi pi-arrow-down-left-and-arrow-up-right-to-center"></span>
            <span v-show="!fullscreengrid" class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></span>
          </Button>
        </template>
      </Toolbar>

      <div v-if="cargando && !productos.length" class="card my-0 loading-state" role="status" aria-live="polite">
        <ProgressSpinner strokeWidth="4" />
        <p>Cargando productos…</p>
      </div>
      <div v-else-if="respuestaOriginal" class="card my-0 table-panel rotation-grid-wrapper"
        aria-label="Resultados de rotación general de productos">
        <RotacionProductosTabla :productos="productosFiltrados" :loading="cargando" />
      </div>
      <Toast />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Dialog from "primevue/dialog";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import ProgressSpinner from "primevue/progressspinner";
import Toolbar from "primevue/toolbar";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { directive as vFullscreen } from "vue-fullscreen";
import RotacionProductosFiltros from "@/components/rotacion-productos/RotacionProductosFiltros.vue";
import RotacionProductosTabla from "@/components/rotacion-productos/RotacionProductosTabla.vue";
import RotacionGeneralProductosConfiguracion from "@/views/RotacionGeneralProductosConfiguracion.vue";
import { useRotacionGeneralProductos } from "@/composables/useRotacionGeneralProductos";
import { crearFiltrosRotacionIniciales } from "@/services/rotacionGeneralProductosFiltros";
import {
  copiarProductosAlPortapapeles,
  exportarProductosCsv,
  formatDateTime,
} from "@/utils/rotacionProductos";

const filtros = reactive(crearFiltrosRotacionIniciales());
const toast = useToast();
const fullscreengrid = ref(false);
const configuracionVisible = ref(false);
const busquedaDebounced = ref("");
let debounceTimer;
watch(() => filtros.busqueda, (value) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    busquedaDebounced.value = normalizarTexto(value);
  }, 250);
});
onBeforeUnmount(() => clearTimeout(debounceTimer));

const {
  respuestaOriginal,
  productos,
  compradores,
  clasificaciones,
  cargando,
  error,
  errorCompradores,
  cargandoCompradores,
  errorClasificaciones,
  cargandoClasificaciones,
  ultimaActualizacion,
  cargar,
  cargarCompradores,
  cargarClasificaciones,
} = useRotacionGeneralProductos();

const normalizarTexto = (value) => String(value ?? "").trim().toLocaleLowerCase("es");

const opciones = computed(() => ({
  compradores: compradores.value,
  clasificacion4: clasificaciones.value.clasificacion4,
  clasificacion5: clasificaciones.value.clasificacion5,
  clasificacion6: clasificaciones.value.clasificacion6,
  clasificacion8: clasificaciones.value.clasificacion8,
}));

const productosFiltrados = computed(() => {
  const search = busquedaDebounced.value;
  return productos.value.filter((producto) => {
    if (search && !normalizarTexto(producto.codigoArticulo).includes(search)
      && !normalizarTexto(producto.nombreArticulo).includes(search)) return false;
    return true;
  });
});

function limpiarFiltros() {
  Object.assign(filtros, crearFiltrosRotacionIniciales());
  busquedaDebounced.value = "";
}

function actualizarFiltros(value) {
  Object.assign(filtros, value);
}

function consultar({ forzar = false } = {}) {
  cargar({ filtros, forzar });
}

async function copiarGrilla() {
  try {
    const cantidad = await copiarProductosAlPortapapeles(productosFiltrados.value);
    toast.add({
      severity: "success",
      summary: "Copiado con éxito",
      detail: `${cantidad} filas copiadas. Listo para pegar en Excel.`,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error?.message || "No se pudo copiar la grilla.",
      life: 3000,
    });
  }
}

const fullScreenGrid = computed(() => ({
  callback: (isFullscreen) => {
    fullscreengrid.value = isFullscreen;
  },
  target: ".rotation-grid-wrapper",
  pageOnly: true,
  teleport: true,
}));

onMounted(() => {
  cargarCompradores();
  cargarClasificaciones();
});

</script>

<style scoped>
.rotation-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: currentColor;
}

.icon-title {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 5px;
  color: white;
}

.filters-panel {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.filters-content {
  padding: 16px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.buyers-warning {
  margin-top: 12px;
}

.results-toolbar {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.table-search {
  width: min(28rem, 70vw);
}

.table-panel {
  min-width: 0;
  overflow: hidden;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.loading-state {
  min-height: 380px;
  display: grid;
  place-content: center;
  justify-items: center;
  color: #475467;
}

.loading-state :deep(.p-progressspinner) {
  width: 44px;
  height: 44px;
}

.error-message {
  margin-bottom: 1rem;
}

.error-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 700px) {
  .actions {
    flex-direction: column;
  }

  .error-content {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
