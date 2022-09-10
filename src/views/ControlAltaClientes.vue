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
    <datasource ref="remoteDataSource"
                      :transport-read-url="'http://192.168.0.250:8090/api/control/'"
                      :transport-read-data-type="'json'"
                      :transport-read-content-type="'application/json'"
                      :transport-read-type="'GET'"
                      :transport-read-cache="false"
                      :schema-model-fields="schemaModelFields"
                      :page-size='20'
                      >
    </datasource>
    <grid ref="grid"
          :height="'95vh'"
          :data-source-ref="'remoteDataSource'"
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
          <grid-column field="CLIE_FECHA_ALTA" title="Fecha Alta" type="date" format="{0:dd-MM-yyyy}" :width="150"></grid-column>
          <grid-column field="AUDI_USUARIO" title="Auditoría" :filterable-search="true" :filterable-multi="true" :width="130"></grid-column>
          <grid-column field="USUA_NOMBRE" title="Nombre Usuario" :width="200" :filterable-multi="true"></grid-column>
          <grid-column field="VEND_NOMBRE" title="Vendedor" :width="135" :filterable-multi="true"></grid-column>
          <grid-column field="CLIE_CLIENTE" title="Nro. Cliente" :width="135"></grid-column>
          <grid-column field="CLIE_NOMBRE" title="Nombre Cliente" :width="200"></grid-column>
          <grid-column field="CLIE_EMAIL" title="E-mail" :width="250"></grid-column>
          <grid-column field="CLC5_NOMBRE" title="Clasificación 5" :width="135"></grid-column>
          <grid-column field="DCLI_DOMICILIO" title="Domicilio" :width="135"></grid-column>
          <grid-column field="DCLI_LOCALIDAD" title="Localidad" :width="135"></grid-column>
          <grid-column field="DCLI_COD_LOCALIDAD" title="Código Localidad" :width="135"></grid-column>
          <grid-column field="DCLI_COD_POSTAL" title="Código Postal" :width="135"></grid-column>
          <grid-column field="DCLI_PROVINCIA" title="Provincia" :width="135"></grid-column>
          <grid-column field="CLIE_CONDICION_IVA" title="Condicion IVA" :width="135"></grid-column>
          <grid-column field="CLIE_CUIT" title="CUIT" :width="135"></grid-column>
          <grid-column field="CLIE_COBRADOR" title="Cobrador" :width="135"></grid-column>
          <grid-column field="CLPF_FECHA_NACIM" title="Fecha nacimiento" type="date" format="{0:dd-MM-yyyy}" :width="135"></grid-column>
          <grid-column field="CLPF_NACIONALIDAD" title="Nacionalidad" :width="135"></grid-column>
          <grid-column field="CLPF_SEXO" title="Sexo" :width="135"></grid-column>
    </grid>
  </div>
</div>
</template>

<script>
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
import { Button } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'

export default {
  name: 'ControlAltaClientes',
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
            dataSource: ['remoteDataSource'],
            title: 'Control Alta Clientes',
            schemaModelFields: {
                CLIE_FECHA_ALTA: {type: 'date'},
                AUDI_USUARIO: {type: 'string'},
                USUA_NOMBRE: {type: 'string'},
                CLIE_CLIENTE: {type: 'number'},
                CLIE_NOMBRE: {type: 'string'},
                CLIE_EMAIL: {type: 'string'},
                CLC5_NOMBRE: {type: 'string'},
                DCLI_DOMICILIO: {type: 'string'},
                DCLI_LOCALIDAD: {type: 'string'},
                DCLI_COD_LOCALIDAD: {type: 'number'},
                DCLI_COD_POSTAL: {type: 'number'},
                DCLI_PROVINCIA: {type: 'string'},
                CLIE_CONDICION_IVA: {type: 'string'},
                CLIE_CUIT: {type: 'string'},
                CLIE_COBRADOR: {type: 'string'},
                CLPF_FECHA_NACIM: {type: 'date'},
                CLPF_NACIONALIDAD: {type: 'string'},
                CLPF_SEXO: {type: 'string'}
            }
         }
  },
  computed: {
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
            },
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
                dataValueField: "CLIE_FECHA_ALTA",
                /* optionLabel: "All", */
                autoBind: false,
                dataSource: ['remoteDataSource']
                /* change: function(e) {
                    var fdesde = e.sender.value(),
                    fhasta = fechahasta.data("kendoDatePicker").value();
                    
                    if (fdesde & fhasta) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "CLIE_FECHA_ALTA", operator: "gte", value: new Date(fdesde) });
                        filter.filters.push({ field: "CLIE_FECHA_ALTA", operator: "lte", value: new Date(fhasta.getTime()+1000*60*60*24) });
                        grid.dataSource.filter(filter);
                    }
                } */
            });
            fechahasta.kendoDatePicker({
                culture: "es-AR", 
                format: "dd-MM-yyyy",
                dataValueField: "CLIE_FECHA_ALTA",
                autoBind: false,
                dataSource: ['remoteDataSource']
                /* change:function(e) {
                    var fdesde = fechadesde.data("kendoDatePicker").value(),
                    fhasta = e.sender.value();

                    if (fdesde & fhasta) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "CLIE_FECHA_ALTA", operator: "gte", value: new Date(fdesde) });
                        filter.filters.push({ field: "CLIE_FECHA_ALTA", operator: "lte", value: new Date(fhasta.getTime()+1000*60*60*24) });
                        grid.dataSource.filter(filter);
                        grid.dataSource.sort({field: "CLIE_FECHA_ALTA", dir: "asc"})
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
                        grid.dataSource.filter({ field: "CLIE_FECHA_ALTA", operator: "gte", value: new Date(fdesde) });
                        /* grid.dataSource.filter({ field: "CLIE_FECHA_ALTA", operator: "lte", value: fhasta.addDays(1) }) */
                        grid.dataSource.sort({field: "CLIE_FECHA_ALTA", dir: "desc"});
                    }
              if (fdesde & fhasta) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "CLIE_FECHA_ALTA", operator: "gte", value: new Date(fdesde) });
                        filter.filters.push({ field: "CLIE_FECHA_ALTA", operator: "lte", value: new Date(fhasta) });
                        grid.dataSource.filter(filter);
                        grid.dataSource.sort({field: "CLIE_FECHA_ALTA", dir: "desc"});
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
.k-grid {
    font-size: 12px;
}
.k-grid td{
    white-space: nowrap;
    text-overflow: ellipsis;
}

.page-grid{
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: currentColor;
}

.icon-title{
  width: auto;
  height: auto;
  margin-left: 5px;
}

.encabezado-titulo{
  background-color: #008645; 
  height: 5vh; 
  border-top-left-radius: 10px; 
  border-top-right-radius: 10px;
  margin-top: 10px; 
  display: flex; 
  justify-content:space-between; 
  align-items: center; 
  padding: 0.5rem 0.5rem;
}
</style>
