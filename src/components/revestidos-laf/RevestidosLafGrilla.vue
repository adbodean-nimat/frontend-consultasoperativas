<template>
  <div class="laf-grid directive-fullscreen-wrapper-grid" role="region"
    aria-label="Chapas Revestidas y LAF: consumos, NP, stock, OC y datos">
    <AgGridVue style="width: 100%; height: 100%" :theme="theme" :modules="modules" :rowData="resultado.displayRows"
      :columnDefs="columns" :defaultColDef="defaultColDef"
      :pinnedBottomRowData="resultado.rows.length ? [resultado.totals] : []" :suppressFieldDotNotation="true"
      :suppressMovableColumns="true" :getRowId="getRowId" :getRowClass="getRowClass" :getRowHeight="getRowHeight" :headerHeight="36"
      :groupHeaderHeight="32" :tooltipShowDelay="200"
      overlayNoRowsTemplate="No hay familias activas para el período consultado." @grid-ready="api = $event.api" />
  </div>
</template>
<script setup>
import { computed, shallowRef } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { AllCommunityModule, themeBalham } from 'ag-grid-community';
const props = defineProps({ resultado: { type: Object, required: true } });
const modules = [AllCommunityModule];
const theme = themeBalham.withParams(
  {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    accentColor: '#007c3b',
    wrapperBorderRadius: '0px',
    wrapperBorder: true,
    headerRowBorder: true,
    columnBorder: true
  }
);
const defaultColDef = {
  sortable: false, filter: false, editable: false, resizable: true,
  suppressNavigable: p => Boolean(p.data?.isSeparator),
};
const api = shallowRef(null);
// Metadata for totals is not an AG Grid column option.
const columns = computed(() => {
  const clean = cols => cols.map(({ sum, children, ...col }) => {
    if (children) return { ...col, children: clean(children) };
    // Subtotal cells reuse the color of their column block's header.
    return col.headerClass ? {
      ...col,
      cellClassRules: {
        [col.headerClass]: p => Boolean(p.data?.isSubtotal ||
          (p.data?.isPercentage && col.field.endsWith('.totalConsumptionTon')))
      },
      ...(col.field.endsWith('.totalConsumptionTon') ? {
        tooltipValueGetter: p => p.data?.isPercentage
          ? `Participación de ${p.data.groupFull}: subtotal / total general del mes. — indica total cero o dato no calculable.`
          : undefined
      } : {})
    } : col;
  });
  // Omit the outer block heading row; retain month and stock-reference groups.
  return clean(props.resultado.columns.flatMap(column => column.children ?? [column]));
});
const getRowId = p => p.data.presentationId ?? (p.data.isSubtotal ? p.data.subtotalId : String(p.data.originalIndex));
const getRowHeight = p => p.data?.isSeparator ? 12 : p.data?.isPercentage ? 24 : 32;
const getRowClass = p => p.node.rowPinned ? 'laf-total' : p.data?.isSubtotal ? 'laf-subtotal'
  : p.data?.isPercentage ? 'laf-percentage' : p.data?.isSeparator ? 'laf-separator'
  : p.data?.groupStart ? 'laf-group-start' : '';
function exportar() {
  api.value?.exportDataAsCsv({
    fileName: 'chapas-revestidas-laf.csv', columnSeparator: ';',
    shouldRowBeSkipped: p => Boolean(p.node.data?.isSeparator),
    processCellCallback: p => {
      const col = p.column.getColDef();
      const value = typeof col.valueFormatter === 'function' ? col.valueFormatter(p) : p.value ?? '';
      // Neutralize spreadsheet formulas in text, preserving leading-zero identifiers.
      return typeof value === 'string' && /^[=+@\-\t\r]/.test(value) && !col.valueFormatter ? `'${value}` : value;
    }
  });
}
defineExpose({ exportar });
</script>
<style scoped>
.laf-grid {
  /* height: clamp(360px, calc(100dvh - 420px), 850px); */
  height: 100vh;
  width: 100%;
  min-width: 0;
  --laf-consumos: #dce9fa;
  --laf-np: #e2f3fa;
  --laf-stock: #e2efdf;
  --laf-oc: #c0dfc7;
  --laf-datos: #edf0f3;
}

:deep(.laf-consumos) {
  background: var(--laf-consumos);
  color: #183856;
  text-align: center;
}

:deep(.laf-np) {
  background: var(--laf-np);
  color: #183856;
}

:deep(.laf-stock) {
  background: var(--laf-stock);
  color: #24402b;
}

:deep(.laf-oc) {
  background: var(--laf-oc);
  color: #193c23;
}

:deep(.laf-datos) {
  background: var(--laf-datos);
  color: #303d4b;
}

:deep(.laf-number) {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

:deep(.laf-warning) {
  color: #805100;
  background: #fff8e5;
}

:deep(.laf-group-start .ag-cell) {
  border-top: 2px solid #829e8c;
}

:deep(.laf-total) {
  font-weight: 700;
  background: #edf3ee;
}

:deep(.laf-subtotal) {
  font-weight: 700;
  background: var(--laf-datos);
  color: #303d4b;
}

:deep(.laf-subtotal .ag-cell) {
  border-top: 1px solid #829e8c;
}

:deep(.laf-percentage) {
  background: var(--laf-datos);
  font-size: 11px;
}

:deep(.laf-percentage .ag-cell) {
  line-height: 23px;
}

:deep(.laf-separator) {
  background: var(--laf-datos);
  border: 0;
}

:deep(.laf-separator .ag-cell) {
  border: 0;
}

:deep(.ag-header-cell-comp-wrapper) {
  justify-content: center;
}
</style>
