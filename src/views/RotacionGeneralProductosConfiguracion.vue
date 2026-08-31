<template>
  <section class="configuration-view" aria-label="Configuración de rotación de productos">
    <Toolbar class="configuration-heading">
      <template #start>
        <div>
          <div class="heading-title">Configuración de rotación de productos</div>
          <small>Estos cambios se aplicarán en la siguiente consulta del informe.</small>
        </div>
      </template>
      <template #end>
        <label for="config-category" class="visually-hidden">Categoría</label>
        <Select id="config-category" :modelValue="recursoActivo" :options="recursos" optionLabel="label"
          optionValue="resource" class="category-select" :disabled="operando" @update:modelValue="seleccionar" />
      </template>
    </Toolbar>

    <Message v-if="error" severity="error" :closable="false" class="config-error">
      <div class="error-content">
        <span>{{ error }}</span>
        <Button label="Reintentar" icon="pi pi-refresh" size="small" :disabled="operando"
          @click="cargar(recursoActivo, { forzar: true })" />
      </div>
    </Message>

    <ConfiguracionTabla :key="recursoActivo" :filas="filas" :definicion="definicionActiva"
      :cargando="cargando" :operando="operando" @recargar="cargar(recursoActivo, { forzar: true })"
      @nuevo="abrirNuevo" @editar="abrirEdicion" @cambiar-estado="cambiarEstadoRegistro"
      @eliminar="confirmarEliminacion" />

    <ConfiguracionFormulario v-model:visible="formularioVisible" :definicion="definicionActiva"
      :registro="registroSeleccionado" :guardando="operando" @guardar="guardarRegistro" />
    <ConfirmDialog />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import Message from "primevue/message";
import Select from "primevue/select";
import Toolbar from "primevue/toolbar";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfiguracionFormulario from "@/components/rotacion-productos-config/ConfiguracionFormulario.vue";
import ConfiguracionTabla from "@/components/rotacion-productos-config/ConfiguracionTabla.vue";
import { useRotacionProductosConfiguracion } from "@/composables/useRotacionProductosConfiguracion";

const confirm = useConfirm();
const toast = useToast();
const formularioVisible = ref(false);
const registroSeleccionado = ref(null);
const {
  recursos,
  recursoActivo,
  definicionActiva,
  filas,
  cargando,
  operando,
  error,
  cargar,
  seleccionar,
  guardar,
  cambiarEstado,
  eliminar,
} = useRotacionProductosConfiguracion();

function abrirNuevo() {
  registroSeleccionado.value = null;
  formularioVisible.value = true;
}

function abrirEdicion(registro) {
  registroSeleccionado.value = registro;
  formularioVisible.value = true;
}

function notificar(detail) {
  if (!detail) return;
  toast.add({ severity: "success", summary: "Configuración actualizada", detail, life: 3000 });
}

async function guardarRegistro({ registro, editando }) {
  const result = await guardar(registro, editando);
  if (!result) return;
  formularioVisible.value = false;
  notificar(result);
}

async function cambiarEstadoRegistro(registro) {
  notificar(await cambiarEstado(registro));
}

function confirmarEliminacion(registro) {
  confirm.require({
    header: "Confirmar eliminación",
    message: `¿Eliminar ${registro.codigo} - ${registro.descripcion}? Se recomienda desactivarlo para conservar el historial.`,
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Cancelar",
    acceptLabel: "Eliminar",
    acceptClass: "p-button-danger",
    accept: async () => notificar(await eliminar(registro)),
  });
}

onMounted(() => cargar(recursoActivo.value));
</script>

<style scoped>
.configuration-view {
  display: grid;
  gap: 0.75rem;
}

.configuration-heading {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.heading-title {
  font-size: 1.05rem;
  font-weight: 700;
}

.category-select {
  width: min(22rem, 42vw);
}

.config-error {
  margin: 0;
}

.error-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 700px) {
  .category-select {
    width: 100%;
  }

  .error-content {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
