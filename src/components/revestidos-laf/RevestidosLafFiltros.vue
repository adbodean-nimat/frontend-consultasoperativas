<template>
  <form class="laf-filters" @submit.prevent="emit('consultar')">
    <div class="field">
      <label for="laf-months">Meses anteriores</label>
      <input id="laf-months" class="form-control" type="number" min="1" :max="LIMITS.months" step="1" required
        :value="modelValue.months" @input="actualizar('months', $event.target.value)" />
      <small>Mes actual + {{ modelValue.months || '—' }} anteriores</small>
    </div>
    <div class="field">
      <label for="laf-days">Días de consumo</label>
      <input id="laf-days" class="form-control" type="number" min="1" :max="LIMITS.rotationDays" step="1" required
        :value="modelValue.rotationDays" @input="actualizar('rotationDays', $event.target.value)" />
      <small>Días de consumo para rotación</small>
    </div>
    <Button type="submit" label="Consultar" icon="pi pi-play" outlined :loading="cargando" :disabled="cargando" />
  </form>
</template>
<script setup>
import Button from 'primevue/button';
import { LIMITS } from '@/utils/revestidosLaf';
const props = defineProps({ modelValue: { type: Object, required: true }, cargando: Boolean });
const emit = defineEmits(['update:modelValue', 'consultar']);
const actualizar = (key, value) => emit('update:modelValue', { ...props.modelValue, [key]: value });
</script>
<style scoped>
.laf-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.field {
  display: grid;
  gap: .3rem;
  height: 100px;
}

.field label {
  font-weight: 500;
}

.field input {
  width: 12rem;
}

small {
  color: #536174;
}
</style>
