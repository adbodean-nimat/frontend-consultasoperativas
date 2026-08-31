<template>
  <section class="filters" aria-label="Filtros de productos">
    <div class="filter">
      <label for="rotacion-comprador">Comprador</label>
      <MultiSelect id="rotacion-comprador" :modelValue="modelValue.compradores" :options="opciones.compradores"
        optionLabel="label" optionValue="value" optionDisabled="disabled" placeholder="Todos" filter display="chip"
        :maxSelectedLabels="1" :loading="compradoresCargando" emptyMessage="No hay compradores disponibles" fluid
        @update:modelValue="update('compradores', $event)" />
    </div>

    <div v-for="classification in classifications" :key="classification.key" class="filter">
      <label :for="`rotacion-${classification.key}`" :title="classification.longLabel">{{ classification.label
      }}</label>
      <MultiSelect :id="`rotacion-${classification.key}`" :modelValue="modelValue[classification.key]"
        :options="opciones[classification.key]" optionLabel="label" optionValue="value" optionDisabled="disabled"
        placeholder="Todas" filter display="chip" :maxSelectedLabels="1" :loading="clasificacionesCargando"
        emptyMessage="No hay clasificaciones disponibles" fluid
        @update:modelValue="update(classification.key, $event)" />
    </div>

    <div class="filter">
      <label for="rotacion-stock">Stock disponible</label>
      <Select id="rotacion-stock" :modelValue="modelValue.stock" :options="stockOptions" optionLabel="label"
        optionValue="value" placeholder="Todos" showClear fluid @update:modelValue="update('stock', $event)" />
    </div>

    <div class="filter">
      <label for="rotacion-exhibicion">Exhibición</label>
      <Select id="rotacion-exhibicion" :modelValue="modelValue.exhibicion" :options="exhibitionOptions"
        optionLabel="label" optionValue="value" placeholder="Todos" showClear fluid
        @update:modelValue="update('exhibicion', $event)" />
    </div>

    <fieldset class="filter days-filter">
      <legend>Días sin venta</legend>
      <InputNumber inputId="rotacion-dias-desde" :modelValue="modelValue.diasDesde" placeholder="Desde" :min="0"
        :maxFractionDigits="0" fluid @update:modelValue="update('diasDesde', $event)" />
      <span class="mx-1" aria-hidden="true">a</span>
      <InputNumber inputId="rotacion-dias-hasta" :modelValue="modelValue.diasHasta" placeholder="Hasta" :min="0"
        :maxFractionDigits="0" fluid @update:modelValue="update('diasHasta', $event)" />
    </fieldset>
  </section>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
import Select from "primevue/select";

const props = defineProps({
  modelValue: { type: Object, required: true },
  opciones: { type: Object, required: true },
  compradoresCargando: Boolean,
  clasificacionesCargando: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const classifications = [
  { key: "clasificacion4", label: "Clasif. 4", longLabel: "Clasificación 4" },
  { key: "clasificacion5", label: "Clasif. 5", longLabel: "Clasificación 5" },
  { key: "clasificacion6", label: "Clasif. 6", longLabel: "Clasificación 6" },
  { key: "clasificacion8", label: "Clasif. 8", longLabel: "Clasificación 8" },
];
const stockOptions = [
  { label: "Positivo", value: "positivo" },
  { label: "Cero", value: "cero" },
  { label: "Negativo", value: "negativo" },
];
const exhibitionOptions = [
  { label: "Con exhibición", value: "con" },
  { label: "Sin exhibición", value: "sin" },
];

function update(field, value) {
  emit("update:modelValue", { ...props.modelValue, [field]: value });
}
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 12px;
}

.filter {
  min-width: 0;
}

.filter label,
.filter legend {
  display: block;
  margin-bottom: .35rem;
  color: #344054;
  font-size: .83rem;
  font-weight: 600;
}

.days-filter {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0;
  border: 0;
  margin: 0;
}

.days-filter legend {
  grid-column: 1 / -1;
}

@media (max-width: 1200px) {
  .filters {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
  }
}

@media (max-width: 900px) {
  .filters {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 600px) {
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
