<template>
  <form class="config-form" @submit.prevent="enviar">
    <div v-if="nuevo" class="config-field">
      <label for="laf-config-codigo">{{ codigo.label }}</label>
      <input id="laf-config-codigo" v-model="form[definicion.key]" class="form-control" :type="codigo.type"
        required :min="codigo.type === 'number' ? 1 : undefined" :max="codigo.type === 'number' ? codigo.max : undefined"
        :step="codigo.type === 'number' ? 1 : undefined" :maxlength="codigo.max" :pattern="codigo.pattern" :disabled="guardando" />
    </div>
    <p v-else>Código: <strong>{{ registro[definicion.key] }}</strong></p>
    <div v-for="field in definicion.fields" :key="field.key" class="config-field">
      <label :for="`laf-config-${field.key}`">{{ field.label }}</label>
      <div v-if="field.type === 'boolean'" class="config-toggle">
        <ToggleSwitch :inputId="`laf-config-${field.key}`" v-model="form[field.key]" :disabled="guardando" />
        <span aria-live="polite">{{ form[field.key] ? 'Activo' : 'Inactivo' }}</span>
      </div>
      <textarea v-else-if="field.key === 'notas'" :id="`laf-config-${field.key}`" v-model="form[field.key]" class="form-control" :maxlength="field.max" :disabled="guardando" />
      <input v-else :id="`laf-config-${field.key}`" v-model="form[field.key]" class="form-control" :type="field.type"
        :required="!field.nullable" :min="field.type === 'number' ? 1 : undefined" :max="field.type === 'number' ? field.max : undefined"
        :step="field.type === 'number' ? 1 : undefined" :maxlength="field.type === 'text' ? field.max : undefined" :pattern="field.pattern" :disabled="guardando" />
    </div>
    <Message v-if="error || validation" severity="error" :closable="false">{{ error || validation }}</Message>
    <Button type="submit" :label="nuevo ? 'Agregar' : 'Guardar cambios'" icon="pi pi-check" :loading="guardando" :disabled="guardando" />
  </form>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ToggleSwitch from 'primevue/toggleswitch';
import { payloadConfiguracion, payloadCreacion, campoCodigo } from '@/utils/revestidosLafConfiguracion';
const props = defineProps({ registro: { type: Object, required: true }, definicion: { type: Object, required: true }, nuevo: Boolean, guardando: Boolean, error: String });
const emit = defineEmits(['guardar']);
const codigo = computed(() => props.nuevo ? campoCodigo(props.definicion.resource) : null);
const form = reactive({ [props.definicion.key]: props.registro[props.definicion.key] ?? '',
  ...Object.fromEntries(props.definicion.fields.map(f => [f.key, props.registro[f.key] ?? ''])) });
const validation = ref('');
function enviar() {
  if (props.guardando) return;
  try { const payload = (props.nuevo ? payloadCreacion : payloadConfiguracion)(props.definicion.resource, form); validation.value = ''; emit('guardar', payload); }
  catch (err) { validation.value = err.message; }
}
</script>
<style scoped>
.config-form { display: grid; gap: 1rem; min-width: min(30rem, 75vw); }
.config-field { display: grid; gap: .3rem; }
.config-toggle { display: flex; align-items: center; gap: .75rem; min-height: 2rem; }
</style>
