<template>
  <DataTable :value="productos" dataKey="codigoArticulo" paginator :rows="100" :rowsPerPageOptions="[100, 250, 500]"
    removableSort scrollable scrollHeight="flex" stripedRows :loading="loading" sortMode="single" class="products-table"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
    currentPageReportTemplate="{first} a {last} de {totalRecords}" resizableColumns columnResizeMode="fit">
    <template #empty>
      <div class="empty-table">No hay productos que coincidan con los filtros.</div>
    </template>
    <Column field="codigoArticulo" header="Código" sortable frozen style="min-width: 8rem">
      <template #body="{ data }"><span class="code">{{ display(data.codigoArticulo) }}</span></template>
    </Column>
    <Column field="nombreArticulo" header="Artículo" sortable frozen style="min-width: 19rem">
      <template #body="{ data }"><span class="article-name" :title="data.nombreArticulo">{{ display(data.nombreArticulo)
      }}</span></template>
    </Column>
    <Column field="stockUnidades" header="Stock" sortable style="min-width: 7rem; text-align: center;"
      bodyClass="number-cell">
      <template #body="{ data }"><span :class="{ negative: isNegative(data.stockUnidades) }">{{
        formatNumber(data.stockUnidades) }}</span></template>
    </Column>
    <Column field="stockDisponible" header="Stock disponible" sortable style="min-width: 10rem; text-align: center;"
      bodyClass="number-cell">
      <template #body="{ data }"><span :class="{ negative: isNegative(data.stockDisponible) }">{{
        formatNumber(data.stockDisponible) }}</span></template>
    </Column>
    <Column field="exhibido" header="Exhibido" sortable style="min-width: 7rem; text-align: center;">
      <template #body="{ data }">
        <Tag :value="tieneExhibicion(data.exhibido) ? 'Sí' : 'No'"
          :severity="tieneExhibicion(data.exhibido) ? 'success' : 'secondary'" />
      </template>
    </Column>
    <Column field="ultimaVenta" header="Última venta" sortable style="min-width: 9rem; text-align: center;"><template
        #body="{ data }">{{
          formatDate(data.ultimaVenta) }}</template></Column>
    <Column field="diasSinVenta" header="Días sin venta" sortable style="min-width: 9rem; text-align: center;"
      bodyClass="number-cell">
      <template #body="{ data }">
        <Tag :value="formatNumber(data.diasSinVenta)" :severity="daysSeverity(data.diasSinVenta)" />
      </template>
    </Column>
    <Column field="ultimaEntradaProveedor" header="Última entrada proveedor" sortable
      style="min-width: 13rem; text-align: center;"><template #body="{ data }">{{
        formatDate(data.ultimaEntradaProveedor) }}</template></Column>
    <Column field="cantidadUltimaEntrada" header="Cantidad última entrada" sortable
      style="min-width: 12rem; text-align: center;" bodyClass="number-cell"><template #body="{ data }">{{
        formatNumber(data.cantidadUltimaEntrada) }}</template>
    </Column>
    <Column field="diasUltimoMovimiento" header="Días último movimiento" sortable
      style="min-width: 12rem; text-align: center;" bodyClass="number-cell"><template #body="{ data }">{{
        formatNumber(data.diasUltimoMovimiento) }}</template>
    </Column>
    <Column field="ventasUltimoAnio" header="Ventas último año" sortable style="min-width: 10rem; text-align: center;"
      bodyClass="number-cell">
      <template #body="{ data }">{{ formatNumber(data.ventasUltimoAnio) }}</template>
    </Column>
    <Column field="costoUnitarioSinIva" header="Costo unitario sin IVA" sortable
      style="min-width: 12rem; text-align: center;" bodyClass="number-cell"><template #body="{ data }">{{
        formatCurrency(data.costoUnitarioSinIva) }}</template>
    </Column>
    <Column field="costoTotalSinIva" header="Costo total sin IVA" sortable style="min-width: 11rem"
      bodyClass="number-cell">
      <template #body="{ data }">{{ formatCurrency(data.costoTotalSinIva) }}</template>
    </Column>
    <Column field="ventaContadoConIva" header="Venta contado con IVA" sortable style="min-width: 12rem"
      bodyClass="number-cell"><template #body="{ data }">{{ formatCurrency(data.ventaContadoConIva) }}</template>
    </Column>
    <Column field="nombreComprador" header="Comprador" sortable style="min-width: 12rem; text-align: center;">
      <template #body="{ data }">
        {{ display(data.nombreComprador) }}
      </template>
    </Column>
    <Column field="clasificacion4" header="Clasif. 4" sortable style="min-width: 10rem"><template #body="{ data }">{{
      display(data.clasificacion4) }}</template></Column>
    <Column field="clasificacion5" header="Clasif. 5" sortable style="min-width: 10rem"><template #body="{ data }">{{
      display(data.clasificacion5) }}</template></Column>
    <Column field="clasificacion6" header="Clasif. 6" sortable style="min-width: 10rem"><template #body="{ data }">{{
      display(data.clasificacion6) }}</template></Column>
    <Column field="clasificacion8" header="Clasif. 8" sortable style="min-width: 10rem"><template #body="{ data }">{{
      display(data.clasificacion8) }}</template></Column>
  </DataTable>
</template>

<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Tag from "primevue/tag";
import { aNumero, formatCurrency, formatDate, formatNumber, tieneExhibicion } from "@/utils/rotacionProductos";

defineProps({ productos: { type: Array, required: true }, loading: Boolean });
const display = (value) => value === null || value === undefined || value === "" ? "—" : value;
const isNegative = (value) => aNumero(value) !== null && aNumero(value) < 0;
function daysSeverity(value) {
  const days = aNumero(value);
  if (days === null) return "secondary";
  if (days >= 365) return "danger";
  if (days >= 180) return "warn";
  if (days >= 90) return "info";
  return "success";
}
</script>

<style scoped>
.products-table {
  height: 90vh;
  overflow: auto;
}

.code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 700;
  white-space: nowrap;
}

.article-name {
  display: block;
  max-width: 28rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.negative {
  color: #b42318;
  font-weight: 700;
}

.empty-table {
  padding: 2.5rem;
  color: #667085;
  text-align: center;
}

:deep(.number-cell) {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

:deep(.p-datatable-thead > tr > th) {
  white-space: nowrap;
}
</style>
