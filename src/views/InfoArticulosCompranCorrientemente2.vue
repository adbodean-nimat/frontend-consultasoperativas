<template>
    <div class="directive-fullscreen-wrapper">
        <div class="container-fluid page-grid min-vh-100 d-flex flex-column">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                        class="bi bi-lightning-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
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
            <div class="">
                <Toolbar class="mb-2" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                    <template #start>
                        <div class="d-flex flex-row align-items-center gap-2 w-full">
                            <label class="w-auto">Comprador:</label>
                            <Select class="w-auto" name="comprador" v-model="Comprador" :options="compradores"
                                optionLabel="Nombre" optionValue="Id" v-on:change="getRUBROSantes(this.Comprador)" />
                            <label class="w-auto">Rubros de compras:</label>
                            <MultiSelect name="rubros" v-model="rubrosseleccionados" :options="rubros"
                                optionLabel="RUBC_NOMBRE" optionValue="RUBC_RUBRO_COMPRA" filter
                                :filter-fields="['RUBC_NOMBRE', 'RUBC_RUBRO_COMPRA']" placeholder="Seleccione rubros"
                                :maxSelectedLabels="0" emptyFilterMessage="No se encontraron resultados"
                                :selected-items-label="'{0} rubros seleccionados'" class="w-full md:w-80">
                                <template #option="slotProps">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <div>{{ slotProps.option.RUBC_RUBRO_COMPRA }} - {{
                                            slotProps.option.RUBC_NOMBRE }}</div>
                                    </div>
                                </template>
                            </MultiSelect>
                            <label class="w-auto">Días hacia atrás fecha de NP:</label>
                            <InputNumber class="w-auto" name="dias_hacia_atras" v-model="Dias_hacia_atrás_fecha_de_NP"
                                :min="1" :max="365" fluid>
                            </InputNumber>
                            <label class="w-auto">Días atrás para evaluar SM4:</label>
                            <InputNumber class="w-auto" name="cant_dias_atras"
                                v-model="Cant_días_atrás_para_evaluar_SM4" :min="1" :max="90" fluid>
                            </InputNumber>
                            <Button icon="pi pi-play" outlined class="border-2!" @click="getData"></Button>
                            <Button v-if="this.rowData.length > 0" icon="pi pi-replay" outlined class="border-2!"
                                @click="resetData"></Button>
                            <template v-if="cargando == true">
                                <ProgressSpinner style="width: 24px; height: 24px; color: var(--primary-color);"
                                    strokeWidth="4" fill="transparent" />
                            </template>
                        </div>
                    </template>
                    <template #end>
                        <div v-if="tiempoejecucion !== ''">
                            <span>Tiempo de ejecución: </span>
                            <Badge severity="info" size="large" class="text-white">{{ tiempoejecucion }}
                                ms.</Badge>
                        </div>
                    </template>
                </Toolbar>
                <Toolbar v-if="rowData.length > 0" class="my-2 bg-transparent border-0 text-white">
                    <template #start>
                        <div class="d-flex flex-row align-items-center gap-2">
                            <span>Fecha de emisión: <Badge severity="secondary" size="large"> {{
                                rowData.length > 0 ? fechaHoy
                                    : '' }}</Badge></span>
                        </div>
                    </template>
                    <template #center>
                        <div class="d-flex flex-row justify-around align-items-center gap-2">
                            <span>Fecha NP desde: <Badge severity="secondary" size="large">{{
                                dayjs(fecha_desde_NP).format('DD/MM/YYYY') }}</Badge></span>

                            <span>Fecha NP hasta: <Badge severity="secondary" size="large">{{
                                dayjs(fecha_hasta_NP).format('DD/MM/YYYY') }}</Badge></span>
                        </div>

                    </template>
                    <template #end>
                        <div class="d-flex flex-row align-items-center gap-2">
                            <span>Total de artículos de esta vista: <Badge severity="secondary" size="large">{{
                                rowData.length
                                    }}</Badge></span>
                        </div>
                    </template>
                </Toolbar>
                <div v-if="rowData.length > 0" class="container-fluid mb-4 h-1/6">
                    <div class="row gap-3">
                        <Card class="col border-5 border-start border-danger">
                            <template #content>
                                <div class="m-0 d-flex flex-row justify-content-between align-items-center">
                                    <span v-if="itemROJOS.total >= 0">
                                        <span class="h4">{{ itemROJOS.total }} <small
                                                class="text-body-secondary">Item(s)</small></span>
                                        <span class="ms-2" style="font-size: small;">
                                            {{ itemROJOS.descripcion }}
                                        </span>
                                    </span>

                                    <span v-if="itemROJOS.total > 0">
                                        <ToggleButton onLabel="Sacar items" offLabel="Ver items"
                                            class="text-danger link-danger" onIcon="pi pi-eye-slash" offIcon="pi pi-eye"
                                            size="small" v-model="itemROJOS.verMas"
                                            v-on:change="externalFilterChanged('ROJOS')" />
                                    </span>
                                </div>
                            </template>
                        </Card>
                        <Card class="col border-5 border-start border-warning">
                            <template #content>
                                <div class="m-0 d-flex flex-row justify-content-between align-items-center">
                                    <span v-if="itemAMARILLOS.total >= 0">
                                        <span class="h4">{{ itemAMARILLOS.total }} <small
                                                class="text-body-secondary">Item(s)</small></span>
                                        <span class="ms-2" style="font-size: small;">
                                            {{ itemAMARILLOS.descripcion }}
                                        </span>
                                    </span>

                                    <span v-if="itemAMARILLOS.total > 0">
                                        <ToggleButton onLabel="Sacar items" offLabel="Ver items"
                                            class="text-warning link-warning" label="Ver items" variant="text"
                                            onIcon="pi pi-eye-slash" offIcon="pi pi-eye" size="small"
                                            name="itemAMARILLOS" v-model="itemAMARILLOS.verMas"
                                            v-on:change="externalFilterChanged('AMARILLOS')" />
                                    </span>
                                </div>

                            </template>
                        </Card>
                        <Card class="col border-5 border-start border-primary">
                            <template #content>
                                <div class="m-0 d-flex flex-row justify-content-between align-items-center">
                                    <span v-if="itemAZULES.total >= 0">
                                        <span class="h4">{{ itemAZULES.total }} <small
                                                class="text-body-secondary">Item(s)</small></span>
                                        <span class="ms-2" style="font-size: small;">
                                            <small>{{ itemAZULES.descripcion }}</small>
                                        </span>
                                    </span>

                                    <span v-if="itemAZULES.total > 0">
                                        <ToggleButton onLabel="Sacar items" offLabel="Ver items"
                                            class="text-primary link-primary" label="Ver items" variant="text"
                                            onIcon="pi pi-eye-slash" offIcon="pi pi-eye" size="small"
                                            v-model="itemAZULES.verMas" v-on:change="externalFilterChanged('AZULES')" />
                                    </span>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
            <Toolbar v-if="rowData.length > 0" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <template #start>
                    <div class="d-flex gap-2">
                        <Button label="Copiar Datos" icon="pi pi-copy" severity="secondary" outlined size="small"
                            @click="copiarFilas(false)" v-tooltip="'Copia solo los datos de las filas seleccionadas'" />

                        <Button label="Copiar con Títulos" icon="pi pi-table" severity="info" outlined size="small"
                            @click="copiarFilas(true)"
                            v-tooltip="'Copia los datos incluyendo los nombres de las columnas'" />
                    </div>
                </template>
                <template #end>
                    <Button label="Recargar Datos" icon="pi pi-replay" @click="getData" size="small" />
                    <!-- <Button label="Limpiar Filtros" icon="pi pi-filter-slash" @click="clearFilter()" /> -->
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
                    <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-balham" :theme="theme"
                        :columnDefs="columnDefs" :rowData="rowData" :defaultColDef="defaultColDef"
                        :isFullWidthRow="isFullWidthRow" :fullWidthCellRenderer="fullWidthCellRenderer"
                        :getRowHeight="getRowHeight" :animateRows="true" @grid-ready="onGridReady"
                        :row-class-rules="rowClassRules" :suppress-row-hover-highlight="true"
                        :auto-size-strategy="autoSizeStrategy" :context="{ componentParent: this }"
                        :localeText="localeText" @cell-double-clicked="onCellDoubleClicked"
                        :cell-enable-cell-text-selection="true" :row-selection="rowSelection">
                    </ag-grid-vue>
                </div>
            </div>

        </div>
        <Dialog v-model:visible="visibleDialog" modal header="Detalles de Orden de compra" :style="{ width: '50rem' }">
            <div class="d-flex flex-column gap-2">
                <DataTable :value="selectedItem" :scrollable="true" selectionMode="single" dataKey="ARTS_ARTICULO_EMP">
                    <Column field="Fecha_OC" header="Fecha O. compra"></Column>
                    <Column header="Orden de compra">
                        <template #body="slotProps">
                            {{ String(slotProps.data['CODC_DIVISION']).padStart(4, '0')
                            }}-{{ slotProps.data['CODC_TIPO_OC'] }}-{{ slotProps.data['CODC_NUM_OC']
                            }}/{{ String(slotProps.data['RODC_REN_OC']).padStart(4, '0') }}
                        </template>
                    </Column>
                    <Column field="Pend_Entrega" header="Cant. pendiente de entrega"></Column>
                </DataTable>
            </div>
            <div class="d-flex justify-content-end my-2">
                <Button type="button" label="Cerrar" severity="secondary" @click="visibleDialog = false"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="visibleDialogDerivados" modal header="Artículos derivados" :style="{ width: '50rem' }">
            <div class="d-flex flex-column gap-2">
                <DataTable :value="articulosderivados" :scrollable="true" selectionMode="single"
                    dataKey="ARTS_ARTICULO">
                    <Column field="ARTS_ARTICULO_EMP" header="Código"></Column>
                    <Column field="ARTS_NOMBRE" header="Nombre"></Column>
                </DataTable>
            </div>
            <div class="d-flex justify-content-end my-2">
                <Button type="button" label="Cerrar" severity="secondary"
                    @click="visibleDialogDerivados = false"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="visibleDialogVinculados" modal header="Artículos vinculados a OC"
            :style="{ width: 'auto' }">
            <div class="d-flex flex-column gap-2">
                <DataTable :value="selectedItemVinculados" :scrollable="true" selectionMode="single"
                    dataKey="RODC_ARTICULO">
                    <Column header="Orden de compra">
                        <template #body="slotProps">
                            {{ String(slotProps.data['CODC_DIVISION']).padStart(4, '0')
                            }}-{{ slotProps.data['CODC_TIPO_OC'] }}-{{ slotProps.data['CODC_NUM_OC']
                            }}/{{ String(slotProps.data['RODC_REN_OC']).padStart(4, '0') }}
                        </template>
                    </Column>
                    <Column header="Nota de pedido vinculado">
                        <template #body="slotProps">
                            {{ String(slotProps.data['NPDE_DIVISION_NPCA']).padStart(4, '0')
                            }}-{{ slotProps.data['NPDE_TIPO_NPCA'] }}-{{ slotProps.data['NPDE_NUMERO_NPCA']
                            }}/{{ String(slotProps.data['NPDE_RENGLON']).padStart(4, '0') }}
                        </template>
                    </Column>
                    <Column field="Cantpend_ent" header="Cant. pendiente entrega"></Column>
                    <Column field="CODC_OBSERVACION" header="Observación"></Column>
                </DataTable>
            </div>
            <div class="d-flex justify-content-end my-2">
                <Button type="button" label="Cerrar" severity="secondary"
                    @click="visibleDialogVinculados = false"></Button>
            </div>
        </Dialog>
        <ContextMenu ref="menu" :model="items" />
        <Toast />
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-theme-balham.css";
// All Community Features
import { AllCommunityModule, ModuleRegistry, themeBalham } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import axios from 'axios';
import store from '../store';
import Card from "primevue/card";
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';
import Badge from 'primevue/badge';
import Toolbar from 'primevue/toolbar';
import InputNumber from 'primevue/inputnumber';
import ProgressSpinner from 'primevue/progressspinner';
import ToggleButton from 'primevue/togglebutton';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
import minMax from 'dayjs/plugin/minMax';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { directive as fullscreen } from 'vue-fullscreen'

// COMPONENTE INTERNO PARA EL ENCABEZADO VERDE (Rubro)
// AG Grid usa componentes Vue para celdas complejas
const RubroHeaderRenderer = {
    template: `
        <div class="w-100 h-100 d-flex flex-column justify-content-end">
            <div class="w-100 d-flex align-items-center px-3 text-white fst-italic fw-bold fs-6" 
                 style="background-color: #007c3b; height: 40px;">
                <span>{{ params.data.nombre }} - {{ params.data.total }} items</span>
            </div>
        </div>
    `
};

// COMPONENTE PARA BOTONES DE ACCIÓN (Iconos Badge)
const ActionsRenderer = {
    template: `
        <div class="d-flex gap-1 align-items-center h-100 justify-content-center">
            <div v-if="params.data.Leyenda_derivados === 'Ver derivados'" 
                 class="badge bg-info p-2 cursor-pointer" 
                 v-tooltip="'Derivados'" 
                 @click="params.context.componentParent.onVerDerivados($event, params.data.ARTS_ARTICULO_EMP)">
                <span class="pi pi-search" style="font-size: 0.5rem;"></span>
            </div>

            <div v-if="params.data.hasVinculados"
                 class="badge bg-success p-2 cursor-pointer" 
                 v-tooltip="'Artículos vinculados a OC'" 
                 @click="params.context.componentParent.onVerVinculados($event, params.data.ARTS_ARTICULO_EMP)">
                <span class="pi pi-search" style="font-size: 0.5rem;"></span>
            </div>

            <div v-if="params.data.hasReclamados" 
                 class="badge bg-warning p-2 cursor-pointer" 
                 v-tooltip="'Artículos reclamados al proveedor'" 
                 @click="params.context.componentParent.onVerOC($event, params.data.ARTS_ARTICULO_EMP)">
                <span class="pi pi-search" style="font-size: 0.5rem;"></span>
            </div>
        </div>
    `
};
export default {
    name: 'InfoArticulosAgGrid',
    directives: {
        fullscreen
    },
    components: {
        AgGridVue,
        Card,
        Button,
        ContextMenu,
        Dialog,
        DataTable,
        Column,
        RubroHeaderRenderer,
        ActionsRenderer,
        Toast,
        Badge,
        Toolbar,
        InputNumber,
        ProgressSpinner,
        ToggleButton,
        MultiSelect,
        Select,
    },
    data() {
        return {
            title: 'Información de Artículos que se Compran Corrientemente v2',
            ageType: 'everyone',
            rowSelection: {
                mode: 'multiRow',
                checkboxes: false,
                headerCheckbox: false,
                enableClickSelection: true,
                copySelectedRows: true,
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
            autoSizeStrategy: {
                type: 'fitCellContents',
                skipHeader: true
            },
            useToast,
            fullscreen: false,
            fullscreengrid: false,
            teleport: true,
            pageOnly: true,
            dayjs,
            gridApi: null,
            columnDefs: null,
            cargando: false,
            tiempoejecucion: '',
            rowData: [],
            datosOriginales: [],
            // Configuración por defecto para todas las columnas
            defaultColDef: {
                sortable: false,
                filter: false,
                resizable: true,
                //suppressSizeToFit: true,
                //flex: 1, // Auto-ancho
                //minWidth: 100,
                //cellStyle: { display: 'flex', alignItems: 'center' }, // Centrado vertical
            },
            // Registramos el componente de cabecera verde
            fullWidthCellRenderer: 'RubroHeaderRenderer',
            rowClassRules: {
                'text-bg-danger': params => params.data['1_Stock-NP_más_bajo_que_SM_Sin_OC'] == 1,
                'text-bg-warning': params => params.data['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] == 1,
                'text-bg-primary': params => params.data['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] == 1
            },
            // Lógica de Context Menu (Mantenida de tu código anterior)
            items: [{ label: 'Ver Orden de Compra', icon: 'pi pi-search', command: () => { /* tu logica */ } }],
            fechaHoy: '',
            fecha_desde_NP: '',
            fecha_hasta_NP: '',
            Cant_días_atrás_para_evaluar_SM4: 90,
            Dias_hacia_atrás_fecha_de_NP: 365,
            rubrosseleccionados: [],
            compradores: [
                { Id: 0, Nombre: 'TODOS' },
                { Id: 1, Nombre: 'EGE' },
                { Id: 2, Nombre: 'SCC' },
                { Id: 3, Nombre: 'SMA' },
            ],
            Comprador: 0,
            rubros: [],
            rubrosseleccionados: [],
            itemreclamados: [],
            itemvinculados: [],
            itemROJOS: {
                total: 0,
                title: 'Item ROJO',
                descripcion: 'Sin pendientes de OC.',
                icon: 'pi pi-exclamation-triangle',
                color: 'red',
                iconColor: 'red',
                verMas: false
            },
            itemAMARILLOS: {
                total: 0,
                title: 'Item AMARILLO',
                descripcion: 'Con pendientes de OC sigue abajo.',
                icon: 'pi pi-exclamation-triangle',
                color: 'yellow',
                iconColor: 'yellow',
                verMas: false
            },
            itemAZULES: {
                total: 0,
                title: 'Item AZUL',
                descripcion: 'Con pendientes de OC queda arriba.',
                icon: 'pi pi-exclamation-triangle',
                color: 'blue',
                iconColor: 'blue',
                verMas: false
            },
            visibleDialog: false,
            visibleDialogDerivados: false,
            visibleDialogVinculados: false,
            items: [
                {
                    label: 'Ver el nro. de Orden de compra',
                    icon: 'pi pi-search',
                    command: () => {
                        this.visibleDialog = true;
                    }
                }
            ],
            itemsDerivados: [
                {
                    label: 'Ver artículos derivados',
                    icon: 'pi pi-search',
                    command: () => {
                        this.visibleDialogDerivados = true;
                    }
                }
            ],
            itemsVinculados: [
                {
                    label: 'Ver artículos vinculados a OC',
                    icon: 'pi pi-search',
                    command: () => {
                        this.visibleDialogVinculados = true;
                    }
                }
            ],
            articulosderivados: [],
            articulosbygroupcomprador: [],
            codigoderivado: '',
            codigovinculado: '',
            selectedItem: null,
            selectedItemVinculados: null,
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
        }
    },
    created() {
        // DEFINICIÓN DE COLUMNAS
        this.columnDefs = [
            {
                headerName: '#',
                field: 'actions',
                width: 50,
                maxWidth: 50,
                minWidth: 50,
                cellRenderer: 'ActionsRenderer',
                // Usamos el componente de iconos
                pinned: 'left' // Fija la columna a la izquierda
            },
            { headerName: 'Código', field: 'ARTS_ARTICULO_EMP', pinned: 'left', cellClass: 'text-center', filter: 'agNumberColumnFilter' },
            { headerName: 'Nombre', field: 'ARTS_NOMBRE', pinned: 'left', filter: 'agTextColumnFilter' },
            {
                headerName: 'Bloq. Vtas?',
                field: '¿BloqVtas?',
                cellClassRules: {
                    'text-danger': params => params.value === "Si"
                },
                cellClass: 'text-center'
            },
            {
                headerName: 'S.M. Uni',
                field: 'Stock_mín_2y4',
                cellClassRules: {
                    'text-white': params => params.value === 0
                },
                valueFormatter: params => params.value ? Number(params.value).toFixed(2) : '',
                cellClass: 'text-end',

            },
            {
                headerName: 'S.M. Días',
                field: 'Días_stock_mínimo',
                cellClass: 'text-end',

            },
            {
                headerName: 'Pte. NP',
                field: 'Pend_entrega_NP',
                cellClassRules: {
                    'text-white': params => params.value === 0
                },
                cellClass: 'text-end',

            },
            {
                headerName: 'Pte. OC',
                field: 'Cant_pend_entrega_OC',
                cellClassRules: {
                    'text-white': params => params.value === 0
                },
                cellClass: 'text-end',

            },
            {
                headerName: 'Stock físico',
                children: [
                    { headerName: 'Dep. 940', field: 'Stock_Uni_depós_940', cellClass: 'text-end', },
                    { headerName: 'Dep. 950', field: 'Stock_Uni_depós_950', cellClass: 'text-end', },
                    { headerName: 'Otro Dep.', field: 'Stock_Uni_sin_940_y_sin_950', cellClass: 'text-end', },
                    { headerName: 'Todos Dep.', field: 'Stock_Unidades_todos_los_depós', cellClass: 'text-end', },
                    {
                        headerName: 'Stock - NP',
                        field: 'Stock-NP',
                        // MAGIA: cellClassRules aplica clases CSS según el valor (Súper rápido)
                        cellClassRules: {
                            'bg-danger text-white': params => params.data['1_Stock-NP_más_bajo_que_SM_Sin_OC'] == 1,
                            'bg-warning text-dark': params => params.data['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] == 1,
                            'bg-primary text-white': params => params.data['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] == 1,
                            'bg-success-subtle text-dark': params => !params.data['1_Stock-NP_más_bajo_que_SM_Sin_OC']
                                && !params.data['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo']
                                && !params.data['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba']
                        },
                        cellClass: 'text-end',
                    },
                    {
                        headerName: 'Stock - NP días',
                        field: 'Stock-NP_días',
                        valueFormatter: params => params.value ? Number(params.value).toFixed(0) : '',
                        cellClass: 'text-end',
                    }
                ]
            },
            { headerName: 'Clasif. 8', field: 'ARTS_CLASIF_8', cellClass: 'text-center' },
            { headerName: 'Clasificador 8', field: 'CA08_NOMBRE', },
            { headerName: 'Cons. diario', field: 'Consumo_diario', cellClass: 'text-center' },
            {
                headerName: 'Días y fechas remitos p/SM2',
                children: [
                    { headerName: 'Desde', field: 'Fecha_desde_TP1_y_2_y_MS4', cellClass: 'text-center' },
                    { headerName: 'Hasta', field: 'Fecha_hasta_TP1_y_2_Y_MS4', cellClass: 'text-center' },
                    { headerName: 'Días', field: 'Días_stock_Períodos_1_2_y_4', cellClass: 'text-center' },
                ]
            },
            { headerName: 'Cant. rtos', field: 'Cant_remito_MS2yMS4', cellClass: 'text-end' },
            { headerName: 'Stock Mín', field: 'ARTS_MODO_STOC_MIN', cellClass: 'text-end' },
            { headerName: 'Nombre modo stock mín.', field: 'Nombre_modo_stock', cellClass: 'text-center' },
            { headerName: 'F.U. Rto. Vtas', field: 'Fecha_Ultimo_Remito_Venta', cellClass: 'text-center' },
            { headerName: 'F.U. Ent. Prov.', field: 'Fecha_Ultima_Entrega_Proveedor', cellClass: 'text-center' },
            { headerName: 'Cant. U. E. Prov.', field: 'Cantidad_Ultima_Entrega_Proveedor', cellClass: 'text-end' },
            { headerName: 'Días S/Rto. Vtas.', field: 'Dias_sin_remitos_ventas', cellClass: 'text-end' },
            { headerName: 'Días U. E. Prov.', field: 'Dias_ultima_entrega_proveedor', cellClass: 'text-end' },
        ];
    },
    methods: {
        externalFilterChanged(categoria) {
            // 1. Identificar si el botón quedó ACTIVO o INACTIVO
            let estaActivo = false;

            if (categoria === 'ROJOS') {
                estaActivo = this.itemROJOS.verMas;
                // Si activamos ROJOS, desactivamos visualmente los otros para evitar confusión
                if (estaActivo) {
                    this.itemAMARILLOS.verMas = false;
                    this.itemAZULES.verMas = false;
                }
            }
            else if (categoria === 'AMARILLOS') {
                estaActivo = this.itemAMARILLOS.verMas;
                if (estaActivo) {
                    this.itemROJOS.verMas = false;
                    this.itemAZULES.verMas = false;
                }
            }
            else if (categoria === 'AZULES') {
                estaActivo = this.itemAZULES.verMas;
                if (estaActivo) {
                    this.itemROJOS.verMas = false;
                    this.itemAMARILLOS.verMas = false;
                }
            }

            // 2. Aplicar la lógica: Si está activo, ponemos el filtro. Si no, mostramos todos ("everyone")
            if (estaActivo) {
                this.ageType = categoria;
            } else {
                this.ageType = 'everyone';
            }

            // 3. CAMBIO CLAVE: Recalcular la grilla manualmente
            this.procesarDatosParaGrid();
        },
        isExternalFilterPresent() {
            return this.ageType !== "everyone";
        },
        doesExternalFilterPass(node) {
            if (node.data) {
                switch (this.ageType) {
                    case "ROJOS":
                        return node.data['1_Stock-NP_más_bajo_que_SM_Sin_OC'] == 1;
                    case "AMARILLOS":
                        return node.data['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] == 1;
                    case "AZULES":
                        return node.data['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] == 1;
                    default:
                        return true;
                }
            }
            return true;
        },
        async copiarFilas(incluirCabecera) {
            const filasSeleccionadas = this.gridApi.getSelectedRows();

            if (filasSeleccionadas.length === 0) {
                this.$toast.add({ severity: 'warn', summary: 'Atención', detail: 'Selecciona filas primero (Ctrl + Clic).', life: 3000 });
                return;
            }

            // 1. HELPER: Obtener columnas "planas" (recursivo para grupos)
            // Devuelve lista de objetos: { campo: 'ARTS_NOMBRE', titulo: 'Nombre' }
            const obtenerColumnas = (defs) => {
                let cols = [];
                defs.forEach(col => {
                    if (col.children) {
                        // Si es grupo, entramos recursivamente
                        cols = cols.concat(obtenerColumnas(col.children));
                    } else if (col.field && col.field !== 'actions') {
                        // Guardamos campo y título
                        cols.push({
                            campo: col.field,
                            titulo: col.headerName || col.field
                        });
                    }
                });
                return cols;
            };

            const columnasInfo = obtenerColumnas(this.columnDefs);

            // 2. CONSTRUIR EL TEXTO
            let textoFinal = '';

            // A) Si pidió cabecera, la agregamos primero
            if (incluirCabecera) {
                const lineaTitulos = columnasInfo.map(c => c.titulo).join('\t');
                textoFinal += lineaTitulos + '\n';
            }

            // B) Agregamos los datos
            const textoDatos = filasSeleccionadas.map(fila => {
                return columnasInfo.map(c => {
                    const valor = fila[c.campo];
                    // Validamos que no sea null/undefined para que no escriba "null"
                    return (valor !== null && valor !== undefined) ? valor : '';
                }).join('\t');
            }).join('\n');

            textoFinal += textoDatos;

            // 3. COPIAR AL PORTAPAPELES (Método robusto)
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textoFinal);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = textoFinal;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                this.$toast.add({
                    severity: 'success',
                    summary: incluirCabecera ? 'Tabla Copiada' : 'Datos Copiados',
                    detail: `${filasSeleccionadas.length} filas listas para pegar en Excel.`,
                    life: 3000
                });

            } catch (err) {
                console.error('Error al copiar:', err);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo copiar.', life: 3000 });
            }
        },
        async copiarCodigosSeleccionados() {
            const filasSeleccionadas = this.gridApi.getSelectedRows();

            if (filasSeleccionadas.length === 0) {
                this.$toast.add({ severity: 'warn', summary: 'Atención', detail: 'Selecciona al menos una fila (usa Ctrl + Clic).', life: 3000 });
                return;
            }

            // 1. OBTENER LAS COLUMNAS REALES (Aplanamos la estructura por si hay grupos)
            // Definimos qué campos queremos copiar basándonos en tu columnDefs
            // Filtramos la columna 'actions' (botones) y las que no tienen campo (grupos)
            const obtenerCampos = (defs) => {
                let campos = [];
                defs.forEach(col => {
                    if (col.children) {
                        // Si es un grupo (ej: Stock físico), buscamos dentro recursivamente
                        campos = campos.concat(obtenerCampos(col.children));
                    } else if (col.field && col.field !== 'actions') {
                        // Si es una columna normal y no es la de acciones, la agregamos
                        campos.push(col.field);
                    }
                });
                return campos;
            };

            const camposACopiar = obtenerCampos(this.columnDefs);

            // 2. CONSTRUIR EL TEXTO
            // Mapeamos cada fila: creamos un string con los valores separados por Tab (\t)
            const textoACopiar = filasSeleccionadas.map(fila => {
                return camposACopiar.map(campo => {
                    // Obtenemos el valor. Si es null o undefined, ponemos un string vacío
                    const valor = fila[campo];
                    return (valor !== null && valor !== undefined) ? valor : '';
                }).join('\t'); // Separador de columnas (Excel)
            }).join('\n');     // Separador de filas

            // 3. Copiar al portapapeles (Usando la técnica robusta que te pasé antes)
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textoACopiar);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = textoACopiar;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                // 4. Confirmación
                this.$toast.add({
                    severity: 'success',
                    summary: 'Copiado',
                    detail: `${filasSeleccionadas.length} códigos copiados al portapapeles.`,
                    life: 3000
                });

            } catch (err) {
                console.error('Error al copiar:', err);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo copiar.', life: 3000 });
            }
        },
        async onCellDoubleClicked(params) {
            console.log('Celda doble clickeada:', params.value);
            // 1. Verificamos que haya un valor para copiar
            if (!params.value) return;

            // 2. Evitamos copiar si es una fila de cabecera verde (Header)
            if (params.data && params.data.type === 'HEADER') return;

            try {
                // 3. Copiamos al portapapeles
                await navigator.clipboard.writeText(params.value);

                // 4. Feedback visual (Usando tu sistema de Toast actual)
                this.$toast.add({
                    severity: 'info',
                    summary: 'Copiado',
                    detail: `Valor "${params.value}" copiado al portapapeles.`,
                    life: 2000 // Dura 2 segundos
                });

            } catch (err) {
                console.error('Error al copiar: ', err);
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo copiar el texto.',
                    life: 3000
                });
            }
        },
        async getItemVinculadosAOC() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/itemsvinculadosaoc', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.itemvinculados = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos vinculados a OC.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos vinculados a OC.', life: 3000 });
            }
        },
        async getItemReclamadosAlProveedor() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/itemreclamadosalproveedor', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.itemreclamados = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos reclamados al proveedor.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos reclamados.', life: 3000 });
            }
        },
        async getVerArtsDerivados(codigoderivado) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/verartsderivados/' + codigoderivado.substring(1, 8), {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.articulosderivados = response.data.filter(item => item.ARTS_ARTICULO_EMP !== codigoderivado.substring(1, 8));
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos derivados.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos derivados.', life: 3000 });
            }
        },
        async getRUBROS() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/cpagrubc', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.rubros = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron rubros de compras.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async getRUBROSantes(e) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/cpagrubc', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data && e == 0) {
                    this.rubros = response.data;
                } else if (response.data && e != 0) {
                    this.rubros = response.data.filter(rubro => rubro['RUBC_NOMBRE'].includes(this.compradores[e].Nombre));
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron rubros de compras.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            // Pasamos el contexto de "this" a los componentes internos (para que funcionen los clicks)
            // params.api.setGridOption('context', { componentParent: this });
            // this.getData();
        },
        // Función para determinar si una fila es CABECERA (Verde)
        isFullWidthRow(params) {
            return params.rowNode.data.type === 'HEADER';
        },
        // Altura de fila: 40px para cabeceras, 30px para datos normales
        getRowHeight(params) {
            return params.data.type === 'HEADER' ? 60 : 30;
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.call(this));
            this.getRUBROS();
        },
        onVerOC(event, codigo) {
            this.selectedItem = this.itemreclamados.filter(item => item['ARTS_ARTICULO_EMP'] === codigo);
            this.visibleDialog = true;
            event.preventDefault();
        },
        onVerDerivados(event, codigo) {
            this.getVerArtsDerivados(codigo);
            this.visibleDialogDerivados = true;
            event.preventDefault();
        },
        onVerVinculados(event, codigo) {
            this.selectedItemVinculados = this.itemvinculados.filter(item => item['ARTS_ARTICULO_EMP'] === codigo);
            this.visibleDialogVinculados = true;
            event.preventDefault();
        },
        async getData() {
            this.getItemReclamadosAlProveedor();
            this.getItemVinculadosAOC();
            const start = new Date();
            try {

                dayjs.locale('es-us');
                dayjs.extend(minMax);
                dayjs.extend(LocalizedFormat);
                this.fechaHoy = dayjs().format('LLL');
                this.cargando = true;

                const params = {
                    cantdiasatrasparaevaluarsm4: this.Cant_días_atrás_para_evaluar_SM4,
                    diashaciaatrasfechadeNP: this.Dias_hacia_atrás_fecha_de_NP,
                    comprador: this.compradores[this.Comprador]?.Nombre || '',
                    rubros: this.rubrosseleccionados?.length > 0 ?
                        this.rubrosseleccionados.map(rubro => `'${rubro}'`).join(',') : ''
                };

                const response = await axios.get(
                    `${process.env.VUE_APP_API_BASE}/gdc/infodeartquesecomprancorrientemente`,
                    {
                        params,
                        headers: { Authorization: `Bearer ${this.token}` }
                    }
                );

                // 1. Guardamos los datos puros en la variable nueva
                this.datosOriginales = Object.freeze(response.data);

                // 2. Llamamos a procesar sin pasar datos (usará this.datosOriginales internamente)
                this.procesarDatosParaGrid();

                this.$toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `${this.rowData.length} artículos cargados.`,
                    life: 3000
                });
            } catch (error) {
                console.error(error);
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo obtener la información.',
                    life: 3000
                });
            } finally {
                this.cargando = false;
                const end = new Date();
                this.tiempoejecucion = end.getTime() - start.getTime();
            }
        },
        procesarDatosParaGrid() {
            // Usamos siempre la copia original
            const datosCompletos = this.datosOriginales;
            if (!datosCompletos || datosCompletos.length === 0) return;

            // --- PARTE A: CALCULAR CONTADORES (Badges de arriba) ---
            // Recorremos TODOS los datos para que los botones de colores sigan mostrando el total real
            let countRojos = 0;
            let countAmarillos = 0;
            let countAzules = 0;
            let minDate = null;
            let maxDate = null;

            datosCompletos.forEach(item => {
                if (item['1_Stock-NP_más_bajo_que_SM_Sin_OC'] == 1) countRojos++;
                if (item['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] == 1) countAmarillos++;
                if (item['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] == 1) countAzules++;

                // Lógica de fechas (mantenida de tu código)
                if (item.Fecha_desde_para_incluir_NP) {
                    const dDesde = this.dayjs(item.Fecha_desde_para_incluir_NP); // Usar this.dayjs
                    if (!minDate || dDesde.isBefore(minDate)) minDate = dDesde;
                }
                if (item.Fecha_hasta_para_incluir_NP) {
                    const dHasta = this.dayjs(item.Fecha_hasta_para_incluir_NP);
                    if (!maxDate || dHasta.isAfter(maxDate)) maxDate = dHasta;
                }
            });

            // Actualizamos las tarjetas
            this.itemROJOS.total = countRojos;
            this.itemAMARILLOS.total = countAmarillos;
            this.itemAZULES.total = countAzules;
            this.fecha_desde_NP = minDate;
            this.fecha_hasta_NP = maxDate;


            // --- PARTE B: FILTRAR Y CREAR GRILLA ---

            // 1. Filtramos los datos que vamos a mostrar según el botón activo (ageType)
            let datosAProcesar = [...datosCompletos];

            if (this.ageType === 'ROJOS') {
                datosAProcesar = datosAProcesar.filter(item => item['1_Stock-NP_más_bajo_que_SM_Sin_OC'] == 1);
            } else if (this.ageType === 'AMARILLOS') {
                datosAProcesar = datosAProcesar.filter(item => item['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] == 1);
            } else if (this.ageType === 'AZULES') {
                datosAProcesar = datosAProcesar.filter(item => item['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] == 1);
            }
            // Si es 'everyone', no filtramos nada

            // 2. Ordenar por Rubro
            datosAProcesar.sort((a, b) => (a.RUBC_NOMBRE || '').localeCompare(b.RUBC_NOMBRE || ''));

            const filasGrid = [];
            let ultimoRubro = null;

            // 3. Insertar filas y cabeceras dinámicas
            datosAProcesar.forEach(item => {
                // Detectar cambio de rubro para insertar cabecera verde
                if (item.RUBC_NOMBRE !== ultimoRubro) {
                    ultimoRubro = item.RUBC_NOMBRE;

                    // Calculamos cuántos items de ESTE rubro hay en la vista FILTRADA
                    const totalItemsEnGrupo = datosAProcesar.filter(x => x.RUBC_NOMBRE === ultimoRubro).length;

                    filasGrid.push({
                        type: 'HEADER',
                        nombre: item.ARCO_RUBRO_COMPRA + ' - ' + ultimoRubro,
                        total: totalItemsEnGrupo // Ahora mostrará el total correcto según el filtro
                    });
                }

                // Agregamos flags (mantenido de tu código)
                item.type = 'ITEM';
                item.hasVinculados = this.itemvinculados.some(v => v.ARTS_ARTICULO_EMP === item.ARTS_ARTICULO_EMP);
                item.hasReclamados = this.itemreclamados.some(r => r.ARTS_ARTICULO_EMP === item.ARTS_ARTICULO_EMP);

                filasGrid.push(item);
            });

            // 4. Asignar a la grilla
            this.rowData = Object.freeze(filasGrid);
        }
    },
    mounted() {
        this.getRUBROS();
    },
    computed: {
        token() {
            return store.state.token
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
}
</script>

<style>
/* Estilos necesarios para que se vea bien */
.ag-theme-alpine {
    font-family: var(--font-family);
    /* Usar fuente de tu app */
}

.ag-header-cell-label {
    justify-content: center;
    /* Centrar headers */
}

.ag-cell {
    line-height: 30px;
    /* Alineación vertical */
}

/* Clases utilitarias bootstrap dentro de la grilla */
.bg-danger {
    background-color: #dc3545 !important;
}

.bg-warning {
    background-color: #ffc107 !important;
}

.bg-primary {
    background-color: #0d6efd !important;
}

.bg-success-subtle {
    background-color: #d1e7dd !important;
}
</style>