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

            <div>
                <Toolbar class="mb-0" style="border-radius: 0px;">
                    <template #start>
                        <span>Parametros: <strong><i>Stock Rotación OC - Precios Art. PyR</i></strong></span>
                    </template>
                    <template #end>

                    </template>
                </Toolbar>
                <Accordion multiple>
                    <AccordionPanel value="0">
                        <AccordionHeader>1 - Depos. A No considerar</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="stockdeposito" :source="source_stockdeposito"
                                :target="target_stockdeposito" @move-to-source="onMoveToSource_stockdeposito"
                                @move-to-target="onMoveToTarget_stockdeposito"
                                @move-all-to-source="onMoveAllToSource_stockdeposito"
                                @move-all-to-target="onMoveAllToTarget_stockdeposito" dataKey="id" breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.cod_depos + ' - ' + option.nombre_depos }}
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
                    <AccordionPanel value="1">
                        <AccordionHeader>2 - NP a considerar</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="tipocompaconsiderar" :source="source_tipocompaconsiderar"
                                :target="target_tipocompaconsiderar"
                                @move-to-source="onMoveToSource_tipocompaconsiderar"
                                @move-to-target="onMoveToTarget_tipocompaconsiderar"
                                @move-all-to-source="onMoveAllToSource_tipocompaconsiderar"
                                @move-all-to-target="onMoveAllToTarget_tipocompaconsiderar" dataKey="id"
                                breakpoint="1400px">
                                <template #option="{ option }">
                                    {{ option.cod_comp + ' - ' + option.nombre_comp }}
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
                        <AccordionHeader>3 - Comprobantes Stock</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="remitosdeventas" :source="source_remitosdeventas"
                                :target="target_remitosdeventas" @move-to-source="onMoveToSource_remitosdeventas"
                                @move-to-target="onMoveToTarget_remitosdeventas"
                                @move-all-to-source="onMoveAllToSource_remitosdeventas"
                                @move-all-to-target="onMoveAllToTarget_remitosdeventas" dataKey="id"
                                breakpoint="1400px">
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
                    <AccordionPanel value="3">
                        <AccordionHeader>4 - Recepción Proveedores a considerar</AccordionHeader>
                        <AccordionContent>
                            <PickList v-model="recepcionproveedoresaconsiderar"
                                :source="source_recepcionproveedoresaconsiderar"
                                :target="target_recepcionproveedoresaconsiderar"
                                @move-to-source="onMoveToSource_recepcionproveedoresaconsiderar"
                                @move-to-target="onMoveToTarget_recepcionproveedoresaconsiderar"
                                @move-all-to-source="onMoveAllToSource_recepcionproveedoresaconsiderar"
                                @move-all-to-target="onMoveAllToTarget_recepcionproveedoresaconsiderar" dataKey="id"
                                breakpoint="1400px">
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
                    <AccordionPanel value="4">
                        <AccordionHeader>5 - Clasificación 2</AccordionHeader>
                        <AccordionContent>
                            <InputText v-model="getStore.clasif2" class="mb-3 me-2"
                                @update:model-value="clasif2Update" />
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="5">
                        <AccordionHeader>6 - Días previos</AccordionHeader>
                        <AccordionContent>
                            <InputText v-model="getStore.dias_previos" class="mb-3 me-2"
                                @update:model-value="diaspreviosUpdate" /> Días
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="6">
                        <AccordionHeader>7 - Días durante</AccordionHeader>
                        <AccordionContent>
                            <InputText v-model="getStore.dias_duros" class="mb-3 me-2"
                                @update:model-value="diasduraUpdate" /> Días
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>
        <Toast />
    </div>
</template>
<script>
import axios from 'axios';
import { useStoreExhibiciones } from '@/stores/exhibiciones';
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
export default {
    name: 'ParametrosdeExhibicion',
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
        Divider
    },
    data: () => {
        return {
            token: decodeJwt(getToken()).token,
            toast: useToast(),
            fullscreen: false,
            teleport: true,
            pageOnly: true,
            productDialog: false,
            title: 'Parámetros de exhibición',
            stockdeposito: [],
            source_stockdeposito: [],
            target_stockdeposito: [],
            remitosdeventas: [],
            source_remitosdeventas: [],
            target_remitosdeventas: [],
            target_tipocompaconsiderar: [],
            source_tipocompaconsiderar: [],
            tipocompaconsiderar: [],
            recepcionproveedoresaconsiderar: [],
            source_recepcionproveedoresaconsiderar: [],
            target_recepcionproveedoresaconsiderar: []
        }
    },
    mounted() {
        this.getStockDeposito();
        this.getTiposDeComprobantes();
        this.getRemitosDeVentas();
        this.getRecepcionProveedoresAConsiderar();
    },
    methods: {
        clasif2Update(value) {
            if (!value) return;
            const useStore = useStoreExhibiciones();
            useStore.setClasif2(value);
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
        async getStockDeposito() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stocdpos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/deposanoconsiderar', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_depos: data.DPOS_DEPOSITO,
                    nombre_depos: data.DPOS_NOMBRE
                }
            });
            this.target_stockdeposito = response2.data.map((data) => {
                return {
                    id: data.id,
                    cod_depos: data.cod_depos,
                    nombre_depos: data.nombre_depos
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.cod_depos).includes(item.cod_depos));
            this.source_stockdeposito = filterData
            this.stockdeposito = [this.source_stockdeposito, this.target_stockdeposito];
        },
        async onMoveAllToTarget_stockdeposito(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/deposanoconsiderar', {
                    id: item.id,
                    cod_depos: item.cod_depos,
                    nombre_depos: item.nombre_depos
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
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/deposanoconsiderardelete/' + item.id, {
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
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/deposanoconsiderardelete/' + event.items[0].id, {
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
            const filterData = event.items.filter(item => !response2.data.map(data => data.cod_depos).includes(item.cod_depos));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/deposanoconsiderarupdate', {
                    id: item.id,
                    cod_depos: item.cod_depos,
                    nombre_depos: item.nombre_depos
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
        async getTiposDeComprobantes() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/venttcve', {
                headers: { Authorization: `Bearer ${this.token}` }
            });

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/npaconsiderar', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_comp: data.TCVE_TIPO_COM,
                    nombre_comp: data.TCVE_NOMBRE
                }
            });
            this.target_tipocompaconsiderar = response2.data.map((data) => {
                return {
                    id: data.id,
                    cod_comp: data.cod_comp,
                    nombre_comp: data.nombre_comp
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            this.source_tipocompaconsiderar = filterData;
            this.tipocompaconsiderar = [this.source_tipocompaconsiderar, this.target_tipocompaconsiderar];

        },
        async onMoveAllToTarget_tipocompaconsiderar(event) {

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/npaconsiderarupdate/', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nombre_comp: item.nombre_comp
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
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/npaconsiderardelete/' + item.id, {
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

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/npaconsiderardelete/' + event.items[0].id, {
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

            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/npaconsiderar', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/npaconsiderarupdate/', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nombre_comp: item.nombre_comp
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
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/comprobantestock', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_comp: data.TCST_TIPO_COM,
                    nombre_comp: data.TCST_NOMBRE
                }
            });
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
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/comprobantestockdelete/' + event.items[0].id, {
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
            const filterData = event.items.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/comprobantestockupdate', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nombre_comp: item.nombre_comp
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
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/comprobantestockupdate', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nombre_comp: item.nombre_comp
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
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/comprobantestockdelete/' + item.id, {
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
        async getRecepcionProveedoresAConsiderar() {
            const token = this.token;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gde/recepcionproveedoraconsiderar', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_comp: data.TCST_TIPO_COM,
                    nombre_comp: data.TCST_NOMBRE
                }
            });
            this.target_recepcionproveedoresaconsiderar = response2.data.map((data) => {
                return {
                    id: data.id,
                    cod_comp: data.cod_comp,
                    nombre_comp: data.nombre_comp
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            this.source_recepcionproveedoresaconsiderar = filterData;
            this.recepcionproveedoresaconsiderar = [this.source_recepcionproveedoresaconsiderar, this.target_recepcionproveedoresaconsiderar];
        },
        async onMoveToSource_recepcionproveedoresaconsiderar(event) {
            //console.log('Moved to source:', event.items[0].id);
            const token = this.token;
            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/recepcionproveedoraconsiderardelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_recepcionproveedoresaconsiderar(event) {
            //console.log('Moved to target:', event.items[0].id);
            //console.log('Updated items:', this.tiposdearticulos);
            //console.log('Source items:', this.source);
            //console.log('Target items:', this.target);
            const token = this.token;
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filterData = event.items.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            //console.log('Filtered data:', filterData);
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/recepcionproveedoraconsiderarupdate', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nombre_comp: item.nombre_comp
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
        async onMoveAllToTarget_recepcionproveedoresaconsiderar(event) {
            //console.log('Moved all to target:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gde/recepcionproveedoraconsiderarupdate', {
                    id: item.id,
                    cod_comp: item.cod_comp,
                    nombre_comp: item.nombre_comp
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
        async onMoveAllToSource_recepcionproveedoresaconsiderar(event) {
            //console.log('Moved all to source:', event.items);
            const token = this.token;
            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gde/comprobantestockdelete/' + item.id, {
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
        getStore() {
            const useStore = useStoreExhibiciones();
            //console.log('Exhibiciones:', useStore.getExhibiciones);
            return useStore.getExhibiciones;
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
        }
    },
}
</script>

<style>
.p-accordionpanel:first-child>.p-accordionheader {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
}
</style>