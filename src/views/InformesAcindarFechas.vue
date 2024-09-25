<template>
    <div class="directive-fullscreen-wrapper">
      <div class="container-fluid page-grid">
        <div class="encabezado-titulo">
          <div style="margin-left: 5px; color: white;" class="icon-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-list-columns-reverse" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"/></svg>
          <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
          <span style="color: white; margin-left: 5px;">{{ title }}</span>
          </div>
          <div class="button-fullscreen">
            <div style="margin-right: 15px;">
            <kbutton v-fullscreen="options">
              <svg v-show="!fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>
              <svg v-show="fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>
            </kbutton>
            </div>
          </div>
        </div>
        <div id="window">
          <div class="row">
            <div class="col m-3">
              <a class="icon-link" target="_black" href="/tabla/informesacindar/clasifclientes">
                Clasif. Clientes
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
            </div>
            <div class="col m-3">
              <a class="icon-link" target="_black" href="/tabla/informesacindar/comprobantes">
                Comprobantes
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col m-3">
              <a class="icon-link" target="_black" href="/tabla/informesacindar/equivalcodfactorcant">
                Equival. Cod. y factor cant.
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div id="window2">
          <div class="col">
            <div class="col m-3">
              <span id="resumen"></span>
            </div>
          </div>
          <div class="col m-3">
            <a class="icon-link" target="_black" href="/tabla/informesacindar/equivalcodfactorcant">
                Equival. Cod. y factor cant.
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
          </div>
        </div>
        <div id="window3">
          <div class="col">
            <div class="col m-3">
              <span id="resumenarticulos"></span>
            </div>
          </div>
        </div>
        <datasource ref="remoteDataSourceInformesAcindarEntreFechas"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :aggregate="aggregateDefinition"
                          :page-size='100'
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourceInformesAcindarEntreFechas'"
              :sortable="true"
              :pageable-page-sizes="[100, 200, 400]"
              :filterable="true"
              :reorderable="true"
              :resizable="true"
              :groupable="false"
              :column-menu="true"
              :navigatable="true"
              :auto-bind="false"
              :excel-file-name="'Exportar Acindar.xlsx'"
              :excel-all-pages="true"
              :excel-filterable="false"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              @databound="dataBound"
              >
        <grid-column field="DEA" title="DEA"></grid-column>
        <grid-column field="SUCURSAL" title="SUCURSAL"></grid-column>
        <grid-column field="NRO_DOC_LEGAL" title="Nº DOC LEGAL"></grid-column>
        <grid-column field="TIPO_DOC_LEGAL" title="TIPO DOC LEGAL"></grid-column>
        <grid-column field="TIPO_DE_TRANSACCION" title="TIPO DE TRANSACCION"></grid-column>
        <grid-column field="ITEM_DOC_LEGAL" title="ITEM DOC LEGAL"></grid-column>
        <grid-column field="FECHA_DOC_LEGAL" title="FECHA DOC LEGAL"></grid-column>
        <grid-column field="NRO_DOC_REFERENCIA" title="Nº DOC REFERENCIA"></grid-column>
        <grid-column field="TIPO_DOC_REF" title="TIPO DOC REF"></grid-column>
        <grid-column field="ITEM_DOC_REF" title="ITEM DOC REF"></grid-column>
        <grid-column field="FECHA_DOC_REF" title="FECHA DOC REF"></grid-column>
        <grid-column field="CUIT" title="CUIT CLIENTE"></grid-column>
        <grid-column field="NRO_INTERNO_CLIENTE" title="N°INTERNO CLIENTE"></grid-column>
        <grid-column field="RAZON_SOCIAL" title="RAZON SOCIAL"></grid-column>
        <grid-column field="SEGMENTO" title="SEGMENTO"></grid-column>
        <grid-column field="DIRECCION" title="DIRECCION"></grid-column>
        <grid-column field="CIUDAD" title="CIUDAD"></grid-column>
        <grid-column field="PROVINCIA" title="PROVINCIA"></grid-column>
        <grid-column field="CODIGO_ART" title="CODIGO ART"></grid-column>
        <grid-column field="DESCRIPCION" title="DESCRIPCION"></grid-column>
        <grid-column field="UMV" title="UMV"></grid-column>
        <grid-column field="CANTIDAD" title="CANTIDAD"></grid-column>
        <grid-column field="MONTO" title="MONTO" format="{0:c}"></grid-column>
        <grid-column field="FECHA_COSTO" title="FECHA COSTO"></grid-column>
        <grid-column field="DESCRIPCION_COND_VTA" title="DESCRIPCION COND VTA"></grid-column>
        <grid-column field="DIAS" title="DIAS"></grid-column>
        <grid-column field="OBSERVACION" title="OBSERVACION"></grid-column>
        </grid>
      </div>
    </div>
</template>
    
<script>
    import store from "../store";
    import JSZip from 'jszip'
    import axios from 'axios'
    import '@progress/kendo-ui'
    import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
    import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
    import '@progress/kendo-theme-bootstrap/dist/all.css'
    import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
    import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
    import { Button } from '@progress/kendo-buttons-vue-wrapper'
    import { directive as fullscreen } from 'vue-fullscreen'
    kendo.culture("es-US");
    export default {
      name: 'InformesAcindarEntreFechas',
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
                title: 'Informes de Acindar',
                schemaModelFields: {
                    DEA: {type: 'string'},
                    SUCURSAL: {type: 'string'},
                    NRO_DOC_LEGAL: {type: 'string'},
                    TIPO_DOC_LEGAL: {type: 'string'},
                    TIPO_DE_TRANSACCION: {type: 'string'},
                    ITEM_DOC_LEGAL: {type: 'number'},
                    FECHA_DOC_LEGAL: {type: 'string'},
                    NRO_DOC_REFERENCIA: {type: 'string'},
                    TIPO_DOC_REF: {type: 'string'},
                    ITEM_DOC_REF: {type: 'string'},
                    FECHA_DOC_REF: {type: 'string'},
                    CUIT: {type: 'string'},
                    NRO_INTERNO_CLIENTE: {type: 'number'},
                    RAZON_SOCIAL: {type: 'string'},
                    SEGMENTO: {type: 'string'},
                    DIRECCION: {type: 'string'},
                    CIUDAD: {type: 'string'},
                    PROVINCIA: {type: 'string'},
                    CODIGO_ART: {type: 'string'},
                    DESCRIPCION: {type: 'string'},
                    UMV: {type: 'string'},
                    CANTIDAD: {type: 'number'},
                    CANTIDAD_ING: {type: 'number'},
                    SUBTOTAL_ITEM_SI: {type: 'number'},
                    MONTO: {type: 'number'},
                    FECHA_COSTO: {type: 'string'},
                    DESCRIPCION_COND_VTA: {type: 'string'},
                    DIAS: {type: 'number'},
                    OBSERVACION: {type: 'string'},
                },
                aggregateDefinition: [
                    {field: "CANTIDAD", aggregate: "sum"},
                    {field: "MONTO", aggregate: "sum"},
                    {field: "SUBTOTAL_ITEM_SI", aggregate: "sum"},
                    {field: "CANTIDAD_ING", aggregate: "sum"}
                ]
             }
      },
      created: function(){
        window.JSZip = JSZip;
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/informesacindarentrefechas`
        },
        UrlApiBaseEquivalCodFactorCant(){
          return `${process.env.VUE_APP_API_BASE}/acindarequivalcodfactorcant/`
        },
        UrlApiBaseStockArts(){
          return `${process.env.VUE_APP_API_BASE}/stockartsall/`
        },
        UrlApiBaseExport(){
          return `${process.env.VUE_APP_API_BASE}/jsontosheet3/`
        },
        token(){
          return store.state.token
        },
        options () {
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
      dataBound: function(e) {
          var grid = this.$refs.grid.kendoWidget();
          for (var i = 0; i < grid.columns.length; i++) {
                grid.autoFitColumn(i);
            }
          var aggSumCantidad = e.sender.dataSource.aggregates().CANTIDAD.sum
          var aggSumCantidadIngr = e.sender.dataSource.aggregates().CANTIDAD_ING.sum
          var aggSumMonto = e.sender.dataSource.aggregates().MONTO.sum
          var aggSumMontoSI = e.sender.dataSource.aggregates().SUBTOTAL_ITEM_SI.sum
          var totalItem = e.sender.dataSource.total();
          var modificados = document.getElementById("modificados_encabezado");
          modificados.innerText = ' Item: '+totalItem+' - Cantidad ingr.: '+kendo.toString(aggSumCantidadIngr, "n2")+ ' - Cantidad por factor: '+kendo.toString(aggSumCantidad, "n2")+ ' - Monto SI: '+ kendo.toString(aggSumMontoSI, "c2") +' - Monto: '+ kendo.toString(aggSumMonto, "c2")
        },
        readData: function(e) {
            var tkn = this.token
            var urlApi = this.UrlApiBase
            var getfechadesde = kendo.jQuery('#fechadesde').data("kendoDatePicker").value()
            var getfechahasta = kendo.jQuery('#fechahasta').data("kendoDatePicker").value()
            var data = {fechadesde: kendo.toString(new Date(getfechadesde), "yyyy-MM-dd"), fechahasta: kendo.toString(new Date(getfechahasta), "yyyy-MM-dd")}
            kendo.jQuery.ajax({
                url: urlApi + '?fechadesde='+kendo.toString(new Date(getfechadesde), "yyyy-MM-dd")+'&fechahasta='+kendo.toString(new Date(getfechahasta), "yyyy-MM-dd"),
                beforeSend: function(xhr){
                  xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
                },
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function(data){
                  e.success(data);
                },
                error: function(data){
                  e.error(data);
                }
            })
        },
        excelExport: function(e){
            var data = e.data;
            var gridColumns = e.sender.columns;
            var sheet = e.workbook.sheets[0];
            var visibleGridColumns = [];
            var columnTemplates = [];
            var dataItem;
            // Crear elemento para generar plantillas
            var elem = document.createElement('div');
            // Obtener una lista de columnas visibles
            for (var i = 0; i < gridColumns.length; i++) {
              if (!gridColumns[i].hidden) {
                visibleGridColumns.push(gridColumns[i]);
              }
            }

            // Cree una colección de plantillas de columna, junto con el índice de columna actual
            for (var i = 0; i < visibleGridColumns.length; i++) {
              if (visibleGridColumns[i].template) {
                columnTemplates.push({ cellIndex: i, template: kendo.template(visibleGridColumns[i].template) });
              }
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////

            // Recorra todas las filas exportadas.
            for (var i = 1; i < sheet.rows.length; i++) {
              var row = sheet.rows[i];
            // Recorra las plantillas de columna y aplíquelas para cada fila en la posición de columna almacenada
              
            // Obtenga el elemento de datos correspondiente a la fila actual.
              var dataItem = data[i - 1];
              
              for (var j = 0; j < columnTemplates.length; j++) {
                var columnTemplate = columnTemplates[j];

            // Genere el contenido de la plantilla para la celda actual.
                elem.innerHTML = columnTemplate.template(dataItem);
                
            //console.log(row.cells[columnTemplate.cellIndex])
                 if (row.cells[columnTemplate.cellIndex] != undefined)                
            // Envíe el contenido de texto de la celda con plantilla a la celda exportada.
                row.cells[columnTemplate.cellIndex].value = elem.textContent || elem.innerText || "";
              }
            }
        },
        toolbarTemplate: function() {
            var templateHtml =
              '<div class="d-flex flex-column position-relative container-fluid">' +
                '<div class="row" style="height: 40px">' +
                  '<div class="col" id="form">' +
                    `<label for="fechadesde">Fecha desde:</label>` +
                    '<input id="fechadesde" style="width: auto"/>' +
                    `<label for="fechahasta" style="margin-left: 0.5rem; text-align: center">hasta</label>` +
                    '<input id="fechahasta" style="width: auto"/>' +
                    '<span style="margin-left: 15px">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta" style="margin-right:5px"><span class="k-icon k-i-play"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-right:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                    '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();"><span class="k-icon k-i-file"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-excel" style="margin-left:5px"><span class="k-icon k-i-excel"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button edit" title="Editar tablas" style="margin-left:5px"><span class="k-icon k-i-edit"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                    '</span>' +
                    '<span id="resumen" style="margin-left: 15px"></span>' +
                    '<div class="d-flex flex-row align-items-start position-absolute top-0 end-0 w-auto">' +
                      '<button type="button" class="k-grid-exportar k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"><span class="k-icon k-i-export k-button-icon"></span><span class="k-button-text">Exportar xlsx/csv/txt</span></button>' +
                      '<div class="p-1">' +
                        '<div class="lds-ring" id="loading" style="display:none"><div></div><div></div><div></div><div></div></div>' +
                      '</div>' +
                    '</div>' +  
                  '</div>' +
                '</div>' +  
                '<div class="row align-items-center p1" style="height: 40px">' +
                  '<div class="col">' +
                    'Total: <span id="modificados_encabezado"></span>'+
                  '</div>' +
                '</div>' +
              '</div>';
            return templateHtml;
        }
    },
    mounted: function(){
      var token = this.token
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var fechadesde = gridElement.find('#fechadesde');
      var fechahasta = gridElement.find('#fechahasta');
      var toolbarElement = gridElement.find('.k-grid-toolbar');
      var kendoWindowEditar = kendo.jQuery("#window");
      var kendoWindowsPopup = kendo.jQuery("#window2");
      var kendoWindowsPopup2 = kendo.jQuery("#window3");

      kendoWindowEditar.kendoWindow({
        width: "500px",
        modal: true,
        visible: false,
        height: 'auto',
        resizable: false,
        title: 'Editar las tablas'
      })

      kendoWindowsPopup.kendoWindow({
        width: "500px",
        modal: true,
        visible: false,
        height: 'auto',
        resizable: false,
        title: 'Aviso'
      })

      kendoWindowsPopup2.kendoWindow({
        width: "500px",
        modal: true,
        visible: false,
        height: 'auto',
        resizable: false,
        title: 'Articulos'
      })
            
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
        grid.dataSource.read();
      });

      toolbarElement.on("click", ".filter-clear", function(e){
        e.preventDefault();
        fechahasta.data("kendoDatePicker").value(null);
        fechadesde.data("kendoDatePicker").value(null);
      })

      toolbarElement.on("click", ".play", ()=>{      
        kendo.jQuery('#resumenarticulos').empty();
        kendo.jQuery("#resumen").empty();
        var fdesde = fechadesde.data("kendoDatePicker").value();
        var fhasta = fechahasta.data("kendoDatePicker").value();
        if (fdesde && fhasta) {
          kendo.jQuery.when(
            kendo.jQuery.ajax({
            url: this.UrlApiBaseEquivalCodFactorCant,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + token)
            },
            contentType: 'application/json',
            success: function (data, textStatus) {
              //console.log(textStatus);
            },
            error: function(jqXHR, textStatus, errorThrown){
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
            },
            method: 'GET',
            type: 'GET'
          }),
          kendo.jQuery.ajax({
            url: this.UrlApiBaseStockArts,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + token)
            },
            contentType: 'application/json',
            success: function (data, textStatus) {
              //console.log(textStatus);              
            },
            error: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);
                },
            method: 'GET',
            type: 'GET'
          })
          )
          .done(
            function(data1, data2){
              const getdata1 = data1[0]
              const getdata2 = data2[0]
              const date = new Date();
              const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
              const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
              var getfechadesde = kendo.jQuery('#fechadesde').data("kendoDatePicker").value()
              var getfechahasta = kendo.jQuery('#fechahasta').data("kendoDatePicker").value()
              kendo.culture("es-AR");
              const newArt = getdata2.filter(item => kendo.toString(item.ARTS_FECHA_ALTA) >= kendo.toString(getfechadesde, 'u') && kendo.toString(item.ARTS_FECHA_ALTA) <= kendo.toString(getfechahasta, 'u')).map(data => data);
              console.log(newArt)
              var totalfalta = getdata2.length - getdata1.length
              for(let i = 0; i < newArt.length; i++){
                
                const nameElement = document.createElement("p");
                nameElement.textContent = newArt[i].ARTS_ARTICULO_EMP + " - " + newArt[i].ARTS_NOMBRE;

                // Append the elements to the "dataDisplay" div
                kendo.jQuery('#resumenarticulos').append(nameElement);
                
              }
              
              var resumen = newArt.length == 0 ? '' : newArt.length == 1 ?'<span id="verarticulos" class="k-icon k-i-eye"></span> '+ newArt.length +' articulo nuevo desde '+kendo.toString(getfechadesde, 'd') + ' hasta ' + kendo.toString(getfechahasta, 'd') : '<span id="verarticulos" class="k-icon k-i-eye"></span> '+newArt.length +' articulos nuevos desde '+kendo.toString(getfechadesde, 'd')+ ' hasta ' + kendo.toString(getfechahasta, 'd')
              
              kendo.jQuery("#resumen").append(resumen);
              kendo.jQuery("#verarticulos").click((e)=>{
                e.preventDefault();
                var popup = kendo.jQuery("#window3").data('kendoWindow');
                popup.open();
                popup.center();
              });
            }
          )
          grid.dataSource.read();  
        }
      });

      toolbarElement.on('click', '.edit', (e)=>{
        var popup = kendo.jQuery("#window").data('kendoWindow');
        popup.open();
        popup.center();
      });

      toolbarElement.on('click', '.k-grid-exportar', (e)=>{
        e.preventDefault();
        var fdesde = fechadesde.data("kendoDatePicker").value();
        var fhasta = fechahasta.data("kendoDatePicker").value();
        if(fdesde && fhasta){
          kendo.jQuery("#loading").show();
          var tkn = this.token
          var urlApi = this.UrlApiBaseExport
          kendo.jQuery.ajax({
            url: urlApi + '?fechadesde='+kendo.toString(new Date(fdesde), "yyyy-MM-dd")+'&fechahasta='+kendo.toString(new Date(fhasta), "yyyy-MM-dd"),
            beforeSend: function(xhr){
              xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
            },
            type: 'GET',
            dataType: 'html',
            success: function(data){
              kendo.jQuery("#loading").hide();
              kendo.alert('Exportado correctamente => \\\\192.168.0.46\\prades_fs\\Informes\\Acindar').element.getKendoAlert().title("Mensaje"); 
            },
            error: function(jqXHR, textStatus, errorThrown){
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
            }
          })
        }
        
      })
    }
  }
</script>
<style scoped>
.lds-ring {
  position: relative;
  width: 30px;
  height: 30px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 4px;
  border: 4px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #008645 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.displaynone{
  display: none !important
}
</style>
    