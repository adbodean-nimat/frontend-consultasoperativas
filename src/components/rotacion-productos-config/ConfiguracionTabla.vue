<template>
  <div class="config-table">
    <Toolbar class="config-toolbar">
      <template #start>
        <span class="p-input-icon-left search-wrapper">
          <i class="pi pi-search" />
          <InputText v-model="busqueda" placeholder="Buscar por código o descripción" aria-label="Buscar configuración" />
        </span>
      </template>
      <template #end>
        <Button label="Recargar" icon="pi pi-refresh" severity="secondary" outlined :loading="cargando"
          :disabled="operando" @click="emit('recargar')" />
        <Button label="Nuevo" icon="pi pi-plus" class="ms-2" :disabled="cargando || operando"
          @click="emit('nuevo')" />
      </template>
    </Toolbar>

    <DataTable :value="filasFiltradas" dataKey="codigo" paginator :rows="10" :rowsPerPageOptions="[10, 25, 50]"
      removableSort stripedRows scrollable :loading="cargando" class="configuration-data-table">
      <template #empty>
        <div class="empty-state">No hay registros para mostrar.</div>
      </template>
      <Column field="codigo" header="Código" sortable frozen class="code-column" />
      <Column field="descripcion" :header="definicion.descriptionLabel" sortable />
      <Column field="activo" header="Estado" sortable class="status-column">
        <template #body="{ data }">
          <Tag :value="data.activo ? 'Activo' : 'Inactivo'" :severity="data.activo ? 'success' : 'secondary'" />
        </template>
      </Column>
      <Column field="actualizadoEn" header="Última actualización" sortable class="date-column">
        <template #body="{ data }">{{ formatearFecha(data.actualizadoEn) }}</template>
      </Column>
      <Column header="Acciones" frozen alignFrozen="right" class="actions-column">
        <template #body="{ data }">
          <div class="row-actions">
            <Button icon="pi pi-pencil" severity="secondary" rounded text :disabled="operando"
              aria-label="Editar registro" v-tooltip.top="'Editar'" @click="emit('editar', data)" />
            <Button :icon="data.activo ? 'pi pi-ban' : 'pi pi-check-circle'"
              :severity="data.activo ? 'warn' : 'success'" rounded text :disabled="operando"
              :aria-label="data.activo ? 'Desactivar registro' : 'Activar registro'"
              v-tooltip.top="data.activo ? 'Desactivar (recomendado)' : 'Activar'" @click="emit('cambiar-estado', data)" />
            <Button icon="pi pi-trash" severity="danger" rounded text :disabled="operando"
              aria-label="Eliminar registro" v-tooltip.top="'Eliminar'" @click="emit('eliminar', data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import Toolbar from "primevue/toolbar";

const props = defineProps({
  filas: { type: Array, default: () => [] },
  definicion: { type: Object, required: true },
  cargando: { type: Boolean, default: false },
  operando: { type: Boolean, default: false },
});
const emit = defineEmits(["recargar", "nuevo", "editar", "cambiar-estado", "eliminar"]);
const busqueda = ref("");

const filasFiltradas = computed(() => {
  const term = busqueda.value.trim().toLocaleLowerCase("es");
  if (!term) return props.filas;
  return props.filas.filter((row) => row.codigo.toLocaleLowerCase("es").includes(term)
    || row.descripcion.toLocaleLowerCase("es").includes(term));
});

function formatearFecha(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "short" }).format(date);
}
</script>

<style scoped>
.config-toolbar {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.search-wrapper > i {
  position: absolute;
  left: 0.8rem;
  z-index: 1;
  color: #667085;
}

.search-wrapper :deep(input) {
  width: min(25rem, 50vw);
  padding-left: 2.35rem;
}

.row-actions {
  display: flex;
  gap: 0.15rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #667085;
}

.code-column {
  min-width: 9rem;
}

.status-column {
  min-width: 7rem;
}

.date-column {
  min-width: 12rem;
}

.actions-column {
  min-width: 10rem;
}

@media (max-width: 700px) {
  .search-wrapper,
  .search-wrapper :deep(input) {
    width: 100%;
  }
}
</style>
