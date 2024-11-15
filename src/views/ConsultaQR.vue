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
        <datasource ref="remoteDataSourceQR"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :page-size='100'
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourceQR'"
              :sortable="true"
              :pageable-page-sizes="[100, 200, 400]"
              :filterable="true"
              :reorderable="true"
              :resizable="true"
              :groupable="false"
              :column-menu="true"
              :navigatable="true"
              :auto-bind="false"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              :scrollable="true"
              >
        <grid-column field="NPCA_DIVISION_NPCA" title="Número de división"></grid-column>
        <grid-column field="NPCA_TIPO_NPCA" title="Tipo de pedido"></grid-column>
        <grid-column field="NPCA_NUMERO_NPCA" title="Numero de pedido"></grid-column>
        <grid-column field="NPCA_FECHA_EMI" title="Fecha de emisión" :filterable-ui="'datepicker'" :format="'{0:dd/MM/yyyy}'"></grid-column>
        <grid-column field="NPCA_CLIENTE" title="Código de cliente"></grid-column>
        <grid-column field="CLIE_NOMBRE" title="Nombre de cliente"></grid-column>
        <grid-column field="NPCA_REFERENCIA" title="Referencia"></grid-column>
        <grid-column field="NPCF_SUCURSAL_CVCL" title="Sucursal impositiva"></grid-column>
        <grid-column field="NPCF_TIPO_CVCL" title="Tipo de comprobante"></grid-column>
        <grid-column field="NPCF_NUMERO_CVCL" title="Número de comprobante"></grid-column>
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
    kendo.culture("es-AR");
    export default {
      name: 'ConsultaporQR',
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
                title: 'Consulta por QR',
                schemaModelFields: {
                  NPCA_DIVISION_NPCA: {type: 'string'},
                  NPCA_TIPO_NPCA: {type: 'string'},
                  NPCA_NUMERO_NPCA: {type: 'number'},
                  NPCA_FECHA_EMI: {type: 'date'},
                  NPCA_CLIENTE: {type: 'number'},
                  CLIE_NOMBRE: {type: 'string'},
                  NPCA_REFERENCIA: {type: 'string'},
                  NPCF_SUCURSAL_CVCL: {type: 'string'},
                  NPCF_TIPO_CVCL: {type: 'string'},
                  NPCF_NUMERO_CVCL: {type: 'string'}
                }
             }
      },
      created: function(){
        window.JSZip = JSZip;
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/consultaporqr`
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
        readData: function(e) {
            var tkn = this.token
            var urlApi = this.UrlApiBase
            var getfechadesde = kendo.jQuery('#fechadesde').data("kendoDatePicker").value()
            var fechaEmision = getfechadesde = '' ? '' : kendo.toString(new Date(getfechadesde), "yyyy-MM-dd")
            var getScanner = kendo.jQuery('#scanner').data("kendoTextBox").value()
            
            var getData = fechaEmision == "" && getScanner ? '?fechaemision=""&qr='+ kendo.toString(getScanner) 
            : getScanner == null && fechaEmision ? '?fechaemision='+ fechaEmision +'&qr='
            : '?fechaemision='+ fechaEmision +'&qr='+ kendo.toString(getScanner)
            
            var data = {"fechaemision": fechaEmision, "qr": kendo.toString(getScanner)}
            console.log(JSON.stringify(data))
            console.log(getData)
            kendo.jQuery.ajax({
              url: urlApi + getData,
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
        toolbarTemplate: function() {
            var templateHtml =
              '<div class="d-flex flex-column position-relative container-fluid">' +
                '<div class="row" style="height: 40px">' +
                  '<div class="col" id="form">' +
                    '<label for="fechadesde">Fecha emisión:</label>' +
                    '<input id="fechadesde" style="width: auto"/>' +
                    '<label for="scanner" style="margin-left: 15px">Referencia: </label>' +
                    '<input id="scanner" style="width: auto"/>' +
                    '<span style="margin-left: 15px">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta" style="margin-right:5px"><span class="k-icon k-i-play"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-right:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                    '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();"><span class="k-icon k-i-file"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                    '</span>' + 
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
      var scanner = gridElement.find('#scanner');
      var toolbarElement = gridElement.find('.k-grid-toolbar');
            
      fechadesde.kendoDatePicker({
        culture: "es-AR",
        format: "dd/MM/yyyy"
      });

      scanner.kendoTextBox()

      toolbarElement.on("click", ".refresh", function (e) {
        e.preventDefault(); 
        grid.dataSource.read();
      });

      toolbarElement.on("click", ".filter-clear", function(e){
        e.preventDefault();
        fechadesde.data("kendoDatePicker").value(null);
        scanner.data("kendoTextBox").value(null);
      })

      toolbarElement.on("click", ".play", ()=>{      
        var fdesde = fechadesde.data("kendoDatePicker").value();
        var gscanner = scanner.data("kendoTextBox").value();
        if (fdesde || gscanner){
          grid.dataSource.read();  
        }
        
      });
    }
  }
</script>
<style scoped>
</style>
    