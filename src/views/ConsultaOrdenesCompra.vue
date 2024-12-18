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
        <datasource ref="remoteDataSourceConsultaOrdenesCompra"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :page-size='100'
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourceConsultaOrdenesCompra'"
              :sortable-mode="'multiple'"
              :sortable-allow-unsort="true"
              :sortable-show-indexes="true"
              :pageable-always-visible="true"
              :pageable-page-sizes="[5, 10, 15, 20, 25, 100]"
              :filterable="true"
              :reorderable="true"
              :resizable="true"
              :column-menu="true"
              :navigatable="true"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              :auto-bind="false"
              >
              <grid-column :field="'Fecha_Compra'" :title="'Fecha de Compra'" template="#: kendo.toString(kendo.parseDate(Fecha_Compra, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
              <grid-column :field="'ARTS_ARTICULO_EMP'" :title="'Código'"></grid-column>
              <grid-column :field="'ARTS_NOMBRE'" :title="'Nombre'" ></grid-column>
              <grid-column :field="'Fecha_Ult_Venta'" :title="'Fecha Ult. Venta'" template="#: kendo.toString(kendo.parseDate(Fecha_Ult_Venta, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
              <grid-column :field="'Cant_Dias_Ultima_Venta'" :title="'Cant. Días Ult. Venta'"></grid-column>
        </grid>
      </div>
    </div>
</template>
    
<script>
    import store from "../store";
    import '@progress/kendo-ui'
    import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
    import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
    import '@progress/kendo-theme-bootstrap/dist/all.css'
    import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
    import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
    import { Button } from '@progress/kendo-buttons-vue-wrapper'
    import { directive as fullscreen } from 'vue-fullscreen'
    
    export default {
      name: 'ConsultaOrdenesCompra',
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
                title: 'Consulta Ordenes Compra',
                schemaModelFields: {
                    Fecha_Compra: {type: 'datetime'},
                    ARTS_ARTICULO_EMP: {type: 'string'},
                    ARTS_NOMBRE: {type: 'string'},
                    Fecha_Ult_Venta: {type: 'datetime'},
                    Cant_Dias_Ultima_Venta: {type: 'number'}      
                }
             }
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/consultaordenescompraultfecharemi/`
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
        readData: function (e) {
            var token = this.token
            var urlApi = this.UrlApiBase
            var fdesde = kendo.jQuery("#fechadesde").data("kendoDatePicker").value();
            var cdias = kendo.jQuery("#cantdias").data("kendoNumericTextBox").value();
            
            kendo.jQuery.ajax({
              url: urlApi + '?fechadesde=' + kendo.toString(fdesde, "yyyy-MM-dd") + '&difdias=' + cdias,
              beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
              },
              dataType: 'json',
              success: function (data) {
                e.success(data)
              },
              type: 'GET'
            })
        },
        toolbarTemplate: function() {
            var templateHtml =
              '<div class="d-flex flex-column" id="form">' +
                '<div>' +
                  `<label style="margin-right: 5px;" for="fechadesde">Desde Fecha de Compra: </label>` +
                  '<input id="fechadesde"/>' +
                  `<label style="margin: 0px 5px;" for="cantdias">Ult. Vta. a partir de: </label>` +
                  '<input id="cantdias"/>' +
                  `<label style="margin: 0px 5px;" for="cantdias"> días</label>` +
                  '<span style="margin-left:5px">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta"><span class="k-icon k-i-play"></span></a>' +
                  '</span>'+
                  '<span style="margin-left:5px">'+
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"><span class="k-icon k-i-reload"></span></a>' +
                  '</span>' + 
                '</div>' +
              '</div>';
            return templateHtml;
        },
    },
      mounted: function(){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var toolbarElement = gridElement.find('.k-grid-toolbar');
          var fechadesde = gridElement.find('#fechadesde');
          var cantDias = gridElement.find('#cantdias');

          fechadesde.kendoDatePicker({
            culture: "es-AR",
            format: "dd/MM/yyyy"
          });

          cantDias.kendoNumericTextBox({
            format: "####"
          })

          toolbarElement.on("click", ".refresh", function (e) {
            e.preventDefault(); 
            var fdesde = fechadesde.data("kendoDatePicker").value();
            var cdias = cantDias.data("kendoNumericTextBox").value();
            if(fdesde && cdias){
              grid.dataSource.read();
            }
          });

          toolbarElement.on("click", ".play", function(){
            var fdesde = fechadesde.data("kendoDatePicker").value();
            var cdias = cantDias.data("kendoNumericTextBox").value();
            if(fdesde && cdias){
              grid.dataSource.read();
            }
          });
      }
  }
    </script>
    
    <style>
    </style>
    