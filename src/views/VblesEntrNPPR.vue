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
        <datasource ref="remoteDataSourceVblesEntrNPPyR"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :transport-parameter-map="parameterMap"
                          :page-size='1000'
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourceVblesEntrNPPyR'"
              :sortable-mode="'multiple'"
              :sortable-allow-unsort="true"
              :sortable-show-indexes="true"
              :pageable-always-visible="true"
              :filterable="true"
              :filterable-extra="false"
              :reorderable="true"
              :resizable="true"
              :groupable="false"
              :column-menu="true"
              :auto-bind="false"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :navigatable="true"
              :selectable="false"
              :scrollable-virtual="false"
              :scrollable-endless="false"
              >
              <grid-column field="Cod_Vend" :title="'Cod. Vend.'" :filterable-multi="true" :locked="true" :width="60"></grid-column>
              <grid-column field="Nomb_Vend" :title="'Nomb. Vend.'" :filterable-multi="true"  :locked="true" :width="200"></grid-column>
              <grid-column field="Fecha_Emi" :title="'Fecha Emisión'" template="#: kendo.toString(kendo.parseDate(Fecha_Emi, 'yyyy-MM-dd'), 'dd/MM/yyyy') #" :locked="true" :width="120"></grid-column>
              <grid-column field="Fecha_Entr_Item" :title="'Fecha Entr. Item'" template="#: kendo.toString(kendo.parseDate(Fecha_Entr_Item, 'yyyy-MM-dd'), 'dd/MM/yyyy') #" :locked="true" :width="120" :hidden="false"></grid-column>
              <grid-column field="Cod_Client" :title="'Cod. Clientes'" :locked="true" :width="80"></grid-column>
              <grid-column field="Nomb_Client" :title="'Nomb. Clientes'" :locked="true" :width="200"></grid-column>
              <grid-column field="Tipo_NP" :title="'Tipo NP'" :locked="true" :width="80"></grid-column>
              <grid-column field="Nro_NP" :title="'Nro. NP'" :locked="true" :width="80"></grid-column>
              <grid-column field="Renglon_NP" title="Renglon NP" :width="80"></grid-column>
              <grid-column field="Cod_Art" title="Cod. Art." :width="80"></grid-column>
              <grid-column field="Nombre_Art" title="Nombre Art." :width="400"></grid-column>
              <grid-column field="Uni" :width="80"></grid-column>
              <grid-column field="Cant_Ped" title="Cant. Ped." :width="80"></grid-column>
              <grid-column field="Cant_Fact" title="Cant. Fact." :width="80"></grid-column>
              <grid-column field="Cant_Entr" title="Cant. Entr." :width="80"></grid-column>
              <grid-column field="A_Entregar" title="A entregar" :width="80"></grid-column>
              <grid-column field="Cant_Reserv" title="Cant. Reserv." :width="80"></grid-column>
              <grid-column field="Sin_Reser" title="Sin Reserv." :width="80"></grid-column>
              <grid-column field="Tipo_Reserv" title="Tipo Reserv." :width="80"></grid-column>
              <grid-column field="Listo_p_Entr" title="Listo p Entr." :width="80"></grid-column>
              <grid-column title="Antiguedad" :template="templateAntiguedad" :width="80"></grid-column>
              <grid-column field="Vehiculo" :width="200"></grid-column>
              <grid-column field="Tte_Cab_NP" title="Tte. Cab. NP" :width="80"></grid-column>
              <grid-column field="Tte_Item" title="Tte Item" :width="80"></grid-column>
              <grid-column field="Verif_Tte" title="Verif. Tte." :width="150"></grid-column>
              <grid-column field="Domicilio" :width="200"></grid-column>
              <grid-column field="Localidad" :width="200"></grid-column>
              <grid-column field="Fecha_Entr_Cabec" :title="'Fecha Entr. Cabec.'" template="#: kendo.toString(kendo.parseDate(Fecha_Entr_Cabec, 'yyyy-MM-dd'), 'dd/MM/yyyy') #" :width="120" :hidden="true"></grid-column>
              <grid-column field="Verif_fecha_entr" title="Verif. Fecha Entr." :width="200"></grid-column>
              <grid-column field="Observacion_NP" title="Observación NP" :width="400"></grid-column>
              <grid-column field="Nomb_Est_Aprob" title="Nomb. Est. Aprob." :width="80"></grid-column>
              <grid-column field="Observ_Aproba" title="Observ. Aproba" :width="80"></grid-column>
              <grid-column field="CtrlAut1" title="Ctrl. Aut. 1" :width="80"></grid-column>
              <grid-column field="CtrlAut4" title="Ctrl. Aut. 4" :width="80"></grid-column>
              <grid-column field="CtrlAut6" title="Ctrl. Aut. 6" :width="80"></grid-column>
              <grid-column field="CtrlAut7" title="Ctrl. Aut. 7" :width="80"></grid-column>
              <grid-column field="Solo_para_Reventa" title="Solo p Reventa" :width="200"></grid-column>
              <grid-column field="Nombre_Zona_Vta" title="Nombre Zona Vta." :width="120"></grid-column>
              <grid-column field="Cant_Vinc_OC" title="Cant. Vinc. OC" :width="80"></grid-column>
              <grid-column field="Cant_OC" title="Cant. OC" :width="80"></grid-column>
              <grid-column field="Cant_Recib_Prov" title="Cant. Recib. Prov." :width="80"></grid-column>
              <grid-column field="Fech_Prob_entr_Prov" title="Fecha Prob. Entr. Prov." template="#: kendo.toString(kendo.parseDate(Fech_Prob_entr_Prov, 'yyyy-MM-dd'), 'dd/MM/yyyy') ? kendo.toString(kendo.parseDate(Fech_Prob_entr_Prov, 'yyyy-MM-dd'), 'dd/MM/yyyy') : '' #" :width="120"></grid-column>
              <grid-column field="Nro_OC" title="Nro. OC" :width="120"></grid-column>
              <grid-column field="Proveedor" :width="80"></grid-column>
              <grid-column field="Nomb_Comp" title="Nomb. Comp." :width="80"></grid-column>
              <grid-column field="Kg_Art" title="Kg Art." :width="80"></grid-column>
              <grid-column field="Kg_Item_Reserv" title="Kg Item Reserv." :width="80"></grid-column>
              <grid-column field="ARTS_CLASIF_2" :hidden="true"></grid-column>
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
      name: 'VblesEstrNPPyR',
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
                dataSource: ['remoteDataSourceVblesEntrNPPyR'],
                title: 'Variables Entregas NP - Pisos y revistimiento',
                schemaModelFields: {
                    Cod_Vend: {type: 'string'},
                    Nomb_Vend: {type: 'string'},
                    Fecha_Emi: {type: 'datetime'},
                    Cod_Client: {type: 'number'},
                    Nomb_Client: {type: 'string'},
                    Tipo_NP: {type: 'string'},
                    Nro_NP: {type: 'string'},
                    Fecha_Entr_Cabec: {type: 'datetime'},
                    Fecha_Entr_Item: {type: 'datetime'},
                    Fech_Prob_entr_Prov: {type: 'datetime'}
                }
             }
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/vblesentrnp/`
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
                  var token = store.state.token
                  var urlApi = this.UrlApiBase
                  var grid = this.$refs.grid.kendoWidget();
                  var gridElement = grid.element;
                  var cantdiasatras = gridElement.find('#diasatras');
                  var DiasAtras = cantdiasatras.data("kendoNumericTextBox").value()
                  $.ajax({
                    url: urlApi + DiasAtras,
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
              templateAntiguedad: function(item){
                var diaHoy = new Date()
                var FechaEmision = new Date(item.Fecha_Emi) 
                var diasDif = diaHoy.getTime() - FechaEmision.getTime()
                var antiguedad = Math.round(diasDif/(1000*60*60*24))
                //console.log(diaHoy.getTime)
                //console.log(FechaEmision.getTime)
                return kendo.toString(antiguedad)
              },
              toolbarTemplate: function() {
                var templateHtml =
                '<div class="container-fluid">' +
                    '<form id="form" class="requires-validation row align-items-start row-cols" novalidate>' +
                        '<div class="col d-flex">' +
                            `<label class="col-form-label" for="diasatras" style="width: 160px;">Cant. días hacia atras:</label>` +
                            '<div id="input" class="col d-flex flex-column">'+
                                '<input class="is-valid" id="diasatras" type="number" style="width: 200px" required/>' +
                                '<div class="invalid-feedback">Falta completa este campo.</div>'+
                            '</div>'+
                        '</div>' +
                        '<div class="col d-flex">'+
                            '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta" style="margin-right:5px"><span class="k-icon k-i-play"></span></a>' +
                            '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-right:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                            '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();"><span class="k-icon k-i-file"></span></a>' +
                            '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                        '</div>' +
                    '</form>';
                '</div>';
                return templateHtml;
                },
                parameterMap: function(options, operation) {
                if (operation !== 'read' && options.models) {
                    return JSON.stringify(options.models)
                }
            },
              },
                mounted: function(){
                var grid = this.$refs.grid.kendoWidget();
                var gridElement = grid.element;
                var cantdiasatras = gridElement.find('#diasatras');
                var toolbarElement = gridElement.find('.k-grid-toolbar');
    
                cantdiasatras.kendoNumericTextBox({
                    culture: "es-AR",
                    format: "n0"
                })

                toolbarElement.on("click", ".refresh", function (e) {
                    e.preventDefault(); 
                    var DiasAtras = cantdiasatras.data("kendoNumericTextBox").value()
                    var classDiasAtras = document.querySelector("#form > div > #input > .k-numerictextbox")
                    if(DiasAtras == null){
                        classDiasAtras.classList.add('is-invalid');
                    } else {
                        classDiasAtras.classList.remove('is-invalid');
                        grid.dataSource.read();
                        grid.dataSource.sort({
                            field: "Fecha_Emi",
                            dir: "asc"
                        });
                    }
                });
                toolbarElement.on("click", ".play", function(){
                    var DiasAtras = cantdiasatras.data("kendoNumericTextBox").value()
                    var classDiasAtras = document.querySelector("#form > div > #input > .k-numerictextbox")
                    if(DiasAtras == null){
                        classDiasAtras.classList.add('is-invalid');
                    } else {
                        classDiasAtras.classList.remove('is-invalid');
                        grid.dataSource.read();
                        var filter = { logic: "or", filters: [] };
                        filter.filters.push({ field: "ARTS_CLASIF_2", operator: "eq", value: "0004" });
                        filter.filters.push({ field: "ARTS_CLASIF_2", operator: "eq", value: "0005" });
                        grid.dataSource.filter(filter);
                        grid.dataSource.sort({
                            field: "Fecha_Emi",
                            dir: "asc"
                        });
                    }
                });
                toolbarElement.on("click", ".filter-clear", function(e){
                    cantdiasatras.data("kendoNumericTextBox").value(null)
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
      border-top-left-radius: 10px; 
      border-top-right-radius: 10px;
      margin-top: 10px; 
      display: flex; 
      justify-content:space-between; 
      align-items: center; 
      padding: 0.5rem 0.5rem;
    }
    </style>
    