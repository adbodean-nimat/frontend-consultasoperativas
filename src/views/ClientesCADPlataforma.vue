<template>
    <div class="directive-fullscreen-wrapper">
        <div class="container-fluid page-grid">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                        class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
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
            <div id="windowpopup">
                <div id="cron">
                    <div class="row g-3 p-3 align-items-center">
                        <div class="col">
                            <label for="" class="col-form-label">Tipo de Cliente</label>
                            <input id="input1" value="">
                        </div>
                    </div>

                    <div class="row g-3 p-3 align-items-center">
                        <div class="col">
                            <label for="" class="col-form-label">Perfil Crediticio</label>
                            <input id="input2" value="">
                        </div>
                    </div>

                    <div class="row g-3">
                        <button id="guardar" class="guardar btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>

            <datasource ref="remoteDataSourceClientesCADPlataforma" :transport-read="readData"
                :schema-model-fields="schemaModelFields" :page-size='100'>
            </datasource>
            <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceClientesCADPlataforma'"
                :sortable-mode="'multiple'" :sortable-allow-unsort="true" :sortable-show-indexes="true"
                :pageable-always-visible="true" :pageable-page-sizes="[5, 10, 15, 20, 25, 100, 200, 500]"
                :filterable="true" :filterable-extra="false" :reorderable="true" :resizable="true" :groupable="false"
                :column-menu="true" :auto-bind="false" :toolbar="toolbarTemplate" :allow-copy="true" :navigatable="true"
                :selectable="'multiple, row'" :excel-file-name="'Lista de Clientes entre CAD y Plataforma.xlsx'"
                :excel-all-pages="true" :excel-filterable="true" @change="change">
                <grid-column :selectable="true" :width="60"></grid-column>
                <grid-column field="CLIE_CLIENTE" title="Nro. Cliente"></grid-column>
                <grid-column field="CLIE_NOMBRE" title="Nombre"></grid-column>
                <grid-column field="CLIE_EMAIL" title="E-mail" :hidden="false"></grid-column>
                <grid-column field="CLIE_CAD" title="Disponible en CAD"
                    template="#= CLIE_CAD == true ? 'Si' : 'No' #"></grid-column>
                <grid-column field="CLIE_DATE" title="Fecha de creación en CAD"
                    template="#: kendo.toString(CLIE_DATE, 'g', 'es-AR') == null ? '' : kendo.toString(CLIE_DATE, 'dd/MM/yyyy', 'es-AR') #"></grid-column>
                <grid-column field="CLIE_UPDATE" title="Fecha de actualización del usuario en CAD"
                    template="#: kendo.toString(CLIE_UPDATE, 'g', 'es-AR') == null ? '' : kendo.toString(CLIE_UPDATE, 'dd/MM/yyyy', 'es-AR') #"
                    :hidden="true"></grid-column>
                <grid-column field="CLIE_ACOPIOS" title="Cliente Acopio"
                    template="#= CLIE_ACOPIOS == true ? 'Si' : 'No' #"></grid-column>
                <grid-column field="CLIE_ACOPIOS_EMI" title="Fecha de emisión Acopio"
                    template="#: kendo.toString(CLIE_ACOPIOS_EMI, 'g', 'es-AR') == null ? '' : kendo.toString(CLIE_ACOPIOS_EMI, 'dd/MM/yyyy', 'es-AR') #"></grid-column>
                <grid-column field="CLIE_ACOPIOS_VIG" title="Fecha de vigente Acopio"
                    template="#: kendo.toString(CLIE_ACOPIOS_VIG, 'g', 'es-AR') == null ? '' : kendo.toString(CLIE_ACOPIOS_VIG, 'dd/MM/yyyy', 'es-AR') #"></grid-column>
                <grid-column field="CLIE_CTACTE" title="Cliente Cta Cte"
                    template="#= CLIE_CTACTE == true ? 'Si' : 'No' #"></grid-column>
            </grid>
        </div>
    </div>
</template>

<script>
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
import { Button } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'

export default {
    name: 'ClientesCADPlataforma',
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
            title: 'Lista de Clientes entre CAD y Plataforma',
            schemaModelFields: {
                CLIE_CLIENTE: { type: 'number' },
                CLIE_NOMBRE: { type: 'string' },
                CLIE_EMAIL: { type: 'string' },
                CLIE_CAD: { type: 'boolean' },
                CLIE_DATE: { type: 'date' },
                CLIE_UPDATE: { type: 'date' },
                CLIE_ACOPIOS: { type: 'boolean' },
                CLIE_ACOPIOS_EMI: { type: 'date' },
                CLIE_ACOPIOS_VIG: { type: 'date' },
                CLIE_CTACTE: { type: 'boolean' }
            }
        }
    },
    computed: {
        UrlApiBaseClientesPlataforma() {
            return `${process.env.VUE_APP_API_BASE}/listaclientesplataforma`
        },
        UrlApiBaseClientesAcopios() {
            return `${process.env.VUE_APP_API_BASE}/listaclientesplataformaacopios`
        },
        UrlApiBaseClientesCtaCte() {
            return `${process.env.VUE_APP_API_BASE}/listaclientesplataformactacte`
        },
        UrlApiBaseCAD() {
            return `${process.env.VUE_APP_API_BASE}/clientescad`
        },
        UrlApiBaseTiposdeClientes() {
            return `${process.env.VUE_APP_API_BASE}/tiposdeclientes`
        },
        UrlApiBasePefilCrediticio() {
            return `${process.env.VUE_APP_API_BASE}/perfilcrediticio`
        },
        UrlApiBaseFiltroClientesCtaCtePlataforma() {
            return `${process.env.VUE_APP_API_BASE}/filtroclientesplataforma/`
        },
        token() {
            return decodeJwt(getToken()).token
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
    created() {
        this.getFiltro();
    },
    methods: {
        async getFiltro() {
            var token = this.token;
            const res = await fetch(this.UrlApiBaseFiltroClientesCtaCtePlataforma, { method: 'GET', headers: { Authorization: `Basic ${token}` } });
            const data = await res.json();
            kendo.jQuery('#input1').data("kendoMultiSelect").value(data[0].tipo_de_cliente['tc']);
            kendo.jQuery('#input2').data("kendoMultiSelect").value(data[0].perfil_crediticio['pc']);
        },
        readData: function (e) {
            var token = this.token
            var data1 = kendo.jQuery.ajax({
                url: this.UrlApiBaseClientesPlataforma,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    e.success(data)
                },
                type: 'GET'
            });
            var data2 = kendo.jQuery.ajax({
                url: this.UrlApiBaseCAD,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    e.success(data)
                },
                type: 'GET'
            });
            var data3 = kendo.jQuery.ajax({
                url: this.UrlApiBaseClientesAcopios,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    e.success(data)
                },
                type: 'GET'
            });
            var data4 = kendo.jQuery.ajax({
                url: this.UrlApiBaseClientesCtaCte,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    e.success(data)
                },
                type: 'GET'
            });
            kendo.jQuery.when(data1, data2, data3, data4).then(function (firstResponse, secondResponse, threeResponse, fourResponse) {
                var firstResult = firstResponse[0];
                var secondResult = secondResponse[0];
                var threeResult = threeResponse[0];
                var fourResult = fourResponse[0];

                var result = [];
                //console.log(result)

                for (var y = 0; y < firstResult.length; y++) {
                    var fechaEmisionAcopio = kendo.jQuery.grep(threeResult, function (v) { return v.PACA_CLIENTE == firstResult[y].CLIE_CLIENTE });
                    var fechaClienteCAD = kendo.jQuery.grep(secondResult, function (v) { return v.UserName == firstResult[y].CLIE_CLIENTE });
                    result.push({
                        CLIE_CLIENTE: firstResult[y].CLIE_CLIENTE,
                        CLIE_NOMBRE: firstResult[y].CLIE_NOMBRE,
                        CLIE_EMAIL: firstResult[y].CLIE_EMAIL,
                        CLIE_CAD: secondResult.some(item => item.UserName == firstResult[y].CLIE_CLIENTE),
                        CLIE_DATE: fechaClienteCAD.length == 0 ? '' : fechaClienteCAD[0].UserCreDate,
                        CLIE_UPDATE: fechaClienteCAD.length == 0 ? '' : fechaClienteCAD[0].UserUpdDate,
                        CLIE_ACOPIOS: threeResult.some(item => item.PACA_CLIENTE == firstResult[y].CLIE_CLIENTE),
                        CLIE_ACOPIOS_EMI: fechaEmisionAcopio.length == 0 ? '' : fechaEmisionAcopio[0].FECHA_EMI,
                        CLIE_ACOPIOS_VIG: fechaEmisionAcopio.length == 0 ? '' : fechaEmisionAcopio[0].FECHA_VIG_HASTA,
                        CLIE_CTACTE: fourResult.some(item => item.CLIE_CLIENTE == firstResult[y].CLIE_CLIENTE)
                    })
                }

                e.success(result);
            });
        },
        toolbarTemplate: function () {
            var templateHtml =
                '<div class="container-fluid">' +
                '<form id="form" class="requires-validation row align-items-end" novalidate>' +
                '<div class="col d-flex flex-column">' +
                '<label class="col-form-label">Emisión Acopio desde</label>' +
                '<input type="date" id="fechaDesde"/>' +
                '<div class="invalid-feedback">Falta completa este campo.</div>' +
                '</div>' +
                '<div class="col d-flex">' +
                '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta"><span class="k-icon k-i-play"></span></a>' +
                '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro"  style="margin-left:5px"><span class="k-icon k-i-filter-clear"></span></a>' +
                '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();" style="margin-left:5px"><span class="k-icon k-i-file"></span></a>' +
                '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-excel" style="margin-left:5px"><span class="k-icon k-i-excel"></span></a>' +
                '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                '<a class="k-pager-refresh k-link k-button edit" title="Editar filtro" style="margin-left:5px"><span class="k-icon k-i-edit"></span></a>' +
                '</div>' +
                '</form>' +
                '</div>';
            return templateHtml;
        },
        change: function (e) {
            var grid = this.$refs.grid.kendoWidget();
            var selectedRows = grid.select();
            var selectedDataItems = [];
            for (var i = 0; i < selectedRows.length; i++) {
                var dataItem = grid.dataItem(selectedRows[i]);
                selectedDataItems.push(dataItem);
            }
        }
    },
    mounted: function () {
        var grid = this.$refs.grid.kendoWidget();
        var gridElement = grid.element;
        var toolbarElement = gridElement.find('.k-grid-toolbar');
        var fechaDesde = gridElement.find('#fechaDesde');
        var kendoWindowPopup = kendo.jQuery("#windowpopup");

        fechaDesde.kendoDatePicker({
            culture: "es-AR",
            format: "dd/MM/yyyy"
        })

        kendoWindowPopup.kendoWindow({
            width: "500px",
            modal: true,
            visible: false,
            height: 'auto',
            resizable: false,
            title: 'Filtro clientes Cta Cte'
        })

        kendo.jQuery('#input1').kendoMultiSelect({
            dataSource: {
                transport: {
                    read: {
                        url: this.UrlApiBaseTiposdeClientes,
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        }
                    }
                }
            },
            dataTextField: "TCLI_TIPO_CLI",
            dataValueField: "TCLI_TIPO_CLI",
            itemTemplate: '<span>#: TCLI_TIPO_CLI # - #: TCLI_NOMBRE #</span>'
        });

        kendo.jQuery('#input2').kendoMultiSelect({
            dataSource: {
                transport: {
                    read: {
                        url: this.UrlApiBasePefilCrediticio,
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        }
                    }
                }
            },
            dataTextField: "CLC2_CLASIF_2",
            dataValueField: "CLC2_CLASIF_2",
            itemTemplate: '<span>#: CLC2_CLASIF_2 # - #: CLC2_NOMBRE #</span>'
        });

        toolbarElement.on("click", ".refresh", function (e) {
            e.preventDefault();
            grid.dataSource.read();
        });

        toolbarElement.on("click", ".filter-clear", function () {
            fechaDesde.data("kendoDatePicker").value(null);
            grid.dataSource.filter(null);
        });

        toolbarElement.on("click", ".play", () => {
            var FechaEmisionDesde = fechaDesde.data("kendoDatePicker").value();
            if (FechaEmisionDesde == null) {
                grid.dataSource.read();
            } else {
                grid.dataSource.filter({ field: "CLIE_ACOPIOS_EMI", operator: "gte", value: FechaEmisionDesde });
            }
        });

        toolbarElement.on('click', '.edit', (e) => {
            e.preventDefault();
            var popup = kendo.jQuery("#windowpopup").data('kendoWindow');
            popup.open();
            popup.center();
            popup.wrapper.find(".guardar").click((e) => {
                e.preventDefault();
                var input1 = kendo.jQuery('#input1').data("kendoMultiSelect").value();
                var input2 = kendo.jQuery('#input2').data("kendoMultiSelect").value();
                var data = { "tipo_de_cliente": { "tc": input1 }, "perfil_crediticio": { "pc": input2 } }
                //console.log(kendo.stringify(data))
                var token = this.token
                kendo.jQuery.ajax({
                    url: this.UrlApiBaseFiltroClientesCtaCtePlataforma + 1,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                    },
                    method: 'PUT',
                    type: 'PUT',
                    success: function (data, textStatus) {
                        //console.log(textStatus);  
                        kendo.alert('Modificado correctamente').element.getKendoAlert().title("Mensaje");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error(jqXHR);
                        console.error(textStatus);
                        console.error(errorThrown);
                    },
                    data: kendo.stringify(data),
                    contentType: 'application/json',
                })
            });
        });
    }
}
</script>

<style></style>