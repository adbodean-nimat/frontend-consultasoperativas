<template>
    <div>
        <div>
            <Toolbar class="mb-0" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <template #start>
                    <span>Parametros: <strong><i> Compradores </i></strong></span>
                </template>
                <template #end>

                </template>
            </Toolbar>
            <Accordion>
                <AccordionPanel value="0">
                    <AccordionHeader>1 - Lista de compradores</AccordionHeader>
                    <AccordionContent>
                        <Toolbar class="mb-3">
                            <template #start>
                                <Button label="Agregar" icon="pi pi-plus" class="m-2"
                                    @click="productDialog = true"></Button>
                                <Button label="Eliminar" icon="pi pi-trash" severity="danger" outlined
                                    @click="DeleteSelected" :disabled="!selected || !selected.length" />
                            </template>
                        </Toolbar>
                        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Agregar comprador"
                            :modal="true">
                            <div class="flex flex-col gap-6">
                                <div class="mb-4">
                                    <label for="codigo" class="block font-bold mb-3">Código comprador</label>
                                    <InputText id="codigocomprador" v-model="inputcompradores.codigo" fluid />
                                </div>
                                <div>
                                    <label for="nombre" class="block font-bold mb-3">Nombre comprador</label>
                                    <InputText id="nombrecomprador" v-model="inputcompradores.nombre" fluid />
                                </div>
                            </div>

                            <template #footer>
                                <Button label="Cancelar" icon="pi pi-times" text @click="productDialog = false" />
                                <Button label="Guardar" icon="pi pi-check" @click="guardarComprador" />
                            </template>
                        </Dialog>
                        <DataTable v-model:selection="selected" :value="compradores" editMode="cell"
                            @cell-edit-complete="onCellEditComplete" :pt="{
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
            </Accordion>
        </div>
        <Toast />
    </div>
</template>

<script>
import { useStoreCompradores } from "@/stores/compradores";
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
    name: 'ParametrosCompradores',
    components: {
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        DataTable,
        Column,
        InputText,
        Toolbar,
        Button,
        Dialog,
        Toast,
    },
    data() {
        return {
            toast: useToast(),
            title: 'Parámetros de compradores',
            token: decodeJwt(getToken()).token,
            productDialog: false,
            selected: [],
            inputcompradores: {
                codigo: '',
                nombre: ''
            },
            columns: [
                { field: 'value', header: 'Código comprador', type: 'text', class: 'w-1/4' },
                { field: 'label', header: 'Nombre comprador', type: 'text', class: 'w-3/4' }
            ]
        }
    },
    methods: {
        async onCellEditComplete(e) {
            let { data, newValue, field } = e;
            const store = useStoreCompradores();
            console.log('Edit complete:', { data, newValue, field });
            store.updateCompradores(data, newValue, field);
            this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Comprador actualizado', life: 3000 });
        },
        async DeleteSelected() {
            const store = useStoreCompradores();
            store.removeCompradores(this.selected.map(item => item.value));
            this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Eliminado correctamente', life: 3000 });
        },
        async guardarComprador() {
            const store = useStoreCompradores();
            if (!this.inputcompradores.codigo || !this.inputcompradores.nombre) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios', life: 3000 });
                return;
            }
            store.setCompradores([...this.compradores, { label: this.inputcompradores.nombre, value: this.inputcompradores.codigo }]);
            this.productDialog = false;
            this.inputcompradores.codigo = '';
            this.inputcompradores.nombre = '';
        }
    },
    computed: {
        compradores() {
            const store = useStoreCompradores();
            return store.compradores;
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