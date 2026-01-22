<template>
    <div>
        <div class="container-fluid page-grid min-vh-100">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-upload"
                        viewBox="0 0 16 16">
                        <path
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path
                            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                    </svg>
                    <span style="color: white; margin-left: 5px;">{{ title }}</span>
                </div>
                <div class="button-fullscreen d-flex flex-row align-items-center">
                    <div style="margin-right: 15px;">
                        <!--  <router-link to="/gestiondecompras/parametrosdecompras">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                                class="bi bi-sliders2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </router-link> -->
                    </div>
                </div>
            </div>
            <div class="card">
                <Toolbar class="mb-4 border-none">
                    <template #start>
                        <div class="d-flex flex-wrap gap-3 align-items-center">
                            <div class="d-flex flex-row align-items-center gap-2">
                                <label class="text-sm font-bold text-gray-600">Desde:</label>
                                <DatePicker v-model="filtros.desde" dateFormat="yy-mm-dd" showIcon
                                    class="p-inputtext-sm" />
                            </div>
                            <div class="d-flex flex-row align-items-center gap-2">
                                <label class="text-sm font-bold text-gray-600">Hasta:</label>
                                <DatePicker v-model="filtros.hasta" dateFormat="yy-mm-dd" showIcon
                                    class="p-inputtext-sm" />
                            </div>
                            <div class="d-flex flex-row align-items-center gap-2">
                                <Button icon="pi pi-search" label="Filtrar" @click="cargarDatos" severity="secondary"
                                    outlined />
                            </div>
                        </div>
                    </template>

                    <template #end>
                        <div class="d-flex gap-2 items-center flex-row">
                            <FileUpload mode="basic" name="archivo" :customUpload="true" @uploader="subirArchivo"
                                accept=".xlsx, .csv" :maxFileSize="5000000" chooseLabel="Importar"
                                chooseIcon="pi pi-upload" class="p-button-sm p-button-info" :auto="true" />
                            <Button label="Nuevo" icon="pi pi-plus" severity="success" class="p-button-sm"
                                @click="abrirDialogoNuevo" />
                        </div>
                    </template>
                </Toolbar>

                <div class="bg-white border-round-xl shadow-1 p-0 overflow-hidden">
                    <DataTable :value="registros" :loading="loading" editMode="row" dataKey="id"
                        v-model:editingRows="filasEditando" @row-edit-save="guardarEdicion" paginator :rows="10"
                        :rowsPerPageOptions="[10, 20, 50, 100]" class="p-datatable-sm" stripedRows scrollable
                        scrollHeight="55vh" tableStyle="min-width: 50rem">
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

                        <Column field="grupo" header="Grupo" sortable style="min-width: 150px">
                            <template #editor="{ data, field }">
                                <InputText v-model="data[field]" />
                            </template>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.grupo || 'Sin Grupo'"
                                    :severity="getSeverity(slotProps.data.grupo)" rounded />
                            </template>
                        </Column>

                        <Column field="valor" header="Valor" sortable style="min-width: 150px">
                            <template #editor="{ data, field }">
                                <InputText v-if="esFilaTexto(data.categoria)" v-model="data[field]" />
                                <InputNumber v-else v-model="data[field]" :minFractionDigits="0"
                                    :maxFractionDigits="2" />
                            </template>

                            <template #body="slotProps">
                                <span v-if="esFilaTexto(slotProps.data.categoria)" class="font-bold text-gray-800">
                                    {{ slotProps.data.valor }}
                                </span>

                                <span v-else-if="esFilaIndicador(slotProps.data.categoria)"
                                    class="text-blue-600 font-medium">
                                    {{ formatearNumero(slotProps.data.valor) }}
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
                <Dialog v-model:visible="dialogoNuevo" header="Nuevo Movimiento" :modal="true" class="p-fluid"
                    :style="{ width: '400px' }">
                    <div class="d-flex flex-column justify-content-between field mb-4 mt-2">
                        <label class="form-label" for="new-date">Fecha:</label>
                        <DatePicker id="new-date" v-model="nuevoItem.fecha" dateFormat="yy-mm-dd" class="w-full" />
                    </div>
                    <div class="d-flex flex-column field mb-4">
                        <label class="form-label" for="new-cat">Categoría:</label>
                        <InputText id="new-cat" v-model="nuevoItem.categoria" class="form-controlw-full" />
                    </div>
                    <div class="d-flex flex-column field mb-4">
                        <label class="form-label" for="new-grp">Grupo:</label>
                        <InputText id="new-grp" v-model="nuevoItem.grupo" class="form-controlw-full" />
                    </div>
                    <div class="d-flex flex-column field mb-2">
                        <label class="form-label mb-2 block text-sm">Monto:</label>
                        <InputNumber v-model="nuevoItem.valor" mode="currency" currency="ARS" locale="es-AR"
                            class="w-full" />
                    </div>
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" text @click="dialogoNuevo = false" />
                        <Button label="Guardar" icon="pi pi-check" @click="guardarNuevo" autofocus />
                    </template>
                </Dialog>
                <div v-if="loading" class="loading-overlay">
                    <ProgressSpinner strokeWidth="4" animationDuration=".5s" />
                </div>
                <Toast />
                <ConfirmDialog />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import dayjs from 'dayjs';

// COMPONENTES UI
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

// SERVICIOS
import FinanzasService from '../services/FinanzasService';

const toast = useToast();
const confirm = useConfirm();

// ESTADOS
const registros = ref([]);
const loading = ref(false);
const filasEditando = ref([]);
const dialogoNuevo = ref(false);
const filtros = ref({ desde: null, hasta: null });
const nuevoItem = ref({ fecha: null, categoria: '', valor: 0, grupo: '' });
const title = 'Importar Masivo de Finanzas';

// LOGICA
const cargarDatos = async () => {
    loading.value = true;
    try {
        const fDesde = filtros.value.desde ? dayjs(filtros.value.desde).format('YYYY-MM-DD') : null;
        const fHasta = filtros.value.hasta ? dayjs(filtros.value.hasta).format('YYYY-MM-DD') : null;
        const response = await FinanzasService.getRegistros(fDesde, fHasta);
        registros.value = response.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos', life: 3000 });
    } finally {
        loading.value = false;
    }
};

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
        await FinanzasService.updateRegistro(newData.id, datosListos);
        registros.value[index] = newData;
        toast.add({ severity: 'success', summary: 'Actualizado', detail: 'Registro modificado', life: 2000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar', life: 3000 });
    }
};

const guardarNuevo = async () => {
    try {
        const payload = { ...nuevoItem.value, fecha: dayjs(nuevoItem.value.fecha).format('YYYY-MM-DD') };
        await FinanzasService.createRegistro(payload);
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
            await FinanzasService.deleteRegistro(item.id);
            registros.value = registros.value.filter(r => r.id !== item.id);
            toast.add({ severity: 'success', summary: 'Eliminado', detail: 'Registro borrado', life: 3000 });
        }
    });
};

const abrirDialogoNuevo = () => { nuevoItem.value = { fecha: new Date(), categoria: '', valor: 0, grupo: '' }; dialogoNuevo.value = true; };
/* const formatearMoneda = (v) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(v); */
const formatearFecha = (f) => dayjs(f).format('DD/MM/YYYY');
const getSeverity = (g) => { if (!g) return 'secondary'; if (g === 'Disponibilidades') return 'success'; if (g === 'Pasivos') return 'danger'; return 'info'; };

// Detecta si la fila es de Texto (Semana)
const esFilaTexto = (categoria) => {
    if (!categoria) return false;
    return categoria.toLowerCase().includes('semana');
};

// Detecta si la fila es de Indicadores Numéricos (Días)
const esFilaIndicador = (categoria) => {
    if (!categoria) return false;
    const c = categoria.toLowerCase();
    return c.includes('días') || c.includes('dias') || c.includes('inventario') || c.includes('promedio');
};

// Formateador para números simples (sin $)
const formatearNumero = (valor) => {
    if (!valor) return '0';
    return new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(parseFloat(valor));
};

// (Tu formatearMoneda anterior sigue igual, pero asegúrate de hacer parseFloat porque ahora viene texto de la BD)
const formatearMoneda = (valor) => {
    if (!valor) return '$ 0,00';
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(parseFloat(valor));
};

onMounted(() => {
    const hoy = dayjs();
    filtros.value.hasta = hoy.toDate();
    filtros.value.desde = hoy.subtract(365, 'day').toDate();
    cargarDatos();
});
</script>

<style scoped>
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    border-radius: 8px;
}
</style>