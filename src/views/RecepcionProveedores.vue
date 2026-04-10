<template>
    <div class="recepcion-proveedores-page">
        <div class="container-fluid page-grid min-vh-100 d-flex flex-column">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-box2" viewBox="0 0 16 16">
                        <path
                            d="M2.95.4a1 1 0 0 1 .8-.4h8.5a1 1 0 0 1 .8.4l2.85 3.8a.5.5 0 0 1 .1.3V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .1-.3zM7.5 1H3.75L1.5 4h6zm1 0v3h6l-2.25-3zM15 5H1v10h14z" />
                    </svg>
                    <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
                    <span style="color: white; margin-left: 5px;">{{ title }}</span>
                </div>
                <div class="button-fullscreen d-flex flex-row align-items-center">
                    <div style="margin-right: 15px;">
                        <router-link to="/gestiondecompras/parametrosdecompras">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                                class="bi bi-sliders2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>
            <Dialog v-model:visible="visible" modal header="Editar los parametros de recepción de proveedores"
                @after-hide="dialogToGet" class="w-full max-w-lg">
                <ParametrosRecepcionProveedores :open="['0', '1']" />
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
                    <Button icon="pi pi-sliders-h" severity="secondary" rounded text @click="visible = true" />
                </template>
                <div class="filtros">
                    <div class="filtros-grid">
                        <div class="filtro-item">
                            <label>Fecha auditoría desde ({{ diasAtrasParaAuditoria }} días atrás por defecto)</label>
                            <DatePicker v-model="filtros.fechaAuditoriaDesde" dateFormat="dd-mm-yy" showIcon />
                        </div>

                        <div class="filtro-item">
                            <label>Fecha auditoría hasta</label>
                            <DatePicker v-model="filtros.fechaAuditoriaHasta" dateFormat="dd-mm-yy" showIcon />
                        </div>

                        <div class="filtro-item">
                            <label>Fecha comprobante desde</label>
                            <DatePicker v-model="filtros.fechaComprobanteDesde" dateFormat="dd-mm-yy" showIcon />
                        </div>

                        <div class="filtro-item">
                            <label>Fecha comprobante hasta</label>
                            <DatePicker v-model="filtros.fechaComprobanteHasta" dateFormat="dd-mm-yy" showIcon />
                        </div>

                        <div class="filtro-item">
                            <label>Comprador</label>
                            <Select v-model="filtros.comprador" :options="compradores" optionLabel="label"
                                optionValue="value" placeholder="Todos" showClear />
                        </div>

                        <div class="filtro-item">
                            <label>Proveedor</label>
                            <Select name="proveedorId" v-model="filtros.proveedorId" :options="proveedorOrdenado"
                                optionLabel="PROV_NOMBRE_LEGAL" optionValue="PROV_PROVEEDOR" filter
                                :filter-fields="['PROV_NOMBRE_LEGAL', 'PROV_PROVEEDOR']"
                                :virtualScrollerOptions="{ itemSize: 50 }" placeholder="Todos" showClear
                                emptyFilterMessage="No se encontraron resultados" class="w-full md:w-80">
                                <template #option="slotProps">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <div>{{ slotProps.option.PROV_PROVEEDOR }} - {{
                                            slotProps.option.PROV_NOMBRE_LEGAL }}
                                        </div>
                                    </div>
                                </template>
                            </Select>
                        </div>

                        <div class="filtro-item">
                            <label>Código artículo</label>
                            <InputText v-model="filtros.codigoArticulo" />
                        </div>

                        <div class="filtro-item">
                            <label>Tipo comprobante</label>
                            <Select v-model="filtros.tipoComprobante" :options="tiposComprobante"
                                option-label="nombre_comp" option-value="cod_comp" placeholder="Todos" showClear>
                                <template #option="slotProps">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <div>{{ slotProps.option.cod_comp }} - {{ slotProps.option.nombre_comp }}
                                        </div>
                                    </div>
                                </template>
                            </Select>
                        </div>

                        <div class="filtro-item">
                            <label>Clasif. 2</label>
                            <!-- <InputText v-model="filtros.clasif2" /> -->
                            <Select name="clasif2" v-model="filtros.clasif2" :options="clasif2"
                                optionLabel="CA02_NOMBRE" optionValue="CA02_CLASIF_2" filter
                                :filter-fields="['CA02_NOMBRE', 'CA02_CLASIF_2']" placeholder="Todos" showClear
                                emptyFilterMessage="No se encontraron resultados" class="w-full md:w-80">
                                <template #option="slotProps">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <div>{{ slotProps.option.CA02_CLASIF_2 }} - {{ slotProps.option.CA02_NOMBRE }}
                                        </div>
                                    </div>
                                </template>
                            </Select>
                        </div>

                        <div class="filtro-item">
                            <label>Clasif. 6</label>
                            <!-- <InputText v-model="filtros.clasif6" /> -->
                            <Select name="clasif6" v-model="filtros.clasif6" :options="clasif6"
                                optionLabel="CA06_NOMBRE" optionValue="CA06_CLASIF_6" filter
                                :filter-fields="['CA06_NOMBRE', 'CA06_CLASIF_6']" placeholder="Todos" showClear
                                emptyFilterMessage="No se encontraron resultados" class="w-full md:w-80">
                                <template #option="slotProps">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <div>{{ slotProps.option.CA06_CLASIF_6 }} - {{ slotProps.option.CA06_NOMBRE }}
                                        </div>
                                    </div>
                                </template>
                            </Select>
                        </div>

                        <div class="filtro-item">
                            <label>Días para venc. part.</label>
                            <InputNumber v-model="filtros.diasParaVencPart" :min="0" />
                        </div>

                        <div class="filtro-item">
                            <label>Desvío (kg teórico / peso real)</label>
                            <InputNumber v-model="desvio" locale="es-AR" :min-fraction-digits="2"
                                :max-fraction-digits="2" suffix="%" />
                        </div>

                        <!-- <div class="filtro-item checkbox">
                            <label>&nbsp;</label>
                            <div class="flex align-items-center gap-2">
                                <Checkbox v-model="filtros.soloIRO" :binary="true" />
                                <span class="ms-2">Solo IRO</span>
                            </div>
                        </div> -->
                    </div>

                    <div class="acciones">
                        <Button label="Buscar" icon="pi pi-search" @click="buscar" :loading="loading" />
                        <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" @click="limpiarFiltros" />
                    </div>
                </div>
            </Panel>
            <Toolbar v-if="totalRows > 0" class="my-2 bg-transparent border-0 text-white">
                <template #start>
                    <div class="d-flex flex-row align-items-center gap-2">
                        <span>
                            Fecha de emisión: <Badge severity="secondary" size="large"> {{ totalRows > 0 ? fechaHoy : ''
                                }}</Badge>
                        </span>
                    </div>
                </template>
                <template #center>

                </template>
                <template #end>
                    <div class="d-flex flex-row align-items-center gap-2">
                        <span>Total de artículos de esta vista: <Badge severity="secondary" size="large">{{
                            totalRows
                                }}</Badge></span>
                    </div>
                </template>
            </Toolbar>
            <Toolbar v-if="rowData.length > 0" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <template #start>

                </template>
                <template #end>
                    <Button label="Recargar Datos" icon="pi pi-replay" @click="buscar" :loading="loading"
                        size="small" />
                    <Button type="button" v-fullscreen="FullScreenGrid" class="ms-2 mr-2" style="height: 39px;"
                        size="small">
                        <span v-show="fullscreengrid" class="pi pi-arrow-down-left-and-arrow-up-right-to-center"></span>
                        <span v-show="!fullscreengrid"
                            class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></span>
                    </Button>
                </template>
            </Toolbar>
            <div class="card my-0 directive-fullscreen-wrapper-grid h-screen" v-if="rowData.length > 0"
                style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                <div v-if="rowData.length > 0" class="grow" style="height: 100vh;">
                    <AgGridVue class="ag-theme-balham recepcion-grid" :theme="theme" :columnDefs="columnDefs"
                        :rowData="rowData" :defaultColDef="defaultColDef" :pagination="false" :paginationPageSize="100"
                        :animateRows="true" :rowSelection="rowSelection" :getRowId="getRowId" :getRowStyle="getRowStyle"
                        @grid-ready="onGridReady" :fullWidthCellRenderer="fullWidthCellRenderer"
                        :isFullWidthRow="isFullWidthRow" :getRowHeight="getRowHeight" :localeText="localeText"
                        :auto-size-strategy="autoSizeStrategy" />
                </div>
            </div>
            <div v-if="errorMessage" class="error-box">
                {{ errorMessage }}
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '@/stores/diasAtrasParaAuditoria';
import { useStoreCompradores } from '@/stores/compradores';
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import { AgGridVue } from 'ag-grid-vue3';
import "ag-grid-community/styles/ag-theme-balham.css";
import { AllCommunityModule, ModuleRegistry, themeBalham } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { directive as fullscreen } from 'vue-fullscreen'
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import { useToast } from 'primevue/usetoast';
import ParametrosRecepcionProveedores from '../components/ParametrosRecepcionProveedores.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
import minMax from 'dayjs/plugin/minMax';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

const HeaderRenderer = {
    template: `
        <div class="w-100 h-100 d-flex flex-column justify-content-end">
            <div class="w-100 d-flex align-items-center px-3 fst-italic fw-bold fs-6" 
                 style="height: 40px;">
                <span>{{ params.data.groupLabel }}</span>
            </div>
        </div>
    `
};

export default {
    name: 'RecepcionProveedoresGrid',
    components: {
        AgGridVue,
        DatePicker,
        InputText,
        InputNumber,
        Select,
        MultiSelect,
        Checkbox,
        Button,
        Panel,
        Toolbar,
        fullscreen,
        HeaderRenderer,
        Dialog,
        ParametrosRecepcionProveedores,
        Toast,
        Badge
    },
    directives: {
        fullscreen
    },
    data() {
        return {
            name: 'RecepcionProveedores',
            token: decodeJwt(getToken()).token,
            title: 'Recepción de proveedores',
            theme: themeBalham.withParams({
                wrapperBorderRadius: '0px',
                wrapperBorder: false,
                headerRowBorder: true,
                columnBorder: true,
                rangeSelectionBorderColor: 'rgb(193, 0, 97)',
                rangeSelectionBorderStyle: 'solid',
                rangeSelectionBackgroundColor: 'rgb(255, 0, 128, 0.1)',
                rangeSelectionHighlightColor: 'rgb(60, 188, 0, 0.3)',
                oddRowBackgroundColor: '#8881',
            }),
            rowSelection: {
                mode: 'singleRow',
                checkboxes: false,
                headerCheckbox: false,
                enableClickSelection: true,
                copySelectedRows: true,
                isRowSelectable: (params) => {
                    return params.data && params.data.rowType === 'detail';
                }
            },
            visible: false,
            gridApi: null,
            loading: false,
            fechaHoy: '',
            errorMessage: '',
            totalRows: 0,
            rowData: [],
            clasif2: [],
            clasif6: [],
            proveedores: [],
            desvio: 2.5,
            tiposComprobante: [],
            filtros: {
                diasParaVencPart: 30,
                fechaAuditoriaDesde: null,
                fechaAuditoriaHasta: null,
                fechaComprobanteDesde: null,
                fechaComprobanteHasta: null,
                comprador: null,
                proveedorId: null,
                codigoArticulo: null,
                tipoComprobante: null,
                clasif2: null,
                clasif6: null,
                soloIRO: false
            },
            defaultColDef: {
                sortable: false,
                filter: false,
                resizable: true,
            },
            columnDefs: [],
            fullWidthCellRenderer: 'HeaderRenderer',
            autoSizeStrategy: {
                type: 'fitCellContents',
                skipHeader: false
            },
            fullscreen: false,
            fullscreengrid: false,
            teleport: true,
            pageOnly: true,
            useToast,
            localeText: {
                // Filtros de Texto
                filterOoo: 'Filtrar...',
                equals: 'Igual a',
                notEqual: 'Diferente de',
                contains: 'Contiene',
                notContains: 'No contiene',
                startsWith: 'Empieza con',
                endsWith: 'Termina con',

                // Filtros de Número
                lessThan: 'Menor que',
                greaterThan: 'Mayor que',
                lessThanOrEqual: 'Menor o igual a',
                greaterThanOrEqual: 'Mayor o igual a',
                inRange: 'En rango',

                // Botones del filtro
                applyFilter: 'Aplicar',
                clearFilter: 'Borrar',
                resetFilter: 'Reiniciar',
                cancelFilter: 'Cancelar',

                // Otros textos útiles de la grilla
                loadingOoo: 'Cargando...',
                noRowsToShow: 'No hay filas para mostrar',
                selectAll: 'Seleccionar todo',
                searchOoo: 'Buscar...',
                blanks: '(Vacíos)'
            }
        };
    },
    created() {
        this.setFechasDefault();
        this.getClasif2();
        this.getClasif6();
        this.getProveedores();
        this.getTiposComprobante();
        this.columnDefs = this.buildColumns();
    },
    methods: {
        dialogToGet() {
            this.getTiposComprobante();
            this.setFechasDefault()
        },
        diasAtrasParaAuditoriaUpdate(value) {
            if (!value) return;
            // console.log('Valor actualizado:', value);
            const store = useStore()
            store.setDiasAtrasParaAuditoria(value)
            this.setFechasDefault();
        },
        getRowHeight(params) {
            //console.log('getRowHeight called for row:', params.data);
            const grupoFecha = params.data.rowType === 'group_fecha'
            const grupoRubro = params.data.rowType === 'group_rubro'
            return grupoFecha ? 40 : grupoRubro ? 20 : 30
        },
        isFullWidthRow(params) {
            //console.log('isFullWidthRow called for row:', params);
            const grupoFecha = params.rowNode.data.rowType === 'group_fecha'
            const grupoRubro = params.rowNode.data.rowType === 'group_rubro'
            return grupoFecha || grupoRubro;
        },
        onGridReady(params) {
            this.gridApi = params.api;
            //this.buscar();
        },
        getRowId(params) {
            return params.data.id;
        },
        getRowStyle(params) {
            if (!params.data) return null;

            if (params.data.rowType === 'group_fecha') {
                return {
                    fontWeight: '700',
                    backgroundColor: '#007c3b',
                    color: 'white',
                    height: '40px',
                    fontSize: '16px',
                };
            }

            if (params.data.rowType === 'group_rubro') {
                return {
                    fontWeight: '700',
                };
            }

            return null;
        },
        setFechasDefault() {
            const today = new Date();
            const from = new Date();
            from.setDate(today.getDate() - this.diasAtrasParaAuditoria);
            this.filtros.fechaAuditoriaDesde = from;
            this.filtros.fechaAuditoriaHasta = today;
        },
        limpiarFiltros() {
            this.filtros = {
                diasParaVencPart: 30,
                fechaAuditoriaDesde: null,
                fechaAuditoriaHasta: null,
                fechaComprobanteDesde: null,
                fechaComprobanteHasta: null,
                comprador: null,
                proveedorId: null,
                codigoArticulo: null,
                tipoComprobante: null,
                clasif2: null,
                clasif6: null,
                soloIRO: false
            };

            this.setFechasDefault();
        },
        async getTiposComprobante() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposcompstock', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.tiposComprobante = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron tipos de comprobantes.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async getProveedores() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/cpagprov', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.proveedores = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron proveedores.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async getClasif2() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/clasificacion2', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.clasif2 = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron clasificaciones 2.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async getClasif6() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/clasificacion6', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.clasif6 = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron clasificaciones 6.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async buscar() {
            try {
                this.loading = true;
                this.errorMessage = '';

                dayjs.locale('es-us');
                dayjs.extend(minMax);
                dayjs.extend(LocalizedFormat);
                this.fechaHoy = dayjs().format('LLL');

                const params = {
                    diasParaVencPart: this.filtros.diasParaVencPart || 30,
                    fechaAuditoriaDesde: this.formatDateRequest(this.filtros.fechaAuditoriaDesde),
                    fechaAuditoriaHasta: this.formatDateRequest(this.filtros.fechaAuditoriaHasta),
                    fechaComprobanteDesde: this.formatDateRequest(this.filtros.fechaComprobanteDesde),
                    fechaComprobanteHasta: this.formatDateRequest(this.filtros.fechaComprobanteHasta),
                    comprador: this.emptyToNull(this.filtros.comprador),
                    proveedorId: this.emptyToNull(this.filtros.proveedorId),
                    codigoArticulo: this.emptyToNull(this.filtros.codigoArticulo),
                    tipoComprobante: this.emptyToNull(this.filtros.tipoComprobante),
                    clasif2: this.emptyToNull(this.filtros.clasif2),
                    clasif6: this.emptyToNull(this.filtros.clasif6),
                    soloIRO: this.filtros.soloIRO
                };

                const res = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/recepcion-proveedores', {
                    params,
                    headers: { Authorization: `Bearer ${this.token}` }
                });

                const rawRows = Array.isArray(res.data.rows) ? res.data.rows : [];

                this.rowData = this.buildGroupedRows(rawRows);
                this.totalRows = rawRows.length;
                /* 
                                if (this.gridApi) {
                                    this.gridApi();
                                } */

                this.$toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `${this.totalRows} artículos cargados.`,
                    life: 3000
                });

            } catch (error) {
                console.error('Error cargando recepción de proveedores:', error);
                this.rowData = [];
                this.totalRows = 0;
                this.errorMessage =
                    error?.response?.data?.message ||
                    'Ocurrió un error al cargar la grilla.';
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la grilla.', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        buildFechaGrupoLabel(value) {
            if (!value) return '';

            const fecha = this.parseIsoDate(value);
            if (!fecha) return value;

            const dias = [
                'domingo',
                'lunes',
                'martes',
                'miércoles',
                'jueves',
                'viernes',
                'sábado'
            ];

            const meses = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre'
            ];

            const diaSemana = dias[fecha.getDay()];
            const dia = fecha.getDate();
            const mes = meses[fecha.getMonth()];
            const anio = fecha.getFullYear();

            return `Alta en Plataforma el ${diaSemana} ${dia} de ${mes} de ${anio}`;
        },
        parseIsoDate(value) {
            if (!value || typeof value !== 'string') return null;

            const part = value.substring(0, 10);
            const parts = part.split('-');
            if (parts.length !== 3) return null;

            const year = Number(parts[0]);
            const month = Number(parts[1]);
            const day = Number(parts[2]);

            if (!year || !month || !day) return null;

            return new Date(year, month - 1, day);
        },
        buildGroupedRows(rows) {
            const result = [];
            let currentFecha = null;
            let currentRubro = null;

            rows.forEach((row, index) => {
                const fecha = row.fechaAuditoria || '';
                const rubro = row.rubroCompraNombre || '';

                if (fecha !== currentFecha) {
                    currentFecha = fecha;

                    result.push({
                        id: `fecha-${fecha}`,
                        rowType: 'group_fecha',
                        fechaAuditoria: fecha,
                        groupLabel: this.buildFechaGrupoLabel(fecha)
                    });
                }

                if (rubro !== currentRubro) {
                    currentRubro = rubro;

                    result.push({
                        id: `rubro-${fecha}-${rubro}`,
                        rowType: 'group_rubro',
                        groupLabel: ''
                    });
                }

                result.push({
                    ...row,
                    rowType: 'detail',
                    id: index.toString(),
                });
            });

            return result;
        },
        buildColumns() {
            return [
                {
                    headerName: 'Cod. artículo',
                    field: 'codigoArticulo',
                    pinned: 'left',
                    cellRenderer: (params) => {
                        if (!params.data) return '';

                        if (params.data.rowType === 'group_fecha') {
                            return params.data.groupLabel || '';
                        }

                        if (params.data.rowType === 'group_rubro') {
                            return params.data.groupLabel || '';
                        }

                        return params.data.codigoArticulo || '';
                    },
                    cellClassRules: {
                        'group-row-fecha': (params) => params.data && params.data.rowType === 'group_fecha',
                        'group-row-rubro': (params) => params.data && params.data.rowType === 'group_rubro',
                    },
                    cellClass: 'ag-center-align'
                },
                {
                    headerName: 'Nombre artículo',
                    field: 'nombreArticulo',
                    pinned: 'left',
                    valueGetter: (params) => this.detailValue(params, 'nombreArticulo')
                },
                {
                    headerName: 'Cantidad',
                    field: 'cantidad',
                    pinned: 'left',
                    valueGetter: (params) => this.detailValue(params, 'cantidad'),
                    valueFormatter: this.formatNumberOrBlank,
                    cellClass: 'ag-right-align'
                },
                {
                    headerName: 'Fecha auditoría',
                    field: 'fechaAuditoria',
                    valueGetter: (params) => this.detailValue(params, 'fechaAuditoria'),
                    valueFormatter: this.formatDate,
                    hide: false,
                    cellClass: 'ag-center-align'
                },
                {
                    headerName: 'M2 recibidos',
                    field: 'm2Recibidos',
                    type: 'numericColumn',
                    valueGetter: (params) => this.detailValue(params, 'm2Recibidos'),
                    valueFormatter: this.formatDecimalOrBlank,
                    cellClass: 'ag-right-align'
                },
                {
                    headerName: 'Kg recibidos',
                    field: 'kgRecibidos',
                    type: 'numericColumn',
                    valueGetter: (params) => this.detailValue(params, 'kgRecibidos'),
                    valueFormatter: this.formatDecimalOrBlank,
                    cellClassRules: {
                        'cell-red': (params) =>
                            params.data &&
                            params.data.rowType === 'detail' &&
                            params.data.clasif2 === '0027' &&
                            (params.value === null || params.value === undefined || params.value === '')
                    },
                    cellClass: 'ag-right-align'
                },
                {
                    headerName: 'Peso real x uni',
                    field: 'pesoRealXUni',
                    type: 'numericColumn',
                    valueGetter: (params) => this.detailValue(params, 'pesoRealXUni'),
                    valueFormatter: this.formatDecimalOrBlank,
                    cellClass: 'ag-right-align'
                },
                {
                    headerName: 'Peso teórico x uni',
                    field: 'pesoTeoricoXUni',
                    type: 'numericColumn',
                    valueGetter: (params) => this.detailValue(params, 'pesoTeoricoXUni'),
                    valueFormatter: this.formatDecimalOrBlank,
                    cellClass: 'ag-right-align'
                },
                {
                    headerName: 'kg teórico / peso real',
                    field: 'kgTeoricoVsPesoReal',
                    valueGetter: (params) => this.detailValue(params, 'kgTeoricoVsPesoReal'),
                    valueFormatter: this.formatPercent,
                    cellClassRules: {
                        'cell-red': (params) => {
                            if (!params.data || params.data.rowType !== 'detail') return false;
                            if (params.value === null || params.value === undefined || params.value === '') return false;
                            //console.log('Desvío positivo:', Number(this.desvio));
                            //console.log('Desvío negativo:', Number(-this.desvio));
                            //console.log('Valor:', Number(params.value * 100).toFixed(2));

                            // El valor es negativo y menor al desvío permitido
                            return Number(params.value * 100).toFixed(2) > Number(this.desvio)
                        },
                        'cell-blue': (params) => {
                            if (!params.data || params.data.rowType !== 'detail') return false;
                            if (params.value === null || params.value === undefined || params.value === '') return false;
                            // El valor es positivo y mayor al desvío permitido
                            return Number(params.value * 100).toFixed(2) < Number(-this.desvio)
                        }
                    },
                    cellClass: 'ag-right-align'
                },
                {
                    headerName: 'Venc. de Partida',
                    field: 'fechaVencimientoPartida',
                    valueGetter: (params) => this.detailValue(params, 'fechaVencimientoPartida'),
                    valueFormatter: this.formatDate,
                    cellClassRules: {
                        'cell-red': (params) =>
                            params.data &&
                            params.data.rowType === 'detail' &&
                            !!params.data.destacarVencimiento
                    },
                    cellClass: 'ag-center-align'
                },
                {
                    headerName: 'Días vencim partida',
                    field: 'diasVencimientoPartida',
                    type: 'numericColumn',
                    valueGetter: (params) => this.detailValue(params, 'diasVencimientoPartida'),
                    valueFormatter: this.formatNumberOrBlank,
                    cellClassRules: {
                        'cell-red': (params) =>
                            params.data &&
                            params.data.rowType === 'detail' &&
                            !!params.data.destacarVencimiento
                    },
                    cellClass: 'ag-center-align'
                },
                {
                    headerName: '¿IRO?',
                    field: 'esIRO',
                    valueGetter: (params) => this.detailValue(params, 'esIRO'),
                    valueFormatter: this.formatBooleanIRO,
                    cellClassRules: {
                        'cell-red': (params) =>
                            params.data &&
                            params.data.rowType === 'detail' &&
                            !!params.value
                    },
                    cellClass: 'ag-center-align'
                },
                {
                    headerName: 'Rubro compra',
                    field: 'rubroCompraNombre',
                    valueGetter: (params) => this.detailValue(params, 'rubroCompraNombre')
                },
                {
                    headerName: 'Proveedor',
                    field: 'proveedorNombre',
                    valueGetter: (params) => params.data.rubroCompra + ' - ' + this.detailValue(params, 'proveedorNombre'),

                },
                {
                    headerName: 'Cód para el prov',
                    field: 'codigoArticuloProveedor',
                    valueGetter: (params) => this.detailValue(params, 'codigoArticuloProveedor')
                },
                {
                    headerName: 'Fecha comprobante',
                    field: 'fechaComprobante',
                    valueGetter: (params) => this.detailValue(params, 'fechaComprobante'),
                    valueFormatter: this.formatDate,
                    cellClass: 'ag-center-align'
                },
                {
                    headerName: 'Comprobante',
                    field: 'comprobante',
                    valueGetter: (params) => this.detailValue(params, 'comprobante')
                },
                {
                    headerName: 'Referencia comp.',
                    field: 'referenciaComprobante',
                    valueGetter: (params) => this.detailValue(params, 'referenciaComprobante')
                },
                {
                    headerName: 'Descripción',
                    field: 'descripcionMovimiento',
                    valueGetter: (params) => this.detailValue(params, 'descripcionMovimiento')
                },
                {
                    headerName: 'Estado facturación',
                    field: 'estadoFacturacion',
                    valueGetter: (params) => this.detailValue(params, 'estadoFacturacion')
                },
                {
                    headerName: 'Devol / Recep',
                    field: 'tipoMovimiento',
                    valueGetter: (params) => this.detailValue(params, 'tipoMovimiento'),
                    hide: true
                },
                {
                    headerName: 'Comprador',
                    field: 'compradorCodigo',
                    valueGetter: (params) => this.detailValue(params, 'compradorCodigo'),
                    hide: true
                },
                {
                    headerName: 'Clasif 2',
                    field: 'clasif2',
                    valueGetter: (params) => this.detailValue(params, 'clasif2'),
                    hide: true
                },
                {
                    headerName: 'Nombre clasif 2',
                    field: 'clasif2Nombre',
                    valueGetter: (params) => this.detailValue(params, 'clasif2Nombre'),
                    hide: true
                },
                {
                    headerName: 'Clasif 6',
                    field: 'clasif6',
                    valueGetter: (params) => this.detailValue(params, 'clasif6'),
                    hide: true
                },
                {
                    headerName: 'Nombre clasif 6',
                    field: 'clasif6Nombre',
                    valueGetter: (params) => this.detailValue(params, 'clasif6Nombre'),
                    hide: true
                },
                {
                    headerName: 'Proveedor ID',
                    field: 'proveedorId',
                    hide: true
                },
                {
                    headerName: 'Artículo ID',
                    field: 'articuloId',
                    hide: true
                },
                {
                    headerName: 'Destacar vencimiento',
                    field: 'destacarVencimiento',
                    hide: true
                },
                {
                    headerName: 'IRO a verificar',
                    field: 'iroAVerificar',
                    hide: true
                }
            ];
        },
        detailValue(params, field) {
            return params.data && params.data.rowType === 'detail'
                ? params.data[field]
                : '';
        },
        emptyToNull(value) {
            if (value === undefined || value === null) return null;
            if (String(value).trim() === '') return null;
            return value;
        },
        formatDateRequest(date) {
            if (!date) return null;
            return date.toISOString().slice(0, 10);
        },
        formatDateValue(value) {
            if (!value) return '';

            if (typeof value === 'string' && value.length >= 10) {
                const parts = value.substring(0, 10).split('-');
                if (parts.length === 3) {
                    return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            return value;
        },
        formatDate(params) {
            const value = params.value;
            if (!value) return '';

            if (typeof value === 'string' && value.length >= 10) {
                const parts = value.substring(0, 10).split('-');
                if (parts.length === 3) {
                    return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            return value;
        },
        formatNumberOrBlank(params) {
            const value = params.value;

            if (
                value === 0 ||
                value === '0' ||
                value === null ||
                value === undefined ||
                value === ''
            ) {
                return '';
            }

            return Number(value).toLocaleString('es-AR');
        },
        formatDecimalOrBlank(params) {
            const value = params.value;

            if (
                value === 0 ||
                value === '0' ||
                value === null ||
                value === undefined ||
                value === ''
            ) {
                return '';
            }

            return Number(value).toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        },
        formatPercent(params) {
            const value = params.value;

            if (value === null || value === undefined || value === '') return '';

            return (Number(value) * 100).toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + ' %';
        },
        formatBooleanIRO(params) {
            return params.value ? 'IRO' : '';
        }
    },
    computed: {
        compradores() {
            const store = useStoreCompradores()
            return store.compradores
        },
        diasAtrasParaAuditoria() {
            const store = useStore()
            return store.diasAtrasParaAuditoria
        },
        proveedorOrdenado() {
            return this.proveedores.slice().sort((a, b) => a.PROV_NOMBRE_LEGAL.localeCompare(b.PROV_NOMBRE_LEGAL));
        },
        options() {
            return {
                callback: (isFullscreen) => {
                    this.fullscreen = isFullscreen
                },
                target: '.directive-fullscreen-wrapper',
                pageOnly: this.pageOnly,
                teleport: this.teleport
            }
        },
        FullScreenGrid() {
            return {
                callback: (isFullscreen) => {
                    this.fullscreengrid = isFullscreen
                },
                target: '.directive-fullscreen-wrapper-grid',
                pageOnly: true,
                teleport: true
            }
        }
    }
};
</script>

<style scoped>
.recepcion-proveedores-page {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.filtros {
    padding: 16px;
}

.filtros-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.filtro-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.acciones {
    margin-top: 12px;
    display: flex;
    gap: 10px;
}

.resumen {
    font-size: 14px;
    color: #334155;
}

.recepcion-grid {
    height: 100%;
}

.error-box {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 10px 12px;
}

label {
    color: #0f172a;
}

:deep(.ag-theme-balham .cell-red) {
    background-color: #ffdddd;
    color: #a40000;
    font-weight: 600;
}

:deep(.ag-theme-balham .cell-blue) {
    background-color: #dbeafe;
    color: #1e3a8a;
    font-weight: 600;
}

/* :deep(.ag-theme-balham .group-row-fecha) {
    font-weight: 700;
    color: #1e3a8a;
    font-size: 14px;
} */

:deep(.ag-theme-balham .ag-cell) {
    display: flex;
    align-items: center;
}

:deep(.ag-theme-balham .ag-header-cell-label) {
    font-weight: 600;
}

:deep(.ag-left-align) {
    justify-content: flex-start !important;
    text-align: left !important;
}

:deep(.ag-right-align) {
    justify-content: flex-end !important;
    text-align: right !important;
}

:deep(.ag-center-align) {
    justify-content: center !important;
    text-align: center !important;
}

@media (max-width: 1200px) {
    .filtros-grid {
        grid-template-columns: repeat(3, minmax(180px, 1fr));
    }
}

@media (max-width: 900px) {
    .filtros-grid {
        grid-template-columns: repeat(2, minmax(180px, 1fr));
    }
}

@media (max-width: 600px) {
    .filtros-grid {
        grid-template-columns: 1fr;
    }
}
</style>