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
        <datasource ref="remoteDataSourcePyR"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :page-size='200'
                          :serverSorting="false"
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourcePyR'"
              :sortable="false"
              :filterable="true"
              :reorderable="true"
              :resizable="true"
              :groupable="false"
              :column-menu="true"
              :toolbar="toolbarTemplate"
              :excel-file-name="'LP VN - Pisos y Revistimiento.xlsx'"
              :excel-all-pages="true"
              :excel-filterable="false"
              :allow-copy="true"
              :selectable="true"
              :navigatable="true"
              :auto-bind="false"
              @excelexport="excelExport"
              >
              <grid-column field="ARTS_ARTICULO_EMP" title="Código" template="#: kendo.toString(ARTS_ARTICULO_EMP, '00000000') #" :width="100" :hidden="false"></grid-column>
              <grid-column field="ARTS_NOMBRE" title="Nombre" :width="400" :hidden="false"></grid-column>
              <grid-column field="RAC_M2" title="M2 por caja aprox." :autoWidth="true" :hidden="false"></grid-column>
              <grid-column field="StockCaja" title="Stock Caja" :template="StockCaja" :type="'numeric'" :autoWidth="true" :hidden="false"></grid-column>
              <grid-column field="M2_Disp_Habil_Vta" title="Stock en M2" :autoWidth="true" :hidden="false"></grid-column>
              <grid-column field="Pre_Cdo_con_IVA_L1" title="Precio de la Caja"  template="#: kendo.toString(Pre_Cdo_con_IVA_L1, 'c2')#" :hidden="false"></grid-column>
              <!-- <grid-column field="Pre_Cdo_con_IVA_M2" title="Pre Cdo con IVA M2" :format="'{0:c}'" :hidden="false"></grid-column> -->
              <grid-column field="PrecioContadoIVAcDtosM2" title="Precio del M2 aprox." :template="PrecioContadoIVAcDtosM2" :autoWidth="true" :hidden="false"></grid-column>
              <!-- <grid-column field="PrecioContadoIVAcDtos" title="Precio de la Caja" :template="PrecioContadoIVAcDtos" :autoWidth="true" :hidden="false"></grid-column> -->
              <grid-column field="CA03_NOMBRE" title="Tipo" :autoWidth="true" :hidden="false"></grid-column>
              <grid-column field="Uso" title="Uso" :autoWidth="true" :hidden="false"></grid-column>
              <grid-column field="Tipología" title="Tipología" :autoWidth="true" :hidden="false"></grid-column>
              
              <grid-column field="Stock_Uni" title="Stock Caja" :hidden="true"></grid-column>
              <grid-column field="Stock_M2" title="Stock en M2" :hidden="true"></grid-column>
              <grid-column field="M2_Pte_Entr_NP" title="M2 Pte Entr NP" :hidden="true"></grid-column>
              <grid-column field="Bloqueado_Vtas" title="Bloqueado Vtas" :hidden="true"></grid-column>
              <grid-column field="M2_Bloqueado_Vta" title="M2 Bloqueado Vta" :hidden="true"></grid-column>
              <grid-column field="DVC1_CLC1_CLASIF_1" title="Cod. Cte." :hidden="true"></grid-column>
              <grid-column field="LIPV_NOMBRE" title="Nombre Cte." :hidden="true"></grid-column>
        </grid>
      </div>
    </div>
</template>
    
    <script>
    import $ from 'jquery'
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
      name: 'ListaPYR',
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
                title: 'Lista de precios - Pisos y Revistimiento con Stock',
                schemaModelFields: {
                    CA03_NOMBRE: {type: 'string'},
                    Tipología: {type: 'string'},
                    ARTS_ARTICULO_EMP: {type: 'numeric'},
                    ARTS_NOMBRE: {type: 'string'},
                    Pre_Cdo_con_IVA_L1: {type: 'numeric'},
                    Pre_Cdo_con_IVA_M2: {type: 'numeric'},
                    RAC_M2: {type: 'numeric'},
                    Stock_Uni: {type: 'numeric'},
                    Stock_M2: {type: 'numeric'},
                    M2_Pte_Entr_NP: {type: 'numeric'},
                    M2_Disp_Habil_Vta: {type: 'numeric'},
                    Bloqueado_Vtas: {type: 'string'},
                    M2_Bloqueado_Vta: {type: 'numeric'},
                    Uso: {type: 'string'},
                    DVC1_CLC1_CLASIF_1: {type: 'string'},
                    LIPV_NOMBRE: {type: 'string'}
                }
             }
      },
      created: function(){
        window.JSZip = JSZip;
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/listapyr`
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
              var urlApi = this.UrlApiBase
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
          excelExport: function(e){
            var data = e.data;
            var gridColumns = e.sender.columns;
            var sheet = e.workbook.sheets[0];
            var visibleGridColumns = [];
            var columnTemplates = [];
            var dataItem;
            // Crear elemento para generar plantillas
            var elem = document.createElement('div');
            //console.log(data)
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
              //console.log(row)
              // Recorra las plantillas de columna y aplíquelas para cada fila en la posición de columna almacenada
              
              // Obtenga el elemento de datos correspondiente a la fila actual.
              var dataItem = data[i - 1];
              console.log(dataItem)
              
              for (var j = 0; j < columnTemplates.length; j++) {
                var columnTemplate = columnTemplates[j];
                
                //console.log(columnTemplate)

                // Genere el contenido de la plantilla para la celda actual.
                elem.innerHTML = columnTemplate.template(dataItem);
                
                //console.log(row.cells[columnTemplate.cellIndex])
                if (row.cells[columnTemplate.cellIndex] != undefined)                
                // Envíe el contenido de texto de la celda con plantilla a la celda exportada.
                row.cells[columnTemplate.cellIndex].value = elem.textContent || elem.innerText || "";
              }
            }
          },
          StockCaja: function(item){
            var StockM2 = item.M2_Disp_Habil_Vta
            var RACM2 = item.RAC_M2
            var cal = StockM2 / RACM2
            return kendo.toString(cal, '#')
          },
          /* PrecioContadoIVAcDtos: function(item){
            var idPrecioContadoIVA = item.Pre_Cdo_con_IVA_L1
            var iDCA1_POR_DESCUENTO = item.DCA1_POR_DESCUENTO
            var cal = idPrecioContadoIVA * (1-iDCA1_POR_DESCUENTO/100)
            return kendo.toString(cal, 'c2')
          }, */
          PrecioContadoIVAcDtosM2: function(item){
            var idPrecioContadoIVAM2 = item.Pre_Cdo_con_IVA_L1
            var RACM2 = item.RAC_M2
            var cal = idPrecioContadoIVAM2 / RACM2
            return kendo.toString(cal, 'c2')
          },
          toolbarTemplate: function() {
            var templateHtml =
            '<div class="container-fluid">' +
              '<form id="form" class="requires-validation row align-items-end row-cols" novalidate>' +
                  '<div class="col d-flex flex-column">' +
                      '<label class="col-form-label" style="margin-right:5px">Perfil Comercial</label>' +
                      '<input type="search" id="codcte" style="width: 150px" />' +
                      '<div class="invalid-feedback">Falta completa este campo.</div>'+
                  '</div>' +  
                  '<div class="col d-flex">'+
                    '<a class="k-pager-refresh k-link k-button play" type="submit" title="Ralizar conulta" style="margin-left:5px"><span class="k-icon k-i-play"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();" style="margin-left:5px"><span class="k-icon k-i-file"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-excel" style="margin-left:5px"><span class="k-icon k-i-excel"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                  '</div>' +
                '</span>';
                '</form>' +
                '</div>';
            return templateHtml;
            },
          },
          mounted: function(){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var toolbarElement = gridElement.find('.k-grid-toolbar');
            var dropDownElement = gridElement.find('#codcte');
            var clasificadorclientes = [
            {
                "CLC1_CLASIF_1": "ECA",
                "CLC1_NOMBRE": "EMPRESA CONSTRUCTORA A",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "ECB",
                "CLC1_NOMBRE": "EMPRESA CONSTRUCTORA B",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "ECC",
                "CLC1_NOMBRE": "EMPRESA CONSTRUCTORA C",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "REA",
                "CLC1_NOMBRE": "REVENTA A",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "REB",
                "CLC1_NOMBRE": "REVENTA B",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "REC",
                "CLC1_NOMBRE": "REVENTA C",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "CFA",
                "CLC1_NOMBRE": "USUARIO FINAL A",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "CFB",
                "CLC1_NOMBRE": "USUARIO FINAL B",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            {
                "CLC1_CLASIF_1": "CFC",
                "CLC1_NOMBRE": "USUARIO FINAL C",
                "CLC1_HAB_PROM_VOL": 1,
                "CLC1_UTILIZABLE": 1
            },
            ]
            dropDownElement.kendoDropDownList({
              dataTextField: "CLC1_CLASIF_1",
              dataValueField: "CLC1_CLASIF_1",
              index: 8,
              autoBind: true,
              dataSource: clasificadorclientes
              /* {
                transport:{
                  read: {
                    contentType: 'application/json',
                    dataType: 'json',
                    type: 'GET',
                    url: `${process.env.VUE_APP_API_BASE}/clasificadorclientes`,
                    headers: {
                      'Authorization': 'Bearer ' + store.state.token
                    }
                  }  
                }
              } */
            });
            toolbarElement.on("click", ".play", ()=>{
              var PerfilComercial = dropDownElement.data("kendoDropDownList").value();
              grid.dataSource.filter({ field: "DVC1_CLC1_CLASIF_1", operator: "contains", value: PerfilComercial })
              grid.dataSource.sort({  field: 'Pre_Cdo_con_IVA_M2', dir: 'asc'})
            });

            toolbarElement.on("click", ".refresh", function (e) {
              e.preventDefault(); 
              grid.dataSource.read();
            });

          }
    }
    </script>
    
    <style>
    </style>
    