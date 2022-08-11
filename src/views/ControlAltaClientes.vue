<template>
  <div class="container-fluid page-grid">
    <div style="background-color: #008645; height: 45px; border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; align-items: center;">
      <div style="margin-left: 5px; color: white;" class="icon-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
      </div>
      <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
      <span style="color: white; margin-left: 5px;">{{ title }}</span>
    </div>
    <datasource ref="remoteDataSource"
                      :transport-read-url="'http://192.168.0.250:8090/api/control/'"
                      :transport-read-data-type="'json'"
                      :transport-read-content-type="' application/json'"
                      :transport-read-type="'GET'"
                      :transport-read-cache="false"
                      :schema-model-fields="schemaModelFields"
                      :page-size='15'
                      >
    </datasource>
    <grid ref="grid"
          :height="750"
          :data-source-ref="'remoteDataSource'"
          :sortable-mode="'multiple'"
          :sortable-allow-unsort="true"
          :sortable-show-indexes="true"
          :pageable='true'
          :filterable="false"
          :filterable-extra="false"
          :reorderable="true"
          :resizable="true"
          :groupable="true"
          :column-menu="true"
          :auto-bind="false"
          :row-height="38"
          :toolbar="toolbarTemplate"
          >
          <grid-column field="CLIE_FECHA_ALTA" title="Fecha Alta" type="date" format="{0:dd-MM-yyyy}" :width="100"></grid-column>
          <grid-column field="AUDI_USUARIO" title="Auditoría" :filterable-search="true" :filterable-multi="true"></grid-column>
          <grid-column field="USUA_NOMBRE" title="Nombre Usuario" :width="150"></grid-column>
          <grid-column field="VEND_NOMBRE" title="Vendedor"></grid-column>
          <grid-column field="CLIE_CLIENTE" title="Nro. Cliente"></grid-column>
          <grid-column field="CLIE_NOMBRE" title="Nombre Cliente" :width="200"></grid-column>
          <grid-column field="CLIE_EMAIL" title="E-mail"></grid-column>
          <grid-column field="CLC5_NOMBRE" title="Clasificación 5"></grid-column>
          <grid-column field="DCLI_DOMICILIO" title="Domicilio"></grid-column>
          <grid-column field="DCLI_LOCALIDAD" title="Localidad"></grid-column>
          <grid-column field="DCLI_COD_LOCALIDAD" title="Código Localidad"></grid-column>
          <grid-column field="DCLI_COD_POSTAL" title="Código Postal"></grid-column>
          <grid-column field="DCLI_PROVINCIA" title="Provincia"></grid-column>
          <grid-column field="CLIE_CONDICION_IVA" title="Condicion IVA"></grid-column>
          <grid-column field="CLIE_CUIT" title="CUIT"></grid-column>
          <grid-column field="CLIE_COBRADOR" title="Cobrador"></grid-column>
          <grid-column field="CLPF_FECHA_NACIM" title="Fecha nacimiento" type="date" format="{0:dd-MM-yyyy}"></grid-column>
          <grid-column field="CLPF_NACIONALIDAD" title="Nacionalidad"></grid-column>
          <grid-column field="CLPF_SEXO" title="Sexo"></grid-column>
    </grid>
  </div>
</template>

<script>
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'

export default {
  name: 'ControlAltaClientes',
  components: {
    "grid": Grid,
    "grid-column": GridColumn,
    "datasource": DataSource
},
  data: function () {
         return {
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
                CLPF_FECHA_NACIM: {type: 'string'},
                CLPF_NACIONALIDAD: {type: 'string'},
                CLPF_SEXO: {type: 'string'}
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
              /* grid.dataSource.read({}); */
              /* grid.dataSource.refresh(); */
              /* grid.dataSource.data("kendoGrid").empty(null); */
              /* grid.dataSource.data('kendoGrid').({}); */
            })
        }
      }
</script>

<style>
.k-grid td{
    white-space: nowrap;
    text-overflow: ellipsis;
}

.page-grid{
  padding: 20px 0px;
  background-color: currentColor;
}

.icon-title{
  width: auto;
  height: auto;
  margin-left: 5px;
}
</style>
