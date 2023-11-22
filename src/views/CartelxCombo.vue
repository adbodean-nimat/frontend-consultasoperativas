<template>
    <div class="directive-fullscreen-wrapper">
      <div class="container-fluid page-grid">
        <div class="encabezado-titulo">
          <div style="margin-left: 5px; color: white;" class="icon-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-card-text" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/></svg>
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
        <datasource ref="remoteDataSourceCartelCombo"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :transport-parameter-map="parameterMap"
                          :aggregate="aggregateDefinition"
                          :page-size='1000'
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourceCartelCombo'"
              :sortable-mode="'multiple'"
              :sortable-allow-unsort="true"
              :sortable-show-indexes="true"
              :pageable-always-visible="false"
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
              @databound="dataBound"
              >
              <grid-column field="CMBA_COMBO_ART" title="Combo" :width="90" :footer-template="'Total:'"></grid-column>
              <grid-column field="CMBA_NOMBRE" title="Nombre" :width="300"></grid-column>
              <grid-column field="CMBA_OBSERVACION" title="Observación" :width="120"></grid-column>
              <grid-column field="Desarmable" title="Desarmable?" :hidden="true"></grid-column>
              <grid-column field="ARTS_ARTICULO_EMP" title="Código art." :width="100"></grid-column>
              <grid-column field="ARTS_NOMBRE" title="Nombre art." :width="400"></grid-column>
              <grid-column field="CMBD_UNIMED" title="&nbsp;" :width="50"></grid-column>
              <grid-column field="CMBD_CANTIDAD" title="Cantidad"></grid-column>
              <grid-column field="CMBD_POR_DESC" title="Descuento" template="#: kendo.format('{0:p2}', CMBD_POR_DESC / 100)#"></grid-column>
              <grid-column field="CMBA_FECHA_VIG_DESDE" title="Fecha vigente desde" template="#: kendo.toString(kendo.parseDate(CMBA_FECHA_VIG_DESDE, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
              <grid-column field="Fecha_vigencia_hasta" title="Fecha vigente hasta" template="#: kendo.toString(kendo.parseDate(Fecha_vigencia_hasta, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
              <grid-column field="Clas_Art_2" title="Clasif. Art. 2" :hidden="true"></grid-column>
              <grid-column field="Pre_M2_UN_Lista_con_IVA_L1" title="Precio Lista" template="#: kendo.toString(Pre_M2_UN_Lista_con_IVA_L1, 'c2')#" :aggregates="['sum']" footer-template="#: kendo.toString(sum, 'c2')#"></grid-column>
              <grid-column field="Pre_M2_UN_Cdo_con_IVA_L1" title="Precio Cdo." template="#: kendo.toString(Pre_M2_UN_Cdo_con_IVA_L1, 'c2')#" :aggregates="['sum']" footer-template="#: kendo.toString(sum, 'c2')#"></grid-column>
              <grid-column title="Precio Cdo. Subtotal" :template="templatePrecioCdoSubtotal" :hidden="true"></grid-column>
              <grid-column field="Pre_M2_UN_Cdo_con_IVA_L1_Redond_con_dto_combo" title="Precio Cdo. c/Dto." template="#: kendo.toString(Pre_M2_UN_Cdo_con_IVA_L1_Redond_con_dto_combo, 'c2')#" :aggregates="['sum']" footer-template="#: kendo.toString(sum, 'c2')#"></grid-column>
              <grid-column title="Precio Cdo. c/Dto. subtotal" :template="templatePrecioCdoTotal" :hidden="true"></grid-column>
              <grid-column field="Texto_presentacion" title="Texto presentación" :hidden="true"></grid-column>
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
    kendo.culture('es-US')
    export default {
      name: 'CartelxCombo',
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
                dataSource: ['remoteDataSourceCartelCombo'],
                title: 'Cartel: Combo',
                schemaModelFields: {
                    CMBA_COMBO_ART: {type: 'string'},
                    CMBA_NOMBRE: {type: 'string'},
                    CMBA_OBSERVACION: {type: 'string'},
                    Desarmable: {type: 'string'},
                    ARTS_ARTICULO_EMP: {type: 'string'},
                    ARTS_NOMBRE: {type: 'string'},
                    CMBD_UNIMED: {type: 'string'},
                    CMBD_CANTIDAD: {type: 'number'},
                    CMBD_POR_DESC: {type: 'number'},
                    CMBA_FECHA_VIG_DESDE: {type: 'datetime'},
                    Fecha_vigencia_hasta: {type: 'datatime'},
                    Clas_Art_2: {type: 'string'},
                    Pre_M2_UN_Lista_con_IVA_L1: {type: 'number'},
                    Pre_M2_UN_Cdo_con_IVA_L1: {type: 'number'},
                    Pre_M2_UN_Cdo_con_IVA_L1_Redond_con_dto_combo: {type: 'number'},
                    Texto_presentacion: {type: 'string'}
                },
                aggregateDefinition: [
                    {field: "Pre_M2_UN_Cdo_con_IVA_L1_Redond_con_dto_combo", aggregate: "sum"},
                    {field: "Pre_M2_UN_Cdo_con_IVA_L1", aggregate: "sum"},
                    {field: "Pre_M2_UN_Lista_con_IVA_L1", aggregate: "sum"}
                ]
             }
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/combo/`
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
                  var comboart = gridElement.find('#comboart');
                  var ComboArt = comboart.data("kendoNumericTextBox").value()
                  kendo.jQuery.ajax({
                    url: urlApi + ComboArt,
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
                '<div class="container-fluid">' +
                    '<form id="form" class="requires-validation row align-items-start row-cols" novalidate>' +
                        '<div class="col d-flex">' +
                            `<label class="col-form-label" for="combo_art" style="margin-right:5px">Combo:</label>` +
                            '<div id="input" class="col d-flex flex-column">'+
                                '<input class="is-valid" id="comboart" type="number" style="width: 200px" required/>' +
                                '<div class="invalid-feedback">Falta completa este campo.</div>'+
                            '</div>'+
                        '</div>' +
                        '<div class="col d-flex input-group">'+
                          '<div class="input-group-text">'+
                            '<label class="form-check-label" for="cuotas" style="margin-right:10px">Cuotas: </label>' +
                            '<input class="form-check-input mt-0" id="checkcuotas" type="checkbox" value="">'+
                          '</div>' +
                          '<input type="number" class="form-control" id="nrocuotas">'+
                          '<div class="invalid-feedback">Falta completa este campo.</div>'+
                        '</div>' +
                        '<div class="col d-flex">'+
                            '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta" style="margin-left:5px"><span class="k-icon k-i-play"></span></a>' +
                            '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-left:5px"><span class="k-icon k-i-filter-clear"></span></a>'+
                            '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();" style="margin-left:5px"><span class="k-icon k-i-file"></span></a>' +
                            '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar" style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
                            '<a class="k-pager-refresh k-link k-button print" title="Imprimir" style="margin-left:5px"><span class="k-icon k-i-print"></span></a>' +
                        '</div>' +
                    '</form>';
                '</div>';
                return templateHtml;
              },
              templatePrecioCdoSubtotal: function(item){
                var precioxitem = item.Pre_M2_UN_Cdo_con_IVA_L1
                var cantidadxitem = item.CMBD_CANTIDAD
                var total = precioxitem * cantidadxitem
                return '<span id="totalItemsPreciosCdo">'+ kendo.htmlEncode(kendo.toString(total, "c2")) +'</span>';
              },
              templatePrecioCdoTotal: function(item){
                var precioxitem = item.Pre_M2_UN_Cdo_con_IVA_L1_Redond_con_dto_combo
                var cantidadxitem = item.CMBD_CANTIDAD
                var total = precioxitem * cantidadxitem
                return '<span id="totalItemsPrecios">'+ kendo.htmlEncode(kendo.toString(total, "c2")) +'</span>';
              },
              parameterMap: function(options, operation) {
                  if (operation !== 'read' && options.models) {
                    return JSON.stringify(options.models)
                  }
              },
              dataBound: function(e){
                                    
              }
            },
      mounted: function(){
                var grid = this.$refs.grid.kendoWidget();
                var gridElement = grid.element;
                var comboArt = gridElement.find('#comboart');
                var nroCuotas = gridElement.find('#nrocuotas');
                var checkCuotas = gridElement.find('#checkcuotas');
                var toolbarElement = gridElement.find('.k-grid-toolbar');


                comboArt.kendoNumericTextBox({
                    culture: "es-US",
                    format: "{0:0000}"
                })

                toolbarElement.on("click", ".refresh", function (e) {
                    e.preventDefault(); 
                    var ComboArt = comboArt.data("kendoNumericTextBox").value()
                    var classComboArt = document.querySelector("#form > div > #input > .k-numerictextbox")
                    if(ComboArt == null){
                        classComboArt.classList.add('is-invalid');
                    } else {
                        classComboArt.classList.remove('is-invalid');
                        grid.dataSource.read();
                    }
                });

                toolbarElement.on("click", ".play", function(){
                    var ComboArt = comboArt.data("kendoNumericTextBox").value()
                    var classComboArt = document.querySelector("#form > div > #input > .k-numerictextbox")

                    if(ComboArt == null){
                        classComboArt.classList.add('is-invalid');
                    } else {
                        classComboArt.classList.remove('is-invalid');
                        grid.dataSource.read();
                    }

                });

                toolbarElement.on("click", ".filter-clear", function(e){
                    comboArt.data("kendoNumericTextBox").value(null)
                })

                toolbarElement.on("click", ".print", function(){
                    var printableContent = '';
                    var data = grid.dataSource.data();
                    var dataAggregates = grid.dataSource.aggregates();
                    var itemNombre = data[0].CMBA_NOMBRE
                    var itemObservacion = data[0].CMBA_OBSERVACION
                    var itemsCodArts = [];
                    for (var i = 0; i < data.length; i++){
                      var itemCodigoArt = data[i].ARTS_ARTICULO_EMP
                      if(data.length){
                        itemsCodArts.push(data[i].ARTS_ARTICULO_EMP)
                      }
                    }
                    const initialValue = 0;
                    
                    const ultima_columna = document.querySelectorAll("span#totalItemsPrecios");
                    var idem = [...ultima_columna].map(e=> kendo.parseFloat(e.innerHTML));
                    const sumWithInitial = idem.reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      initialValue
                    );

                    const ultima_columna2 = document.querySelectorAll("span#totalItemsPreciosCdo");
                    var idem2 = [...ultima_columna2].map(e=> kendo.parseFloat(e.innerHTML));
                    const sumWithInitial2 = idem2.reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      initialValue
                    );
                    
                    var cantidad = data[0].CMBD_CANTIDAD
                    var itemsCantidad = [];
                    for (var j = 0; j < data.length; j++){
                      var itemCantidad = data[j].CMBD_CANTIDAD
                      itemsCantidad.push(itemCantidad)
                    }
                    const sumItemsCantidad = itemsCantidad.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        initialValue
                    )
                    var itemPrecioLista = dataAggregates.Pre_M2_UN_Cdo_con_IVA_L1
                    var itemPrecioDtoCombo = dataAggregates.Pre_M2_UN_Cdo_con_IVA_L1_Redond_con_dto_combo
                    var itemPrecioxCantidad = itemPrecioDtoCombo.sum * cantidad
                    var itemPrecioxCantidadTotal = kendo.toString(sumWithInitial, "c0");
                    var itemPrecioCdoxCantidadSubtotal = kendo.toString(sumWithInitial2, "c2");
                    var theDate = new Date();
                    var itemCombo = data[0].CMBA_COMBO_ART
                    var ClasArt2 = data[0].Clas_Art_2
                    var unidMed = ClasArt2 == '0004' ? 'M2' : 'unidad';
                    var descuento = data[0].CMBD_POR_DESC
                    var itemTextoPresentacion = data[0].Texto_presentacion
                    var itemTextoPresentacionMejorando = data.length > 1 && data[0].CMBD_POR_DESC === 0 ? "Comprando este articulo y accedes a la oferta de..." : data.length > 1 && data[0].CMBD_POR_DESC >= 1 ? "Si compras este articulo, te ganas un descuento del "+ kendo.format('{0:p2}', descuento / 100) +" y accedes a la oferta de..." : itemTextoPresentacion;
                    var checkboxCuotas = checkCuotas[0].checked
                    var NroCuotas = nroCuotas.val();
                    var valorCuotas = sumWithInitial / NroCuotas
                    var Ahora12 = NroCuotas == 12 ? '- AHORA 12' : '';
                    var win = window.open('', '', 'width=1200, height=800, resizable=1, scrollbars=1'),
                    doc = win.document.open();
                    var htmlStart =
                      '<html lang="es-AR">'+
                      '<head>' +
                      '<meta charset="utf-8" />' +
                      '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
                      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                      '<title>Cartel Combo</title>' +
                      '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">' +
                      '</head>' +
                      '<body>';
                    
                    var contentBody = 
                    '<div style="border: 15px solid #198754;" class="container-xxl rounded-1">' +
                      '<div class="row pb-2">' +
                          '<div class="col">' +
                              '<span><small>'+ itemsCodArts.join(' - ') +'</small></span>' +
                          '</div>' +
                      '</div>' +
                      '<div class="row align-items-start pb-2 mb-2">' +
                          '<div class="col-8">' +
                              '<span><strong>'+ itemNombre +'</strong></span>' +
                          '</div>' +
                          '<div class="col-4 text-end">' +
                              '<span><small>Fecha de emisión: '+ kendo.toString(theDate, "dd/MM/yyyy") +'</small></span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row pb-2 mb-4 border-bottom border-success border-3">' +
                          '<div class="col text-start">' +
                              '<span><small>Antes: </small></span><span style="font-size: 20px;"><strong>'+ kendo.toString(itemPrecioCdoxCantidadSubtotal, "c2") +'</strong></span>' +
                          '</div>' +
                          '<div class="col text-end">' +
                              '<span><small>Nro. de combo: '+ itemCombo +'</small></span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row mb-4 bg-success text-white">' +
                          '<div class="col text-center">' +
                              '<span><h4><strong>'+ itemTextoPresentacionMejorando +'</strong></h4></span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row">' +
                          '<div class="col text-center">' +
                              '<span style="font-size:200px; font-weight: bold;">'+ kendo.toString(itemPrecioxCantidadTotal, "c0")+'</span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row mb-4">' +
                          '<div class="col"></div>' +
                          '<div class="col text-center bg-success text-white"><span style="font-size: 25px;"><strong>Por '+ unidMed +', contado*</strong></span></div>' +
                          '<div class="col"></div>' +
                      '</div>' +

                      '<div class="row mb-4">' +
                          '<div class="col text-center"><span><small>* Pago en efectivo, tarjeta de crédito en una cuota, tarjeta de débito o medios electónicos. <br> Consúltanos por pagos en cuotas con tarjetas créditos.</small></span></div>' +
                      '</div>' +
                    '</div>';

                    var contentBodyConCuotas =
                    '<div style="border: 15px solid #198754;" class="container-xxl rounded-1">' +
                      '<div class="row pb-2">' +
                          '<div class="col">' +
                              '<span><small>'+ itemsCodArts.join(' - ') +'</small></span>' +
                          '</div>' +
                      '</div>' +
                      '<div class="row align-items-start pb-2 mb-2">' +
                          '<div class="col-8">' +
                              '<span><strong>'+ itemNombre +'</strong></span>' +
                          '</div>' +
                          '<div class="col-4 text-end">' +
                              '<span><small>Fecha de emisión: '+ kendo.toString(theDate, "dd/MM/yyyy") +'</small></span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row pb-2 mb-4 border-bottom border-success border-3">' +
                          '<div class="col text-start">' +
                              '<span><small>Antes: </small></span><span style="font-size: 20px;"><strong>'+ kendo.toString(itemPrecioCdoxCantidadSubtotal, "c2") +'</strong></span>' +
                          '</div>' +
                          '<div class="col text-end">' +
                              '<span><small>Nro. de combo: '+ itemCombo +'</small></span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row mb-4 bg-success text-white">' +
                          '<div class="col text-center">' +
                              '<span><h4><strong>'+ itemTextoPresentacionMejorando +'</strong></h4></span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row">' +
                          '<div class="col text-center">' +
                              '<span style="font-size:10rem; font-weight: bold;">'+ kendo.toString(itemPrecioxCantidadTotal, "c0")+'</span>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row mb-4">' +
                          '<div class="col"></div>' +
                          '<div class="col text-center bg-success text-white"><span style="font-size: 25px;"><strong>Por '+ unidMed +', contado*</strong></span></div>' +
                          '<div class="col"></div>' +
                      '</div>' +

                      '<div class="row mb-4">' +
                          '<div class="col text-center"><span><small>* Pago en efectivo, tarjeta de crédito en una cuota, tarjeta de débito o medios electónicos. <br> Consúltanos por pagos en cuotas con tarjetas créditos.</small></span></div>' +
                      '</div>' +

                      '<div class="row">' +
                          '<div class="col text-center">' +
                              '<p class="uppercase text-decoration-underline"><strong>PAGALO EN '+ NroCuotas +' CUOTAS SIN INTERÉS CON TARJETA DE CREDITO '+ Ahora12 +' - VISA - MASTERCARD - CABAL - NATIVA</strong></p>' +
                              '<P>Valor de la cuota: <strong class="text-decoration-underline">'+ kendo.toString(valorCuotas, 'c0') +'</strong></P>' +
                          '</div>' +
                      '</div>' +

                      '<div class="row mb-2">' +
                          '<div class="col text-center"><span><small>Las promociones de Outlet no son acumulables con otras promociones, ni se aplican sobre las listas de precios especiales. Sin devolución.</small></span></div>' +
                      '</div>' +
                    '</div>';

                    var htmlEnd ='</body></html>';

                    if(checkboxCuotas == false){
                      printableContent = contentBody
                    } else {
                      printableContent = contentBodyConCuotas
                    }

                    doc.write(htmlStart + printableContent + htmlEnd);
                    doc.close();
                    setTimeout(function(){
                      win.print()
                    }, 500);
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
    