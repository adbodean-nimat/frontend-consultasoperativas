<template>
    <div>
        <div class="card">
            <Toolbar class="mb-0" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                <template #start>
                    <span>Parametros: <strong><i> Control Stock NP OC</i></strong></span>
                </template>
                <template #end>

                </template>
            </Toolbar>
            <Accordion multiple>
                <AccordionPanel value="0">
                    <AccordionHeader>1 - Articulos</AccordionHeader>
                    <AccordionContent>
                        <Toolbar class="mb-3">
                            <template #start>
                                <Button label="Agregar" icon="pi pi-plus" class="m-2"
                                    @click="productDialog = true"></Button>
                                <Button label="Eliminar" icon="pi pi-trash" severity="danger" outlined
                                    @click="DeleteSelected"
                                    :disabled="!selectedarticulos || !selectedarticulos.length" />
                            </template>
                        </Toolbar>
                        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Agregar modo stock"
                            :modal="true">
                            <div class="flex flex-col gap-6">
                                <div class="mb-4">
                                    <label for="codigo" class="block font-bold mb-3">Código artículo</label>
                                    <InputText id="codigoarticulo" v-model="inputarticulos.codigo" fluid />
                                </div>
                                <div>
                                    <label for="nombre" class="block font-bold mb-3">Nombre artículo</label>
                                    <InputText id="nombrearticulo" v-model="inputarticulos.nombre" fluid />
                                </div>
                            </div>

                            <template #footer>
                                <Button label="Cancelar" icon="pi pi-times" text @click="productDialog = false" />
                                <Button label="Guardar" icon="pi pi-check" @click="guardarArticulos" />
                            </template>
                        </Dialog>
                        <DataTable v-model:selection="selectedarticulos" :value="articulos" editMode="cell"
                            @cell-edit-complete="onCellEditComplete" sortField="cod_art" :sortOrder="1" :pt="{
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
                <AccordionPanel value="1">
                    <AccordionHeader>2 - Tipo de comprobantes de ventas a considerar</AccordionHeader>
                    <AccordionContent>
                        <PickList v-model="tipocompaconsiderar" :source="source_tipocompaconsiderar"
                            :target="target_tipocompaconsiderar" @move-to-source="onMoveToSource_tipocompaconsiderar"
                            @move-to-target="onMoveToTarget_tipocompaconsiderar"
                            @move-all-to-source="onMoveAllToSource_tipocompaconsiderar"
                            @move-all-to-target="onMoveAllToTarget_tipocompaconsiderar" dataKey="id"
                            breakpoint="1400px">
                            <template #option="{ option }">
                                {{ option.cod_comp + ' - ' + option.nomb_comp }}
                            </template>
                            <template #targetheader>
                                <div class="flex justify-content-between align-items-center">
                                    <span class="font-bold">Tipo de comprobantes de ventas definida</span>
                                    <span class="text-muted"> ({{ target_tipocompaconsiderar.length }})</span>
                                </div>
                            </template>
                            <template #sourceheader>
                                <div class="flex justify-content-between align-items-center">
                                    <span class="font-bold">Tipo de comprobantes de ventas disponible</span>
                                    <span class="text-muted"> ({{ source_tipocompaconsiderar.length }})</span>
                                </div>
                            </template>
                        </PickList>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                    <AccordionHeader>3 - Depos. A No considerar para stock fisico</AccordionHeader>
                    <AccordionContent>
                        <PickList v-model="stockdeposito" :source="source_stockdeposito" :target="target_stockdeposito"
                            @move-to-source="onMoveToSource_stockdeposito"
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
                    <AccordionHeader>4 - Remitos de ventas</AccordionHeader>
                    <AccordionContent>
                        <PickList v-model="remitosdeventas" :source="source_remitosdeventas"
                            :target="target_remitosdeventas" @move-to-source="onMoveToSource_remitosdeventas"
                            @move-to-target="onMoveToTarget_remitosdeventas"
                            @move-all-to-source="onMoveAllToSource_remitosdeventas"
                            @move-all-to-target="onMoveAllToTarget_remitosdeventas" dataKey="id" breakpoint="1400px">
                            <template #option="{ option }">
                                {{ option.cod_comp + ' - ' + option.nombre_comp }}
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

import { useToast } from 'primevue/usetoast';
import { Button as KButton } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'
export default {
    name: 'ParametrosControlCementos',
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
    },
    data() {
        return {
            toast: useToast(),
            token: decodeJwt(getToken()).token,
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
            articulos: [],
            selectedarticulos: [],
            inputarticulos: {
                codigo: '',
                nombre: ''
            },
            columns: [
                { field: 'cod_art', header: 'Código artículo', type: 'number', class: 'w-1/4' },
                { field: 'nomb_art', header: 'Nombre artículo', type: 'text', class: 'w-3/4' }
            ],
            npstockcomprom: [],
            source_npstockcomprom: [],
            target_npstockcomprom: [],
            remitosdeventas: [],
            source_remitosdeventas: [],
            target_remitosdeventas: [],
            tipocompaconsiderar: [],
            source_tipocompaconsiderar: [],
            target_tipocompaconsiderar: [],
        }
    },
    mounted() {
        this.getData();
        this.getClasificacion8();
        this.getStockDeposito();
        this.getModosDeStockMinimo();
        this.getNPStockComprom();
        this.getRemitosDeVentas();
        this.getArticulos();
        this.getTiposDeComprobantes();
    },
    methods: {
        async onMoveAllToTarget(event) {
            //console.log('Moved all to target:', event.items);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinenupdate', {
                    id: item.id,
                    Cod_tipo: item.Cod_tipo,
                    Nombre_tipo: item.Nombre_tipo
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinendelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
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
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinendelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
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
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinen', {
                headers: { Authorization: `Bearer ${this.token}` }
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
                        Authorization: `Bearer ${this.token}`,
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
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctiar', {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/chapastiposqueladefinen', {
                    headers: { Authorization: `Bearer ${this.token}` }
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
        async getTiposDeComprobantes() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/venttcve', {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/npaconsiderar', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_comp: data.TCVE_TIPO_COM,
                    nomb_comp: data.TCVE_NOMBRE
                }
            });
            this.target_tipocompaconsiderar = response2.data.map((data) => {
                return {
                    id: data.id,
                    cod_comp: data.cod_comp,
                    nomb_comp: data.nomb_comp
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            this.source_tipocompaconsiderar = filterData;
            this.tipocompaconsiderar = [this.source_tipocompaconsiderar, this.target_tipocompaconsiderar];

        },
        async onMoveAllToTarget_tipocompaconsiderar(event) {

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/npaconsiderarupdate/', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nomb_comp: item.nomb_comp
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async onMoveAllToSource_tipocompaconsiderar(event) {

            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/npaconsiderardelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then(response => {
                    console.log('Delete successful:', response.data);
                }).catch(error => {
                    console.error('Error deleting data:', error);
                });
            });
        },
        async onMoveToSource_tipocompaconsiderar(event) {

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/npaconsiderardelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_tipocompaconsiderar(event) {

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/npaconsiderar', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/npaconsiderarupdate/', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nomb_comp: item.nomb_comp
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async getClasificacion8() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/clasificacion8', {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompran', {
                headers: { Authorization: `Bearer ${this.token}` }
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

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompranupdate', {
                    id: item.id,
                    Cod_clasif8: item.Cod_clasif8,
                    Nombre_clasif8: item.Nombre_clasif8,
                    Observacion: "Se debe combinar con rubro de compras que aparece marcado con «(1)»"
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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

            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecomprandelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
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

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecomprandelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
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

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/clasif8artquesecompran', {
                headers: { Authorization: `Bearer ${this.token}` }
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
                        Authorization: `Bearer ${this.token}`,
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stocdpos', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarpstockfisico', {
                headers: { Authorization: `Bearer ${this.token}` }
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

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarpstockfisicoupdate', {
                    id: item.id,
                    Cod_Depos: item.Cod_Depos,
                    Nombre_Depos: item.Nombre_Depos
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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

            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarpstockfisicodelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
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

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarpstockfisicodelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
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

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stocdpos', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_Depos).includes(item.Cod_Depos));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/deposanoconsiderarpstockfisicoupdate', {
                    id: item.id,
                    Cod_Depos: item.Cod_Depos,
                    Nombre_Depos: item.Nombre_Depos
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Update successful:', response.data);
                }).catch(error => {
                    console.error('Error updating data:', error);
                });
            });
        },
        async getArticulos() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/articuloscontrol', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.articulos = response.data;
        },
        async guardarArticulos() {
            if (this.inputarticulos.codigo && this.inputarticulos.nombre) {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/articuloscontrol', {
                    cod_art: this.inputarticulos.codigo,
                    nomb_art: this.inputarticulos.nombre
                }, {
                    headers: { Authorization: `Bearer ${this.token}` }
                }).then(response => {
                    // console.log(response.data);
                    this.productDialog = false;
                    this.getArticulos();
                    this.inputarticulos.codigo = '';
                    this.inputarticulos.nombre = '';
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Articulo agregado', life: 3000 });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los campos', life: 3000 });
            }
        },
        async DeleteSelected() {
            this.selectedarticulos.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/articulosdelete/' + item.id, {
                    headers: { Authorization: `Bearer ${this.token}` }
                }).then(response => {
                    // console.log(response.data);
                    this.getArticulos();
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Eliminado correctamente', life: 3000 });
                }).catch(error => {
                    console.error(error);
                });
            });
        },
        async getModosDeStockMinimo() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimo', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            // console.log('Modos de stock mínimo:', response.data);
            this.modosdestockminimo = response.data;
        },
        async guardarModoStock() {
            if (this.inputmodosstockminimo.codigo && this.inputmodosstockminimo.nombre) {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimo', {
                    Cod_modo_stock: this.inputmodosstockminimo.codigo,
                    Nombre_modo_stock: this.inputmodosstockminimo.nombre
                }, {
                    headers: { Authorization: `Bearer ${this.token}` }
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
            this.selectedmodosdestockminimo.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/modosdestockminimodelete/' + item.id, {
                    headers: { Authorization: `Bearer ${this.token}` }
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

            await axios.put(`${process.env.VUE_APP_API_BASE}` + '/gdc/articuloscontrolupdate/' + data.id, {
                id: data.id,
                cod_art: field === 'cod_art' ? newValue : data.cod_art,
                nomb_art: field === 'nomb_art' ? newValue : data.nomb_art
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                // console.log('Update successful:', response.data);
                this.getArticulos();
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Artículo actualizado', life: 3000 });
            }).catch(error => {
                console.error('Error updating data:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar artículo', life: 3000 });
            });
        },
        async getNPStockComprom() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/venttcve', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometido', {
                headers: { Authorization: `Bearer ${this.token}` }
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

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidoupdate', {
                    id: item.id,
                    Cod_NP: item.Cod_NP,
                    Nombre_NP: item.Nombre_NP
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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

            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidodelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
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

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometidodelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
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

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/npstockcomprometido', {
                headers: { Authorization: `Bearer ${this.token}` }
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
                        Authorization: `Bearer ${this.token}`,
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposremitosvtas', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_comp: data.TCST_TIPO_COM,
                    nombre_comp: data.TCST_NOMBRE
                }
            });
            console.log(response2.data);
            this.target_remitosdeventas = response2.data.map((data) => {
                return {
                    id: data.id,
                    cod_comp: data.cod_comp,
                    nombre_comp: data.nombre_comp
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            this.source_remitosdeventas = filterData;
            this.remitosdeventas = [this.source_remitosdeventas, this.target_remitosdeventas];
        },
        async onMoveToSource_remitosdeventas(event) {

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposremitosvtasdelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_remitosdeventas(event) {

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_Comp).includes(item.Cod_Comp));
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposremitosvtasupdate', {
                    id: item.id,
                    cod_comp: item.Cod_Comp,
                    nombre_comp: item.Nombre_Comp
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposremitosvtasupdate', {
                    id: item.id,
                    cod_comp: item.Cod_Comp,
                    nombre_comp: item.Nombre_Comp
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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

            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposremitosvtasdelete/' + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
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