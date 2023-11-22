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
        <component id="pdfTemplate" :is="'script'" type="text/x-kendo-template">
          # var theDate = new Date(); #
          <div class="pdfFont container position-absolute top-0" style="margin-top: 18px;">
            <div class="container d-flex align-items-start" >
              <img style="width: 100%;" src="../assets/membretada.png" alt="Membretada - Nimat de Prades S.A.">
            </div>
            <div class="row">
              <div class="col-sm">Fecha de impresión #=kendo.toString(theDate, "dd-MM-yyyy", "es-AR")#</div>
              <div class="col-sm"><small><span id="cod_cte"></span> <span id="dvc1listaprecvta"></span></small></div>
              <div class="col-sm text-end" style="margin-right: 50px;"><strong>VN SETS</strong></div>
            </div>
            <div class="row">
              <div class="col-sm d-flex justify-content-end" style="margin-right:50px;"><u><strong><h2><span id="set_nombre"></span></h2></strong></u></div>
            </div>
            <div class="row">
              <div class="col">
              <p>
                <span id="modificados"></span><br>
                El descuento financiero del <span id="descuentofinanciero"></span>%, corresponde a pago con <span id="comentariocontadoefectivo"></span><span id="comentariofinanciero"></span>.<br>
                Precios, IVA incluido, sujetos a variación sin previo aviso.<br>
                Este listado No coincide con el listado de ACOPIO.
              </p>
             </div>
            </div>
            <div class="row">
            </div>
          </div>
        </component>
        <datasource ref="remoteDataSourceSetsVtas"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :group="groupDefinicion"
                          @error="onError"
                          @requestend="requestEnd"
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data="'remoteDataSourceSetsVtas'"
              :data-source-ref="'remoteDataSourceSetsVtas'"
              :sortable-mode="'multiple'"
              :groupable-enabled="false"
              :filterable="true"
              :filterable-extra="false"
              :reorderable="true"
              :resizable="true"
              :column-menu="true"
              :navigatable="false"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              :auto-bind="false"
              :excel-file-name="'LP VN - Sets Vtas.xlsx'"
              :excel-all-pages="true"
              :excel-filterable="false"
              :pdf-file-name="'LP VN - Sets Vtas.pdf'"
              :pdf-all-pages="true"
              :pdf-avoid-links="false"
              :pdf-paper-size="'A4'"
              :pdf-margin-top="200"
              :pdf-margin-bottom="10"
              :pdf-margin-left="10"
              :pdf-margin-right="10"
              :pdf-landscape="false"
              :pdf-repeat-headers="true"
              :pdf-scale="0.6"
              :pdf-template="pdfTemplate"
              @excelexport="exportGridWithTemplatesContent"
              @pdfexport="pdfExport"
              @databound="dataBound"
              >
              
              <grid-column title="Código" :template="ArtsArticuloEmp" :column-menu="false" :hidden="true"></grid-column>
              <grid-column field="ARTS_ARTICULO_EMP" title="Código" :column-menu="false"  :width="60"></grid-column>
              <grid-column field="ARTS_NOMBRE" title="Articulo" :column-menu="false" :width="400"></grid-column>
              <grid-column field="ARTS_UNIMED_STOCK" title="&nbsp;" :column-menu="false" :width="40"></grid-column>
              <grid-column field="PRECIO_LISTA_CON_IVA" title="Precio lista c/IVA"  template="#: kendo.toString(PRECIO_LISTA_CON_IVA, 'c2')#" :hidden="false" :width="100"></grid-column>
              <grid-column field="dtoFinan" title="Dto. Financ." :template="this.dtoFinan" :width="80" :hidden="false"></grid-column>
              <grid-column field="precioContado" title="Precio contado c/IVA c/Dtos" :template="this.precioContado" :hidden="false" :width="100"></grid-column>
              <grid-column field="Modif" title="Modif" :template="this.Modif" :hidden="false" :width="50"></grid-column>

              <grid-column title="Verfi Modif" :template="VeriModif" :hidden="true" ></grid-column>
              <grid-column title="Sin Modif" :template="SinModif" :hidden="true" ></grid-column>
              <grid-column title="Verfi sin Modif" :template="VeriSinModif" :hidden="true" ></grid-column>

              <grid-column field="ARVE_RUBRO_VENTA" :hidden="true"></grid-column>
              <grid-column field="RUBV_NOMBRE" :hidden="true"></grid-column>
              <grid-column field="cod_set_art" :hidden="true"></grid-column>
              <grid-column field="nombre_set_art" :hidden="true"></grid-column>
              <grid-column field="cod_fami_art" :hidden="true"></grid-column>
              <grid-column field="nombre_fami_art" title="Familia Art." :group-header-template="groupHeaderTemplateFamiliaArt" :hidden="true"></grid-column>
              <grid-column field="nro_orden_de_la_fami" title="Nro. Orden" :hidden="true" :group-header-template="groupHeaderTemplateNroOrden"></grid-column>
              <grid-column field="orden_art_familia" title="Orden Art." :hidden="true"></grid-column>
              <grid-column field="ARTS_ARTICULO" :hidden="true"></grid-column>
              <grid-column field="ARVE_BLOQUEO_VENTA" :hidden="true"></grid-column>
              <grid-column field="ARTS_FACTOR_HOMSTO" :hidden="true"></grid-column>
              <grid-column field="COD_CTE" :hidden="true"></grid-column>
              <grid-column field="ARTS_CLASIF_1" :hidden="true"></grid-column>
              <grid-column field="ARTS_CLASIF_8" :hidden="true"></grid-column>
              <grid-column field="CIMP_TASA" :hidden="true"></grid-column>
              <grid-column field="ARTS_PESO_EMB_UMS" :hidden="true"></grid-column>
              <grid-column field="DVC1_LISTA_PRECVTA" :hidden="true"></grid-column>
              <grid-column :template="dvc1listaprecvta" :hidden="true"></grid-column>
              <grid-column field="DCA1_POR_DESCUENTO" :hidden="true"></grid-column>
              <grid-column field="ARPV_PRECIO_VTA" :hidden="true"></grid-column>
              <grid-column field="ARPV_MONEDA" :hidden="true"></grid-column>
              <grid-column field="ARPV_FECHA_ULT_ACT" :hidden="true"></grid-column>
              <grid-column field="COTI_COTIZACION" :hidden="true"></grid-column>
              <grid-column field="COTI_FECHA" :hidden="true"></grid-column>
              <grid-column field="Fecha_cambio_precios_hasta" template="#: kendo.toString(kendo.parseDate(Fecha_cambio_precios_hasta, 'yyyy-MM-dd'), 'dd/MM/yyyy') #" :hidden="true" :width="50"></grid-column>
              <grid-column field="Fecha_Ult_Modif" title="Fecha Ult Modif" template="#: kendo.toString(kendo.parseDate(Fecha_Ult_Modif, 'yyyy-MM-dd'), 'dd/MM/yyyy') #" :hidden="true" :width="50"></grid-column>
              <grid-column :template="CambiosPrecioDesde" :hidden="true"></grid-column>
              <grid-column field="Delay_cambio_precio" :hidden="true"></grid-column>
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
    import { DataSource} from '@progress/kendo-datasource-vue-wrapper'
    import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
    import { Button } from '@progress/kendo-buttons-vue-wrapper'
    import { directive as fullscreen } from 'vue-fullscreen'
    
    export default {
      name: 'ListaSetsVtas',
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
                title: 'Lista de precios - Sets Ventas',
                dataSource: ['remoteDataSourceSetsVtas'],
                schemaModelFields: {
                    orden_art_familia: {type: 'number'},
                    cod_set_art: {type: 'string'},
                    Fecha_cambio_precios_hasta: {type: 'datetime'},
                    Fecha_Ult_Modif: {type: 'datetime'},
                    nro_orden_de_la_fami: {type: 'number'},
                    ARPV_PRECIO_VTA: {type: 'string'}
                },
                groupDefinicion:[
                  {
                    field: 'nro_orden_de_la_fami',
                    dir: 'asc'
                  },
                  {
                    field: 'nombre_fami_art'
                  }
                ]
             }
      },
      created: function(){
        window.JSZip = JSZip;
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/lpvnrubrosvtas`
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
      methods: {
        groupHeaderTemplateNroOrden: function(e){
          var groupTemplate = kendo.template('');
          return groupTemplate(e)
        },
        groupHeaderTemplateFamiliaArt: function(e){
          var groupTemplate = kendo.template('#=value#');
          return groupTemplate(e)
        },  
        readData: function (e) {
              // console.log(store.state.token)
              var token = store.state.token
              var urlApi = `${process.env.VUE_APP_API_BASE}/lpvnrubrosvtas`
              kendo.jQuery.ajax({
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
          exportGridWithTemplatesContent: function(e){
            var data = e.data;
            var gridColumns = e.sender.columns;
            var rows = e.workbook.sheets[0].rows;
            var visibleGridColumns = [];
            var columnTemplates = [];
            var dataItems = [];
            var newRows = [];
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

            for(var i=0; i< data.length; i++){
                //dataItems.push(data[i]);
                if(data[i].items.length){
                  for(var j=0; j< data[i].items.length; j++){
                    //dataItems.push(data[i].items[j]);
                    if(data[i].items[j].items.length){
                      for(var d=0; d< data[i].items[j].items.length; d++){
                        dataItems.push(data[i].items[j].items[d])
                      }
                    }
                  }
                } 
            }

            for (var ri = 0; ri < rows.length; ri++) {
                  var row = rows[ri];
                  if (row.type !== "group-header") {
                    newRows.push(row)
                  }
            }
            
            // e.workbook.sheets[0].rows = newRows
            
            //////////////////////////////////////////////////////////////////////////////////////////////////////

            // Recorra todas las filas exportadas.
            for (var i = 1; i < newRows.length; i++) {
                var row = newRows[i];
                // Recorra las plantillas de columna y aplíquelas para cada fila en la posición de columna almacenada
                if(row.type !== "group-header"){
                  var iRow = row
                  //console.log(iRow)  
                }
                // Obtenga el elemento de datos correspondiente a la fila actual.
                var dataItem = dataItems[i - 1];
                
                for (var j = 0; j < columnTemplates.length; j++) {
                  var columnTemplate = columnTemplates[j];

                  // Genere el contenido de la plantilla para la celda actual.
                  elem.innerHTML = columnTemplate.template(dataItem);
                  
                  var groupOffset = e.sender.dataSource.group().length;
                  if (row.cells[columnTemplate.cellIndex + groupOffset] != undefined)                
                  // Envíe el contenido de texto de la celda con plantilla a la celda exportada.
                  row.cells[columnTemplate.cellIndex + groupOffset].value = elem.textContent || elem.innerText || "";
                }
            }
          },
          pdfExport: function() {
          const idemDtoFinan = document.getElementById("dtofinan").ariaValueNow
          var comentarioContadoEfectivo = document.getElementById("comentariocontadoefectivo");
          var comentarioFinanciero = document.getElementById("comentariofinanciero");
          if (idemDtoFinan === null){
            alert("Falta completa campo Dto. Finan.")
            window.location.reload()
          } else
          if (idemDtoFinan == 20){
            comentarioContadoEfectivo.innerText = "contado efectivo"
          } else
          if (idemDtoFinan < 20){
            comentarioFinanciero.innerText = prompt("El dto financiero NO es 20%, ingresar comentario COMPRENSIBLE para el cliente sobre este dto Ej. -VISA 6 Cuotas-")
          }
          
          var idemArtsArticuloEmp = document.querySelectorAll("span#idArtsArticuloEmp")

          var initialValue = 0;
          var VeriSinMod = document.querySelectorAll("span#idVeriSinMod");
          var idem = [...VeriSinMod].map(e=> parseInt(e.innerText))
          
          var sumVeriSinMod = idem.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );
          
          var VeriMod = document.querySelectorAll("span#idVerifMod");
          var idem2 = [...VeriMod].map(e=> parseInt(e.innerText))

          var sumVeriMod = idem2.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );

          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPrecios = gridElement.find('#fechaCambiosPrecio');
          var valueFechaCambiosPrecios = fechaCambiosPrecios.data('kendoDatePicker').value();
          var fechaHasta = new Date();
          var modificados = document.getElementById("modificados");
          if (idemArtsArticuloEmp.length == sumVeriSinMod){
            modificados.innerText = 'No se existen modificaciones en los precios de los artículos de esta lista, entre ' + kendo.toString(valueFechaCambiosPrecios, "dd-MM-yyyy") + ' y el ' + kendo.toString(fechaHasta, "dd-MM-yyyy")
          } else
          if(sumVeriMod > 0){
            modificados.innerText = 'Sobre ' + idemArtsArticuloEmp.length + ' artículos de esta lista de precios, se identifican ' + sumVeriMod + ' modificados entre el ' + kendo.toString(valueFechaCambiosPrecios, "dd-MM-yyyy") + ' y el ' + kendo.toString(fechaHasta, "dd-MM-yyyy")
          }

          
        },
        pdfTemplate: function(e){
          var templateItem = kendo.template(kendo.jQuery('#pdfTemplate').html())
          return templateItem(e)
        },
        onError: function(e){
          console.log(e.status);
          console.log(e.error);
        },
        requestEnd: function(e) {
            var response = e.response;
            var type = e.type;
        },
        dataBound: function(){
          var idemCodCte = document.querySelector(".k-input-value-text:nth-child(1)").innerText
          var idCodCte = document.getElementById("cod_cte")
          var valCodCte = idCodCte.innerText = kendo.toString(idemCodCte)

          var idemDvc1 = document.querySelector("span#dvc1listaprevcta").innerText
          var dvc1listaprecvta = document.getElementById("dvc1listaprecvta")
          var idemdvc1listaprecvta = dvc1listaprecvta.innerText = kendo.toString(idemDvc1)

          var idemCodSet = document.querySelector("#form > div:nth-child(2) > .k-dropdownlist > .k-input-inner > .k-input-value-text").innerText
          var idCodSet = document.getElementById("set_nombre")
          var valCodCte = idCodSet.innerText = kendo.toString(idemCodSet)

          var idemDtoFinan = document.getElementById("dtofinan").ariaValueNow
          var descuentofinanciero = document.getElementById("descuentofinanciero")
          var idemDescuentoFinanciero = descuentofinanciero.innerText = kendo.toString(idemDtoFinan, "p")

          var idemArtsArticuloEmp = document.querySelectorAll("span#idArtsArticuloEmp")

          var initialValue = 0;
          var VeriSinMod = document.querySelectorAll("span#idVeriSinMod");
          var idem = [...VeriSinMod].map(e=> parseInt(e.innerText))
          
          var sumVeriSinMod = idem.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );

          var VeriMod = document.querySelectorAll("span#idVerifMod");
          var idem2 = [...VeriMod].map(e=> parseInt(e.innerText))

          var sumVeriMod = idem2.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );

        },
        CambiosPrecioDesde: function(){
          kendo.culture("es-AR");
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          return kendo.toString(fechaDesde, 'd')
        },
        Modif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var fechaHasta = item.Fecha_cambio_precios_hasta
          var fechaHoy = new Date()
          var modificado = kendo.toString(fechaUltModif, 'yyyy-MM-dd') <= kendo.toString(fechaHoy, 'yyyy-MM-dd') ? (kendo.toString(fechaUltModif, 'yyyy-MM-dd') >= kendo.toString(fechaDesde, 'yyyy-MM-dd') ? 'Modif' : '') : ''
          return modificado
        },
        VeriModif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var fechaHasta = item.Fecha_cambio_precios_hasta
          var fechaHoy = new Date()
          var modificado = kendo.toString(fechaUltModif, 'yyyy-MM-dd') <= kendo.toString(fechaHoy, 'yyyy-MM-dd') ? (kendo.toString(fechaUltModif, 'yyyy-MM-dd') >= kendo.toString(fechaDesde, 'yyyy-MM-dd') ? 'Modif' : '') : ''
          var VerifMod = modificado == 'Modif' ? 1 : 0
          return '<span id="idVerifMod">' + kendo.toString(VerifMod) + '</span>'
        },
        SinModif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var SinModificado = kendo.toString(fechaDesde, 'yyyy-MM-dd') > kendo.toString(fechaUltModif, 'yyyy-MM-dd') ? 'Sin modif' : ''
          return SinModificado
        },
        VeriSinModif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var SinModificado = kendo.toString(fechaDesde, 'yyyy-MM-dd') > kendo.toString(fechaUltModif, 'yyyy-MM-dd') ? 'Sin modif' : ''
          var VeriSinfMod = SinModificado == 'Sin modif' ? 1 : 0
          return '<span id="idVeriSinMod">'+ kendo.toString(VeriSinfMod) +'</span>'
        },
        dtoFinan: function(){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var numericDtoFinan = gridElement.find('#dtofinan');
            var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
            return DtoFinan+'%'
        },
        precioContado: function(item){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var numericDtoFinan = gridElement.find('#dtofinan');
            var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
            var iARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA
            var iCIMP_TASA = item.CIMP_TASA
            var iCOTI_COTIZACION = item.COTI_COTIZACION
            var iDCA1_POR_DESCUENTO = item.DCA1_POR_DESCUENTO
            var agregaruna = 1
            var cal = iARPV_PRECIO_VTA * (1-DtoFinan/100)
            var cal2 = (1-iDCA1_POR_DESCUENTO/100)
            var cal3 = (1+iCIMP_TASA/100)
            var precioTotal = cal * (iDCA1_POR_DESCUENTO ? cal2 : agregaruna) * cal3 * (iCOTI_COTIZACION ? iCOTI_COTIZACION : agregaruna);
            return kendo.toString(precioTotal, "c2")
        },
        toolbarTemplate: function() {
            var templateHtml =
            '<div class="container-fluid">' +
                '<form id="form" class="requires-validation row align-items-end row-cols-5" novalidate>' +
                    '<div class="col d-flex flex-column">' +
                      '<label class="col-form-label">Perfil Comercial</label>' +
                      '<input type="search" id="codcte" style="width: 150px"/>' +
                      '<div class="invalid-feedback">Falta completa este campo.</div>'+
                    '</div>' +
                    '<div class="col d-flex flex-column">' +
                      '<label class="col-form-label">Set Vta.</label>' +
                      '<input type="search" id="codset" style="width: 150px"/>' +
                      '<div class="invalid-feedback">Falta completa este campo.</div>'+
                    '</div>' +
                    '<div class="col d-flex flex-column">' +
                      '<label class="col-form-label">Dto. Finan.</label>' +
                      '<input type="number" id="dtofinan" style="width: 150px" v-model.number="dtofinan"/>' +
                      '<div class="invalid-feedback">Falta completa este campo.</div>'+
                    '</div>' +
                    '<div class="col d-flex flex-column">' +
                      '<label class="col-form-label">Cambios precio desde</label>' +
                      '<input type="date" id="fechaCambiosPrecio" style="width: 150px"/>' +
                      '<div class="invalid-feedback">Falta completa este campo.</div>'+
                    '</div>' +
                    '<div class="col d-flex">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta"  style="margin-left:5px"><span class="k-icon k-i-play"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro"  style="margin-left:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                    '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();" style="margin-left:5px"><span class="k-icon k-i-file"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-pdf" style="margin-left:5px"><span class="k-icon k-i-pdf"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-excel" style="margin-left:5px"><span class="k-icon k-i-excel"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                    '</div>' +
                  '</form>' +
                '</div>';
            return kendo.template(templateHtml);
            },
            ArtsArticuloEmp: function(item){
              var templateArts = '<span id="idArtsArticuloEmp">'+ item.ARTS_ARTICULO_EMP +'</span>'
              return templateArts
            },
            dvc1listaprecvta: function(item){
              var templateDvc1 = '<span id="dvc1listaprevcta">'+ item.DVC1_LISTA_PRECVTA +'</sapn>'
              return templateDvc1
            }
          },
          mounted: function(){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var dropDownElement = gridElement.find('#codcte');
            var toolbarElement = gridElement.find('.k-grid-toolbar');
            var numericDtoFinan = gridElement.find('#dtofinan');
            var fechaInformarCambiosPrecio = gridElement.find('#fechaCambiosPrecio');
            var dropDownElement3 = gridElement.find('#codset');

            fechaInformarCambiosPrecio.kendoDatePicker({
                culture: "es-AR", 
                format: "dd-MM-yyyy"
            })
            
            numericDtoFinan.kendoNumericTextBox({
              placeholder: "Entre 0 y 20",
              culture: "es-AR",
              format: "n0",
              min: 0,
              max: 20
            })

            dropDownElement3.kendoDropDownList({
              dataTextField: "nombre_set_art",
              dataValueField: "cod_set_art",
              autoBind: true,
              dataSource: {
                transport:{
                  read: {
                    contentType: 'application/json',
                    dataType: 'json',
                    type: 'GET',
                    url: `${process.env.VUE_APP_API_BASE}/setsdeventas`,
                    headers: {
                      'Authorization': 'Bearer ' + store.state.token
                    }
                  }
                }
              }
            })

            dropDownElement.kendoDropDownList({
              dataTextField: "CLC1_CLASIF_1",
              dataValueField: "CLC1_CLASIF_1",
              index: 17,
              autoBind: true,
              dataSource: {
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
              }
            });

            toolbarElement.on("click", ".refresh", function (e) {
              e.preventDefault(); 
              grid.dataSource.read();
            });

            toolbarElement.on("click", ".play", ()=>{
              var PerfilComercial = dropDownElement.data("kendoDropDownList").value();
              var SetsVta = dropDownElement3.data("kendoDropDownList").value();
              var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
              var FechaCambiosDesde = fechaInformarCambiosPrecio.data("kendoDatePicker").value();
              var classDtoFinan = document.querySelector("#form > div:nth-child(3) > .k-numerictextbox");
              var classFechaDesde = document.querySelector("#form > div:nth-child(4) > .k-datepicker");
              

              var filter = { logic: "and", filters: [] };
              
              filter.filters.push(
                    { field: "cod_set_art", operator: "contains", value: SetsVta },
                    { field: "COD_CTE", operator: "contains", value: PerfilComercial }
                    );
              if (DtoFinan == null){
                classDtoFinan.classList.add('is-invalid');
              } else if (FechaCambiosDesde == null) {
                classFechaDesde.classList.add('is-invalid');
                classDtoFinan.classList.remove('is-invalid');
              } else {
                classFechaDesde.classList.remove('is-invalid');
                classDtoFinan.classList.remove('is-invalid');
                grid.dataSource.filter(filter);
                grid.dataSource.sort({field: "orden_art_familia", dir: "asc"});
              }
            });
            toolbarElement.on("click", ".filter-clear", function(){
              numericDtoFinan.data("kendoNumericTextBox").value(null);
              fechaInformarCambiosPrecio.data("kendoDatePicker").value(null);
            })
          }
    }
    </script>
    
    <style scoped>
    #comentariocontadoefectivo, #comentariofinanciero, #dvc1listaprecvta{
      margin-left: 2px;
    }
  .pdfFont{
    font-family: "DejaVu Sans", "Arial", sans-serif;
  }

  @font-face {
    font-family: "DejaVu Sans";
    src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf")
      format("truetype");
  }
  
  @font-face {
    font-family: "DejaVu Sans";
    font-weight: bold;
    src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf")
      format("truetype");
  }
  
  @font-face {
    font-family: "DejaVu Sans";
    font-style: italic;
    src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf")
      format("truetype");
  }
  
  @font-face {
    font-family: "DejaVu Sans";
    font-weight: bold;
    font-style: italic;
    src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf")
      format("truetype");
  }
    </style>
    