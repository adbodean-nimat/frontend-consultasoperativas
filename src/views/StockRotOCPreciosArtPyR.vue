<template>
    <div class="stockrotocpreciosartpyr-page">
        <div class="container-fluid page-grid d-flex flex-column">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-box-seam"
                        viewBox="0 0 16 16">
                        <path
                            d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                    </svg>
                    <span style="color: white; margin-left: 5px;">{{ title }}</span>
                </div>
                <div class="button-fullscreen d-flex flex-row align-items-center">
                    <div style="margin-right: 15px;">
                        <router-link :to="{ name: 'parametrosexhibicion' }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                                class="bi bi-sliders2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>
            <Panel class="mb-2" toggleable collapsed style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
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
                    <!-- <Button icon="pi pi-sliders-h" severity="secondary" rounded text @click="visible = true" /> -->
                </template>
                <div class="filtros">
                    <div class="mb-2">
                        <span><strong>Tiempos para evaluar rotación</strong></span>
                    </div>

                    <div class="filtros-grid">

                        <div class="filtro-item">
                            <label>Días previos</label>
                            <InputNumber v-model="getStore.dias_previos" class="mb-3 me-2"
                                @update:model-value="diaspreviosUpdate" />
                        </div>
                        <div class="filtro-item">
                            <label>Días que dura</label>
                            <InputNumber v-model="getStore.dias_duros" class="mb-3 me-2"
                                @update:model-value="diasduraUpdate" />
                        </div>
                    </div>
                </div>

            </Panel>
            <Toolbar style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <template #start>
                    <Button label="Play" icon="pi pi-play" @click="getData" :loading="loading" size="small" />

                </template>
                <template #center>
                    <span v-if="rowData.length > 0">Total de artículos de esta vista: <Badge severity="secondary"
                            size="large">{{
                                rowData.length
                            }}</Badge></span>
                </template>
                <template #end>
                    <Button v-if="rowData.length > 0" label="Recargar Datos" icon="pi pi-replay" @click="getData"
                        :loading="loading" size="small" />
                    <Button type="button" v-fullscreen="FullScreenGrid" class="ms-2 mr-2" style="height: 39px;"
                        size="small">
                        <span v-show="fullscreengrid" class="pi pi-arrow-down-left-and-arrow-up-right-to-center"></span>
                        <span v-show="!fullscreengrid"
                            class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></span>
                    </Button>
                </template>
            </Toolbar>
            <div class="card my-0 directive-fullscreen-wrapper-grid vh-height mb-2"
                style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                <div class="grow" style="height: 80vh;">
                    <ag-grid-vue class="ag-theme-balham grid-wrapper" :rowData="rowData" :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef" :pagination="false" :paginationPageSize="1000"
                        :animateRows="true" @grid-ready="onGridReady" :theme="theme" :loading="loading"
                        :localeText="localeText" :auto-size-strategy="autoSizeStrategy" :rowSelection="rowSelection" />
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>
import axios from 'axios';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AllCommunityModule, ModuleRegistry, themeBalham } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import { useStoreExhibiciones } from '@/stores/exhibiciones';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Panel from 'primevue/panel';
import Badge from 'primevue/badge';
import { directive as fullscreen } from 'vue-fullscreen'

export default {
    name: 'StockRotOCPreciosArtPyR',
    components: {
        AgGridVue,
        Toast,
        fullscreen,
        Toolbar,
        Panel,
        Button,
        InputText,
        InputNumber,
        Badge
    },
    directives: {
        fullscreen
    },
    data() {
        return {
            title: 'Stock Rotación OC - Precios Art. PyR',
            token: decodeJwt(getToken()).token,
            useToast,
            fullscreen: false,
            fullscreengrid: false,
            teleport: true,
            pageOnly: true,
            loading: false,
            gridApi: null,
            rowData: [],
            autoSizeStrategy: {
                type: 'fitCellContents',
                skipHeader: false
            },
            rowSelection: {
                mode: 'singleRow',
                checkboxes: false,
                headerCheckbox: false,
                enableClickSelection: true,
                copySelectedRows: true,
                isRowSelectable: (params) => {
                    return params.data
                }
            },
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
            },
            columnDefs: [
                {
                    headerName: 'Código',
                    field: 'ARTS_ARTICULO_EMP',
                    minWidth: 130,
                    pinned: 'left',
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Artículo',
                    field: 'ARTS_NOMBRE',
                    minWidth: 320,
                    flex: 1,
                    pinned: 'left'
                },
                {
                    headerName: 'Stock Uni',
                    field: 'Stock Uni',
                    type: 'numericColumn',
                    minWidth: 110,
                    valueFormatter: params => this.formatInteger(params.value)
                },
                {
                    headerName: 'M2 Caja',
                    field: 'M2 Caja',
                    minWidth: 100,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Stock M2',
                    field: 'Stock M2',
                    minWidth: 110,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'M2 Pte Entr NP',
                    field: 'M2 Pte Entr NP',
                    minWidth: 140,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Stock M2 Disp',
                    field: 'Stock M2 Disp',
                    minWidth: 130,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Pre Cdo M2 L1',
                    field: 'Pre Cdo M2 L1',
                    minWidth: 130,
                    valueFormatter: params => `$ ${this.formatNumber(params.value)}`,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Consumo x día',
                    field: 'Consumo x día',
                    minWidth: 130,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Días Stock Disp',
                    field: 'Días Stock Disp',
                    minWidth: 130,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Última Vta',
                    field: 'Ultima Vta',
                    minWidth: 120,
                    valueFormatter: params => this.formatDate(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Días sin venta',
                    field: 'Días sin venta',
                    minWidth: 130,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Días Ult Ent Prov',
                    field: 'Días Ult Ent Prov',
                    minWidth: 145,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Días_UEP Diás_UV',
                    field: 'Días_UEP Diás_UV',
                    minWidth: 145,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Ult Entr Proveed',
                    field: 'Ult Entr Proveed',
                    minWidth: 135,
                    valueFormatter: params => this.formatDate(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'M2 Entr Proveed',
                    field: 'M2 Entr Proveed',
                    minWidth: 135,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'M2 OC',
                    field: 'M2 OC',
                    minWidth: 100,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Clasif 2',
                    field: 'ARTS_CLASIF_2',
                    minWidth: 100,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Rubro',
                    field: 'CA02_NOMBRE',
                    minWidth: 220,
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Clasif 3',
                    field: 'ARTS_CLASIF_3',
                    minWidth: 100,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Subrubro',
                    field: 'CA03_NOMBRE',
                    minWidth: 220,
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Clasif 5',
                    field: 'ARTS_CLASIF_5',
                    minWidth: 100,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Calidad',
                    field: 'CA05_NOMBRE',
                    minWidth: 180,
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Clasif 6',
                    field: 'ARTS_CLASIF_6',
                    minWidth: 100,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Marca',
                    field: 'CA06_NOMBRE',
                    minWidth: 150,
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Pre Cdo sin IVA L100 M2',
                    field: 'Pre Cdo sin IVA L100 M2',
                    minWidth: 180,
                    valueFormatter: params => `$ ${this.formatNumber(params.value)}`,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Costo L100 sin IVA item',
                    field: 'Costo L100 sin IVA item',
                    minWidth: 180,
                    valueFormatter: params => `$ ${this.formatNumber(params.value)}`,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Días previos',
                    field: 'Días previos',
                    minWidth: 110,
                    valueFormatter: params => this.formatInteger(params.value),
                    hide: true
                },
                {
                    headerName: 'Días que dura',
                    field: 'Días que dura',
                    minWidth: 120,
                    valueFormatter: params => this.formatInteger(params.value),
                    hide: true
                },
                {
                    headerName: 'Desde',
                    field: 'Desde',
                    minWidth: 110,
                    valueFormatter: params => this.formatDate(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Hasta',
                    field: 'Hasta',
                    minWidth: 110,
                    valueFormatter: params => this.formatDate(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'M2 Rtos',
                    field: 'M2 Rtos',
                    minWidth: 100,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-center'
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true,
                floatingFilter: false
            },
        }
    },
    created() {
        //this.getData();
    },
    methods: {
        diaspreviosUpdate(value) {
            if (!value) return;
            const useStore = useStoreExhibiciones();
            useStore.setDiasPrevios(value);
        },
        diasduraUpdate(value) {
            if (!value) return;
            const useStore = useStoreExhibiciones();
            useStore.setDiasDuros(value);
        },
        async getData() {
            try {
                this.loading = true;
                const useStore = useStoreExhibiciones();
                const params = {
                    clasif2: useStore.getExhibiciones.clasif2,
                    diasprevios: useStore.getExhibiciones.dias_previos,
                    diasdura: useStore.getExhibiciones.dias_duros
                };
                console.log('▶ StockRotNPOC:', params);
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/stockrotocpreciosartpyr', {
                    params,
                    headers: { Authorization: `Bearer ${this.token}` }
                });

                console.log('response:', response);
                if (response.data && response.data.length > 0) {
                    this.rowData = response.data[0];
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos cargados.', life: 3000 });
                    this.loading = false;
                }
                else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            //this.buscar();
        },
        formatNumber(value, decimals = 2) {
            if (value === null || value === undefined || value === '') return '';
            return Number(value).toLocaleString('es-AR', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            })
        },
        formatInteger(value) {
            if (value === null || value === undefined || value === '') return '';
            return Number(value).toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })
        },
        formatDate(params) {
            const value = params;
            if (!value) return '';

            if (typeof value === 'string' && value.length >= 10) {
                const parts = value.substring(0, 10).split('-');
                if (parts.length === 3) {
                    return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            return value;
        }
    },
    computed: {
        getStore() {
            const useStore = useStoreExhibiciones();
            //console.log('Exhibiciones:', useStore.getExhibiciones);
            return useStore.getExhibiciones;
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
}
</script>

<style scoped>
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

.grid-wrapper {
    height: 100%;
}
</style>