<template>
  <main class="container-fluid laf-page pb-3">
    <div class="encabezado-titulo">
      <h1><i class="pi pi-sliders-h me-2" aria-hidden="true"></i>Configuración · Chapas Revestidas y LAF</h1>


      <!-- <router-link :to="{ name: 'revestidos-laf' }" class="text-white">Volver a la consulta</router-link> -->
    </div>
    <Toolbar class="laf-toolbar mb-2" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
      <template #start><label for="laf-resource" class="me-2">Parametros:</label>
        <Select inputId="laf-resource" v-model="resource" :options="CONFIG_RECURSOS" optionLabel="label"
          optionValue="resource" :disabled="loading || saving || visible || deleteVisible" />
      </template><template #end>
        <Button label="Agregar" icon="pi pi-plus" class="me-2"
          :disabled="resource === 'general' || loading || saving"
          :title="resource === 'general' ? 'La configuración general es única y solo admite edición' : 'Agregar configuración'"
          @click="agregar" />
        <Button label="Recargar" icon="pi pi-refresh" outlined :disabled="loading || saving"
          @click="cargar(resource)" /></template>
    </Toolbar>
    <Message v-if="error && !visible && !deleteVisible" severity="error" :closable="false">{{ error }}</Message>
    <Message v-if="success" severity="success" :closable="false">{{ success }}</Message>
    <DataTable class="card" :value="rows" :dataKey="definition.key" :loading="loading" stripedRows scrollable paginator
      :rows="25">
      <template #empty>No hay registros de configuración.</template>
      <Column :field="definition.key" header="Código" frozen />
      <Column v-for="field in definition.fields" :key="field.key" :field="field.key" :header="field.label"
        style="min-width: 10rem">
        <template #body="{ data }"><span :title="String(data[field.key] ?? '')">{{ field.type === 'boolean' ?
          (data[field.key] ? 'Activo' : 'Inactivo') : data[field.key] ?? '—' }}</span></template>
      </Column>
      <Column header="Acciones" frozen alignFrozen="right"><template #body="{ data }">
          <div class="d-flex gap-2">
            <Button icon="pi pi-pencil" title="Editar" aria-label="Editar" text :disabled="saving || loading" @click="editar(data)" />
            <Button v-if="resource !== 'general'" :icon="data.activo ? 'pi pi-times' : 'pi pi-check'"
              :title="data.activo ? 'Desactivar' : 'Activar'" :aria-label="data.activo ? 'Desactivar' : 'Activar'"
              :severity="data.activo ? 'warn' : 'success'" text :disabled="saving || loading"
              @click="cambiarEstado(data)" />
            <Button v-if="resource !== 'general'" icon="pi pi-trash" aria-label="Eliminar" severity="danger" text
              title="Eliminar definitivamente"
              :disabled="saving || loading" @click="pedirEliminar(data)" />
          </div>
        </template></Column>
    </DataTable>
    <small>Los cambios se aplicarán en la siguiente consulta. Los códigos son inmutables.
      Desactivar conserva el registro; Eliminar lo borra definitivamente.</small>
    <Dialog v-model:visible="visible" modal :header="nuevo ? 'Agregar configuración' : 'Editar configuración'" :closable="!saving" :closeOnEscape="!saving">
      <RevestidosLafConfiguracionFormulario v-if="visible" :registro="selected" :definicion="definition"
        :nuevo="nuevo" :guardando="saving" :error="error" @guardar="guardarEdicion" />
    </Dialog>
    <Dialog v-model:visible="deleteVisible" modal header="Eliminar configuración" :closable="!saving" :closeOnEscape="!saving">
      <p>¿Eliminar el registro <strong>{{ deletingRow?.[definition.key] }} · {{ deletingRow?.nombre }}</strong>?</p>
      <p>El registro se borrará definitivamente. Esta acción no se puede deshacer.</p>
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
      <template #footer>
        <Button label="Cancelar" outlined :disabled="saving" @click="deleteVisible = false" />
        <Button label="Eliminar" icon="pi pi-trash" severity="danger" :loading="saving" :disabled="saving" @click="confirmarEliminar" />
      </template>
    </Dialog>
  </main>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import Toolbar from 'primevue/toolbar';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import RevestidosLafConfiguracionFormulario from '@/components/revestidos-laf/RevestidosLafConfiguracionFormulario.vue';
import { CONFIG_RECURSOS, recursoConfiguracion } from '@/utils/revestidosLafConfiguracion';
import { useRevestidosLafConfiguracion } from '@/composables/useRevestidosLafConfiguracion';
const resource = ref('familias'), selected = ref(null), visible = ref(false), success = ref('');
const nuevo = ref(false), deleteVisible = ref(false), deletingRow = ref(null);
const definition = computed(() => recursoConfiguracion(resource.value));
const { rows, loading, saving, error, cargar, guardar, crear, eliminar } = useRevestidosLafConfiguracion();
watch(resource, value => { success.value = ''; cargar(value); }, { immediate: true });
function editar(row) { nuevo.value = false; selected.value = row; error.value = ''; success.value = ''; visible.value = true; }
function agregar() {
  if (resource.value === 'general' || loading.value || saving.value) return;
  nuevo.value = true;
  selected.value = Object.fromEntries(definition.value.fields.map(f => [f.key, f.type === 'boolean' ? true : f.key === 'orden' ? 1 : '']));
  error.value = ''; success.value = ''; visible.value = true;
}
async function guardarEdicion(values) {
  const added = nuevo.value;
  const ok = added ? await crear(resource.value, values) : await guardar(resource.value, selected.value, values);
  if (ok) { visible.value = false; success.value = added ? 'Configuración agregada.' : 'Configuración actualizada.'; }
}
async function cambiarEstado(row) {
  success.value = '';
  if (await guardar(resource.value, row, { ...row, activo: !row.activo })) success.value = 'Estado actualizado.';
}
function pedirEliminar(row) {
  deletingRow.value = row; error.value = ''; success.value = ''; deleteVisible.value = true;
}
async function confirmarEliminar() {
  if (await eliminar(resource.value, deletingRow.value)) {
    deleteVisible.value = false;
    deletingRow.value = null;
    success.value = 'Registro eliminado definitivamente.';
  }
}
</script>
<style scoped>
.laf-page {
  background: #2c3e50;
  padding-bottom: 1rem;
  min-height: calc(100vh - 100px);
}

h1 {
  color: white;
  margin: 0;
  font-size: 1rem;
}
</style>
