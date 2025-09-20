<template>
    <div>
        <div class="container-fluid page-grid min-vh-100">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-person-up"
                        viewBox="0 0 16 16">
                        <path
                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path
                            d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                    <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
                    <span style="color: white; margin-left: 5px;">{{ title }}</span>
                </div>
                <div class="button-fullscreen d-flex flex-row align-items-center">
                    <div style="margin-right: 15px;">
                        <!--  <router-link to="/gestiondecompras/parametrosdecompras">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                                class="bi bi-sliders2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </router-link> -->
                    </div>
                </div>
            </div>
            <div class="card">
                <Toolbar class="mb-6">
                    <template #start>
                        <Button label="Agregar cliente" icon="pi pi-plus" class="me-2" @click="openNew" />
                        <Button label="Eliminar" icon="pi pi-trash" severity="danger" variant="outlined"
                            @click="confirmDeleteSelected" :disabled="!selectedClientes || !selectedClientes.length" />
                    </template>
                    <template #end>
                        <Button label="Enviar lista de precios x WhatsApp" icon="pi pi-send" class="me-2"
                            :disabled="!selectedClientes || !selectedClientes.length" @click="enviarListaPrecios" />
                    </template>
                </Toolbar>
                <DataTable v-model:filters="filters" v-model:selection="selectedClientes" :value="clientes" paginator
                    :rows="10" dataKey="id" filterDisplay="menu" :loading="cargando" resizableColumns
                    columnResizeMode="fit" :globalFilterFields="['cod_cliente', 'nombre_cliente']"
                    currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords} clientes">
                    <template #header>
                        <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                            <h4 class="m-0">Administrar los clientes</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </IconField>
                        </div>
                    </template>
                    <template #empty>No se han encontrado datos. </template>
                    <template #loading>Cargando datos. Por favor, espere. </template>
                    <Column selectionMode="multiple" headerStyle="width: 5rem"></Column>
                    <Column field="habilitado" header="Estado" style="text-align: center"
                        bodyStyle="text-align: center">
                        <template #body="{ data }">
                            <i v-if="data.habilitado" class="pi pi-check" style="color: green;"></i>
                            <i v-else class="pi pi-times" style="color: red;"></i>
                        </template>
                        <!-- <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Buscar por habilitado" />
                        </template> -->
                    </Column>
                    <Column field="cod_cliente" header="Nro. de cliente" sortable style="min-width: 2rem">
                        <template #body="{ data }">
                            {{ data.cod_cliente }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text"
                                placeholder="Buscar por código de cliente" />
                        </template>
                    </Column>
                    <Column field="nombre_cliente" header="Nombre" sortable style="min-width: 14rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text"
                                placeholder="Buscar por nombre de cliente" />
                        </template>
                        <template #filterclear="{ filterCallback }">
                            <Button type="button" icon="pi pi-times" @click="filterCallback()"
                                severity="secondary"></Button>
                        </template>
                    </Column>
                    <Column field="perfilcomercial_cliente" header="Perfil comercial" sortable style="min-width: 10rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text"
                                placeholder="Buscar por perfil comercial" />
                        </template>
                    </Column>
                    <Column field="domicilio_cliente" header="Domicilio" sortable style="min-width: 14rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Buscar por domicilio" />
                        </template>
                    </Column>
                    <Column field="localidad_cliente" header="Localidad" sortable style="min-width: 10rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Buscar por localidad" />
                        </template>
                    </Column>
                    <Column field="provincia_cliente" header="Provincia" sortable style="min-width: 10rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Buscar por provincia" />
                        </template>
                    </Column>
                    <Column field="zonas_distribucion_cliente" header="Zonas de distribución" sortable
                        style="min-width: 10rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text"
                                placeholder="Buscar por zonas de distribución" />
                        </template>
                    </Column>
                    <Column field="nombre_zonas_distribucion_cliente" header="Nombre zona distribución" sortable
                        style="min-width: 10rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text"
                                placeholder="Buscar por nombre zona distribución" />
                        </template>
                    </Column>
                    <Column field="nro_whatsapp_cliente" header="Nro. WhatsApp" sortable style="min-width: 10rem">
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Buscar por nro. WhatsApp" />
                        </template>
                    </Column>

                    <Column field="rubros_ventas" header="Rubros de ventas" sortable style="min-width: 10rem">
                        <template #body="{ data }">
                            <div v-if="data.rubros_ventas && data.rubros_ventas.length">
                                <span class="me-1" v-for="(rubro, index) in data.rubros_ventas" :key="index">
                                    <Tag rounded>{{ rubro.rubros_nombres }}</Tag>
                                </span>
                            </div>
                            <div v-else>
                                -
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value.rubros_nombres" type="text"
                                placeholder="Buscar por rubros de ventas" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width: 12rem">
                        <template #body="slotProps">
                            <!-- <Button icon="pi pi-eye" variant="outlined" rounded class="me-2" /> -->
                            <Button icon="pi pi-pencil" variant="outlined" rounded class="me-2"
                                @click="editCliente(slotProps.data)" />
                            <Button icon="pi pi-trash" variant="outlined" rounded severity="danger"
                                @click="confirmDelete(slotProps.data)" />
                        </template>
                    </Column>

                    <!-- <Column headerStyle="width: 4rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body>
                            <Button type="button" icon="pi pi-cog" rounded />
                        </template>
                    </Column> -->
                </DataTable>
            </div>
            <Dialog v-model:visible="clientesDialog" :style="{ width: '450px' }" header="Agregar cliente" modal
                class="p-fluid" :draggable="true" :closable="true">
                <div>
                    <label for="cod_cliente" class="block font-bold mb-3">Código de cliente</label>
                    <InputText id="cod_cliente" v-model.trim="clientes.cod_cliente" required="true" autofocus
                        :invalid="submitted && !clientes.cod_cliente" fluid />
                    <small v-if="submitted && !clientes.cod_cliente" class="text-red-500">Se requiere el código de
                        cliente</small>
                </div>
                <!-- <div class="mt-3">
                    <label for="nro_whatsapp_cliente" class="block font-bold mb-3">Número de WhatsApp</label>
                    <InputMask id="nro_whatsapp_cliente" v-model.trim="clientes.nro_whatsapp_cliente"
                        mask="+54 999 999-9999" placeholder="+54 999 999-9999" fluid />
                </div> -->
                <!-- <div class="mt-3 d-flex flex-column">
                    <label for="rubrosventas" class="block font-bold mb-3">Rubros de ventas</label>
                    <MultiSelect v-model="selectedRubros" display="chip" :options="rubrosdeventas"
                        optionLabel="rubros_nombres" filter :maxSelectedLabels="3" class="w-full md:w-80" />
                </div> -->
                <div class="d-flex justify-content-end mt-5 gap-2">
                    <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Guardar" icon="pi pi-check" class="p-button-sm" @click="agregarClientes" />
                </div>

            </Dialog>
            <Dialog v-model:visible="deleteclientesDialog" :style="{ width: '450px' }" header="Eliminar clientes" modal
                class="p-fluid" :draggable="true" :closable="true" :modal="true">
                <div class="flex items-center gap-4">
                    <span v-if="selectedClientes && selectedClientes.length">¿Estás seguro de que quieres borrar los
                        clientes
                        seleccionados?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteclientesDialog = false"
                        severity="secondary" variant="text" />
                    <Button label="Si" icon="pi pi-check" text @click="deleteSelected" severity="danger" />
                </template>
            </Dialog>
            <Dialog v-model:visible="clientesEditDialog" :style="{ width: '650px' }" header="Editar cliente" modal
                class="p-fluid" :draggable="true" :closable="true">
                <div class="d-flex flex-column">
                    <label for="habilitado" class="block font-bold mb-3">Estado</label>
                    <ToggleSwitch id="habilitado" v-model="editarClientes.habilitado" aria-label="Habilitado" />
                </div>
                <div class="mt-3 row">
                    <div class="col">
                        <label for="nombre" class="block font-bold mb-3">Nombre</label>
                        <InputText id="nombre" v-model.trim="editarClientes.nombre_cliente" fluid />
                    </div>
                    <div class="col">
                        <label for="perfilcomercial_cliente" class="block font-bold mb-3">Perfil comercial</label>
                        <Select id="perfilcomercial_cliente" :options="perfilcomercial" option-label="CLC1_NOMBRE"
                            option-value="CLC1_CLASIF_1" v-model.trim="editarClientes.perfilcomercial_cliente" fluid />
                    </div>
                </div>
                <div class="mt-3 row">
                    <div class="col">
                        <label for="domicilio_cliente" class="block font-bold mb-3">Domicilio</label>
                        <InputText id="domicilio_cliente" v-model.trim="editarClientes.domicilio_cliente" fluid />
                    </div>
                    <div class="col">
                        <label for="localidad_cliente" class="block font-bold mb-3">Localidad</label>
                        <InputText id="localidad_cliente" v-model.trim="editarClientes.localidad_cliente" fluid />
                    </div>
                </div>
                <div class="mt-3">
                    <label for="provincia_cliente" class="block font-bold mb-3">Provincia</label>
                    <InputText id="provincia_cliente" v-model.trim="editarClientes.provincia_cliente" fluid />
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <label for="zonas_distribucion_cliente" class="block font-bold mb-3">Zonas de
                            distribución</label>
                        <InputText id="zonas_distribucion_cliente"
                            v-model.trim="editarClientes.zonas_distribucion_cliente" fluid />
                    </div>
                    <div class="col">
                        <label for="nombre_zonas_distribucion_cliente" class="block font-bold mb-3">Nombre zona
                            distribución</label>
                        <InputText id="nombre_zonas_distribucion_cliente"
                            v-model.trim="editarClientes.nombre_zonas_distribucion_cliente" fluid />
                    </div>
                </div>
                <div class="mt-3">
                    <label for="nro_whatsapp_cliente" class="block font-bold mb-3">Número de WhatsApp</label>
                    <InputMask id="nro_whatsapp_cliente" v-model.trim="editarClientes.nro_whatsapp_cliente"
                        mask="+549999999999" placeholder="+549999999999" fluid />
                </div>
                <div class="mt-3 d-flex flex-column">
                    <label for="rubrosventas" class="block font-bold mb-3">Rubros de ventas</label>
                    <MultiSelect v-model="editarClientes.rubros_ventas" display="chip" :options="rubrosdeventas"
                        optionLabel="rubros_nombres" filter :maxSelectedLabels="3" class="w-full md:w-80" />
                </div>
                <div class="d-flex justify-content-end mt-5 gap-2">
                    <Button label="Cancelar" icon="pi pi-times" text @click="hideEditDialog" />
                    <Button label="Guardar" icon="pi pi-check" class="p-button-sm" @click="guardarClientes" />
                </div>
            </Dialog>
        </div>
        <Toast />
    </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import ToggleSwitch from 'primevue/toggleswitch';
import Tag from 'primevue/tag';
import parsePhoneNumber from 'libphonenumber-js';
export default {
    name: "ListadeClientesDistribucion",
    components: {
        Tag,
        Toast,
        Card,
        Toolbar,
        DataTable,
        Column,
        ColumnGroup,
        Row,
        Button,
        InputText,
        IconField,
        InputIcon,
        Dialog,
        InputMask,
        Select,
        MultiSelect,
        ToggleSwitch
    },
    data() {
        return {
            title: "Lista de Clientes Distribución",
            clientes: [],
            filters: {
                'global': { value: null, matchMode: 'contains' },
                'cod_cliente': { value: null, matchMode: 'contains' },
                'nombre_cliente': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'perfilcomercial_cliente': { value: null, matchMode: 'contains' },
                'domicilio_cliente': { value: null, matchMode: 'contains' },
                'localidad_cliente': { value: null, matchMode: 'contains' },
                'provincia_cliente': { value: null, matchMode: 'contains' },
                'zonas_distribucion_cliente': { value: null, matchMode: 'contains' },
                'nombre_zonas_distribucion_cliente': { value: null, matchMode: 'contains' },
                'nro_whatsapp_cliente': { value: null, matchMode: 'contains' },
                'rubros_ventas': { value: null, matchMode: 'contains' },
            },
            selectedClientes: null,
            cargando: false,
            clientesDialog: false,
            deleteclientesDialog: false,
            submitted: false,
            rubrosdeventas: [],
            selectedRubros: [],
            clientesEditDialog: false,
            editarClientes: null,
            perfilcomercial: [],
        }
    },
    computed: {
        token() {
            return store.state.token;
        }
    },
    methods: {
        openNew() {
            this.clientesDialog = true;
        },
        hideDialog() {
            this.clientesDialog = false;
            this.fetchClientes();
        },
        hideEditDialog() {
            this.clientesEditDialog = false;
            this.fetchClientes();
        },
        fetchPerfilComercial() {
            axios.get(`${process.env.VUE_APP_API_BASE}/clasificadorclientes`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.perfilcomercial = response.data;
                })
                .catch(error => {
                    console.error('Error fetching perfil comercial:', error);
                });
        },
        fetchRubrosVentas() {
            axios.get(`${process.env.VUE_APP_API_BASE}` + '/rubrosventas', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.rubrosdeventas = response.data.sort((a, b) => a.orden_rubros - b.orden_rubros || a.rubros_nombres.localeCompare(b.rubros_nombres));
                })
                .catch(error => {
                    console.error('Error fetching rubros de ventas:', error);
                });
        },
        fetchClientes() {
            axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdd/clientesdistribuciones', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.clientes = response.data;
                })
                .catch(error => {
                    console.error('Error fetching clients:', error);
                });
        },
        async agregarClientes() {
            const getClientbyCode = await axios.get(`${process.env.VUE_APP_API_BASE}` + `/gdd/clientesdistribuciones/${this.clientes.cod_cliente}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            console.log(getClientbyCode.data[0].CLIE_FAX);
            if (getClientbyCode.data) {
                if (!getClientbyCode.data[0].CLIE_FAX) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido agregar el cliente, no se ha encontrado el número de WhatsApp.', life: 3000 });
                    return;
                }
                await axios.post(`${process.env.VUE_APP_API_BASE}` + '/gdd/clientesdistribuciones', {
                    cod_cliente: this.clientes.cod_cliente,
                    nombre_cliente: getClientbyCode.data[0].CLIE_NOMBRE,
                    perfilcomercial_cliente: getClientbyCode.data[0].CLIE_CLASIF_1,
                    domicilio_cliente: getClientbyCode.data[0].CLIE_DOMICILIO,
                    localidad_cliente: getClientbyCode.data[0].CLIE_LOCALIDAD,
                    provincia_cliente: getClientbyCode.data[0].PCIA_NOMBRE,
                    zonas_distribucion_cliente: getClientbyCode.data[0].CLIE_ZONA_DISTRIB,
                    nombre_zonas_distribucion_cliente: getClientbyCode.data[0].ZDIS_NOMBRE,
                    nro_whatsapp_cliente: parsePhoneNumber(getClientbyCode.data[0].CLIE_FAX, 'AR').number,
                    rubros_ventas: this.selectedRubros || [],
                    habilitado: false
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).then(response => {
                    this.fetchClientes(); // Refresh the list after adding a new client
                    this.clientesDialog = false; // Close the dialog
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente agregado exitosamente.', life: 3000 });
                }).catch(error => {
                    console.error('Error adding client:', error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar el cliente.', life: 3000 });
                });

                //this.$toast.add({ severity: 'error', summary: 'Error', detail: 'El código de cliente ya existe.', life: 3000 });
                return;
            }
        },
        confirmDelete(cliente) {
            this.selectedClientes = [cliente];
            this.deleteclientesDialog = true;
        },
        confirmDeleteSelected() {
            this.deleteclientesDialog = true;
        },
        deleteSelected() {
            console.log(this.selectedClientes);
            // Implement deletion logic here
            this.selectedClientes.forEach(async (cliente) => {
                await axios.delete(`${process.env.VUE_APP_API_BASE}` + '/gdd/clientesdistribucionesdelete/' + cliente.id, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).then(response => {
                    this.fetchClientes(); // Refresh the list after deletion
                    this.selectedClientes = null; // Clear selection
                    this.deleteclientesDialog = false;
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Clientes eliminados exitosamente.', life: 3000 });
                }).catch(error => {
                    console.error('Error deleting clients:', error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar los clientes.', life: 3000 });
                });
            });

        },
        cancelDeleteSelected() {
            this.deleteclientesDialog = false;
        },
        editCliente(cliente) {
            this.clientesEditDialog = true;
            // Implement edit logic here
            this.editarClientes = cliente; // Create a copy of the selected client
            //console.log('Edit client:', cliente);
        },
        async guardarClientes() {
            await axios.put(`${process.env.VUE_APP_API_BASE}` + `/gdd/clientesdistribucionesupdate/${this.editarClientes.id}`, {
                id: this.editarClientes.id,
                cod_cliente: this.editarClientes.cod_cliente,
                nombre_cliente: this.editarClientes.nombre_cliente,
                perfilcomercial_cliente: this.editarClientes.perfilcomercial_cliente,
                domicilio_cliente: this.editarClientes.domicilio_cliente,
                localidad_cliente: this.editarClientes.localidad_cliente,
                provincia_cliente: this.editarClientes.provincia_cliente,
                zonas_distribucion_cliente: this.editarClientes.zonas_distribucion_cliente,
                nombre_zonas_distribucion_cliente: this.editarClientes.nombre_zonas_distribucion_cliente,
                nro_whatsapp_cliente: this.editarClientes.nro_whatsapp_cliente,
                rubros_ventas: this.editarClientes.rubros_ventas,
                habilitado: this.editarClientes.habilitado
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.fetchClientes(); // Refresh the list after updating a client
                    this.clientesEditDialog = false; // Close the dialog
                    this.editarClientes = null; // Clear the selected client
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado exitosamente.', life: 3000 });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async enviarListaPrecios() {
            //console.log(this.selectedClientes)
            this.selectedClientes.forEach(async (cliente) => {
                //console.log(cliente)
                //console.log('Cliente', cliente.habilitado)
                //console.log('Cliente', cliente.nro_whatsapp_cliente)
                //console.log('Cliente', cliente.perfilcomercial_cliente)
                if (cliente.habilitado == true) {
                    if (cliente.perfilcomercial_cliente == 'REA' || cliente.perfilcomercial_cliente == 'REB') {
                        const data = {
                            to: cliente.nro_whatsapp_cliente,
                            perfil: cliente.perfilcomercial_cliente
                        };
                        await axios.post(`${process.env.VUE_APP_API_BASE}` + '/enviarxWhatsapp', data, {
                            headers: {
                                'Authorization': `Bearer ${this.token}`
                            }
                        }).then(response => {
                            console.log(response)
                            this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Lista de precios enviado exitosamente.', life: 3000 });
                        }).catch(error => {
                            console.error('Error:', error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar lista de precios.', life: 3000 });
                        });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar lista de precios, no se puede enviar a clientes con clasificación de cliente no son REA o REB.', life: 3000 });
                    }
                }
            })
        },
    },
    mounted() {
        this.fetchClientes();
        this.fetchRubrosVentas();
        this.fetchPerfilComercial();
    }
}
</script>

<style></style>