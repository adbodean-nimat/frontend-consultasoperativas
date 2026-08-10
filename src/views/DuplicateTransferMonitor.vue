<template>
  <div class="monitor-page">
    <div class="container-fluid page-grid d-flex flex-column min-vh-100">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
          <i class="pi pi-clone text-white" style="font-size: 1rem"></i>
          <span class="ms-2 text-white">Monitor de avisos de transferencias</span>
        </div>
      </div>
      <Toast position="bottom-right" />
      <ConfirmDialog />
      <Dialog v-model:visible="configDialogVisible" modal header="Configuración del monitor"
        :style="{ width: '75rem', maxWidth: '95vw' }" :breakpoints="{ '960px': '90vw', '640px': '96vw' }">
        <form class="row g-3" @submit.prevent="saveConfig">
          <div class="col-md-3 form-check-row">
            <label for="enabled">Monitor activado</label>
            <ToggleSwitch inputId="enabled" v-model="form.enabled" />
          </div>
          <div class="col-md-3 form-check-row">
            <label for="dryRun">Modo simulación</label>
            <ToggleSwitch inputId="dryRun" v-model="form.dryRun" />
          </div>
          <div class="col-md-3 form-check-row">
            <label for="notifyNew">Notificar casos nuevos</label>
            <ToggleSwitch inputId="notifyNew" v-model="form.notifyNewOccurrences" />
          </div>
          <div class="col-md-3">
            <label class="field-label">Versión</label>
            <InputText :modelValue="String(form.version || '')" disabled fluid />
          </div>

          <div class="col-md-4">
            <label class="field-label" for="cron">Cron</label>
            <InputText id="cron" v-model="form.cronExpression" placeholder="0 */4 * * *" fluid />
          </div>
          <div class="col-md-4">
            <label class="field-label" for="timezone">Zona horaria</label>
            <InputText id="timezone" v-model="form.timezone" fluid />
          </div>
          <div class="col-md-4">
            <label class="field-label" for="lookback">Ventana (días)</label>
            <InputNumber inputId="lookback" v-model="form.lookbackDays" :min="1" :max="180" :useGrouping="false"
              fluid />
          </div>

          <div class="col-md-4">
            <label class="field-label" for="minimum">Coincidencias mínimas</label>
            <InputNumber inputId="minimum" v-model="form.minimumCoincidences" :min="2" :useGrouping="false" fluid />
          </div>
          <div class="col-md-4">
            <label class="field-label" for="timeout">Timeout SQL Server (segundos)</label>
            <InputNumber inputId="timeout" v-model="form.queryTimeoutSeconds" :min="1" :useGrouping="false" fluid />
          </div>
          <div class="col-md-4">
            <label class="field-label" for="maxResults">Máximo de resultados</label>
            <InputNumber inputId="maxResults" v-model="form.maxResults" :min="1" :useGrouping="false" fluid />
          </div>

          <div class="col-md-8">
            <label class="field-label" for="accounts">Cuentas permitidas</label>
            <Textarea id="accounts" v-model="accountCodesText" rows="3" autoResize fluid
              placeholder="Una cuenta por línea o separadas por coma" />
          </div>
          <div class="col-md-4">
            <label class="field-label" for="origin">Origen ERP</label>
            <InputText id="origin" v-model="form.erpOrigin" maxlength="20" fluid />
          </div>

          <div class="col-md-4">
            <label class="field-label" for="recipient">Destinatario WhatsApp (E.164)</label>
            <InputText id="recipient" v-model="form.whatsappRecipient" placeholder="+549..." fluid />
          </div>
          <div class="col-md-4">
            <label class="field-label" for="template">Plantilla Meta</label>
            <InputText id="template" v-model="form.whatsappTemplateName" fluid />
          </div>
          <div class="col-md-2">
            <label class="field-label" for="language">Idioma</label>
            <InputText id="language" v-model="form.whatsappTemplateLanguage" fluid />
          </div>
          <div class="col-md-2">
            <label class="field-label" for="provider">Proveedor</label>
            <InputText id="provider" v-model="form.whatsappProvider" fluid />
          </div>

          <div class="col-12 d-flex justify-content-end gap-2 pt-2">
            <Button type="button" label="Cancelar" severity="secondary" outlined @click="configDialogVisible = false" />
            <Button type="submit" label="Guardar configuración" icon="pi pi-save" :loading="saving" />
          </div>
        </form>
      </Dialog>
      <div class="card px-4 py-4" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h3 class="mb-1"></h3>
            <p class="text-muted mb-0">Seguimiento del control automático, las simulaciones y los avisos por WhatsApp.</p>
          </div>
          <div class="d-flex flex-wrap gap-2">
            <Button v-if="isSystems" label="Configuración" icon="pi pi-cog" severity="secondary" outlined
              @click="openConfig" />
            <Button label="Actualizar" icon="pi pi-refresh" severity="secondary" :loading="loading" @click="loadAll" />
          </div>
        </div>

        <div v-if="status" class="row g-3 mb-4">
          <div class="col-md-3">
            <div class="summary-card">
              <span>Monitor</span>
              <strong :class="status.enabled ? 'text-success' : 'text-secondary'">{{ status.enabled ? 'Activado' :
                'Desactivado' }}</strong>
            </div>
          </div>
          <div class="col-md-3">
            <div class="summary-card">
              <span>Modo</span>
              <strong :class="status.dryRun ? 'text-warning' : 'text-danger'">
                {{ status.dryRun ? 'Simulación' : 'Envío real' }}
              </strong>
            </div>
          </div>
          <div class="col-md-3">
            <div class="summary-card">
              <span>Próxima ejecución</span>
              <strong>{{ formatDateTime(status.nextRun) }}</strong>
            </div>
          </div>
          <div class="col-md-3">
            <div class="summary-card">
              <span>Último estado</span>
              <strong>{{ status.lastRun ? formatRunStatus(status.lastRun.status) : 'Sin ejecuciones' }}</strong>
            </div>
          </div>
        </div>

        <Message v-if="status?.lastError" severity="error" :closable="false" class="mb-4">
          {{ status.lastError.code }}: {{ status.lastError.message }}
        </Message>

        <Tabs value="history" class="monitor-tabs">
          <TabList>
            <Tab value="history">Historial</Tab>
            <Tab value="detections">Detecciones</Tab>
            <Tab value="manual">Previsualizar y ejecutar</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="manual">
              <div class="row g-3 align-items-end mb-4">
                <div class="col-md-2">
                  <label class="field-label">Desde</label>
                  <DatePicker v-model="manualFrom" showTime hourFormat="24" dateFormat="dd/mm/yy" fluid />
                </div>
                <div class="col-md-2">
                  <label class="field-label">Hasta</label>
                  <DatePicker v-model="manualTo" showTime hourFormat="24" dateFormat="dd/mm/yy" fluid />
                </div>
                <div class="col-md-6 d-flex flex-wrap gap-2">
                  <Button label="Previsualizar" icon="pi pi-search" severity="info" :loading="previewing"
                    @click="preview" />
                  <Button label="Ejecutar sin notificar" icon="pi pi-play" severity="secondary" :loading="running"
                    @click="runWithoutNotification" />
                  <Button label="Confirmar notificación" icon="pi pi-send" severity="danger" :loading="running"
                    @click="confirmNotification" />
                </div>
              </div>

              <Message severity="warn" :closable="false" class="mb-3">
                La confirmación no desactiva el modo simulación. Mientras <strong>dryRun</strong> esté activo, se valida
                el payload pero no se llama a Meta.
              </Message>
              <div v-if="previewResult" class="preview-result">
                <h5>Resultado de la previsualización</h5>
                <div class="d-flex flex-wrap gap-4 mb-3">
                  <span><strong>{{ previewResult.groupCount }}</strong> grupos</span>
                  <span><strong>{{ previewResult.movementCount }}</strong> movimientos</span>
                  <span v-if="previewResult.truncated" class="text-warning">Resumen limitado</span>
                </div>
                <DataTable :value="previewResult.groups" size="small" stripedRows>
                  <Column field="groupRef" header="Referencia anónima" />
                  <Column field="movementCount" header="Movimientos" />
                </DataTable>
              </div>
            </TabPanel>

            <TabPanel value="history">
              <DataTable :value="runs" :loading="loading" stripedRows scrollable>
                <Column field="id" header="Run" />
                <Column header="Origen"><template #body="{ data }">{{ formatTriggerType(data.trigger_type) }}</template>
                </Column>
                <Column header="Estado"><template #body="{ data }">{{ formatRunStatus(data.status) }}</template>
                </Column>
                <Column header="Ventana"><template #body="{ data }">{{ formatDateTime(data.window_from) }} — {{
                  formatDateTime(data.window_to) }}</template>
                </Column>
                <Column field="found_movement_count" header="Filas" />
                <Column field="found_group_count" header="Grupos" />
                <Column field="new_movement_count" header="Nuevos" />
                <Column header="Inicio"><template #body="{ data }">{{ formatDateTime(data.started_at) }}</template>
                </Column>
                <Column header="Error"><template #body="{ data }"><span class="error-cell">{{ data.error_message || '—'
                }}</span></template></Column>
              </DataTable>
              <PaginationControls :offset="runsPage.offset" :limit="runsPage.limit" :total="runsPage.total"
                @previous="changeRunsPage(-1)" @next="changeRunsPage(1)" />
            </TabPanel>

            <TabPanel value="detections">
              <DataTable :value="detections" :loading="loading" stripedRows>
                <Column field="group_key" header="Referencia anónima" />
                <Column field="movement_count" header="Movimientos" />
                <Column field="notified_count" header="Notificados" />
                <Column header="Primera fecha"><template #body="{ data }">{{ formatDate(data.first_date) }}</template>
                </Column>
                <Column header="Última fecha"><template #body="{ data }">{{ formatDate(data.last_date) }}</template>
                </Column>
              </DataTable>
              <PaginationControls :offset="detectionsPage.offset" :limit="detectionsPage.limit"
                :total="detectionsPage.total" @previous="changeDetectionsPage(-1)" @next="changeDetectionsPage(1)" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import DatePicker from "primevue/datepicker";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import ToggleSwitch from "primevue/toggleswitch";
import { duplicateTransferMonitorApi } from "@/services/duplicateTransferMonitor";
import { hasRole } from "@/services/roles";

const PaginationControls = defineComponent({
  props: { offset: Number, limit: Number, total: Number },
  emits: ["previous", "next"],
  setup(props, { emit }) {
    return () => h("div", { class: "d-flex justify-content-between align-items-center mt-3" }, [
      h("span", `Mostrando ${props.total ? props.offset + 1 : 0}–${Math.min(props.offset + props.limit, props.total)} de ${props.total}`),
      h("div", { class: "d-flex gap-2" }, [
        h(Button, { label: "Anterior", icon: "pi pi-chevron-left", severity: "secondary", disabled: props.offset === 0, onClick: () => emit("previous") }),
        h(Button, { label: "Siguiente", icon: "pi pi-chevron-right", iconPos: "right", severity: "secondary", disabled: props.offset + props.limit >= props.total, onClick: () => emit("next") }),
      ]),
    ]);
  },
});

const toast = useToast();
const confirm = useConfirm();
const loading = ref(false);
const saving = ref(false);
const previewing = ref(false);
const running = ref(false);
const status = ref(null);
const configDialogVisible = ref(false);
const form = ref({});
const accountCodesText = ref("");
const manualFrom = ref(null);
const manualTo = ref(new Date());
const previewResult = ref(null);
const runs = ref([]);
const detections = ref([]);
const runsPage = ref({ limit: 25, offset: 0, total: 0 });
const detectionsPage = ref({ limit: 25, offset: 0, total: 0 });
const isSystems = hasRole(["Sistemas"]);

const windowPayload = computed(() => manualFrom.value && manualTo.value ? {
  from: manualFrom.value.toISOString(),
  to: manualTo.value.toISOString(),
} : {});

function errorMessage(error) {
  return error?.response?.data?.message || error?.message || "Ocurrió un error inesperado";
}

function formatDateTime(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function formatDate(value) {
  if (!value) return "—";
  const isoDate = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDate) return `${isoDate[3]}/${isoDate[2]}/${isoDate[1]}`;
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

const RUN_STATUS_LABELS = {
  running: "En ejecución",
  success: "Exitosa",
  partial: "Parcial",
  failed: "Fallida",
  skipped_disabled: "Omitida: monitor desactivado",
  skipped_locked: "Omitida: otra ejecución en curso",
  dry_run: "Simulación",
};

const TRIGGER_TYPE_LABELS = {
  cron: "Programada",
  manual: "Manual",
};

function formatRunStatus(value) {
  return RUN_STATUS_LABELS[value] || value || "—";
}

function formatTriggerType(value) {
  return TRIGGER_TYPE_LABELS[value] || value || "—";
}

async function loadConfig() {
  const { data } = await duplicateTransferMonitorApi.getConfig();
  form.value = data.data;
  accountCodesText.value = (data.data.accountCodes || []).join("\n");
  if (!manualFrom.value) manualFrom.value = new Date(Date.now() - data.data.lookbackDays * 86400000);
}

async function loadStatus() {
  const { data } = await duplicateTransferMonitorApi.getStatus();
  status.value = data.data;
  if (!manualFrom.value) manualFrom.value = new Date(Date.now() - data.data.windowDays * 86400000);
}

async function loadRuns() {
  const { data } = await duplicateTransferMonitorApi.getRuns({ limit: runsPage.value.limit, offset: runsPage.value.offset });
  runs.value = data.data;
  runsPage.value.total = data.pagination.total;
}

async function loadDetections() {
  const { data } = await duplicateTransferMonitorApi.getDetections({ limit: detectionsPage.value.limit, offset: detectionsPage.value.offset });
  detections.value = data.data;
  detectionsPage.value.total = data.pagination.total;
}

async function loadAll() {
  loading.value = true;
  try {
    const requests = [loadStatus(), loadRuns(), loadDetections()];
    if (isSystems) requests.push(loadConfig());
    await Promise.all(requests);
  }
  catch (error) { toast.add({ severity: "error", summary: "No se pudo cargar el monitor", detail: errorMessage(error), life: 5000 }); }
  finally { loading.value = false; }
}

async function saveConfig() {
  saving.value = true;
  try {
    const payload = {
      enabled: form.value.enabled,
      dryRun: form.value.dryRun,
      notifyNewOccurrences: form.value.notifyNewOccurrences,
      cronExpression: form.value.cronExpression,
      timezone: form.value.timezone,
      lookbackDays: form.value.lookbackDays,
      minimumCoincidences: form.value.minimumCoincidences,
      queryTimeoutSeconds: form.value.queryTimeoutSeconds,
      maxResults: form.value.maxResults,
      erpOrigin: form.value.erpOrigin,
      accountCodes: accountCodesText.value.split(/[\n,;]+/).map((value) => value.trim()).filter(Boolean),
      whatsappRecipient: form.value.whatsappRecipient,
      whatsappTemplateName: form.value.whatsappTemplateName,
      whatsappTemplateLanguage: form.value.whatsappTemplateLanguage,
      whatsappProvider: form.value.whatsappProvider,
    };
    const { data } = await duplicateTransferMonitorApi.updateConfig(payload);
    form.value = data.data;
    accountCodesText.value = (data.data.accountCodes || []).join("\n");
    await loadStatus();
    configDialogVisible.value = false;
    toast.add({ severity: "success", summary: "Configuración guardada", life: 3000 });
  } catch (error) { toast.add({ severity: "error", summary: "No se pudo guardar", detail: errorMessage(error), life: 5000 }); }
  finally { saving.value = false; }
}

async function openConfig() {
  if (!isSystems) return;
  try {
    await loadConfig();
    configDialogVisible.value = true;
  } catch (error) {
    toast.add({ severity: "error", summary: "No se pudo cargar la configuración", detail: errorMessage(error), life: 5000 });
  }
}

async function preview() {
  previewing.value = true;
  try {
    const { data } = await duplicateTransferMonitorApi.preview(windowPayload.value);
    previewResult.value = data.data;
    toast.add({ severity: "success", summary: "Previsualización completada", life: 3000 });
  } catch (error) { toast.add({ severity: "error", summary: "Falló la previsualización", detail: errorMessage(error), life: 5000 }); }
  finally { previewing.value = false; }
}

async function executeRun(notify) {
  running.value = true;
  try {
    const payload = { ...windowPayload.value, notify };
    if (notify) payload.confirmNotification = true;
    const { data } = await duplicateTransferMonitorApi.run(payload);
    toast.add({ severity: data.data.status === "partial" || data.data.status === "failed" ? "warn" : "success", summary: `Ejecución ${formatRunStatus(data.data.status).toLowerCase()}`, detail: `Ejecución #${data.data.id}`, life: 5000 });
    await Promise.all([loadStatus(), loadRuns(), loadDetections()]);
  } catch (error) { toast.add({ severity: "error", summary: "Falló la ejecución", detail: errorMessage(error), life: 6000 }); await Promise.allSettled([loadStatus(), loadRuns()]); }
  finally { running.value = false; }
}

const runWithoutNotification = () => executeRun(false);

function confirmNotification() {
  confirm.require({
    header: "Confirmar intento de notificación",
    message: status.value?.dryRun ? "El monitor está en simulación: se validará el payload y no se enviará a Meta." : "El monitor NO está en simulación. Esta acción puede enviar un único WhatsApp real.",
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Cancelar",
    acceptLabel: status.value?.dryRun ? "Ejecutar simulación" : "Enviar WhatsApp",
    acceptClass: status.value?.dryRun ? "p-button-warning" : "p-button-danger",
    accept: () => executeRun(true),
  });
}

async function changeRunsPage(direction) { runsPage.value.offset += direction * runsPage.value.limit; await loadRuns(); }
async function changeDetectionsPage(direction) { detectionsPage.value.offset += direction * detectionsPage.value.limit; await loadDetections(); }

onMounted(loadAll);
</script>

<style scoped>
.monitor-page {
  min-height: 100vh;
  background: #f4f6f8;
  color: #263238;
}

.summary-card {
  height: 100%;
  min-height: 98px;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e3e7ea;
  border-radius: .75rem;
  display: flex;
  flex-direction: column;
  gap: .45rem;
}

.summary-card span {
  color: #6c757d;
  font-size: .85rem;
  text-transform: uppercase;
  letter-spacing: .03em;
}

.summary-card strong {
  font-size: 1.05rem;
  overflow-wrap: anywhere;
}

.monitor-tabs {
  background: #fff;
  border: 1px solid #e3e7ea;
  border-radius: .75rem;
  overflow: hidden;
}

.field-label {
  display: block;
  margin-bottom: .4rem;
  font-weight: 600;
}

.form-check-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .6rem;
}

.form-check-row label {
  font-weight: 600;
}

.preview-result {
  border: 1px solid #e3e7ea;
  border-radius: .5rem;
  padding: 1rem;
}

.error-cell {
  display: inline-block;
  max-width: 300px;
  white-space: normal;
  color: #a33;
}

@media (max-width: 768px) {
  .monitor-page :deep(.p-tablist-tab-list) {
    overflow-x: auto;
  }
}
</style>
