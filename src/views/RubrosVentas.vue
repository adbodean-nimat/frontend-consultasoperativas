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
        <datasource ref="remoteDataSourceRubrosVtas"
                          :transport-read-url="UrlApiBase"
                          :transport-read-data-type="'json'"
                          :transport-read-content-type="'application/json'"
                          :transport-read-type="'GET'"
                          :transport-read-cache="false"
                          :schema-model-fields="schemaModelFields"
                          :page-size='100'
                          :group="groupDefinition"
                          @error="onError"
                          @requestend="requestEnd"
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data="'remoteDataSourceRubrosVtas'"
              :data-source-ref="'remoteDataSourceRubrosVtas'"
              :sortable-mode="'multiple'"
              :pageable-page-sizes="[5, 10, 15, 20, 25, 100]"
              :filterable="true"
              :filterable-extra="false"
              :reorderable="true"
              :resizable="true"
              :column-menu="true"
              :navigatable="true"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              :auto-bind="false"
              :pdf-all-pages="true"
              :pdf-avoid-links="true"
              :pdf-paper-size="'A4'"
              :pdf-margin="{ top: '2cm', left: '1cm', right: '1cm', bottom: '1cm' }"
              :pdf-landscape="true"
              :pdf-repeat-headers="true"
              :pdf-scale="0.8"
              @databound="dataBound"
              >
              
              <grid-column field="ARTS_ARTICULO_EMP" title="Código" :column-menu="false"></grid-column>
              <grid-column field="ARTS_NOMBRE" title="Articulo" :column-menu="false"></grid-column>
              <grid-column field="ARTS_UNIMED_STOCK" title="&nbsp;" :column-menu="false"></grid-column>
              <grid-column field="PRECIO_LISTA_CON_IVA" title="Precio lista c/IVA" :format="'{0:c}'"></grid-column>
              <grid-column title="Dto. Financ." :template="dtoFinan"></grid-column>
              <grid-column title="Precio contado c/IVA c/Dtos" :template="precioContado"></grid-column>
              <grid-column title="Modif" :template="modif"></grid-column>
              <grid-column title="Verfi Modif" :template="VeriModif"></grid-column>
              <grid-column title="Sin Modif" :template="SinModif"></grid-column>
              <grid-column title="Verfi sin Modif" :template="VeriSinModif"></grid-column>

            <grid-column field="ARVE_RUBRO_VENTA" :hidden="true"></grid-column>
            <grid-column field="RUBV_NOMBRE" :hidden="true"></grid-column>
            <grid-column field="cod_set_art" :hidden="true"></grid-column>
            <grid-column field="nombre_set_art" :hidden="true"></grid-column>
            <grid-column field="cod_fami_art" :hidden="true"></grid-column>
            <grid-column field="nombre_fami_art"  title="Familia Art." :hidden="true"></grid-column>
            <grid-column field="nro_orden_de_la_fami" :hidden="true"></grid-column>
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
            <grid-column field="DCA1_POR_DESCUENTO" :hidden="true"></grid-column>
            <grid-column field="ARPV_PRECIO_VTA" :hidden="true"></grid-column>
            <grid-column field="ARPV_MONEDA" :hidden="true"></grid-column>
            <grid-column field="ARPV_FECHA_ULT_ACT" :hidden="true"></grid-column>
            <grid-column field="COTI_COTIZACION" :hidden="true"></grid-column>
            <grid-column field="COTI_FECHA" :hidden="true"></grid-column>
            <grid-column field="Fecha_cambio_precios_hasta" :hidden="true"></grid-column>
            <grid-column field="Fecha_Ult_Modif" title="Fecha Ult Modif" :format="'{0:d}'" :hidden="true"></grid-column>
            <grid-column :template="CambiosPrecioDesde" :hidden="true"></grid-column>
            <grid-column field="Delay_cambio_precio" :hidden="true"></grid-column>
        </grid>
      </div>
    </div>
</template>
    
<script>
    import '@progress/kendo-ui'
    import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
    import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
    import '@progress/kendo-theme-bootstrap/dist/all.css'
    import { DataSource} from '@progress/kendo-datasource-vue-wrapper'
    import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
    import { Button } from '@progress/kendo-buttons-vue-wrapper'
    import { directive as fullscreen } from 'vue-fullscreen'
    
    export default {
      name: 'ListaRubrosVtas',
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
                title: 'Lista de precio - Rubros Ventas',
                dataSource: ['remoteDataSourceRubrosVtas'],
                schemaModelFields: {
                    orden_art_familia: {type: 'numeric'},
                    cod_set_art: {type: 'string'},
                    Fecha_Ult_Modif: {type: 'date'}
                    
                },
                groupDefinition:{
                  field: 'nombre_fami_art'
                }
             }
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
        onError: function(e){
          console.log(e.status); // displays "error"
          console.log(e.error);
        },
        requestEnd: function(e) {
            var response = e.response;
            var type = e.type;
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(type + " => type");
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(response.length);
        },
        dataBound: function(){
          const ultima_columna = document.querySelectorAll("span#idVeriSinMod");
          var idem = [...ultima_columna].map(e=> parseInt(e.innerText))
          
          const initialValue = 0;
          const sumWithInitial = idem.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );

          console.log(sumWithInitial);
        },
        CambiosPrecioDesde: function(){
          kendo.culture("es-AR");
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          return kendo.toString(fechaDesde, 'd')
        },
        modif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var fechaHasta = item.Fecha_cambio_precios_hasta
          var modificado = fechaUltModif <= fechaHasta ?  (fechaUltModif >= fechaDesde ? 'Modif' : '') : ''
          return modificado
        },
        VeriModif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var fechaHasta = item.Fecha_cambio_precios_hasta
          var modificado = fechaUltModif <= fechaHasta ?  (fechaUltModif >= fechaDesde ? 'Modif' : '') : ''
          var VerifMod = modificado == 'Modif' ? 1 : 0
          return VerifMod
        },
        SinModif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var SinModificado = fechaDesde > fechaUltModif ? 'Sin modif' : ''
         
          return SinModificado
        },
        VeriSinModif: function(item){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var fechaCambiosPreciosDesde = gridElement.find('#fechaCambiosPrecio')
          var fechaDesde = fechaCambiosPreciosDesde.data("kendoDatePicker").value();
          var fechaUltModif = item.Fecha_Ult_Modif
          var SinModificado = fechaDesde > fechaUltModif ? 'Sin modif' : ''
          var VeriSinfMod = SinModificado == 'Sin modif' ? 1 : 0
          
          return '<span id="idVeriSinMod">'+ kendo.htmlEncode(VeriSinfMod) +'</span>'
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
                '<span id="form">' +
                    '<span style="margin-left:5px">' +
                      '<label style="margin-right:5px">Perfil Comercial</label>' +
                      '<input type="search" id="codcte" style="width: 150px"/>' +
                    '</span>' +
                    '<span style="margin-left:15px">' +
                      '<label style="margin-right:5px">Rubro Vta.</label>' +
                      '<input type="search" id="codconfig" style="width: 150px"/>' +
                    '</span>' +
                    '<span style="margin-left:15px">' +
                      '<label style="margin-right:5px">Dto. Finan.</label>' +
                      '<input type="number" id="dtofinan" style="width: 150px" v-model.number="dtofinan"/>' +
                    '</span>' +
                    '<span style="margin-left:15px">' +
                      '<label style="margin-right:5px">Cambios precio desde</label>' +
                      '<input type="number" id="fechaCambiosPrecio" style="width: 150px"/>' +
                    '</span>' +
                    
                    '<span style="margin-left: 15px">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta" style="margin-right:5px"><span class="k-icon k-i-play"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-right:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                    '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();"><span class="k-icon k-i-file"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-pdf" style="margin-left:5px"><span class="k-icon k-i-pdf"></span></a>' +
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                    '</span>' +
                '</span>';
            return kendo.template(templateHtml);
            },
          },
          mounted: function(){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var dropDownElement = gridElement.find('#codcte');
            var toolbarElement = gridElement.find('.k-grid-toolbar');
            var numericDtoFinan = gridElement.find('#dtofinan');
            var fechaInformarCambiosPrecio = gridElement.find('#fechaCambiosPrecio');
            var dropDownElement2 = gridElement.find('#codconfig');
            
            fechaInformarCambiosPrecio.kendoDatePicker({
                culture: "es-AR", 
                format: "dd-MM-yyyy",
                dataValueField: "",
                autoBind: false
            })
            
            numericDtoFinan.kendoNumericTextBox({
              placeholder: "Entre 0 y 20",
              culture: "es-AR",
              format: "n0",
              min: 0,
              max: 20
            })

            dropDownElement2.kendoDropDownList({
              dataTextField: "RUBV_RUBRO_VENTA",
              dataValueField: "RUBV_RUBRO_VENTA",
              autoBind: true,
              optionLabel: "Todos",
              dataSource: {
                transport:{
                  read: `${process.env.VUE_APP_API_BASE}/rubrovta`
                }
              }
            })

            dropDownElement.kendoDropDownList({
              dataTextField: "CLC1_CLASIF_1",
              dataValueField: "CLC1_CLASIF_1",
              autoBind: true,
              optionLabel: "Todos",
              dataSource: {
                transport:{
                  read: `${process.env.VUE_APP_API_BASE}/clasificadorclientes`
                }
              }
            });

            toolbarElement.on("click", ".refresh", function (e) {
              e.preventDefault(); 
              grid.dataSource.read();
            });

            toolbarElement.on("click", ".play", ()=>{
              var PerfilComercial = dropDownElement.data("kendoDropDownList").value();
              var RubroVta = dropDownElement2.data("kendoDropDownList").value();
              var filter = { logic: "and", filters: [] };
              filter.filters.push(
                    
                    { field: "ARVE_RUBRO_VENTA", operator: "contains", value: RubroVta },
                    { field: "COD_CTE", operator: "contains", value: PerfilComercial }
                  
            );
              grid.dataSource.filter(filter);
            });
            toolbarElement.on("click", ".filter-clear", function(e){
              e.preventDefault();
              dropDownElement.data("kendoDropDownList").value(null);
              dropDownElement2.data("kendoDropDownList").value(null);
              grid.dataSource.sort({});
              grid.dataSource.filter({});
              grid.dataSource.autoFitColumn();
            })
          }
    }
    </script>
    
    <style>
    </style>
    