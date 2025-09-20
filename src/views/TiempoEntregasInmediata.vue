<template>
    <div class="directive-fullscreen-wrapper">
        <div class="container-fluid page-grid">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-stopwatch"
                        viewBox="0 0 16 16">
                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                        <path
                            d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                    </svg>
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
            <datasource ref="remoteDataSourceTiempoEntregasInmediata" :transport-read="readData"
                :schema-model-fields="schemaModelFields" :page-size='100'>
            </datasource>
            <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceTiempoEntregasInmediata'"
                :sortable-mode="'multiple'" :pageable-page-sizes="[100, 200, 300, 400, 500]" :filterable="true"
                :reorderable="true" :resizable="true" :column-menu="true" :navigatable="true" :toolbar="toolbarTemplate"
                :allow-copy="true" :selectable="true" :auto-bind="false" @databound="dataBound"
                :excel-file-name="'Consulta - Tiempos de Entregas Inmediata.xlsx'" :excel-all-pages="true"
                :excel-filterable="false">
                <grid-column field="['Tipo Pedido']" title="Tipo Pedido"></grid-column>
                <grid-column field="['Numero Pedido']" title="Nro. Pedido"></grid-column>
                <grid-column field="['Fecha Pedido']" title="Fecha Pedido"></grid-column>
                <grid-column field="['Hora Pedido']" title="Hora Pedido"></grid-column>
                <grid-column field="['Numero Cliente']" title="Nro. Cliente"></grid-column>
                <grid-column field="['Nombre Cliente']" title="Nombre Cliente"></grid-column>
                <grid-column field="['Fecha Or Preparacion']" title="Fecha Or. Preparacion"></grid-column>
                <grid-column field="['Hora Or Preparacion']" title="Hora Or. Preparacion"></grid-column>
                <grid-column field="['Id Or Picking']" title="Id Or. Picking"></grid-column>
                <grid-column field="['Fecha Or Picking']" title="Fecha Or. Picking"></grid-column>
                <grid-column field="['Hora Or Picking']" title="Hora Or. Picking"></grid-column>
                <grid-column field="['Resp Emi OPK']" title="Resp. Emi. OPK"></grid-column>
                <grid-column field="['Nombre Resp Emi OPK']" title="Nombre Resp. Emi. OPK"></grid-column>
                <grid-column field="['Resp Prep ORPK']" title="Resp. Emi. ORPK"></grid-column>
                <grid-column field="['Nombre Resp ORPK']" title="Nombre Resp. ORPK"></grid-column>
                <grid-column field="['Fecha Fin Preparacion']" title="Fecha Fin Preparacion"></grid-column>
                <grid-column field="['Hora Fin Preparacion']" title="Hora Fin Preparacion"></grid-column>
                <grid-column field="['Sucursal Remito']" title="Sucursal Remito"></grid-column>
                <grid-column field="['Tipo Remito']" title="Tipo Remito"></grid-column>
                <grid-column field="['Nro Remito']" title="Nro. Remito"></grid-column>
                <grid-column field="['Fecha Remito']" title="Fecha Remito"></grid-column>
                <grid-column field="['Hora Remito']" title="Hora Remito"></grid-column>
                <grid-column field="['Resp Emi Remito']" title="Resp. Emi Remito"></grid-column>
                <grid-column field="['Nombre Resp Emi Remito']" title="Nombre Resp. Emi Remito"></grid-column>
            </grid>
        </div>
    </div>
</template>

<script>
import store from "../store";
import JSZip from 'jszip'
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
import { Button } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'
export default {
    name: 'TiempoEntregasInmediata',
    directives: {
        fullscreen,
    },
    components: {
        "grid": Grid,
        "grid-column": GridColumn,
        "datasource": DataSource,
        "kbutton": Button
    },
    data: function () {
        return {
            fullscreen: false,
            teleport: true,
            pageOnly: true,
            title: 'Consulta - Tiempos de Entregas Inmediata',
            schemaModelFields: {
                "['Tipo Pedido']": { type: 'string' },
                "['Numero Pedido']": { type: 'number' },
                "['Fecha Pedido']": { type: 'date' },
                "['Hora Pedido']": { type: 'string' },
                "['Numero Cliente']": { type: 'number' },
                "['Nombre Cliente']": { type: 'string' },
                "['Fecha Or Preparacion']": { type: 'date' },
                "['Hora Or Preparacion']": { type: 'string' },
                "['Id Or Picking']": { type: 'number' },
                "['Fecha Or Picking']": { type: 'date' },
                "['Hora Or Picking']": { type: 'string' },
                "['Resp Emi OPK']": { type: 'string' },
                "['Nombre Resp Emi OPK']": { type: 'string' },
                "['Resp Prep ORPK']": { type: 'string' },
                "['Nombre Resp ORPK']": { type: 'string' },
                "['Fecha Fin Preparacion']": { type: 'date' },
                "['Hora Fin Preparacion']": { type: 'string' },
                "['Sucursal Remito']": { type: 'string' },
                "['Tipo Remito']": { type: 'string' },
                "['Nro Remito']": { type: 'number' },
                "['Fecha Remito']": { type: 'date' },
                "['Hora Remito']": { type: 'string' },
                "['Resp Emi Remito']": { type: 'string' },
                "['Nombre Resp Emi Remito']": { type: 'string' },
            },
        }
    },
    computed: {
        UrlApiBase() {
            return `${process.env.VUE_APP_API_BASE}/tiemposentregas`
        },
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
        }
    },
    methods: {
        readData: function (e) {
            var token = this.token
            var urlApi = this.UrlApiBase
            var fdesde = kendo.jQuery("#fechadesde").data("kendoDatePicker").value();
            var fhasta = kendo.jQuery("#fechahasta").data("kendoDatePicker").value();

            if (fdesde && fhasta) {
                kendo.jQuery.ajax({
                    url: urlApi + '?fechadesde=' + kendo.toString(fdesde, "yyyy-MM-dd") + '&fechahasta=' + kendo.toString(fhasta, "yyyy-MM-dd"),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                    },
                    dataType: 'json',
                    success: function (data) {
                        e.success(data)
                    },
                    type: 'GET'
                })
            } else if (!fdesde && !fhasta) {
                kendo.jQuery.ajax({
                    url: urlApi + '?fechadesde=' + kendo.toString(new Date(), "yyyy-MM-dd") + '&fechahasta=' + kendo.toString(new Date(), "yyyy-MM-dd"),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                    },
                    dataType: 'json',
                    success: function (data) {
                        e.success(data)
                    },
                    type: 'GET'
                })
            }
        },
        toolbarTemplate: function () {
            var templateHtml =
                '<div class="d-flex flex-column" id="form">' +
                '<div>' +
                `<label style="margin-right: 5px;" for="fechadesde">Fecha desde: </label>` +
                '<input id="fechadesde"/>' +
                `<label style="margin:0px 5px;" for="fechahasta">Hasta: </label>` +
                '<input id="fechahasta"/>' +
                '<span style="margin-left:5px">' +
                '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta"><span class="k-icon k-i-play"></span></a>' +
                '</span>' +
                '<span style="margin-left:5px">' +
                '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"><span class="k-icon k-i-reload"></span></a>' +
                '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();" style="margin-left:5px"><span class="k-icon k-i-file"></span></a>' +
                '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-excel" style="margin-left:5px"><span class="k-icon k-i-excel"></span></a>' +
                '</span>' +
                '</div>' +
                '</div>';
            return templateHtml;
        },
        dataBound: function () {
            var grid = this.$refs.grid.kendoWidget();
            for (var i = 0; i < grid.columns.length; i++) {
                grid.autoFitColumn(i);
            }
        },
    },
    mounted: function () {
        var grid = this.$refs.grid.kendoWidget();
        var gridElement = grid.element;
        var toolbarElement = gridElement.find('.k-grid-toolbar');
        var fechadesde = gridElement.find('#fechadesde');
        var fechahasta = gridElement.find('#fechahasta');

        fechadesde.kendoDatePicker({
            culture: "es-AR",
            format: "dd/MM/yyyy"
        });

        fechahasta.kendoDatePicker({
            culture: "es-AR",
            format: "dd/MM/yyyy"
        });

        toolbarElement.on("click", ".refresh", function (e) {
            e.preventDefault();
            var fdesde = fechadesde.data("kendoDatePicker").value();
            if (fdesde) {
                grid.dataSource.read();
            }
        });

        toolbarElement.on("click", ".play", function () {
            grid.dataSource.read();
        });
    },
    created: function () {
        window.JSZip = JSZip;
    }
}
</script>

<style></style>