<template>
    <div>
        <div>
            <Toolbar class="mb-0" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <template #start>
                    <span>Parametros: <strong><i> Recepción de proveedores</i></strong></span>
                </template>
                <template #end>

                </template>
            </Toolbar>
            <Accordion :value="open" multiple>
                <AccordionPanel value="0">
                    <AccordionHeader>1 - Tipos comprobantes stock a considerar</AccordionHeader>
                    <AccordionContent>
                        <PickList v-model="tiposcompstock" :source="source_tiposcompstock"
                            :target="target_tiposcompstock" @move-to-source="onMoveToSource_tiposcompstock"
                            @move-to-target="onMoveToTarget_tiposcompstock"
                            @move-all-to-source="onMoveAllToSource_tiposcompstock"
                            @move-all-to-target="onMoveAllToTarget_tiposcompstock" dataKey="id" breakpoint="1400px">
                            <template #option="{ option }">
                                {{ option.cod_comp + ' - ' + option.nombre_comp }}
                            </template>
                            <template #targetheader>
                                <div class="flex justify-content-between align-items-center">
                                    <span class="font-bold">Tipos de comprobantes stock definida</span>
                                    <span class="text-muted"> ({{ target_tiposcompstock.length }})</span>
                                </div>
                            </template>
                            <template #sourceheader>
                                <div class="flex justify-content-between align-items-center">
                                    <span class="font-bold">Tipos de comprobantes stock disponible</span>
                                    <span class="text-muted"> ({{ source_tiposcompstock.length }})</span>
                                </div>
                            </template>
                        </PickList>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                    <AccordionHeader>2 - Cantidad días atrás para la fecha de Auditoría por defecto</AccordionHeader>
                    <AccordionContent>
                        <InputNumber :model-value="diasParaAuditoria" @update:model-value="diasParaAuditoriaUpdate"
                            :min="1" class="w-full" locale="es-AR" /> días.
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
        <Toast />
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '@/stores/diasAtrasParaAuditoria';
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
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';

import { useToast } from 'primevue/usetoast';
import { Button as KButton } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'

export default {
    props: {
        open: {
            type: Array,
            default: () => []
        }
    },
    name: 'ParametrosRecepcionProveedores',
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
        InputNumber,
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
            title: 'Parámetros de recepción de proveedores',
            tiposcompstock: [],
            source_tiposcompstock: [],
            target_tiposcompstock: [],
            tipocompaconsiderar: [],
            source_tipocompaconsiderar: [],
            target_tipocompaconsiderar: []
        }
    },
    mounted() {
        this.getTiposCompStock();
    },
    methods: {
        diasParaAuditoriaUpdate(value) {
            if (!value) return;
            // console.log('Valor actualizado:', value);
            const store = useStore()
            store.setDiasAtrasParaAuditoria(value)
        },
        async getTiposCompStock() {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposcompstock', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const dataAll = response.data.map((data, index) => {
                return {
                    id: index + 1,
                    cod_comp: data.TCST_TIPO_COM,
                    nombre_comp: data.TCST_NOMBRE
                }
            });

            this.target_tiposcompstock = response2.data.map((data) => {
                return {
                    id: data.id,
                    cod_comp: data.cod_comp,
                    nombre_comp: data.nombre_comp
                }
            });
            const filterData = dataAll.filter(item => !response2.data.map(data => data.cod_comp).includes(item.cod_comp));
            this.source_tiposcompstock = filterData;
            this.tiposcompstock = [this.source_tiposcompstock, this.target_tiposcompstock];
        },
        async onMoveToSource_tiposcompstock(event) {

            await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposcompstockdelete/' + event.items[0].id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(response => {
                console.log('Delete successful:', response.data);
            }).catch(error => {
                console.error('Error deleting data:', error);
            });
        },
        async onMoveToTarget_tiposcompstock(event) {

            /* const response2 = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/stoctcst', {
                headers: { Authorization: `Bearer ${this.token}` }
            }); */
            //const filterData = event.items.filter(item => !response2.data.map(data => data.Cod_Comp).includes(item.Cod_Comp));
            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposcompstockupdate', {
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
        async onMoveAllToTarget_tiposcompstock(event) {
            //console.log('Moved all to target:', event.items);

            event.items.forEach(async (item) => {
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposcompstockupdate', {
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
        async onMoveAllToSource_tiposcompstock(event) {
            //console.log('Moved all to source:', event.items);

            event.items.forEach(async (item) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdc/tiposcompstockdelete/' + item.id, {
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
        diasParaAuditoria() {
            const store = useStore()
            return store.diasAtrasParaAuditoria
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