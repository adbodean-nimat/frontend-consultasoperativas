<template>
    <div class="container-fluid page-grid min-vh-100">
        <div class="encabezado-titulo">
            <div style="margin-left: 5px; color: white;" class="icon-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-graph-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
                </svg>
                <span style="color: white; margin-left: 5px;">{{ title }}</span>
            </div>
            <div class="button-fullscreen d-flex flex-row align-items-center">
                <div style="margin-right: 15px;">

                </div>
            </div>
        </div>
        <div class="card p-4 relative min-h-screen surface-ground">

            <div v-if="loading" class="loading-overlay">
                <ProgressSpinner strokeWidth="4" animationDuration=".5s" />
            </div>

            <Toast />
            <ConfirmDialog />

            <!-- <div class="mb-4">
                <h1 class="text-3xl font-bold text-gray-800 m-0">Finanzas</h1>
            </div> -->

            <Tabs value="0">
                <TabList>
                    <Tab value="0" class="d-flex gap-2 font-semibold"><i class="pi pi-chart-line"></i> Tablero</Tab>
                    <Tab value="1" class="d-flex gap-2 font-semibold"><i class="pi pi-table"></i> Tabla de Datos</Tab>
                </TabList>

                <TabPanels class="mt-3">

                    <TabPanel value="0" class="p-0">
                        <DashboardChart style="height: auto;" />
                    </TabPanel>

                    <TabPanel value="1" class="p-0">

                        <Toolbar class="mb-3 border-none">
                            <template #start>
                                <div class="d-flex flex-column gap-2">

                                    <SelectButton v-model="tipoTablaSeleccionada" :options="opcionesTablas"
                                        optionLabel="name" optionValue="value" class="mb-2" />

                                    <div class="d-flex flex-wrap gap-3 align-items-center">
                                        <div class="d-flex flex-row align-items-center gap-2">
                                            <label class="text-xs font-bold text-gray-500">Desde:</label>
                                            <DatePicker v-model="filtros.desde" dateFormat="yy-mm-dd" showIcon
                                                class="p-inputtext-sm" />
                                        </div>
                                        <div class="d-flex flex-row align-items-center gap-2">
                                            <label class="text-xs font-bold text-gray-500">Hasta:</label>
                                            <DatePicker v-model="filtros.hasta" dateFormat="yy-mm-dd" showIcon
                                                class="p-inputtext-sm" />
                                        </div>
                                        <div class="d-flex flex-row align-items-center gap-2">
                                            <Button icon="pi pi-search" label="Filtrar" @click="cargarDatos"
                                                severity="secondary" outlined />
                                        </div>

                                    </div>
                                </div>
                            </template>

                            <template #end>
                                <!-- <div class="flex gap-2 mt-auto">
                                <FileUpload mode="basic" name="archivo" :customUpload="true" @uploader="subirArchivo"
                                    accept=".xlsx, .csv" :auto="true" chooseLabel="Importar"
                                    class="p-button-sm p-button-info" />
                                <Button label="Nuevo" icon="pi pi-plus" severity="success" class="p-button-sm"
                                    @click="abrirDialogoNuevo" />
                            </div> -->
                            </template>
                        </Toolbar>

                        <div class="bg-white border-round-xl shadow-1 p-0 overflow-hidden">
                            <DataTable :value="registros" :loading="loading" editMode="row" dataKey="id"
                                v-model:editingRows="filasEditando" @row-edit-save="guardarEdicion" paginator :rows="10"
                                :rowsPerPageOptions="[10, 20, 50, 100]" class="p-datatable-sm" stripedRows scrollable
                                scrollHeight="55vh">
                                <Column field="fecha" header="Fecha" sortable style="min-width: 120px">
                                    <template #editor="{ data, field }">
                                        <DatePicker v-model="data[field]" dateFormat="yy-mm-dd" />
                                    </template>
                                    <template #body="slotProps">
                                        <span class="text-gray-700 font-medium">{{ formatearFecha(slotProps.data.fecha)
                                        }}</span>
                                    </template>
                                </Column>

                                <Column field="categoria" header="Categoría" sortable style="min-width: 200px">
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" />
                                    </template>
                                </Column>

                                <Column field="grupo" header="Grupo" sortable style="min-width: 150px"
                                    v-if="tipoTablaSeleccionada === 'dia'">
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" />
                                    </template>
                                    <template #body="slotProps">
                                        <Tag :value="slotProps.data.grupo || '-'"
                                            :severity="getSeverity(slotProps.data.grupo)" rounded />
                                    </template>
                                </Column>

                                <Column field="valor" header="Valor / Dato" sortable style="min-width: 150px">
                                    <template #editor="{ data, field }">
                                        <InputText
                                            v-if="tipoTablaSeleccionada === 'semana' || tipoTablaSeleccionada === 'otros'"
                                            v-model="data[field]" />
                                        <InputNumber v-else v-model="data[field]" :minFractionDigits="0"
                                            :maxFractionDigits="2" />
                                    </template>

                                    <template #body="slotProps">
                                        <span
                                            v-if="tipoTablaSeleccionada === 'semana' || tipoTablaSeleccionada === 'otros'"
                                            class="font-bold text-gray-800">
                                            {{ slotProps.data.valor }}
                                        </span>
                                        <span v-else-if="tipoTablaSeleccionada === 'indicadores'"
                                            class="text-blue-600 font-medium">
                                            {{ slotProps.data.valor }}
                                        </span>
                                        <span v-else
                                            :class="parseFloat(slotProps.data.valor) < 0 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'">
                                            {{ formatearMoneda(slotProps.data.valor) }}
                                        </span>
                                    </template>
                                </Column>

                                <Column :rowEditor="true" style="width: 4rem" bodyStyle="text-align:center"></Column>
                                <Column style="width: 3rem" bodyStyle="text-align:center">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-trash" rounded text severity="danger"
                                            @click="confirmarBorrado(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Dialog v-model:visible="dialogoNuevo" :header="'Nuevo Registro - ' + nombreTablaActual" :modal="true"
                class="p-fluid" :style="{ width: '400px' }">
                <div class="field mb-4 mt-2">
                    <span class="p-float-label">
                        <DatePicker id="new-date" v-model="nuevoItem.fecha" dateFormat="yy-mm-dd" class="w-full" />
                        <label for="new-date">Fecha</label>
                    </span>
                </div>
                <div class="field mb-4">
                    <span class="p-float-label">
                        <InputText id="new-cat" v-model="nuevoItem.categoria" class="w-full" /><label
                            for="new-cat">Categoría</label>
                    </span>
                </div>

                <div class="field mb-4" v-if="tipoTablaSeleccionada === 'dia'">
                    <span class="p-float-label">
                        <InputText id="new-grp" v-model="nuevoItem.grupo" class="w-full" /><label
                            for="new-grp">Grupo</label>
                    </span>
                </div>

                <div class="field mb-2">
                    <label class="mb-2 block text-sm">Valor</label>
                    <InputText v-if="tipoTablaSeleccionada === 'semana' || tipoTablaSeleccionada === 'otros'"
                        v-model="nuevoItem.valor" class="w-full" />
                    <InputNumber v-else v-model="nuevoItem.valor" mode="currency" currency="ARS" locale="es-AR"
                        class="w-full" />
                </div>

                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" text @click="dialogoNuevo = false" />
                    <Button label="Guardar" icon="pi pi-check" @click="guardarNuevo" autofocus />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import dayjs from 'dayjs';

// Imports UI
import SelectButton from 'primevue/selectbutton'; // <--- IMPORTANTE
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Tag from 'primevue/tag';

import DashboardChart from '../components/DashboardChart.vue';
import FinanzasService from '../services/FinanzasService';

const toast = useToast();
const confirm = useConfirm();

// --- ESTADOS ---
const registros = ref([]);
const loading = ref(false);
const filasEditando = ref([]);
const dialogoNuevo = ref(false);
const filtros = ref({ desde: null, hasta: null });
const nuevoItem = ref({ fecha: null, categoria: '', valor: 0, grupo: '' });
const title = 'Tablero gráfico de Finanzas';

// CONTROL DE TABLAS
const tipoTablaSeleccionada = ref('dia');
const opcionesTablas = ref([
    { name: 'Finanzas ($)', value: 'dia' },
    { name: 'Indicadores', value: 'indicadores' },
    { name: 'Semanas', value: 'semana' },
    { name: 'Otros', value: 'otros' }
]);

const nombreTablaActual = computed(() => {
    const op = opcionesTablas.value.find(o => o.value === tipoTablaSeleccionada.value);
    return op ? op.name : '';
});

// LOGICA DE CARGA
const cargarDatos = async () => {
    loading.value = true;
    registros.value = []; // Limpiar antes de cargar para efecto visual
    try {
        const fDesde = filtros.value.desde ? dayjs(filtros.value.desde).format('YYYY-MM-DD') : null;
        const fHasta = filtros.value.hasta ? dayjs(filtros.value.hasta).format('YYYY-MM-DD') : null;

        // ENVIAMOS EL TIPO DE TABLA
        const response = await FinanzasService.getRegistros(fDesde, fHasta, tipoTablaSeleccionada.value);
        registros.value = response.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos', life: 3000 });
    } finally {
        loading.value = false;
    }
};

// Recargar cuando cambian de tabla
watch(tipoTablaSeleccionada, () => {
    cargarDatos();
});

const subirArchivo = async (event) => {
    const file = event.files[0];
    const formData = new FormData();
    formData.append('archivo', file);
    try {
        loading.value = true;
        const res = await FinanzasService.uploadExcel(formData);
        toast.add({ severity: 'success', summary: 'Carga Exitosa', detail: `${res.data.registros} registros procesados`, life: 4000 });
        cargarDatos();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al procesar archivo', life: 3000 });
    } finally {
        loading.value = false;
    }
};

const guardarEdicion = async (event) => {
    const { newData, index } = event;
    try {
        const datosListos = { ...newData, fecha: dayjs(newData.fecha).format('YYYY-MM-DD') };
        // ENVIAMOS TIPO
        await FinanzasService.updateRegistro(newData.id, datosListos, tipoTablaSeleccionada.value);
        registros.value[index] = newData;
        toast.add({ severity: 'success', summary: 'Actualizado', detail: 'Registro modificado', life: 2000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar', life: 3000 });
    }
};

const guardarNuevo = async () => {
    try {
        const payload = { ...nuevoItem.value, fecha: dayjs(nuevoItem.value.fecha).format('YYYY-MM-DD') };
        // ENVIAMOS TIPO
        await FinanzasService.createRegistro(payload, tipoTablaSeleccionada.value);
        dialogoNuevo.value = false;
        cargarDatos();
        toast.add({ severity: 'success', summary: 'Creado', detail: 'Registro agregado', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Fallo al crear', life: 3000 });
    }
};

const confirmarBorrado = (item) => {
    confirm.require({
        message: `¿Eliminar ${item.categoria}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            // ENVIAMOS TIPO
            await FinanzasService.deleteRegistro(item.id, tipoTablaSeleccionada.value);
            registros.value = registros.value.filter(r => r.id !== item.id);
            toast.add({ severity: 'success', summary: 'Eliminado', detail: 'Registro borrado', life: 3000 });
        }
    });
};

const abrirDialogoNuevo = () => { nuevoItem.value = { fecha: new Date(), categoria: '', valor: 0, grupo: '' }; dialogoNuevo.value = true; };
const formatearMoneda = (v) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(v);
const formatearFecha = (f) => dayjs(f).format('DD/MM/YYYY');
const getSeverity = (g) => { if (!g) return 'secondary'; if (g === 'Disponibilidades') return 'success'; if (g === 'Pasivos') return 'danger'; return 'info'; };

onMounted(() => {
    const hoy = dayjs();
    filtros.value.hasta = hoy.toDate();
    filtros.value.desde = hoy.subtract(30, 'day').toDate();
    cargarDatos();
});
</script>