<template>

    <div style="height: 80vh; width: 100%;">
        <Toolbar class="mb-2" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
            <template #start>
                <div class="d-flex flex-row align-items-center gap-2 w-full me-2">
                    <label class="w-auto">Semanas atrás:</label>
                    <InputNumber class="w-auto" name="dias_hacia_atras" v-model="semanasAtras" :min="1" :max="365"
                        fluid>
                    </InputNumber>
                </div>

                <div class="d-flex flex-row align-items-center gap-2 w-full">
                    <Button icon="pi pi-play" outlined class="border-2!" @click="getData"></Button>
                    <Button v-if="rowData.length > 0" icon="pi pi-replay" outlined class="border-2!"
                        @click="resetData"></Button>
                    <template v-if="cargando == true">
                        <ProgressSpinner style="width: 24px; height: 24px; color: var(--primary-color);" strokeWidth="4"
                            fill="transparent" />
                    </template>
                </div>
            </template>
            <template #end>
                <div v-if="rango" class="d-flex flex-row align-items-center gap-2 w-full">
                    <label class="w-auto">Rango de fechas:</label>
                    <Badge style="margin-left:auto; opacity:0.8;" severity="info" size="large">
                        {{ toDMY(rango.FechaDesde) }} a {{ toDMY(rango.FechaHasta) }}
                    </Badge>
                </div>
            </template>
        </Toolbar>
        <ag-grid-vue v-if="rowData.length > 0" style="width: 100%; height: 100%;" :rowData="rowData"
            :columnDefs="columnDefs" :defaultColDef="defaultColDef" :animateRows="true"
            :autoSizeStrategy="autoSizeStrategy" :theme="theme" :rowHeight="rowHeight" />
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
import InputNumber from 'primevue/inputnumber';
import ProgressSpinner from 'primevue/progressspinner';
import WeekHeader from "@/components/WeekHeader.vue";
import { AgGridVue } from "ag-grid-vue3";
import 'ag-grid-community/styles/ag-theme-material.css';

// All Community Features
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const rowHeight = 50;
const cargando = ref(false);
const rowData = ref([]);
const columnDefs = ref([]);
const rango = ref(null)
const semanasAtras = ref(1);
const token = decodeJwt(getToken()).token;
const autoSizeStrategy = {
    type: 'fitCellContents',
    skipHeader: false
};

const theme = themeMaterial.withParams({
    wrapperBorderRadius: '0px',
    wrapperBorder: false,
    headerRowBorder: true,
    columnBorder: true,
    rangeSelectionBorderColor: 'rgb(193, 0, 97)',
    rangeSelectionBorderStyle: 'solid',
    rangeSelectionBackgroundColor: 'rgb(255, 0, 128, 0.1)',
    rangeSelectionHighlightColor: 'rgb(60, 188, 0, 0.3)',
    oddRowBackgroundColor: '#8881',
});

const toDMY = (v) => {
    if (!v) return null;
    // si ya viene "YYYY-MM-DD", lo convertimos sin timezone
    const s = String(v).slice(0, 10); // "2026-01-25"
    const [yyyy, mm, dd] = s.split("-");
    return `${dd}/${mm}/${yyyy}`;
};

const defaultColDef = {
    sortable: false,
    filter: false,
    resizable: true,
    autoHeight: true,

};

const buildGrid = (payload) => {
    const semanas = [...payload.semanas].sort((a, b) => Number(a.WeekIndex) - Number(b.WeekIndex));

    const remitosIdx = new Map();
    for (const r of payload.remitosPorSemana) {
        const cod = r.Codigo_producto;
        if (!remitosIdx.has(cod)) remitosIdx.set(cod, {});
        remitosIdx.get(cod)[Number(r.WeekIndex)] = Number(r.Cantidad_de_remitos) || 0;
    }

    const rowData = payload.resumen.map(p => {
        const cod = p.Codigo_producto;
        const byWeek = remitosIdx.get(cod) || {};
        const dyn = {};
        for (const w of semanas) dyn[`wk_${w.WeekIndex}`] = byWeek[w.WeekIndex] ?? 0;

        const total = Object.values(byWeek).reduce((acc, v) => acc + (Number(v) || 0), 0);

        return {
            ...p,
            Stock: Number(p.Stock) || 0,
            Pte_NP_con_y_sin_reserva: Number(p.Pte_NP_con_y_sin_reserva) || 0,
            Pte_NP_reservadas: Number(p.Pte_NP_reservadas) || 0,
            Pendiente_en_OC: Number(p.Pendiente_en_OC) || 0,
            ...dyn,
            Total_cant_remitida: Number(p.Total_cant_remitida) || total,
        };
    });

    const fixed = [
        { headerName: "Código", field: "Codigo_producto", pinned: "left", },
        { headerName: "Nombre", field: "Nombre", pinned: "left" },
        { headerName: "Stock", field: "Stock", type: "numericColumn" },
        { headerName: "Pte. NP (con/sin) reserva", field: "Pte_NP_con_y_sin_reserva", type: "numericColumn", },
        { headerName: "Pte. NP reservadas", field: "Pte_NP_reservadas", type: "numericColumn", },
        { headerName: "Pte. OC", field: "Pendiente_en_OC", type: "numericColumn" },
    ];

    const weeks = semanas.map(w => ({
        headerName: w.SemanaLabel,
        field: `wk_${w.WeekIndex}`,
        headerComponent: WeekHeader,
        headerComponentParams: {
            rangeFrom: w.SemanaDesde, // ya viene dd/mm/yyyy
            rangeTo: w.SemanaHasta,
        },
        valueFormatter: (p) => (p.value ?? 0),
        cellStyle: { textAlign: 'right' },
    }));

    const totalCol = [
        { headerName: "Total cant. remitida", field: "Total_cant_remitida", type: "numericColumn", width: 170 }
    ];

    return { columnDefs: [...fixed, ...weeks, ...totalCol], rowData };
};

const getData = async () => {
    cargando.value = true;
    const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/controlcementoscales/' + semanasAtras.value, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });
    //columnDefs.value = buildColumnDefs(response.data);
    //rowData.value = buildGridData(response.data);

    rango.value = response.data.rango;

    const grid = buildGrid(response.data);
    columnDefs.value = grid.columnDefs;
    rowData.value = grid.rowData;
    cargando.value = false;
};
const resetData = () => {
    rowData.value = [];
    columnDefs.value = [];
};
</script>
<style scoped></style>
