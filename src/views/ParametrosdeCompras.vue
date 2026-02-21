<template>
    <div class="directive-fullscreen-wrapper">
        <div class="container-fluid page-grid min-vh-100">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-sliders2"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                    </svg>
                    <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
                    <span style="color: white; margin-left: 5px;">{{ title }}</span>
                </div>
                <div class="button-fullscreen">
                    <div style="margin-right: 15px;">
                        <kbutton v-fullscreen="options">
                            <svg v-show="!fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                            </svg>
                            <svg v-show="fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                            </svg>
                        </kbutton>
                    </div>
                </div>
            </div>

            <div class="card">
                <Toolbar class="mb-0" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                    <template #start>
                        <span>Parametros: <strong><i>Información de Artículos que se Compran
                                    Corrientemente</i></strong></span>
                    </template>
                    <template #end>

                    </template>
                </Toolbar>
                <Accordion multiple>
                    <AccordionPanel value="0">
                        <AccordionHeader>1 - Chapas TIPOS que la definen</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="tiposdearticulos" :source="source" :target="target"
                                @move-to-source="onMoveToSource" @move-to-target="onMoveToTarget"
                                @move-all-to-source="onMoveAllToSource" @move-all-to-target="onMoveAllToTarget"
                                dataKey="id" breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.Cod_tipo + ' - ' + option.Nombre_tipo }}
                                </template>
                                <template #targetheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Tipos de artículos definidos</span>
                                        <span class="text-muted"> ({{ target.length }})</span>
                                    </div>
                                </template>
                                <template #sourceheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Tipos de artículos disponibles</span>
                                        <span class="text-muted"> ({{ source.length }})</span>
                                    </div>
                                </template>
                            </PickList>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="1">
                        <AccordionHeader>2 - Clasif 8 art que se compran (excepto PYR, chapas metal y mubas)
                        </AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="clasificacion8" :source="source_clasificacion8"
                                :target="target_clasificacion8" @move-to-source="onMoveToSource_clasificacion8"
                                @move-to-target="onMoveToTarget_clasificacion8"
                                @move-all-to-source="onMoveAllToSource_clasificacion8"
                                @move-all-to-target="onMoveAllToTarget_clasificacion8" dataKey="id" breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.Cod_clasif8 + ' - ' + option.Nombre_clasif8 }}
                                </template>
                                <template #targetheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Clasificación 8 definida</span>
                                        <span class="text-muted"> ({{ target_clasificacion8.length }})</span>
                                    </div>
                                </template>
                                <template #sourceheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Clasificación 8 disponible</span>
                                        <span class="text-muted"> ({{ source_clasificacion8.length }})</span>
                                    </div>
                                </template>
                            </PickList>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="2">
                        <AccordionHeader>3 - Depos. A No considerar para stock</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="stockdeposito" :source="source_stockdeposito"
                                :target="target_stockdeposito" @move-to-source="onMoveToSource_stockdeposito"
                                @move-to-target="onMoveToTarget_stockdeposito"
                                @move-all-to-source="onMoveAllToSource_stockdeposito"
                                @move-all-to-target="onMoveAllToTarget_stockdeposito" dataKey="id" breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.Cod_Depos + ' - ' + option.Nombre_Depos }}
                                </template>
                                <template #targetheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Depósitos definida</span>
                                        <span class="text-muted"> ({{ target_stockdeposito.length }})</span>
                                    </div>
                                </template>
                                <template #sourceheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Depósitos disponible</span>
                                        <span class="text-muted"> ({{ source_stockdeposito.length }})</span>
                                    </div>
                                </template>
                            </PickList>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="3">
                        <AccordionHeader>4 - Modos de stock mínimo</AccordionHeader>
                        <AccordionContent>
                            <Toolbar class="mb-3">
                                <template #start>
                                    <Button label="Agregar" icon="pi pi-plus" class="m-2"
                                        @click="productDialog = true"></Button>
                                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" outlined
                                        @click="DeleteSelected"
                                        :disabled="!selectedmodosdestockminimo || !selectedmodosdestockminimo.length" />
                                </template>
                            </Toolbar>
                            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }"
                                header="Agregar modo stock" :modal="true">
                                <div class="flex flex-col gap-6">
                                    <div class="mb-4">
                                        <label for="codigo" class="block font-bold mb-3">Código modo stock</label>
                                        <InputText id="codigomodostock" v-model="inputmodosstockminimo.codigo" fluid />
                                    </div>
                                    <div>
                                        <label for="nombre" class="block font-bold mb-3">Nombre modo stock</label>
                                        <InputText id="nombremodostock" v-model="inputmodosstockminimo.nombre" fluid />
                                    </div>
                                </div>

                                <template #footer>
                                    <Button label="Cancelar" icon="pi pi-times" text @click="productDialog = false" />
                                    <Button label="Guardar" icon="pi pi-check" @click="guardarModoStock" />
                                </template>
                            </Dialog>
                            <DataTable v-model:selection="selectedmodosdestockminimo" :value="modosdestockminimo"
                                editMode="cell" @cell-edit-complete="onCellEditComplete" sortField="Cod_modo_stock"
                                :sortOrder="1" :pt="{
                                    table: { style: 'min-width: 50rem' },
                                    column: {
                                        bodycell: ({ state }) => ({
                                            class: [{ '!py-0': state['d_editing'] }]
                                        })
                                    }
                                }">
                                <Column selectionMode="multiple" style="width: 10%"></Column>
                                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
                                    sortable style="width: 25%">
                                    <template #body="{ data, field }">
                                        {{ data[field] }}
                                    </template>
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" autofocus fluid />
                                    </template>
                                </Column>
                            </DataTable>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="4">
                        <AccordionHeader>5 - NP Stock comprom. - Vtas especiales - Pendiente entrega a clientes
                        </AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="npstockcomprom" :source="source_npstockcomprom"
                                :target="target_npstockcomprom" @move-to-source="onMoveToSource_npstockcomprom"
                                @move-to-target="onMoveToTarget_npstockcomprom"
                                @move-all-to-source="onMoveAllToSource_npstockcomprom"
                                @move-all-to-target="onMoveAllToTarget_npstockcomprom" dataKey="id" breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.Cod_NP + ' - ' + option.Nombre_NP }}
                                </template>
                                <template #targetheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Tipos de comprobantes de ventas definida</span>
                                        <span class="text-muted"> ({{ target_npstockcomprom.length }})</span>
                                    </div>
                                </template>
                                <template #sourceheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Tipos de comprobantes de ventas disponible</span>
                                        <span class="text-muted"> ({{ source_npstockcomprom.length }})</span>
                                    </div>
                                </template>
                            </PickList>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="5">
                        <AccordionHeader>6 - Remitos de ventas</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="remitosdeventas" :source="source_remitosdeventas"
                                :target="target_remitosdeventas" @move-to-source="onMoveToSource_remitosdeventas"
                                @move-to-target="onMoveToTarget_remitosdeventas"
                                @move-all-to-source="onMoveAllToSource_remitosdeventas"
                                @move-all-to-target="onMoveAllToTarget_remitosdeventas" dataKey="id"
                                breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.Cod_Comp + ' - ' + option.Nombre_Comp }}
                                </template>
                                <template #targetheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Tipos de comprobantes stock definida</span>
                                        <span class="text-muted"> ({{ target_remitosdeventas.length }})</span>
                                    </div>
                                </template>
                                <template #sourceheader>
                                    <div class="flex justify-content-between align-items-center">
                                        <span class="font-bold">Tipos de comprobantes stock disponible</span>
                                        <span class="text-muted"> ({{ source_remitosdeventas.length }})</span>
                                    </div>
                                </template>
                            </PickList>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
            <Divider type="dotted" />
            <div class="mt-0">
                <ParametrosControlCementos />
            </div>
        </div>
        <Toast />
    </div>
</template>
<script>
import axios from 'axios';
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import PickList from 'primevue/picklist';
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';
import { Button as KButton } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'
import ParametrosControlCementos from '../components/ParametrosControlCementos.vue';
export default {
    name: 'ParametrosdeCompras',
    directives: {
        fullscreen,
    },
    components: {
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        PickList,
        DataTable,
        Column,
        InputText,
        Toolbar,
        Button,
        Dialog,
        Toast,
        "kbutton": KButton,
        Divider,
        ParametrosControlCementos
    },
    data: () => {
        return {
            token: decodeJwt(getToken()).token,
            toast: useToast(),
            fullscreen: false,
            teleport: true,
            pageOnly: true,
            productDialog: false,
            title: 'Parámetros de compras',
            tiposdearticulos: [],
            source: [],
            target: [],
            clasificacion8: [],
            source_clasificacion8: [],
            target_clasificacion8: [],
            stockdeposito: [],
            source_stockdeposito: [],
            target_stockdeposito: [],
            modosdestockminimo: [],
            columns: [
                { field: 'Cod_modo_stock', header: 'Código modo stock', type: 'text', class: 'w-1/4' },
                { field: 'Nombre_modo_stock', header: 'Nombre modo stock', type: 'text', class: 'w-3/4' }
            ],
            selectedmodosdestockminimo: [],
            inputmodosstockminimo: {
                codigo: '',
                nombre: ''
            },
            npstockcomprom: [],
            source_npstockcomprom: [],
            target_npstockcomprom: [],
            remitosdeventas: [],
            source_remitosdeventas: [],
            target_remitosdeventas: []
        }
    },
    mounted() {
        this.getData();
        this.getClasificacion8();
        this.getStockDeposito();
        this.getModosDeStockMinimo();
        this.getNPStockComprom();
        this.getRemitosDeVentas();
    },
    methods: {
        async onMoveAllToTarget(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinenupdate', {
                    id: item.id,
                    Cod_tipo: item.Cod_tipo,
                    Nombre_tipo: item.Nombre_tipo
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToSource(event) {
            //console.log('Moved all to source:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinendelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    console.log('Delete successful:', response.data);
                }).catch(error => {
                    console.error('Error deleting data:', error);
                });
            });
        },
        async onMoveToSource(event) {
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinendelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget(event) {
            //console.log('Moved to target:', event.items[0].id);
            //console.log('Updated items:', this.tiposdearticulos);
            //console.log('Source items:', this.source);
            //console.log('Target items:', this.target);
            const token = this.token;
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinen', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_tipo).includes(item.Cod_tipo));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinenupdate', {
                    id: item.id,
                    Cod_tipo: item.Cod_tipo,
                    Nombre_tipo: item.Nombre_tipo
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async getData() {
            try {
                const token = this.token;
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctiar', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinen', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const dataAll = response.data.map((data, index) => {
                    return {
                        id: index + 1,
                        Cod_tipo: data.TIAR_TIPO_ART,
                        Nombre_tipo: data.TIAR_NOMBRE
                    }
                });

                this.target = response2.data.map((data) => {
                    return {
                        id: data.id,
                        Cod_tipo: data.Cod_tipo,
                        Nombre_tipo: data.Nombre_tipo
                    }
                });
                const filterData = dataAll.filter(item => !response2.data.map(data => data.Cod_tipo).includes(item.Cod_tipo));
                this.source = filterData;
                this.tiposdearticulos = [this.source, this.target];

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async getClasificacion8() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/clasificacion8', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompran', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    Cod_clasif8: data.CA08_CLASIF_8,
                    Nombre_clasif8: data.CA08_NOMBRE
                }
            });
            this.target_clasificacion8 = response2.data.map((data) => {
                return {
                    id: data.id,
                    Cod_clasif8: data.Cod_clasif8,
                    Nombre_clasif8: data.Nombre_clasif8,
                    Observacion: data.Observacion
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.Cod_clasif8).includes(item.Cod_clasif8));
            this.source_clasificacion8 = filterData;
            this.clasificacion8 = [this.source_clasificacion8, this.target_clasificacion8];

        },
        async onMoveAllToTarget_clasificacion8(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompranupdate', {
                    id: item.id,
                    Cod_clasif8: item.Cod_clasif8,
                    Nombre_clasif8: item.Nombre_clasif8,
                    Observacion: "Se debe combinar con rubro de compras que aparece marcado con «(1)»"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToSource_clasificacion8(event) {
            //console.log('Moved all to source:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecomprandelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    console.log('Delete successful:', response.data);
                }).catch(error => {
                    console.error('Error deleting data:', error);
                });
            });
        },
        async onMoveToSource_clasificacion8(event) {
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecomprandelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_clasificacion8(event) {
            //console.log('Moved to target:', event.items[0].id);
            //console.log('Updated items:', this.tiposdearticulos);
            //console.log('Source items:', this.source);
            //console.log('Target items:', this.target);
            const token = this.token;
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompran', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_tipo).includes(item.Cod_tipo));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompranupdate', {
                    id: item.id,
                    Cod_clasif8: item.Cod_clasif8,
                    Nombre_clasif8: item.Nombre_clasif8,
                    Observacion: "Se debe combinar con rubro de compras que aparece marcado con «(1)»"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async getStockDeposito() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stocdpos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarparastock', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    Cod_Depos: data.DPOS_DEPOSITO,
                    Nombre_Depos: data.DPOS_NOMBRE
                }
            });
            this.target_stockdeposito = response2.data.map((data) => {
                return {
                    id: data.id,
                    Cod_Depos: data.Cod_Depos,
                    Nombre_Depos: data.Nombre_Depos
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.Cod_Depos).includes(item.Cod_Depos));
            this.source_stockdeposito = filterData
            this.stockdeposito = [this.source_stockdeposito, this.target_stockdeposito];
        },
        async onMoveAllToTarget_stockdeposito(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarparastockupdate', {
                    id: item.id,
                    Cod_Depos: item.Cod_Depos,
                    Nombre_Depos: item.Nombre_Depos
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToSource_stockdeposito(event) {
            //console.log('Moved all to source:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarparastockdelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    console.log('Delete successful:', response.data);
                }).catch(error => {
                    console.error('Error deleting data:', error);
                });
            });
        },
        async onMoveToSource_stockdeposito(event) {
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarparastockdelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_stockdeposito(event) {
            //console.log('Moved to target:', event.items[0].id);
            //console.log('Updated items:', this.tiposdearticulos);
            //console.log('Source items:', this.source);
            //console.log('Target items:', this.target);
            const token = this.token;
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stocdpos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_Depos).includes(item.Cod_Depos));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarparastockupdate', {
                    id: item.id,
                    Cod_Depos: item.Cod_Depos,
                    Nombre_Depos: item.Nombre_Depos
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async getModosDeStockMinimo() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimo', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log('Modos de stock mínimo:', response.data);
            this.modosdestockminimo = response.data;
        },
        async guardarModoStock() {
            const token = this.token;
            if (this.inputmodosstockminimo.codigo && this.inputmodosstockminimo.nombre) {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimo', {
                    Cod_modo_stock: this.inputmodosstockminimo.codigo,
                    Nombre_modo_stock: this.inputmodosstockminimo.nombre
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(response => {
                    // console.log(response.data);
                    this.productDialog = false;
                    this.getModosDeStockMinimo();
                    this.inputmodosstockminimo.codigo = '';
                    this.inputmodosstockminimo.nombre = '';
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Modo de stock agregado', life: 3000 });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los campos', life: 3000 });
            }
        },
        async DeleteSelected() {
            const token = this.token;
            this.selectedmodosdestockminimo.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimodelete/' + item.id, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(response => {
                    // console.log(response.data);
                    this.getModosDeStockMinimo();
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Eliminado correctamente', life: 3000 });
                }).catch(error => {
                    console.error(error);
                });
            });
        },
        async onCellEditComplete(e) {
            let { data, newValue, field } = e;
            //console.log('Data:', data);
            //console.log('New Value:', newValue);
            //console.log('Field:', field);
            const token = this.token;
            await axios.put(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimoupdate/' + data.id, {
                Cod_modo_stock: field === 'Cod_modo_stock' ? newValue : data.Cod_modo_stock,
                Nombre_modo_stock: field === 'Nombre_modo_stock' ? newValue : data.Nombre_modo_stock
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                // console.log('Update successful:', response.data);
                this.getModosDeStockMinimo();
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Modo de stock actualizado', life: 3000 });
            }).catch(error => {
                console.error('Error updating data:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar modo de stock', life: 3000 });
            });
        },
        async getNPStockComprom() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/venttcve', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometido', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    Cod_NP: data.TCVE_TIPO_COM,
                    Nombre_NP: data.TCVE_NOMBRE
                }
            });
            this.target_npstockcomprom = response2.data.map((data) => {
                return {
                    id: data.id,
                    Cod_NP: data.Cod_NP,
                    Nombre_NP: data.Nombre_NP
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.Cod_NP).includes(item.Cod_NP));
            this.source_npstockcomprom = filterData;
            this.npstockcomprom = [this.source_npstockcomprom, this.target_npstockcomprom];
        },
        async onMoveAllToTarget_npstockcomprom(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidoupdate', {
                    id: item.id,
                    Cod_NP: item.Cod_NP,
                    Nombre_NP: item.Nombre_NP
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToSource_npstockcomprom(event) {
            //console.log('Moved all to source:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidodelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    console.log('Delete successful:', response.data);
                }).catch(error => {
                    console.error('Error deleting data:', error);
                });
            });
        },
        async onMoveToSource_npstockcomprom(event) {
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidodelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_npstockcomprom(event) {
            //console.log('Moved to target:', event.items[0].id);
            //console.log('Updated items:', this.tiposdearticulos);
            //console.log('Source items:', this.source);
            //console.log('Target items:', this.target);
            const token = this.token;
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometido', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_NP).includes(item.Cod_NP));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidoupdate', {
                    id: item.id,
                    Cod_NP: item.Cod_NP,
                    Nombre_NP: item.Nombre_NP
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async getRemitosDeVentas() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/remitosdeventas', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    Cod_Comp: data.TCST_TIPO_COM,
                    Nombre_Comp: data.TCST_NOMBRE
                }
            });
            this.target_remitosdeventas = response2.data.map((data) => {
                return {
                    id: data.id,
                    Cod_Comp: data.Cod_Comp,
                    Nombre_Comp: data.Nombre_Comp
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.Cod_Comp).includes(item.Cod_Comp));
            this.source_remitosdeventas = filterData;
            this.remitosdeventas = [this.source_remitosdeventas, this.target_remitosdeventas];
        },
        async onMoveToSource_remitosdeventas(event) {
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/remitosdeventasdelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_remitosdeventas(event) {
            //console.log('Moved to target:', event.items[0].id);
            //console.log('Updated items:', this.tiposdearticulos);
            //console.log('Source items:', this.source);
            //console.log('Target items:', this.target);
            const token = this.token;
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_Comp).includes(item.Cod_Comp));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/remitosdeventasupdate', {
                    id: item.id,
                    Cod_Comp: item.Cod_Comp,
                    Nombre_Comp: item.Nombre_Comp
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToTarget_remitosdeventas(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/remitosdeventasupdate', {
                    id: item.id,
                    Cod_Comp: item.Cod_Comp,
                    Nombre_Comp: item.Nombre_Comp
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToSource_remitosdeventas(event) {
            //console.log('Moved all to source:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/remitosdeventasdelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    console.log('Delete successful:', response.data);
                }).catch(error => {
                    console.error('Error deleting data:', error);
                });
            });
        }
    },
    computed: {
        options() {
            return {
                callback: (isFullscreen) => {
                    this.fullscreen = isFullscreen
                },
                target: '.directive-fullscreen-wrapper',
                pageOnly: this.pageOnly,
                teleport: this.teleport
            }
        }
    },
}
</script>

<style></style>