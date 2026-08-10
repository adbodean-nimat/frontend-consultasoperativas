<template>
    <div>
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

            <div class="filtros">
                <div class="filtros-grid">
                    <div class="d-flex gap-2 mb-4">
                        <div class="me-3">
                            <label>Buscar por teléfono o nombre: </label>
                            <InputText id="search" v-model="buscar" placeholder="Ingrese el teléfono o nombre a buscar"
                                class="w-full ms-2" @keyup.enter="cargar" />
                        </div>
                    </div>

                    <div class="filtro-item mt-4 col-12 md:col-4 flex align-items-end gap-2">
                        <Button label="Buscar" icon="pi pi-search" @click="cargar" :loading="loading" />

                        <Button label="Limpiar" icon="pi pi-refresh" severity="secondary" outlined
                            @click="limpiarFiltros" class="ms-2" />
                    </div>
                </div>
            </div>
        </Panel>
        <div v-if="rows.length > 0" class="card my-0 directive-fullscreen-wrapper-grid mb-2">

            <DataTable v-model:filters="filters" :value="rows" :loading="loading" scrollable paginator :rows="20"
                dataKey="CLIE_CLIENTE" filterDisplay="row" :rowsPerPageOptions="[20, 50, 100, 200, 500]"
                resizableColumns columnResizeMode="fit" showGridlines tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} a {last} de {totalRecords}">

                <template #empty>No encuentro registros.</template>

                <template #loading>Cargando. Por favor, espere. </template>

                <Column field="CLIE_CLIENTE" header="Cliente">
                    <template #body="{ data }">
                        {{ data.CLIE_CLIENTE }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por cliente" />
                    </template>
                </Column>
                <Column field="CLIE_NOMBRE" header="Nombre">
                    <template #body="{ data }">
                        {{ data.CLIE_NOMBRE }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por nombre" />
                    </template>
                </Column>
                <Column field="Domicilio" header="Domicilio">
                    <template #body="{ data }">
                        {{ data.Domicilio }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por domicilio" />
                    </template>
                </Column>
                <Column field="Localidad" header="Localidad">
                    <template #body="{ data }">
                        {{ data.Localidad }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por localidad" />
                    </template>
                </Column>
                <Column field="Telefono" header="Teléfono">
                    <template #body="{ data }">
                        {{ data.Telefono }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por teléfono" />
                    </template>
                </Column>
                <Column field="Fax" header="Celular (CLIE_FAX)">
                    <template #body="{ data }">
                        {{ data.Fax }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por celular" />
                    </template>
                </Column>
                <Column field="Email" header="Email">
                    <template #body="{ data }">
                        {{ data.Email }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por email" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <Toast position="bottom-right" />
    </div>
</template>

<script setup>
import axios from 'axios';
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import { ref } from "vue";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from '@primevue/core/api';

const buscar = ref('');
const rows = ref([]);
const loading = ref(false);
const token = ref(decodeJwt(getToken()).token);
const toast = useToast();
const filters = ref({
    'CLIE_CLIENTE': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'CLIE_NOMBRE': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Telefono': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Domicilio': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Localidad': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Fax': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Email': { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const getData = async () => {
    loading.value = true;

    try {
        const { data } = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/buscarclienteportelefono', {
            params: {
                buscar: buscar.value
            },
            headers: { Authorization: `Bearer ${token.value}` }
        });

        if (data.ok === false) {
            toast.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
            rows.value = [];
            return;
        } else if (data.total === 0) {
            toast.add({ severity: 'info', summary: 'Sin resultados', detail: 'No se encontraron resultados.', life: 3000 });
            rows.value = [];
            return;
        }
        rows.value = data.rows[0];
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos cargados.', life: 3000 });
    }
    catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener los datos.', life: 3000 });
    }
    finally {
        loading.value = false;
    }
};

const cargar = async () => {
    await getData();
};

const limpiarFiltros = () => {
    buscar.value = '';
    rows.value = [];
    filters.value['CLIE_NOMBRE'].value = null;
    filters.value['CLIE_TELEFONO'].value = null;
};

</script>
<style scoped></style>
