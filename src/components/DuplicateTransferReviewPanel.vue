<template>
  <div>
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
      <div class="row g-3 align-items-end mb-4">
        <div class="col-md-2">
          <label class="field-label">Desde (opcional)</label>
          <DatePicker v-model="filters.from" dateFormat="dd/mm/yy" showIcon fluid
            :disabled="Boolean(filters.daysBack)" />
        </div>
        <div class="col-md-2">
          <label class="field-label">Hasta (opcional)</label>
          <DatePicker v-model="filters.to" dateFormat="dd/mm/yy" showIcon fluid :disabled="Boolean(filters.daysBack)" />
        </div>
        <div class="col-md-2">
          <label class="field-label">Días atrás</label>
          <InputNumber v-model="filters.daysBack" :min="1" :max="180" :useGrouping="false"
            :disabled="Boolean(filters.from || filters.to)" placeholder="Ej.: 60" fluid />
        </div>
        <div class="col-md-2">
          <label class="field-label">Código de cuenta</label>
          <InputText v-model="filters.accountCode" fluid placeholder="Todas" />
        </div>
        <div class="col-md-2">
          <label class="field-label">Código de cliente</label>
          <InputText v-model="filters.clientCode" fluid placeholder="Todos" />
        </div>
        <div class="col-md-2">
          <Button label="Consultar" icon="pi pi-search" :loading="loading" @click="loadReview(1)" />
        </div>
      </div>
    </Panel>


    <div v-if="result" class="row g-3 mb-2">
      <div class="col-md-4">
        <div class="summary-card">
          <div class="summary-heading"><i class="pi pi-clone"></i><span>Grupos</span></div>
          <strong>{{ result.summary.groupCount }}</strong>
        </div>
      </div>
      <div class="col-md-4">
        <div class="summary-card">
          <div class="summary-heading"><i class="pi pi-list"></i><span>Movimientos</span></div>
          <strong>{{ result.summary.movementCount }}</strong>
        </div>
      </div>
      <div class="col-md-4">
        <div class="summary-card">
          <div class="summary-heading"><i class="pi pi-dollar"></i><span>Suma de movimientos</span></div>
          <strong>{{ formatMoney(result.summary.totalAmount) }}</strong>
        </div>
      </div>
    </div>
    <Card class="p-0 my-0 directive-fullscreen-wrapper-grid vh-height mb-2">
      <template #content>
        <DataTable v-model:filters="tableFilters" :value="tableItems" :loading="loading" stripedRows showGridlines
          scrollable resizableColumns columnResizeMode="fit">
          <Column field="date" filterField="dateDisplay" header="Fecha">
            <template #body="{ data }">{{ data.dateDisplay }}</template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="DD/MM/AAAA" fluid />
            </template>
          </Column>
          <Column field="division" header="División" class="text-center">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="División" fluid />
            </template>
          </Column>
          <!-- <Column field="entryNumber" header="Asiento" /> -->
          <Column field="receipt" header="Comprobante">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Comprobante" fluid />
            </template>
          </Column>
          <Column field="accountCode" header="Cuenta">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cuenta" fluid />
            </template>
          </Column>
          <Column field="accountName" header="Nombre cuenta">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Nombre" fluid />
            </template>
          </Column>
          <Column field="amount" header="Importe">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Importe" fluid />
            </template>
          </Column>
          <Column field="clientCode" header="Cliente">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cliente" fluid />
            </template>
          </Column>
          <Column field="clientName" header="Nombre cliente">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Nombre" fluid />
            </template>
          </Column>
          <Column field="coincidenceCount" header="Coincidencias" class="text-center">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cantidad" fluid />
            </template>
          </Column>
          <Column field="firstDate" filterField="firstDateDisplay" header="Primera fecha">
            <template #body="{ data }">{{ data.firstDateDisplay }}</template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="DD/MM/AAAA" fluid />
            </template>
          </Column>
          <Column field="lastDate" filterField="lastDateDisplay" header="Última fecha">
            <template #body="{ data }">{{ data.lastDateDisplay }}</template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="DD/MM/AAAA" fluid />
            </template>
          </Column>
          <Column field="daysBetween" header="Días" class="text-center">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Días" fluid />
            </template>
          </Column>
        </DataTable>

        <div v-if="result" class="d-flex justify-content-between align-items-center mt-3">
          <span>Mostrando {{ firstItem }} – {{ lastItem }} de {{ result.pagination.totalItems }}</span>
          <div class="d-flex gap-2">
            <Button label="Anterior" icon="pi pi-chevron-left" severity="secondary"
              :disabled="result.pagination.page === 1" @click="loadReview(result.pagination.page - 1)" />
            <Button label="Siguiente" icon="pi pi-chevron-right" iconPos="right" severity="secondary"
              :disabled="result.pagination.page >= result.pagination.totalPages"
              @click="loadReview(result.pagination.page + 1)" />
          </div>
        </div>
      </template>
    </Card>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import { useToast } from "primevue/usetoast";
import Card from "primevue/card";
import Panel from "primevue/panel";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { duplicateTransferMonitorApi } from "@/services/duplicateTransferMonitor";

const toast = useToast();
const loading = ref(false);
const result = ref(null);
const filters = ref({ from: null, to: null, daysBack: null, accountCode: "", clientCode: "" });
const tableFilters = ref({
  dateDisplay: { value: null, matchMode: FilterMatchMode.CONTAINS },
  division: { value: null, matchMode: FilterMatchMode.CONTAINS },
  receipt: { value: null, matchMode: FilterMatchMode.CONTAINS },
  accountCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  accountName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
  clientCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
  clientName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  coincidenceCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
  firstDateDisplay: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lastDateDisplay: { value: null, matchMode: FilterMatchMode.CONTAINS },
  daysBetween: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const tableItems = computed(() => (result.value?.items || []).map((item) => ({
  ...item,
  dateDisplay: formatDate(item.date),
  firstDateDisplay: formatDate(item.firstDate),
  lastDateDisplay: formatDate(item.lastDate),
})));

const firstItem = computed(() => result.value?.pagination.totalItems
  ? (result.value.pagination.page - 1) * result.value.pagination.pageSize + 1
  : 0);
const lastItem = computed(() => result.value
  ? Math.min(result.value.pagination.page * result.value.pagination.pageSize, result.value.pagination.totalItems)
  : 0);

function formatDate(value) {
  if (!value) return "—";
  const isoDate = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDate) return `${isoDate[3]}/${isoDate[2]}/${isoDate[1]}`;
  return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function formatMoney(value) {
  const match = String(value ?? "0.00").match(/^(-?)(\d+)(?:\.(\d{1,2}))?$/);
  if (!match) return "$ 0,00";
  const [, sign, integer, decimal = ""] = match;
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign ? "-" : ""}$ ${grouped},${decimal.padEnd(2, "0")}`;
}

function toDateOnly(value) {
  if (!value) return undefined;
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function errorMessage(error) {
  return error?.response?.data?.message || error?.message || "Ocurrió un error inesperado";
}

async function loadReview(page = 1) {
  if (filters.value.daysBack !== null && (!Number.isInteger(filters.value.daysBack) || filters.value.daysBack < 1 || filters.value.daysBack > 180)) {
    toast.add({ severity: "warn", summary: "Días atrás inválido", detail: "Debe ser un número entre 1 y 180.", life: 4000 });
    return;
  }

  loading.value = true;
  try {
    let from = filters.value.from;
    let to = filters.value.to;
    if (filters.value.daysBack) {
      to = new Date();
      from = new Date(to);
      from.setDate(from.getDate() - filters.value.daysBack);
    }
    const { data } = await duplicateTransferMonitorApi.review({
      page,
      pageSize: result.value?.pagination?.pageSize || 25,
      from: toDateOnly(from),
      to: toDateOnly(to),
      accountCode: filters.value.accountCode.trim() || undefined,
      clientCode: filters.value.clientCode.trim() || undefined,
    });
    result.value = data.data;
  } catch (error) {
    toast.add({ severity: "error", summary: "No se pudo realizar la consulta", detail: errorMessage(error), life: 5000 });
  } finally { loading.value = false; }
}

onMounted(() => loadReview());
</script>

<style scoped>
.field-label {
  display: block;
  margin-bottom: .4rem;
  font-weight: 600;
}

.summary-card {
  height: 100%;
  min-height: 90px;
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
}

.summary-card strong {
  font-size: 1.15rem;
}

.summary-heading {
  display: flex;
  align-items: center;
  gap: .55rem;
}

.summary-heading i {
  color: #198754;
  font-size: 1.15rem;
}
</style>
