<template>
  <div class="directive-fullscreen-wrapper">
    <div class="container-fluid page-grid">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-list-columns-reverse"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z" />
          </svg>
          <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
          <span style="color: white; margin-left: 5px;">{{ title }}</span>
        </div>
        <div class="button-fullscreen">
          <div style="margin-right: 15px;">
            <kbutton v-fullscreen="options">
              <svg v-show="!fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
              </svg>
              <svg v-show="fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                <path
                  d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
              </svg>
            </kbutton>
          </div>
        </div>
      </div>
      <component id="pdfTemplate" :is="'script'" type="text/x-kendo-template">
        # var theDate = new Date(); #
        <div class="pdfFont container-fluid position-absolute top-0" style="margin-top: 18px;">
          <div class="row">
            <div class="col-sm d-flex align-items-center">
              <h2>CONST. SECO - Config. precios y consumos</h2>
            </div>
            <div class="col-sm">Las cantidades aquí expresadas no constituyen un cómputo que permita planificar el
              presupuesto de obra. Sólo aspira a lograr un valor de referencia. El cómputo de obra debe ser realizado
              por el profesional de obra.</div>
            <div class="col-sm-1"><small> #=kendo.toString(theDate, "dd.MM.yyyy", "es-AR")#</small> <br> <small><span
                  id="cod_cte"></span> <span id="dvc1listaprecvta"></span></small></div>
          </div>
          <div class="row" style="margin-top:15px; margin-bottom: 5px;">
            <div class="col-sm"></div>
            <div class="col-sm">Precios con IVA incluido, validos para la fecha indicada</div>
            <div class="col-sm-1"></div>
          </div>
          <div class="row">
            <div class="col-sm bg-secondary text-white d-flex align-items-center">
              <!-- <small><span id="configcs"></span></small> --><strong><span id="nombre_config_cs"></span></strong>
            </div>
            <div class="col-sm-3"></div>
            <div class="col-sm bg-secondary text-white d-flex align-items-center">Presupuesto aproximado para
              <strong><span id="cuadro2"></span>m<sup>2</sup></strong></div>
            <div class="col-sm-4"><small>Los precios incluyen dto. financiero del <span
                  id="descuentofinanciero"></span>%<br>Los precios incluyen dto. por volumen del <span
                  id="descuentopormonto"></span>%</small></div>
          </div>
          <div class="float-end" style="margin-top:-80px;margin-right: 18px;"><img src="../assets/Logotipo Nimat.png"
              height="80" /></div>
          <div class="row" style="margin-top:500px;">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col float-start">
              (1) Se adiciona un 10% a 30% para refuerzos según proyecto.<br>
              (2) Se adiciona % según proyecto.<br>
              (3) Valor aproximado, se recomienda computar sobre plano.<br>
              (4) Se podría considerar el mismo producto en otras presentaciones.<br>
              (5) Variable según los largos de las placas.<br>
              (6) No se han considerado desperdicios.<br>
            </div>
          </div>
        </div>
      </component>
      <datasource ref="remoteDataSourceConstSeco" :transport-read="readData" :schema-model-fields="schemaModelFields"
        :group="groupDefinition" :page-size='100'>
      </datasource>
      <grid ref="grid" :height="'95vh'" :data="'remoteDataSourceConstSeco'"
        :data-source-ref="'remoteDataSourceConstSeco'" :sortable-mode="'multiple'"
        :pageable-page-sizes="[5, 10, 15, 20, 25, 100]" :filterable="false" :filterable-extra="false"
        :reorderable="true" :resizable="true" :column-menu="false" :navigatable="true" :toolbar="toolbarTemplate"
        :allow-copy="true" :selectable="true" :auto-bind="false"
        :pdf-file-name="'Const. Seco - Config precios y consumos.pdf'" :pdf-all-pages="true" :pdf-avoid-links="true"
        :pdf-paper-size="'A4'" :pdf-margin-top="95" :pdf-margin-bottom="10" :pdf-margin-left="10" :pdf-margin-right="10"
        :pdf-landscape="true" :pdf-repeat-headers="true" :pdf-scale="0.5"
        :pdf-title="'Const. Seco - Config. precios y consumos'" :pdf-template="pdfTemplate" @pdfexport="pdfExport"
        @databound="dataBound">
        <grid-column field="nombre_art_lp" title="Articulo"></grid-column>
        <grid-column field="uni" title="Uni."></grid-column>
        <grid-column title="Cant. Item" :template="templateCantItem"></grid-column>
        <grid-column field="cant" title="Cant." :hidden="true"></grid-column>
        <grid-column title="Precio Contado c/IVA" :template="templatePrecioConver"></grid-column>
        <grid-column field="DCA1_POR_DESCUENTO" title="Dto. Cliente"></grid-column>
        <grid-column title="Precio Contado c/IVA c/Dto Cliente" :template="templateItemPrecioCliente2"
          :footer-template="footerPrecio"></grid-column>

        <!-- <grid-column :template="'&nbsp;'"></grid-column> -->
        <grid-column :template="'#:observacion#'"></grid-column>
        <!-- <grid-column :template="'&nbsp;'"></grid-column> -->

        <grid-column field="codptf" title="Código"></grid-column>
        <grid-column field="ARTS_NOMBRE" title="Articulo"></grid-column>
        <grid-column field="ARTS_UNIMED_STOCK" title="Uni."></grid-column>
        <grid-column title="Cantidad" :template="templateCantItemPTF"></grid-column>
        <grid-column title="Precio Contado" :template="templatePrecio2"></grid-column>
        <grid-column field="DCA1_POR_DESCUENTO" title="Dto. Cliente"></grid-column>
        <grid-column :template="dvc1listaprecvta" :hidden="true"></grid-column>
        <grid-column title="Item c/IVA y Dto Finan c/Dto Cliente PTF" :template="templateItemPrecio2"
          :footer-template="footerPrecio2"></grid-column>


        <grid-column field="ARTS_CLASIF_1" title="Art. Clasif." :hidden="true"></grid-column>
        <grid-column field="configcs" title="Config. CS" :hidden="true"></grid-column>
        <grid-column field="nombre_conf_cs" title="Config." :group-header-template="groupHeaderTemplate"
          :hidden="true"></grid-column>
        <grid-column :template="templateNombreConfCs" :hidden="true"></grid-column>
        <grid-column field="uni_lp_x_cada_uni_ptf" title="Uni LP x cada uni PTF" :hidden="true"></grid-column>
        <grid-column field="fracciona_uni_ptf" title="Fracciona Uni PTF" :filterable-multi="true"
          :hidden="true"></grid-column>

        <grid-column field="COD_CTE" title="Clasificador Clientes" :hidden="true"></grid-column>
        <grid-column field="ARPV_PRECIO_VTA" title="Precio Vta." :format="'{0:c}'" :hidden="true"></grid-column>
        <grid-column field="ARPV_MONEDA" title="Moneda" :hidden="true"></grid-column>
        <grid-column field="COTI_COTIZACION" title="Cotización" :hidden="true"></grid-column>
        <grid-column title="Precio c/IVA Dto Finan s/Dto Cliente PTF" :template="templatePrecio"
          :hidden="true"></grid-column>
        <grid-column title="Item c/IVA y Dto Finan s/Dto Cliente" :template="templateItemPrecioCliente"
          :hidden="true"></grid-column>
        <grid-column title="Precio c/IVA Dto Finan" :template="templatePrecioConver2" :hidden="true"></grid-column>
        <grid-column title="Item c/IVA y Dto Finan s/Dto Cliente PTF" :template="templateItemPrecio"
          :hidden="true"></grid-column>
      </grid>
      <div id="idpdftemplate">
        <div class="page-template">
          <div class="footer" style="margin-top:50px;margin-right: 15px;text-align:right;color:white;font-size: 14px;">
            <p>(1) Se adiciona un 10% a 30% para refuerzos seg&#250;n proyecto.</p>
            <p>(2) Se adiciona % seg&#250;n proyecto.</p>
            <p>(3) Valor aproximado, se recomienda computar sobre plano.</p>
            <p>(4) Se podría considerar el mismo producto en otras presentaciones.</p>
            <p>(5) Variable seg&#250;n los largos de las placas.</p>
            <p>(6) No se han considerado desperdicios.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-ES'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-ES'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
import { Button } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'

export default {
  name: 'ListaConstSeco',
  directives: {
    fullscreen,
  },
  components: {
    "grid": Grid,
    "grid-column": GridColumn,
    "datasource": DataSource,
    "kbutton": Button,
  },
  data: function () {
    return {
      fullscreen: false,
      teleport: true,
      pageOnly: true,
      m2: '1',
      title: 'Lista de precios - Const. Seco Config. precios y consumos',
      dataSource: ['remoteDataSourceConstSeco'],
      schemaModelFields: {
        ARTS_CLASIF_1: { type: 'string' },
        codptf: { type: 'string' },
        ARTS_NOMBRE: { type: 'string' },
        configcs: { type: 'string' },
        nombre_conf_cs: { type: 'string' },
        nombre_art_lp: { type: 'string' },
        uni_lp_x_cada_uni_ptf: { type: 'string' },
        cant: { type: 'numeric' },
        uni: { type: 'string' },
        fracciona_uni_ptf: { type: 'string' },
        observacion: { type: 'string' },
        COD_CTE: { type: 'string' },
        CIMP_TASA: { type: 'string' },
        COTI_COTIZACION: { type: 'numeric' },
        ARPV_MONEDA: { type: 'string' },
        ARPV_PRECIO_VTA: { type: 'numeric' },
        DCA1_POR_DESCUENTO: { type: 'string' },
        ARTS_UNIMED_STOCK: { type: 'string' },
        DVC1_LISTA_PRECVTA: { type: 'string' }
      },
      groupDefinition: {
        field: 'nombre_conf_cs',
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/listaconstseco`
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
    readData: function (e) {
      // console.log(store.state.token)
      var token = store.state.token
      var urlApi = this.UrlApiBase
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
    pdfExport: function () {

    },
    pdfTemplate: function (e) {
      var templateItem = kendo.template(kendo.jQuery('#pdfTemplate').html())
      return templateItem(e)
    },
    groupHeaderTemplate: function (e) {
      var groupTemplate = kendo.template('#=value#');
      return groupTemplate(e)
    },
    dataBound: function () {
      var grid = this.$refs.grid.kendoWidget();
      for (var i = 0; i < grid.columns.length; i++) {
        grid.autoFitColumn(i);
      }

      /* kendo.ui.Grid.prototype._positionColumnResizeHandle= function() {
      var that = this,
          indicatorWidth = that.options.columnResizeHandleWidth,
          lockedHead = that.lockedHeader ? that.lockedHeader.find("thead:first") : $();

      that.thead.add(lockedHead).on("mousemove" + ".kendoGrid", "th", function (e) {
        var th = $(this);
        if (th.hasClass("k-group-cell") || th.hasClass("k-hierarchy-cell")) {
          return;
        }
        that._createResizeHandle(th.closest("div"), th);
      });
      }; */
      const ultima_columna = document.querySelectorAll("span#idItemPrecioCliente2");
      var idem = [...ultima_columna].map(e => kendo.parseFloat(e.innerHTML));

      const ultima_columna2 = document.querySelectorAll("span#idItemPrecio2");
      var idem2 = [...ultima_columna2].map(e => kendo.parseFloat(e.innerHTML));

      const initialValue = 0;
      const sumWithInitial = idem.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      const sumWithInitial2 = idem2.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      var idItemTotal = document.getElementById('totalItemPrecioCliente2');
      var idItemTotal2 = document.getElementById('totalItemPrecio2');
      var itemTotal = idItemTotal.innerText = kendo.toString(sumWithInitial, "c")
      var itemTotal2 = idItemTotal2.innerText = kendo.toString(sumWithInitial2, "c")

      const idemCodCte = document.querySelector(".k-input-value-text:nth-child(1)").innerText
      var idCodCte = document.getElementById("cod_cte")
      var valCodCte = idCodCte.innerText = kendo.toString(idemCodCte)

      /* const idemConfigCs = document.querySelector("#form > div:nth-child(2) .k-input-value-text").innerText
      var idConfigCs = document.getElementById("configcs")
      var valConfigCs = idConfigCs.innerText = kendo.toString(idemConfigCs) */

      const idemNombreConfigCs = document.getElementById('nombreconfigcs').innerText
      var idNombreConfigCs = document.getElementById('nombre_config_cs')
      var valNombreConfigCs = idNombreConfigCs.innerText = kendo.toString(idemNombreConfigCs)

      const idemM2 = document.getElementById("numberM2").ariaValueNow
      var cuadroM2 = document.getElementById("cuadro2")
      var idemCuadroM2 = cuadroM2.innerText = kendo.toString(idemM2)

      const idemDtoFinan = document.getElementById("dtofinan").ariaValueNow
      var descuentofinanciero = document.getElementById("descuentofinanciero")
      var idemDescuentoFinanciero = descuentofinanciero.innerText = kendo.toString(idemDtoFinan, "p")

      const idemDtoxMonto = document.getElementById("dtoxmonto").ariaValueNow
      var descuentoxMonto = document.getElementById("descuentopormonto")
      var idemDescuentoxMonto = descuentoxMonto.innerText = kendo.toString(idemDtoxMonto, "p")

      const idemDvc1 = document.querySelector("#dvc1listaprevcta").innerText
      var dvc1listaprecvta = document.getElementById("dvc1listaprecvta")
      var idemdvc1listaprecvta = dvc1listaprecvta.innerText = kendo.toString(idemDvc1)
    },
    templateCantItem: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericM2 = gridElement.find('#numberM2');
      var m2 = numericM2.data("kendoNumericTextBox").value();
      var number = item.cant * m2
      return kendo.toString(number, "0.00");
    },
    templateCantItemPTF: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericM2 = gridElement.find('#numberM2');
      var m2 = numericM2.data("kendoNumericTextBox").value();
      var cantxm2 = item.cant * m2
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var cantitemptf = cantxm2 / unilpptf
      var cantitemptf2 = cantitemptf.toFixed(2) - Math.round(cantitemptf, 1)
      var masde1 = 1.00
      var return1 = kendo.toString(cantitemptf, "0.00")
      var return2 = kendo.toString(Math.round(cantitemptf.toFixed(2)), "0.00")
      var return3 = kendo.toString(Math.round(cantitemptf) + masde1, "0.00")
      var total = item.fracciona_uni_ptf == "SI" ? return1 : cantitemptf2 <= 0 ? return2 : cantitemptf2 > 0 ? return3 : null;
      return total
    },
    templatePrecioConver: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var PrecioIVAsDtoCl = ARPV_PRECIO_VTA * precio1 * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      var precioConver = PrecioIVAsDtoCl / unilpptf
      return kendo.toString(precioConver, "c3");
    },
    templatePrecioConver2: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var DCA1_POR_DESCUENTO = item.DCA1_POR_DESCUENTO
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var precio4 = agregaruna - DCA1_POR_DESCUENTO / 100
      var PrecioIVAcDtoCl = ARPV_PRECIO_VTA * precio1 * (DCA1_POR_DESCUENTO ? precio4 : agregaruna) * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      var precioConver = PrecioIVAcDtoCl / unilpptf
      return kendo.toString(precioConver, "c2");
    },
    templatePrecio: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var precioTotal = ARPV_PRECIO_VTA * precio1 * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      return kendo.toString(precioTotal, "c3")
    },
    templatePrecio2: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var DCA1_POR_DESCUENTO = item.DCA1_POR_DESCUENTO
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var precio4 = agregaruna - DCA1_POR_DESCUENTO / 100
      var precioTotal = ARPV_PRECIO_VTA * precio1 * (DCA1_POR_DESCUENTO ? precio4 : agregaruna) * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      return kendo.toString(precioTotal, "c3")
    },
    templateItemPrecio: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var numericM2 = gridElement.find('#numberM2');
      var m2 = numericM2.data("kendoNumericTextBox").value();
      var cantxm2 = item.cant * m2
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var cantitemptf = cantxm2 / unilpptf
      var cantitemptf2 = cantitemptf.toFixed(2) - Math.round(cantitemptf, 1)
      var masde1 = 1.00
      var return1 = kendo.toString(cantitemptf, "0.00")
      var return2 = kendo.toString(Math.round(cantitemptf.toFixed(2)), "0.00")
      var return3 = kendo.toString(Math.round(cantitemptf) + masde1, "0.00")
      var CantItemPTF = item.fracciona_uni_ptf == "SI" ? return1 : cantitemptf2 <= 0 ? return2 : cantitemptf2 > 0 ? return3 : null;
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var PrecioIVAsDtoPTF = ARPV_PRECIO_VTA * precio1 * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      var precioTotal = CantItemPTF * PrecioIVAsDtoPTF
      return kendo.toString(precioTotal, "c2");
    },
    templateItemPrecio2: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var numericM2 = gridElement.find('#numberM2');
      var m2 = numericM2.data("kendoNumericTextBox").value();
      var cantxm2 = item.cant * m2
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var cantitemptf = cantxm2 / unilpptf
      var cantitemptf2 = cantitemptf.toFixed(2) - Math.round(cantitemptf, 1)
      var masde1 = 1.00
      var return1 = kendo.toString(cantitemptf, "##.#")
      var return2 = kendo.toString(Math.round(cantitemptf.toFixed(2)), "##.#")
      var return3 = kendo.toString(Math.round(cantitemptf) + masde1, "##.#")
      var CantItemPTF = item.fracciona_uni_ptf == "SI" ? return1 : cantitemptf2 <= 0 ? return2 : cantitemptf2 > 0 ? return3 : null;
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var DCA1_POR_DESCUENTO = item.DCA1_POR_DESCUENTO
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var precio4 = agregaruna - DCA1_POR_DESCUENTO / 100
      var PrecioIVAcDtoPTF = ARPV_PRECIO_VTA * precio1 * (DCA1_POR_DESCUENTO ? precio4 : agregaruna) * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      var precioTotalItem = (CantItemPTF * PrecioIVAcDtoPTF)
      return '<span id="idItemPrecio2">' + kendo.htmlEncode(kendo.toString(precioTotalItem, "c2")) + '</span>'
    },
    templateItemPrecioCliente: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var numericM2 = gridElement.find('#numberM2');
      var m2 = numericM2.data("kendoNumericTextBox").value();
      var CantItem = item.cant * m2
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var PrecioIVAsDtoCl = ARPV_PRECIO_VTA * precio1 * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      var precioConver = PrecioIVAsDtoCl / unilpptf
      var precioTotal = CantItem * precioConver
      return kendo.toString(precioTotal, "c2");
    },
    templateItemPrecioCliente2: function (item) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      var numericDtoFinan = gridElement.find('#dtofinan');
      var numericDtoxMonto = gridElement.find('#dtoxmonto');
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var DtoMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var numericM2 = gridElement.find('#numberM2');
      var m2 = numericM2.data("kendoNumericTextBox").value();
      var CantItem = item.cant * m2
      var unilpptf = item.uni_lp_x_cada_uni_ptf
      var ARPV_PRECIO_VTA = item.ARPV_PRECIO_VTA;
      var CIMP_TASA = item.CIMP_TASA;
      var COTI_COTIZACION = item.COTI_COTIZACION;
      var DCA1_POR_DESCUENTO = item.DCA1_POR_DESCUENTO
      var agregaruna = 1
      var precio1 = agregaruna + CIMP_TASA / 100
      var precio2 = agregaruna - DtoFinan / 100
      var precio3 = agregaruna - DtoMonto / 100
      var precio4 = agregaruna - DCA1_POR_DESCUENTO / 100
      var PrecioIVAcDtoCl = ARPV_PRECIO_VTA * precio1 * (DCA1_POR_DESCUENTO ? precio4 : agregaruna) * precio2 * precio3 * (COTI_COTIZACION ? COTI_COTIZACION : agregaruna)
      var precioConver = PrecioIVAcDtoCl / unilpptf
      var precioTotal = CantItem * precioConver
      return '<span id="idItemPrecioCliente2">' + kendo.htmlEncode(kendo.toString(precioTotal, "c2")) + '</span>'
    },
    toolbarTemplate: function () {
      var templateHtml =
        '<div class="container-fluid">' +
        '<form id="form" class="requires-validation row align-items-end row-cols" novalidate>' +
        '<div class="col d-flex flex-column">' +
        '<label class="col-form-label" style="margin-right:5px">Perfil Comercial</label>' +
        '<input type="search" id="codcte" style="width: 150px" />' +
        '<div class="invalid-feedback">Falta completa este campo.</div>' +
        '</div>' +
        '<div class="col d-flex flex-column">' +
        '<label class="col-form-label" style="margin-right:5px">Código Config.</label>' +
        '<input type="search" id="codconfig" style="width: 300px" />' +
        '<div class="invalid-feedback">Falta completa este campo.</div>' +
        '</div>' +
        '<div class="col d-flex flex-column">' +
        '<label class="col-form-label" style="margin-right:5px">Dto. Financiero</label>' +
        '<input type="number" id="dtofinan" style="width: 150px" v-model.number="dtofinan" required/>' +
        '<div class="invalid-feedback">Falta completa este campo.</div>' +
        '</div>' +
        '<div class="col d-flex flex-column">' +
        '<label class="col-form-label" style="margin-right:5px">Dto. por monto</label>' +
        '<input class="is-valid" type="number" id="dtoxmonto" style="width: 150px" v-model.number="dtoxmonto" required/>' +
        '<div class="invalid-feedback">Falta completa este campo.</div>' +
        '</div>' +
        '<div class="col d-flex flex-column">' +
        '<label class="col-form-label" style="margin-right:5px">M<sup>2</sup></label>' +
        '<input class="is-valid" type="number" id="numberM2" style="width: 150px" required/>' +
        '<div class="invalid-feedback">Falta completa este campo.</div>' +
        '</div>' +
        '<div class="col d-flex">' +
        '<a class="k-pager-refresh k-link k-button play" type="submit" title="Ralizar conulta" style="margin-left:5px"><span class="k-icon k-i-play"></span></a>' +
        '<a class="k-pager-refresh k-link k-button filter-clear" title="Limpiar filtro" style="margin-left:5px"><span class="k-icon k-i-filter-clear"></span></a>' +
        '<a class="k-pager-refresh k-link k-button" title="Nueva consulta" onClick="window.location.reload();" style="margin-left:5px"><span class="k-icon k-i-file"></span></a>' +
        '<a class="k-pager-refresh k-link k-button k-button-icontext k-grid-pdf" style="margin-left:5px"><span class="k-icon k-i-pdf"></span></a>' +
        '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"style="margin-left:5px"><span class="k-icon k-i-reload"></span></a>' +
        '</div>' +
        '</form>' +
        '</div>';
      return kendo.template(templateHtml);
    },
    footerPrecio: function () {
      var templateHtml = '<span id="totalItemPrecioCliente2"></span>'
      return templateHtml
    },
    footerPrecio2: function () {
      var templateHtml = '<span id="totalItemPrecio2"></span>'
      return templateHtml
    },
    dvc1listaprecvta: function (item) {
      var templateDvc1 = '<span id="dvc1listaprevcta">' + item.DVC1_LISTA_PRECVTA + '</sapn>'
      return templateDvc1
    },
    templateNombreConfCs: function (item) {
      var templateNomConfCs = '<span id="nombreconfigcs">' + item.nombre_conf_cs + '</span>'
      return templateNomConfCs
    }
  },
  mounted: function () {
    var grid = this.$refs.grid.kendoWidget();
    var gridElement = grid.element;
    var dropDownElement = gridElement.find('#codcte');
    var toolbarElement = gridElement.find('.k-grid-toolbar');
    var numericDtoFinan = gridElement.find('#dtofinan');
    var numericM2 = gridElement.find('#numberM2');
    var numericDtoxMonto = gridElement.find('#dtoxmonto');
    var dropDownElement2 = gridElement.find('#codconfig');

    numericDtoFinan.kendoNumericTextBox({
      placeholder: "Entre 0 y 20",
      culture: "es-AR",
      format: "n0",
      min: 0,
      max: 20
    })

    numericM2.kendoNumericTextBox({
      placeholder: "Mínimo 1",
      culture: "es-AR",
      format: "n0",
      decimals: 0,
      min: 1
    })

    numericDtoxMonto.kendoNumericTextBox({
      placeholder: "Entre 0 y 3",
      culture: "es-AR",
      format: "n0",
      min: 0,
      max: 3
    })

    dropDownElement2.kendoDropDownList({
      dataTextField: "nombre_conf_cs",
      dataValueField: "cod_conf_cs",
      autoBind: true,
      optionLabel: "",
      dataSource: {
        transport: {
          read: {
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            url: `${process.env.VUE_APP_API_BASE}/constseconombresconfig`,
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
        transport: {
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

    toolbarElement.on("click", ".play", () => {
      var PerfilComercial = dropDownElement.data("kendoDropDownList").value();
      var CodigoConfig = dropDownElement2.data("kendoDropDownList").value();
      var DtoFinan = numericDtoFinan.data("kendoNumericTextBox").value();
      var classDtoFinan = document.querySelector("#form > div:nth-child(3) > .k-numerictextbox")
      var DtoxMonto = numericDtoxMonto.data("kendoNumericTextBox").value();
      var classDtoxMonto = document.querySelector("#form > div:nth-child(4) > .k-numerictextbox")
      var Cuadrado2 = numericM2.data("kendoNumericTextBox").value();
      var classCuadrado2 = document.querySelector("#form > div:nth-child(5) > .k-numerictextbox")
      var filter = { logic: "and", filters: [] };
      filter.filters.push(
        { field: "configcs", operator: "contains", value: CodigoConfig },
        { field: "COD_CTE", operator: "contains", value: PerfilComercial }
      );

      if (DtoFinan == null) {
        classDtoFinan.classList.add('is-invalid');
      } else if (DtoxMonto == null) {
        classDtoFinan.classList.remove('is-invalid');
        classDtoxMonto.classList.add('is-invalid');
      } else if (Cuadrado2 == null) {
        classDtoxMonto.classList.remove('is-invalid');
        classCuadrado2.classList.add('is-invalid');
      } else {
        classDtoFinan.classList.remove('is-invalid');
        classDtoxMonto.classList.remove('is-invalid');
        classCuadrado2.classList.remove('is-invalid');
        grid.dataSource.filter(filter);
      }
    });

    toolbarElement.on("click", ".filter-clear", function (e) {
      e.preventDefault();
      dropDownElement.data("kendoDropDownList").value(null);
      dropDownElement2.data("kendoDropDownList").value(null);
      grid.dataSource.sort({});
      grid.dataSource.filter({});
      grid.dataSource.autoFitColumn();
    })

    toolbarElement.on("click", ".k-grid-pdf", () => {
      grid.dataSource.read();
    })
  }
}
</script>

<style scoped>
.k-column-title {
  text-overflow: initial;
}

#cuadro2,
#descuentofinanciero,
#descuentopormonto,
#codcte,
#dvc1listaprecvta,
#configcs,
#nombre_config_cs {
  margin: 0px 5px;
}

.pdfFont {
  font-family: "DejaVu Sans", "Arial", sans-serif;
}

@font-face {
  font-family: "DejaVu Sans";
  src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf") format("truetype");
}

@font-face {
  font-family: "DejaVu Sans";
  font-weight: bold;
  src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf") format("truetype");
}

@font-face {
  font-family: "DejaVu Sans";
  font-style: italic;
  src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf") format("truetype");
}

@font-face {
  font-family: "DejaVu Sans";
  font-weight: bold;
  font-style: italic;
  src: url("https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf") format("truetype");
}
</style>