<template>
  <div class="container-fluid page-grid">
    <div style="background-color: #008645; height: 45px; border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; align-items: center;">
    <div style="margin-left: 5px; color: white;" class="icon-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
      </div>
      <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
      <span style="color: white; margin-left: 5px;">{{ title }}</span>
    </div>
    <datasource ref="remoteDataSource2"
                      :transport-read-url="'http://localhost:8090/api/listadeclientes/'"
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
          :data-source-ref="'remoteDataSource2'"
          :sortable-mode="'multiple'"
          :sortable-allow-unsort="true"
          :sortable-show-indexes="true"
          :pageable='true'
          :filterable="true"
          :filterable-extra="false"
          :reorderable="true"
          :resizable="true"
          :groupable="true"
          :column-menu="true"
          :auto-bind="false"
          :row-height="38"
          :toolbar="toolbarTemplate"
          >
          <grid-column field="Fecha_alta_cliente" title="Fecha alta cliente" type="date" format="{0:dd-MM-yyyy}" :width="200"></grid-column>
          <grid-column field="Nro_cliente" title="Nro cliente" :filterable-search="true" :width="200"></grid-column>
          <grid-column field="Nombre_cliente" title="Nombre cliente" :width="200"></grid-column>
          <grid-column field="Cod_domic" title="Cod domic"></grid-column>
          <grid-column field="Fax_celular" title="Fax (celular)"></grid-column>
          <grid-column field="Verificación" title="Verificación" :filterable-multi="true" :width="200"></grid-column>
          <grid-column field="Teléfono" title="Teléfono"></grid-column>
          <grid-column field="Observ_domicilio" title="Observ domicilio"></grid-column>
          <grid-column field="Cobrador" title="Cobrador"></grid-column>
          <grid-column field="Vendedor" title="Vendedor"></grid-column>
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
  name: 'ListadeClientes',
  components: {
    "grid": Grid,
    "grid-column": GridColumn,
    "datasource": DataSource
},
  data: function () {
         return {
            title: 'Lista de Clientes',
            schemaModelFields: {
                Fecha_alta_cliente: {type: 'date'},
                Nro_cliente: {type: 'number'},
                Nombre_cliente: {type: 'string'},
                Cod_domic: {type: 'number'},
                Fax_celular: {type: 'string'},
                Verificación: {type: 'string'},
                Teléfono: {type: 'string'},
                Observ_domicilio: {type: 'string'},
                Cobrador: {type: 'string'},
                Vendedor: {type: 'string'}
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
</style>
