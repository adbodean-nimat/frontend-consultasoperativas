<template>
    <div class="directive-fullscreen-wrapper">
        <div class="container-fluid page-grid min-vh-100">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-table"
                        viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
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
                    <!-- <div style="margin-right: 15px;">
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
                    </div> -->
                </div>
            </div>
            <Toolbar class="mb-2">
                <template #start>
                    <div class="d-flex flex-row align-items-center gap-2 w-full">
                        <label class="w-auto">Días hacia atrás fecha de NP:</label>
                        <InputNumber class="w-auto" name="dias_hacia_atras" v-model="Dias_hacia_atrás_fecha_de_NP"
                            :min="1" :max="365" fluid>
                        </InputNumber>
                        <label class="w-auto">Días atrás para evaluar SM4:</label>
                        <InputNumber class="w-auto" name="cant_dias_atras" v-model="Cant_días_atrás_para_evaluar_SM4"
                            :min="1" :max="90" fluid>
                        </InputNumber>
                        <Button icon="pi pi-play" outlined @click="getData"></Button>
                        <Button v-if="resultados.data" icon="pi pi-replay" outlined @click="resetData"></Button>
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
            <Toolbar v-if="resultados.data" class="my-2 bg-transparent border-0 text-white">
                <template #start>
                    <div class="d-flex flex-row align-items-center gap-2">
                        <span>Fecha de emisión: <Badge severity="secondary" size="large"> {{
                            resultados ? new Date(resultados.meta.generatedAt).toLocaleString('es-ES')
                                : '' }}</Badge></span>
                    </div>
                </template>
                <template #center>
                    <div class="d-flex flex-row justify-around align-items-center gap-2">

                    </div>
                </template>
                <template #end>
                    <div class="d-flex flex-row align-items-center gap-2">
                        <span>Total de artículos de esta vista: <Badge severity="secondary" size="large">{{
                            resultados.data ? resultados.data[3].cantidad_items : ''
                                }}</Badge></span>
                    </div>
                </template>
            </Toolbar>
            <div class="card my-0 h-screen" v-if="resultados.data">
                <DataTable v-model:filters="filters" :value="resultados.data" scrollable responsiveLayout="scroll"
                    :loading="cargando">
                    <Column field="comprador" header="Comprador">
                        <template #body="slotProps">
                            <span>{{ slotProps.data.comprador }}</span>
                        </template>
                    </Column>
                    <Column field="cantidad_items" header="Cantidad de ítems">
                        <template #body="slotProps">
                            <span>{{ slotProps.data.cantidad_items }}</span>
                        </template>
                    </Column>
                    <Column field="cantidad_rc" header="Cantidad de RC">
                        <template #body="slotProps">
                            <span>{{ slotProps.data.cantidad_rc }}</span>
                        </template>
                    </Column>
                    <Column field="ratio" header="Items / RC">
                        <template #body="slotProps">
                            <span>{{ slotProps.data.ratio }}</span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>
import axios from 'axios';
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputNumber from 'primevue/inputnumber';
import ToggleButton from 'primevue/togglebutton';
import Select from 'primevue/select';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { directive as fullscreen } from 'vue-fullscreen'
export default {
    name: 'RatioCompras',
    directives: {
        fullscreen,
    },
    components: {
        Card,
        DataTable,
        Toolbar,
        Column,
        ColumnGroup,
        Row,
        Toast,
        ProgressSpinner,
        InputNumber,
        Button,
        InputText,
        IconField,
        InputIcon,
        Select,
        Badge,
        ToggleButton,
        MultiSelect
    },
    data: () => {
        return {
            token: decodeJwt(getToken()).token,
            useToast,
            title: "Grilla de Ratio de Compras",
            fullscreen: false,
            teleport: true,
            pageOnly: true,
            cargando: false,
            resultados: [],
            tiempoejecucion: '',
            Cant_días_atrás_para_evaluar_SM4: 90,
            Dias_hacia_atrás_fecha_de_NP: 365,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                'comprador': { value: 'TOTAL', matchMode: FilterMatchMode.NOT_CONTAINS },
                'cantidad_items': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'cantidad_rc': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'ratio': { value: null, matchMode: FilterMatchMode.CONTAINS }
            },
        }
    },
    methods: {
        async getData() {
            const start = new Date();
            try {
                this.cargando = true;
                const token = this.token;
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/grillacompradores', {
                    params: {
                        cantdiasatrasparaevaluarsm4: this.Cant_días_atrás_para_evaluar_SM4,
                        diashaciaatrasfechadeNP: this.Dias_hacia_atrás_fecha_de_NP,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data) {
                    this.cargando = false;
                    this.resultados = response.data;
                }
                else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
            const end = new Date();
            this.tiempoejecucion = end.getTime() - start.getTime();
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.call(this));
        },
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
    }
}

</script>

<style></style>