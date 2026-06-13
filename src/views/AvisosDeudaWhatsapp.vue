<template>
    <div class="avisosdeudawhatsapp-page">
        <div class="container-fluid page-grid d-flex flex-column">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-whatsapp"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    <span class="ms-2 text-white">{{ title }}</span>
                </div>
                <div class="button-fullscreen d-flex flex-row align-items-center">
                    <div style="margin-right: 15px;">
                        <!-- <router-link :to="{ name: 'parametrosexhibicion' }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                                class="bi bi-sliders2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </router-link> -->
                    </div>
                </div>
            </div>
            <Dialog v-model:visible="visible" modal header="Configuración de envío por WhatsApp"
                @after-hide="cargarEstado">
                <div class="container">
                    <Divider align="left">
                        <strong>Estado de envío de avisos deuda vencida automáticos</strong>
                    </Divider>
                    <div class="d-flex flex-column gap-3 mb-4">
                        <div class="mb-2">
                            <strong>Estado:</strong>
                            <Tag :value="estadoTexto" :severity="estadoSeverity" class="ms-2" size="small" />

                            <span class="ms-3">
                                <strong>Activo DB:</strong>
                                {{ estado?.activo ? 'Sí' : 'No' }}
                            </span>
                        </div>

                        <div class="d-flex mb-2 gap-2">

                            <Button v-if="estado?.activo === false" label="Iniciar" icon="pi pi-play" severity="success"
                                @click="iniciar" size="small" />

                            <Button v-else-if="estado?.activo === true" label="Detener" icon="pi pi-stop"
                                severity="danger" @click="detener" size="small" />

                            <Button label="Estado" icon="pi pi-refresh" severity="info" @click="cargarEstado"
                                size="small" />
                        </div>
                    </div>
                    <Divider align="left">
                        <strong>Fecha de envío de avisos deuda vencida automáticos</strong>
                    </Divider>
                    <div class="d-flex gap-2 mb-4">
                        <div>
                            <label>Día de envío: </label>
                            <Select v-model="configCron.diaSemana" :options="diasSemana" optionLabel="label"
                                optionValue="value" class="w-full ms-2" size="small" />
                        </div>

                        <div>
                            <label>Hora de envío: </label>
                            <DatePicker v-model="configCron.hora" timeOnly hourFormat="24" class="w-full ms-2"
                                size="small" />
                        </div>

                        <div>
                            <Button label="Guardar" icon="pi pi-save" severity="primary" @click="guardarConfigCron"
                                size="small" />
                        </div>
                    </div>
                </div>
            </Dialog>
            <Panel class="mb-2" toggleable style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-filter me-2"></i>
                        <span class="font-bold">Filtros de búsqueda</span>
                    </div>
                </template>
                <template #toggleicon="{ collapsed }">
                    <i class="pi pi-angle-down" v-if="collapsed"></i>
                    <i class="pi pi-angle-up" v-else></i>
                </template>
                <template #icons>
                    <Button v-if="isAllow === 'abodean' || isAllow === 'dvazquez' || isAllow === 'ejescobar'"
                        icon="pi pi-cog" severity="secondary" rounded text @click="visible = true" />
                </template>
                <div class="filtros">
                    <div class="filtros-grid">
                        <div class="d-flex gap-2 mb-4">
                            <div class="me-3">
                                <label>Buscar por fecha de envío: </label>
                                <DatePicker v-model="fechaFiltro" dateFormat="dd/mm/yy" showIcon
                                    placeholder="Seleccionar fecha" class="w-full ms-2" />
                            </div>
                            <div class="me-3">
                                <label>Buscar por tipo de envío: </label>
                                <Select v-model="filtroTipoEnvio" :options="[
                                    { label: 'Todos', value: 'TODOS' },
                                    { label: 'CLIENTE', value: 'CLIENTE' },
                                    { label: 'REVENDEDOR', value: 'REVENDEDOR' }
                                ]" optionLabel="label" optionValue="value" class="w-full ms-2" size="small" />
                            </div>
                        </div>

                        <div class="filtro-item mt-4 col-12 md:col-4 flex align-items-end gap-2">
                            <Button label="Filtrar" icon="pi pi-search" severity="info" @click="cargarLogs" size="small"
                                :loading="loading" />

                            <Button label="Limpiar" icon="pi pi-times" severity="secondary" outlined
                                @click="limpiarFiltroFecha" class="ms-2" size="small" />
                        </div>
                    </div>
                </div>
            </Panel>
            <div class="row mb-2">
                <div class="col-12 col-md-4">
                    <Card>
                        <template #title>
                            <i class="pi pi-send me-2 text-success"></i>
                            Total notificado</template>
                        <template #content>
                            <div class="fs-4 fw-bold">
                                {{ this.formatMoney(this.resumen.total_notificado) }}
                            </div>
                        </template>
                    </Card>
                </div>

                <div class="col-12 col-md-4">
                    <Card>
                        <template #title>
                            <i class="pi pi-check-circle me-2 text-success"></i>
                            Envíos OK
                        </template>
                        <template #content>
                            <div class="fs-4 fw-bold">
                                {{ this.resumen.cantidad_envios }}
                            </div>
                        </template>
                    </Card>
                </div>

                <div class="col-12 col-md-4">
                    <Card>
                        <template #title>
                            <i class="pi pi-exclamation-circle me-2 text-danger"></i>
                            Errores</template>
                        <template #content>
                            <div class="fs-4 fw-bold">
                                {{ resumen.cantidad_errores }}
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <Card class="my-0 directive-fullscreen-wrapper-grid vh-height mb-2">
                <template #content>

                    <div v-if="isAllow === 'abodean' || isAllow === 'dvazquez' || isAllow === 'ejescobar'" class="mb-4">
                        <strong>Estado de envío de avisos deuda vencida automáticos:</strong>
                        <Tag :value="estadoTexto" :severity="estadoSeverity" class="ms-2" size="sm" />
                    </div>

                    <DataTable v-model:filters="filters" :value="logs" :loading="loading" scrollable paginator
                        :rows="20" dataKey="id" filterDisplay="row" :rowsPerPageOptions="[20, 50, 250, 500]" stripedRows
                        showGridlines resizableColumns columnResizeMode="fit" tableStyle="min-width: 50rem"
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} a {last} de {totalRecords}">

                        <template #empty>No encuentro registros.</template>

                        <template #loading>Cargando. Por favor, espere. </template>

                        <Column field="enviado_en" header="Fecha de envío">
                            <template #body="{ data }">
                                {{ formatDateTime(data.enviado_en) }}
                            </template>
                        </Column>

                        <Column field="estado" header="Estado">
                            <template #body="{ data }">
                                <Tag :value="data.estado" :severity="getEstadoSeverity(data.estado)" />
                            </template>
                            <template #filter="{ filterModel, filterCallback }">
                                <Select v-model="filterModel.value" :options="[
                                    { label: 'ENVIADO', value: 'ENVIADO' },
                                    { label: 'ERROR', value: 'ERROR' },
                                    { label: 'SIN_PDF', value: 'SIN_PDF' },
                                    { label: 'SIN_TELEFONO', value: 'SIN_TELEFONO' }
                                ]" optionLabel="label" optionValue="value" class="w-full" @change="filterCallback"
                                    placeholder="Filtrar por estado" />
                            </template>
                        </Column>

                        <Column field="tipo_envio" header="Tipo de envío">
                            <template #body="{ data }">
                                <Tag :value="data.tipo_envio" :severity="getTipoEnvioSeverity(data.tipo_envio)" />
                            </template>
                            <template #filter="{ filterModel, filterCallback }">
                                <Select v-model="filterModel.value" :options="[
                                    { label: 'CLIENTE', value: 'CLIENTE' },
                                    { label: 'REVENDEDOR', value: 'REVENDEDOR' }
                                ]" optionLabel="label" optionValue="value" class="w-full" @change="filterCallback"
                                    placeholder="Filtrar por tipo de envio" />
                            </template>
                        </Column>

                        <Column field="cliente_id" header="Cliente">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    placeholder="Buscar por cliente" />
                            </template>
                        </Column>

                        <Column field="cliente_nombre" header="Nombre">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    placeholder="Buscar por nombre" />
                            </template>
                        </Column>

                        <Column field="telefono" header="WhatsApp">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                    placeholder="Buscar por telefono" />
                            </template>
                        </Column>

                        <Column field="cantidad_comprobantes" header="Comprobantes" />

                        <Column field="total_saldo" header="Total deuda">
                            <template #body="{ data }">
                                <strong>{{ formatMoney(data.total_saldo) }}</strong>
                            </template>
                        </Column>

                        <Column header="PDF">
                            <template #body="{ data }">
                                <Button label="Ver PDF" icon="pi pi-file-pdf" severity="danger" size="small" outlined
                                    :disabled="!data.pdf_filename" @click="verPdf(data.id)" />
                            </template>
                        </Column>

                        <Column field="error_message" header="Error">
                            <template #body="{ data }">
                                <span class="text-red-600">
                                    {{ data.error_message || '-' }}
                                </span>
                            </template>
                        </Column>
                    </DataTable>
                </template>
            </Card>
        </div>
        <Toast position="bottom-right" />
    </div>
</template>

<script>
import axios from 'axios';
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import { FilterMatchMode } from '@primevue/core/api';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Badge from 'primevue/badge';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';

export default {
    name: 'AvisosDeudaWhatsapp',
    data: () => ({
        title: 'Consulta de avisos de deuda vencida por WhatsApp',
        estado: null,
        logs: [],
        resumen: [{
            total_notificado: 0,
            cantidad_envios: 0,
            cantidad_errores: 0
        }],
        loading: false,
        token: decodeJwt(getToken()).token,
        isAllow: decodeJwt(getToken()).user.sAMAccountName,
        configCron: {
            diaSemana: 3,
            hora: new Date(2026, 0, 1, 7, 0)
        },
        diasSemana: [
            { label: 'Lunes', value: 1 },
            { label: 'Martes', value: 2 },
            { label: 'Miércoles', value: 3 },
            { label: 'Jueves', value: 4 },
            { label: 'Viernes', value: 5 },
            { label: 'Sábado', value: 6 },
            { label: 'Domingo', value: 0 }
        ],
        fechaFiltro: null,
        filtroTipoEnvio: 'TODOS',
        useToast,
        visible: false,
        filters: {
            cliente_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            cliente_nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            telefono: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            estado: { value: null, matchMode: FilterMatchMode.EQUALS },
            tipo_envio: { value: null, matchMode: FilterMatchMode.EQUALS }
        },
    }),
    components: {
        Toast,
        Card,
        DataTable,
        Column,
        Button,
        Tag,
        Select,
        DatePicker,
        Panel,
        Dialog,
        Divider,
        Badge,
        InputText
    },
    computed: {
        estadoTexto() {
            if (!this.estado) return 'SIN DATOS';

            return this.estado.cron === 'idle' ? 'ACTIVO'
                : this.estado.cron === 'running' ? 'EN EJECUCIÓN'
                    : this.estado.cron === 'stopped' ? 'DETENIDO'
                        : this.estado.cron === 'detroyed' ? 'DESTRUIDO'
                            : 'NO INICIALIZADO';
        },
        estadoSeverity() {
            if (!this.estado) return 'secondary';
            if (this.estado.activo) return 'success';
            return 'danger';
        }
    },
    methods: {
        formatMoney(value) {
            const number = Number(value || 0);

            return new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 2
            }).format(number);
        },
        formatDateParam(date) {
            if (!date) return null;

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        async limpiarFiltroFecha() {
            this.fechaFiltro = null;
            //await this.cargarLogs();
        },
        cronToForm(cronSchedule) {
            if (!cronSchedule) return;

            const parts = cronSchedule.split(' ');
            const minuto = Number(parts[0]);
            const hora = Number(parts[1]);
            const diaSemana = Number(parts[4]);

            this.configCron.diaSemana = diaSemana;
            this.configCron.hora = new Date(2026, 0, 1, hora, minuto);
        },
        async guardarConfigCron() {
            const hora = this.configCron.hora;
            const cronSchedule = `${hora.getMinutes()} ${hora.getHours()} * * ${this.configCron.diaSemana}`;
            try {
                await axios.put(`${process.env.VUE_APP_API_BASE}` + '/cron/avisosdeudavencida/config', {
                    cron_schedule: cronSchedule,
                    timezone: 'America/Argentina/Buenos_Aires'
                },
                    {
                        headers: { Authorization: `Bearer ${this.token}` }
                    }
                );
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Configuración guardada.', life: 3000 });
                await this.cargarEstado();
            }
            catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar la configuración.', life: 3000 });
            }


        },
        async cargarEstado() {
            try {
                const { data } = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/cron/avisosdeudavencida/status', {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                this.estado = data;
                if (data.cron_schedule) {
                    this.cronToForm(data.cron_schedule);
                }
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Información obtenida.', life: 3000 });
            }
            catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }

        },
        async cargarLogs() {
            this.loading = true;

            try {
                const params = {};

                if (this.fechaFiltro) {
                    params.fecha = this.formatDateParam(this.fechaFiltro);
                }

                if (this.filtroTipoEnvio !== 'TODOS') {
                    params.tipo_envio = this.filtroTipoEnvio;
                }

                const { data } = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/envios-deudavencida',
                    {
                        params,
                        headers: { Authorization: `Bearer ${this.token}` }
                    });

                this.logs = data.rows || [];
                this.resumen = data.resumen || {
                    total_notificado: 0,
                    cantidad_envios: 0,
                    cantidad_errores: 0
                };
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos cargados.', life: 3000 });
            }
            catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No encontraron registros.', life: 3000 });
            }
            finally {
                this.loading = false;
            }
        },
        async iniciar() {
            const token = this.token;
            const payload = decodeJwt(token);
            const userData = {
                user: payload.user?.givenName,
            }
            //console.log('Datos para iniciar:', userData);
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/cron/avisosdeudavencida/start', userData, {
                    headers: { Authorization: `Bearer ${this.token}` }
                }).then(response => console.log(response.data))
                    .catch(error => console.error(error));

                await this.cargarEstado();
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Iniciado.', life: 3000 });
            }
            catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo iniciar.', life: 3000 });
            }

        },
        async detener() {
            const token = this.token;
            const payload = decodeJwt(token);
            const userData = {
                user: payload.user?.givenName,
            }
            //console.log('Datos para detener:', userData);
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/cron/avisosdeudavencida/stop', userData, {
                    headers: { Authorization: `Bearer ${this.token}` }
                }).then(response => console.log(response.data))
                    .catch(error => console.error(error));
                await this.cargarEstado();
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Detenido.', life: 3000 });
            }
            catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo detener.', life: 3000 });
            }
        },
        getEstadoSeverity(value) {
            if (value === 'ENVIADO') return 'success';
            if (value === 'ERROR') return 'danger';
            if (value === 'SIN_PDF') return 'warning';
            if (value === 'SIN_TELEFONO') return 'warning';
            return 'secondary';
        },
        getTipoEnvioSeverity(value) {
            if (value === 'CLIENTE') return 'secondary';
            if (value === 'REVENDEDOR') return 'secondary';
            return 'contrast';
        },
        formatDateTime(value) {
            if (!value) return '-';

            return new Intl.DateTimeFormat('es-AR', {
                dateStyle: 'short',
                timeStyle: 'short'
            }).format(new Date(value));
        },
        async verPdf(id) {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/envios-deudavencida-pdf/' + id,
                {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${this.token}` }
                }
            );
            const file = new Blob([response.data], {
                type: 'application/pdf'
            });

            const fileURL = URL.createObjectURL(file);

            window.open(fileURL, '_blank');
        }
    },
    created() {
        this.cargarEstado();
        this.cargarLogs();
    }
};

</script>
<style scoped></style>