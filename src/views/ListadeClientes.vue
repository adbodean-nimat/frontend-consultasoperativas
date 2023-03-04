<template>
<div class="directive-fullscreen-wrapper">
  <div class="container-fluid page-grid">
    <div class="encabezado-titulo">
      <div style="margin-left: 5px; color: white;" class="icon-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
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
    <datasource ref="remoteDataSource2"
                      :transport-read="readData"
                      :schema-model-fields="schemaModelFields"
                      :page-size='20'
                      >
    </datasource>
    <grid ref="grid"
          :height="'95vh'"
          :data-source-ref="'remoteDataSource2'"
          :sortable-mode="'multiple'"
          :sortable-allow-unsort="true"
          :sortable-show-indexes="true"
          :pageable-always-visible="true"
          :pageable-page-sizes="[5, 10, 15, 20, 25, 100]"
          :filterable="true"
          :filterable-extra="false"
          :reorderable="true"
          :resizable="true"
          :groupable="true"
          :column-menu="true"
          :auto-bind="false"
          :toolbar="toolbarTemplate"
          :allow-copy="true"
          :navigatable="true"
          :selectable="true"
          :scrollable-virtual="false"
          :scrollable-endless="false"
          >
          <grid-column field="Fecha_alta_cliente" title="Fecha alta cliente" type="date" format="{0:dd-MM-yyyy}" :width="150"></grid-column>
          <grid-column field="Nro_cliente" title="Nro cliente" :filterable-search="true" :width="125"></grid-column>
          <grid-column field="Nombre_cliente" title="Nombre cliente" :width="200"></grid-column>
          <grid-column field="Cod_domic" title="Cod domic" :width="100"></grid-column>
          <grid-column field="Fax_celular" title="Fax (celular)" :width="135"></grid-column>
          <grid-column field="Verificacion" title="Verificación" :filterable-multi="true" :width="150"></grid-column>
          <grid-column field="Telefono" title="Teléfono" :width="135"></grid-column>
          <grid-column field="Observ_domicilio" title="Observ domicilio" :width="135"></grid-column>
          <grid-column field="Cobrador" title="Cobrador"></grid-column>
          <grid-column field="Vendedor" title="Vendedor" :width="135"></grid-column>
          <grid-column field="Auditoria" title="Auditoría" :filterable-multi="true" :width="135"></grid-column>
          <grid-column field="Nombre_Usuario" title="Nombre Usuario" :filterable-multi="true" :width="200"></grid-column>
    </grid>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
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
  name: 'ListadeClientes',
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
            title: 'Lista de Clientes',
            schemaModelFields: {
                Fecha_alta_cliente: {type: 'date'},
                Nro_cliente: {type: 'number'},
                Nombre_cliente: {type: 'string'},
                Cod_domic: {type: 'number'},
                Fax_celular: {type: 'string'},
                Verificacion: {type: 'string'},
                Telefono: {type: 'string'},
                Observ_domicilio: {type: 'string'},
                Cobrador: {type: 'string'},
                Vendedor: {type: 'string'},
                Auditoria: {type: 'string'},
                Nombre_Usuario: {type: 'string'}
            }
         }
  },
  computed: {
    UrlApiBase(){
      return `${process.env.VUE_APP_API_BASE}/listadeclientes`
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
              // console.log(store.state.token)
              var token = store.state.token
              var urlApi = `${process.env.VUE_APP_API_BASE}/listadeclientes`
              $.ajax({
                url: urlApi,
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
                '<span id="form" style="position:absolute; left:5px">' +
                    `<label for="fechadesde">Fecha desde:</label>` +
                    '<input id="fechadesde" style="width: auto"/>' +
                    `<label for="fechahasta" style="margin-left: 0.5rem; text-align: center">hasta</label>` +
                    '<input id="fechahasta" style="width: auto"/>' +
                    '<span style="margin-left: 15px">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta" style="margin-right:5px"><span class="k-icon k-i-play"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-right:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                    '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();"><span class="k-icon k-i-file"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                    '</span>' +
                '</span>';
            return templateHtml;
            }
          },
            mounted: function(){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var fechadesde = gridElement.find('#fechadesde');
            var fechahasta = gridElement.find('#fechahasta');
            var toolbarElement = gridElement.find('.k-grid-toolbar');

            fechadesde.kendoDatePicker({
                culture: "es-AR",
                format: "dd-MM-yyyy",
                dataValueField: "Fecha_alta_cliente",
                /* optionLabel: "All", */
                autoBind: false,
                dataSource: ['remoteDataSource2']
                /* change: function(e) {
                    var fdesde = e.sender.value(),
                    fhasta = fechahasta.data("kendoDatePicker").value();
                    
                    if (fdesde & fhasta) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "Fecha_alta_cliente", operator: "gte", value: new Date(fdesde) });
                        filter.filters.push({ field: "Fecha_alta_cliente", operator: "lte", value: new Date(fhasta.getTime()+1000*60*60*24) });
                        grid.dataSource.filter(filter);
                    }
                } */
            });
            fechahasta.kendoDatePicker({
                culture: "es-AR", 
                format: "dd-MM-yyyy",
                dataValueField: "Fecha_alta_cliente",
                autoBind: false,
                dataSource: ['remoteDataSource2']
                /* change:function(e) {
                    var fdesde = fechadesde.data("kendoDatePicker").value(),
                    fhasta = e.sender.value();

                    if (fdesde & fhasta) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "Fecha_alta_cliente", operator: "gte", value: new Date(fdesde) });
                        filter.filters.push({ field: "Fecha_alta_cliente", operator: "lte", value: new Date(fhasta.getTime()+1000*60*60*24) });
                        grid.dataSource.filter(filter);
                        grid.dataSource.sort({field: "Fecha_alta_cliente", dir: "asc"})
                    }
                } */
            });
            toolbarElement.on("click", ".refresh", function (e) {
              e.preventDefault(); 
              grid.dataSource.read();
            });
            toolbarElement.on("click", ".play", function(){
              var fdesde = fechadesde.data("kendoDatePicker").value();
              var fhasta = fechahasta.data("kendoDatePicker").value();
              if (fdesde && fhasta == null) {
                        grid.dataSource.filter({ field: "Fecha_alta_cliente", operator: "gte", value: new Date(fdesde) });
                        /* grid.dataSource.filter({ field: "Fecha_alta_cliente", operator: "lte", value: fhasta.addDays(1) }) */
                        grid.dataSource.sort({field: "Fecha_alta_cliente", dir: "desc"});
                    }
              if (fdesde & fhasta) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "Fecha_alta_cliente", operator: "gte", value: new Date(fdesde) });
                        filter.filters.push({ field: "Fecha_alta_cliente", operator: "lte", value: new Date(fhasta) });
                        grid.dataSource.filter(filter);
                        grid.dataSource.sort({field: "Fecha_alta_cliente", dir: "desc"});
              }

            });
            toolbarElement.on("click", ".filter-clear", function(e){
              e.preventDefault();
              fechahasta.data("kendoDatePicker").value(null);
              fechadesde.data("kendoDatePicker").value(null);
              grid.dataSource.sort({});
              grid.dataSource.filter({});
              grid.dataSource.autoFitColumn();
              /* grid.dataSource.read({}); */
              /* grid.dataSource.refresh(); */
              /* grid.dataSource.data("kendoGrid").empty(null); */
              /* grid.dataSource.data('kendoGrid').({}); */
            })
        }
      }
</script>

<style>
</style>
