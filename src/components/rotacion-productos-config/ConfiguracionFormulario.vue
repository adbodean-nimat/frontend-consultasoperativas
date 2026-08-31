<template>
  <Dialog :visible="visible" modal :header="editando ? 'Editar registro' : 'Nuevo registro'" class="config-form-dialog"
    :closable="!guardando" @update:visible="emit('update:visible', $event)">
    <form class="config-form" @submit.prevent="enviar">
      <div class="field-group">
        <label for="config-codigo">{{ definicion.codeLabel }}</label>
        <InputText id="config-codigo" v-model="form.codigo" :disabled="editando || guardando"
          :invalid="Boolean(errores.codigo)" :inputmode="definicion.integerCode ? 'numeric' : 'text'" autofocus />
        <small v-if="errores.codigo" class="field-error">{{ errores.codigo }}</small>
        <small v-else-if="editando" class="field-help">El código es el identificador y no puede modificarse.</small>
      </div>

      <div class="field-group">
        <label for="config-descripcion">{{ definicion.descriptionLabel }}</label>
        <InputText id="config-descripcion" v-model="form.descripcion" :disabled="guardando"
          :invalid="Boolean(errores.descripcion)" />
        <small v-if="errores.descripcion" class="field-error">{{ errores.descripcion }}</small>
      </div>

      <div class="status-field">
        <ToggleSwitch inputId="config-activo" v-model="form.activo" :disabled="guardando" />
        <label for="config-activo">Activo</label>
      </div>
    </form>

    <template #footer>
      <Button label="Cancelar" severity="secondary" text :disabled="guardando" @click="emit('update:visible', false)" />
      <Button :label="editando ? 'Guardar cambios' : 'Crear'" icon="pi pi-check" :loading="guardando"
        :disabled="guardando" @click="enviar" />
    </template>
  </Dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import ToggleSwitch from "primevue/toggleswitch";
import { validarRegistroConfiguracion } from "@/services/rotacionGeneralProductosConfiguracionCore";

const props = defineProps({
  visible: { type: Boolean, default: false },
  definicion: { type: Object, required: true },
  registro: { type: Object, default: null },
  guardando: { type: Boolean, default: false },
});
const emit = defineEmits(["update:visible", "guardar"]);

const form = reactive({ codigo: "", descripcion: "", activo: true });
const errores = reactive({ codigo: "", descripcion: "" });
const editando = ref(false);

watch(() => props.visible, (visible) => {
  if (!visible) return;
  editando.value = Boolean(props.registro);
  Object.assign(form, props.registro
    ? { codigo: props.registro.codigo, descripcion: props.registro.descripcion, activo: props.registro.activo }
    : { codigo: "", descripcion: "", activo: true });
  Object.assign(errores, { codigo: "", descripcion: "" });
});

function enviar() {
  if (props.guardando) return;
  const validation = validarRegistroConfiguracion(form, props.definicion);
  Object.assign(errores, { codigo: validation.codigo || "", descripcion: validation.descripcion || "" });
  if (Object.keys(validation).length) return;
  emit("guardar", {
    registro: { codigo: form.codigo.trim(), descripcion: form.descripcion.trim(), activo: Boolean(form.activo) },
    editando: editando.value,
  });
}
</script>

<style scoped>
.config-form {
  display: grid;
  gap: 1.15rem;
  min-width: min(30rem, 78vw);
}

.field-group {
  display: grid;
  gap: 0.4rem;
}

.field-group label,
.status-field label {
  font-weight: 600;
}

.status-field {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.field-error {
  color: #b42318;
}

.field-help {
  color: #667085;
}
</style>
