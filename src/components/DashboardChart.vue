<template>
    <div class="h-full d-flex flex-column directive-fullscreen-wrapper bg-white">

        <Toolbar class="mb-4 border-none">
            <template #start>
                <div class="d-flex flex-wrap gap-3 items-center">
                    <div class="d-flex flex-row align-items-center gap-2 p-2">
                        <label class="text-sm font-bold text-gray-600">Desde:</label>
                        <DatePicker v-model="filtros.desde" dateFormat="yy-mm-dd" showIcon class="p-inputtext-sm"
                            :maxDate="filtros.hasta" />
                    </div>

                    <div class="d-flex flex-row align-items-center gap-2 p-2">
                        <label class="text-sm font-bold text-gray-600">Hasta:</label>
                        <DatePicker v-model="filtros.hasta" dateFormat="yy-mm-dd" showIcon class="p-inputtext-sm"
                            :minDate="filtros.desde" />
                    </div>

                    <div class="d-flex d-flex flex-row align-items-center gap-2 p-2 w-64">
                        <label class="text-sm font-bold text-gray-600">Comparar Grupos</label>
                        <MultiSelect v-model="gruposSeleccionados" :options="listaGrupos" placeholder="Grupos..."
                            display="chip" :maxSelectedLabels="2" class="w-full p-inputtext-sm" />
                    </div>
                </div>
            </template>

            <template #end>
                <Button icon="pi pi-refresh" rounded text severity="secondary" @click="cargarDatosBase"
                    v-tooltip="'Actualizar Gráfico'" />
                <Button rounded text severity="secondary" v-fullscreen="options" class="ms-2 me-2"
                    style="height: 39px;">
                    <span v-show="vfullscreen" class="pi pi-arrow-down-left-and-arrow-up-right-to-center"></span>
                    <span v-show="!vfullscreen" class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></span>
                </Button>
            </template>
        </Toolbar>

        <div class="grow relative w-full bg-white border-round-xl shadow-1 p-3">
            <Chart type="line" :data="chartData" :options="chartOptions" class="h-full w-full" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import Chart from 'primevue/chart';
import MultiSelect from 'primevue/multiselect';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar'; // <--- Importamos Toolbar
import FinanzasService from '../services/FinanzasService';
import dayjs from 'dayjs';
import { directive, directive as fullscreen } from 'vue-fullscreen';

// --- ESTADO ---
const datosBrutos = ref([]);
const listaGrupos = ref([]);
const gruposSeleccionados = ref([]);
const filtros = ref({ desde: null, hasta: null });
const vfullscreen = ref(false);

// Configuración Chart.js
const chartData = ref({ labels: [], datasets: [] });
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 3,
    interaction: { mode: 'index', intersect: false },
    plugins: {
        legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } },
        tooltip: {
            padding: 10,
            cornerRadius: 8,
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: false,
            grid: { color: '#f3f4f6' },
            ticks: {
                font: { size: 11 },
                callback: (value) => new Intl.NumberFormat('es-AR', { notation: "compact", compactDisplay: "short", style: 'currency', currency: 'ARS' }).format(value)
            }
        },
        x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
        }
    }
});

// Colores
const mapaColores = {
    'Disponibilidades': '#22c55e', // Verde
    'Pasivos': '#ef4444',          // Rojo
    'Activos': '#3b82f6',          // Azul
    'Patrimonio': '#f59e0b'        // Naranja
};
const coloresDefault = ['#8B5CF6', '#EC4899', '#6366F1'];

// --- LÓGICA ---
const cargarDatosBase = async () => {
    try {
        const fDesde = filtros.value.desde ? dayjs(filtros.value.desde).format('YYYY-MM-DD') : null;
        const fHasta = filtros.value.hasta ? dayjs(filtros.value.hasta).format('YYYY-MM-DD') : null;

        const res = await FinanzasService.getRegistros(fDesde, fHasta);
        datosBrutos.value = res.data;

        const setGrupos = new Set(res.data.map(item => item.grupo).filter(g => g && g.trim() !== ''));
        listaGrupos.value = [...setGrupos].sort();

        if (gruposSeleccionados.value.length === 0) gruposSeleccionados.value = listaGrupos.value;

        procesarDatosPorGrupo();
    } catch (error) {
        console.error("Error cargando gráfico", error);
    }
};

const procesarDatosPorGrupo = () => {
    if (!datosBrutos.value.length) return;
    const setFechas = new Set(datosBrutos.value.map(d => dayjs(d.fecha).format('YYYY-MM-DD')));
    const fechasOrdenadas = [...setFechas].sort();

    const datasets = gruposSeleccionados.value.map((nombreGrupo, index) => {
        const datosDelGrupo = datosBrutos.value.filter(d => d.grupo === nombreGrupo);
        const dataValues = fechasOrdenadas.map(fechaEje => {
            const registrosDia = datosDelGrupo.filter(d => dayjs(d.fecha).format('YYYY-MM-DD') === fechaEje);
            return registrosDia.reduce((acc, curr) => acc + parseFloat(curr.valor || 0), 0);
        });

        const color = mapaColores[nombreGrupo] || coloresDefault[index % coloresDefault.length];

        return {
            label: nombreGrupo,
            data: dataValues,
            fill: false,
            borderColor: color,
            backgroundColor: color,
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 0, // Más limpio sin puntos (aparecen al pasar mouse)
            pointHoverRadius: 6
        };
    });

    chartData.value = {
        labels: fechasOrdenadas.map(f => dayjs(f).format('DD/MM')),
        datasets: datasets
    };
};

onMounted(() => {
    const hoy = dayjs();
    filtros.value.hasta = hoy.toDate();
    filtros.value.desde = hoy.subtract(365, 'days').toDate();
    cargarDatosBase();
});

const vFullscreen = directive;

const options = computed(() => {
    return {
        callback: (isFullscreen) => {
            vfullscreen.value = isFullscreen;
        },
        target: '.directive-fullscreen-wrapper',
        pageOnly: true,
        teleport: true
    };
});

watch([() => filtros.value.desde, () => filtros.value.hasta], cargarDatosBase);
watch(gruposSeleccionados, procesarDatosPorGrupo);
</script>