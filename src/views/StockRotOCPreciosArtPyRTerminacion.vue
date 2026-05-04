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
                    <div class="filtros-grid">
                        <div class="filtro-item">
                            <label>Clasificación 2</label>
                            <InputText v-model="getStore.clasif2_terminacion" class="mb-3 me-2"
                                @update:model-value="clasif2terminacionUpdate" />
                        </div>
                        <div class="filtro-item">
                            <div class="mb-2">
                                <span><strong>Tiempos para evaluar rotación</strong></span>
                            </div>
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
                    <div v-if="rowData.length > 0">
                        <Button class="ms-2 mr-2" label="Copiar la grilla" icon="pi pi-table" severity="success"
                            outlined size="small" @click="copyVisibleRowsToClipboard()"
                            v-tooltip="'Copia solo las filas visibles (respetando filtros y orden) para pegar en Excel'" />
                    </div>
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
    name: 'StockRotOCPreciosArtPyRTerminacion',
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
            title: 'Stock Rotación OC - Precios Art. PyR Terminación',
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
                    field: 'Cód Art',
                    minWidth: 130,
                    pinned: 'left',
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Artículo',
                    field: 'Nombre Art',
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
                    headerName: 'Uni Pte Entr NP',
                    field: 'Uni Pte Entr NP',
                    minWidth: 140,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Stock Disp.',
                    field: 'Uni Dispon',
                    minWidth: 130,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Pre Cdo con IVA L1',
                    field: 'Pre Cdo con IVA L1',
                    minWidth: 130,
                    valueFormatter: params => `$ ${this.formatNumber(params.value)}`,
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
                    headerName: 'Días UEP Días Ultima Vta',
                    field: 'Días_UEP Diás_UV',
                    minWidth: 145,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Pend Ent OC',
                    field: 'Pend Ent OC',
                    minWidth: 130,
                    valueFormatter: params => this.formatNumber(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Fecha Ult Entr Proveed',
                    field: 'Fecha Ult Entr Proveed',
                    minWidth: 130,
                    valueFormatter: params => this.formatDate(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Cant Ult Entr Proveed',
                    field: 'Cant Ult Entr Proveed',
                    minWidth: 145,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Costo L100 sin IVA item',
                    field: 'Costo L100 sin IVA item',
                    minWidth: 135,
                    valueFormatter: params => `$ ${this.formatNumber(params.value)}`,
                    cellClass: 'text-center'
                },
                {
                    headerName: 'AGRUP B MEDIA',
                    field: 'AGRUP B MEDIA',
                    minWidth: 135,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'AGRUP D MINI',
                    field: 'AGRUP D MINI',
                    minWidth: 135,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'AGRUP C MENOR',
                    field: 'AGRUP C MENOR',
                    minWidth: 135,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'AGRUP E MARCA',
                    field: 'AGRUP E MARCA',
                    minWidth: 135,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Clasificación 8',
                    field: 'ARTS_CLASIF_8',
                    minWidth: 135,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'STOCK Y PRODUCCION',
                    field: 'STOCK Y PRODUCCION',
                    minWidth: 135,
                    cellClass: 'text-end'
                },
                {
                    headerName: 'Pre Cdo sin IVA L100',
                    field: 'Pre Cdo sin IVA L100',
                    minWidth: 135,
                    valueFormatter: params => `$ ${this.formatNumber(params.value)}`,
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Cant Rtos',
                    field: 'Cant Rtos',
                    minWidth: 135,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Cons x día',
                    field: 'Cons x día',
                    minWidth: 135,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Día Stock',
                    field: 'Día Stock',
                    minWidth: 135,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Días previos',
                    field: 'Días previos',
                    minWidth: 135,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },
                {
                    headerName: 'Días que dura',
                    field: 'Días que dura',
                    minWidth: 135,
                    valueFormatter: params => this.formatInteger(params.value),
                    cellClass: 'text-center'
                },

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
        clasif2terminacionUpdate(value) {
            if (!value) return;
            const useStore = useStoreExhibiciones();
            useStore.setClasif2_terminacion(value);
        },
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
        formatClipboardValue(field, value) {
            if (value === null || value === undefined || value === '') return ''

            const textColumns = [
                'Cód Art',
                'ARTS_CLASIF_8'
            ]

            const integerColumns = [
                'Stock Uni',
                'Uni Pte Entr NP',
                'Uni Dispon',
                'Días sin venta',
                'Días Ult Ent Prov',
                'Días_UEP Diás_UV',
                'Pend Ent OC',
                'Cant Ult Entr Proveed',
                'Cant Rtos',
                'Días previos',
                'Días que dura'
            ]

            const decimalColumns = [
                'Cons x día',
                'Día Stock',
            ]

            const priceColumns = [
                'Pre Cdo con IVA L1',
                'Costo L100 sin IVA item',
                'Pre Cdo sin IVA L100'
            ]

            const dateColumns = [
                'Ultima Vta',
                'Fecha Ult Entr Proveed'
            ]

            const cleanValue = String(value)
                .replace(/\t/g, ' ')
                .replace(/\r?\n/g, ' ')

            if (textColumns.includes(field)) {
                return `="${cleanValue}"`
            }

            if (integerColumns.includes(field)) {
                return Number(value).toLocaleString('es-AR', {
                    maximumFractionDigits: 0
                })
            }

            if (decimalColumns.includes(field)) {
                return Number(value).toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            }

            if (priceColumns.includes(field)) {
                return `$ ${Number(value).toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`
            }

            if (dateColumns.includes(field)) {
                return this.formatDate(value)
            }

            return cleanValue
        },
        async copyVisibleRowsToClipboard() {
            if (!this.gridApi) return

            const visibleColumns = this.gridApi
                .getAllDisplayedColumns()
                .map(col => ({
                    header: col.getColDef().headerName || col.getColDef().field,
                    field: col.getColDef().field
                }))
                .filter(col => !!col.field)

            const lines = []
            const textColumns = ['ARTS_ARTICULO_EMP']

            lines.push(visibleColumns.map(col => col.header).join('\t'))

            this.gridApi.forEachNodeAfterFilterAndSort((node) => {
                if (!node.data) return

                const row = visibleColumns.map(col => {

                    const value = this.formatClipboardValue(col.field, node.data[col.field])

                    //const value = node.data[col.field]

                    if (value === null || value === undefined) return ''

                    const cleanValue = String(value)
                        .replace(/\t/g, ' ')
                        .replace(/\r?\n/g, ' ')

                    /* if (textColumns.includes(col.field)) {
                        return `="${cleanValue}"`
                    } */

                    return cleanValue
                })

                lines.push(row.join('\t'))
            })

            const text = lines.join('\n')

            try {
                await navigator.clipboard.writeText(text)
                this.$toast.add({
                    severity: 'success',
                    summary: 'Copiado con éxito',
                    detail: `${lines.length - 1} filas visibles copiadas al portapapeles. Listo para pegar en Excel.`,
                    life: 3000
                });
            } catch (error) {
                console.error('Error al copiar:', error)
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo copiar.',
                    life: 3000
                });
            }
        },
        async getData() {
            try {
                this.loading = true;
                const useStore = useStoreExhibiciones();
                const params = {
                    clasif2: useStore.getExhibiciones.clasif2_terminacion,
                    diasprevios: useStore.getExhibiciones.dias_previos,
                    diasdura: useStore.getExhibiciones.dias_duros
                };

                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/stockrotocpreciosartpyrterminacion', {
                    params,
                    headers: { Authorization: `Bearer ${this.token}` }
                });

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
.filtros-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 12px;
}

.filtro-item {
    display: flex;
    flex-direction: column;
    align-self: self-end;
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