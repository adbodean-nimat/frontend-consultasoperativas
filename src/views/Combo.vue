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
      <datasource ref="remoteDataSourceCombo" :transport-read="readData" :schema-model-fields="schemaModelFields"
        :page-size='100'>
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceCombo'" :sortable-mode="'multiple'"
        :sortable-allow-unsort="true" :sortable-show-indexes="true" :pageable-page-sizes="[50, 100, 200, 500]"
        :filterable="true" :reorderable="true" :resizable="true" :groupable="true" :column-menu="true"
        :navigatable="true" :toolbar="toolbarTemplate" :allow-copy="true" :selectable="true" @databound="dataBound">
        <grid-column field="Cod_Combo" title="Código Combo" width="50"></grid-column>
        <grid-column field="Nombre_combo" title="Nombre Combo" width="100"></grid-column>
        <grid-column field="Observacion_combo" title="Observación" width="100"></grid-column>
        <grid-column field="Cod_Articulo" title="Código Articulo" width="80"></grid-column>
        <grid-column field="Nombre_articulo" title="Nombre Articulo" width="100"></grid-column>
        <grid-column field="Cant_del_combo" title="Cantidad del combo"></grid-column>
        <grid-column field="StockUni" title="Stock Uni." :aggregates="['sum']"
          group-footer-template="#: sum == null ? '' : sum  #"></grid-column>
        <grid-column field="Uni_Pte_Entr_NP" title="Uni. Pte. Entrega NP" :aggregates="['sum']"
          group-footer-template="#: sum == null ? '' : sum  #"></grid-column>
        <grid-column field="Stock_Dispon" title="Stock Disponible" :aggregates="['sum']"
          group-footer-template="#: sum == null ? '' : sum  #"></grid-column>
        <grid-column field="Pre_Nomal_L1_Cdo" title="Precio Normal L1 Cdo."
          template="#: kendo.toString(Pre_Nomal_L1_Cdo, 'c2')#" :aggregates="['sum']"
          group-footer-template="#: kendo.toString(sum, 'c2')#"></grid-column>
        <grid-column field="Pre_Oferta_Cdo_x_Uni" title="Precio Oferta Cdo. por Uni."
          template="#: kendo.toString(Pre_Oferta_Cdo_x_Uni, 'c2')#" :aggregates="['sum']"
          group-footer-template="#: kendo.toString(sum, 'c2')#"></grid-column>
        <grid-column field="Desarmable" title="¿Desarmable?"></grid-column>
        <grid-column field="Vigente_desde" title="Fecha vigente desde"
          template="#: Vigente_desde == null ? '' : kendo.toString(kendo.parseDate(Vigente_desde, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
        <grid-column field="CMBA_FECHA_VIG_HASTA" title="Fecha vigente hasta"
          template="#: kendo.toString(kendo.parseDate(CMBA_FECHA_VIG_HASTA, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
        <grid-column field="Porcent_Dto_incluido_en_oferta" title="Dto. Incluido en Oferta"
          template="#: kendo.format('{0:p2}', Porcent_Dto_incluido_en_oferta / 100)#"></grid-column>
        <grid-column field="Stock_oferta" title="Stock Oferta"></grid-column>
      </grid>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
import { Button } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'

export default {
  name: 'ListaCombo',
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
      token: decodeJwt(getToken()).token,
      fullscreen: false,
      teleport: true,
      pageOnly: true,
      title: 'Lista de precios - Combo',
      schemaModelFields: {
        Cod_Combo: { type: 'number' },
        Nombre_combo: { type: 'string' },
        Observacion_combo: { type: 'string' },
        Cod_Articulo: { type: 'string' },
        Nombre_articulo: { type: 'string' },
        Cant_del_combo: { type: 'number' },
        StockUni: { type: 'number' },
        Uni_Pte_Entr_NP: { type: 'number' },
        Stock_Dispon: { type: 'number' },
        Pre_Nomal_L1_Cdo: { type: 'number' },
        Pre_Oferta_Cdo_x_Uni: { type: 'number' },
        Desarmable: { type: 'string' },
        Vigente_desde: { type: 'string' },
        CMBA_FECHA_VIG_HASTA: { type: 'date' },
        Porcent_Dto_incluido_en_oferta: { type: 'number' },
        Stock_oferta: { type: 'string' }
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/combo`
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
    dataBound: function () {
      var grid = this.$refs.grid.kendoWidget();
      for (var i = 0; i < grid.columns.length; i++) {
        grid.autoFitColumn(i);
      }
    },
    readData: function (e) {
      var token = this.token
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
    toolbarTemplate: function () {
      var templateHtml =
        '<span id="form" style="position:absolute; left:5px">' +
        '<span>' +
        '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"><span class="k-icon k-i-reload"></span></a>' +
        '</span>' +
        '<div id="switch" class="row align-items-center">' +
        '<div class="col">' +
        '<label style="margin: 0px 10px;" class="col-form-label">Vigencia ofertas</label>' +
        '<input id="vigencia-oferta" aria-label="Switch" />' +
        '</div>' +
        '</div>' +
        '</span>';
      return templateHtml;
    },
  },
  mounted: function () {
    var grid = this.$refs.grid.kendoWidget();
    var gridElement = grid.element;
    var toolbarElement = gridElement.find('.k-grid-toolbar');
    toolbarElement.on("click", ".refresh", function (e) {
      e.preventDefault();
      grid.dataSource.read();
    });

    var vigenciaOferta = gridElement.find('#vigencia-oferta');
    vigenciaOferta.kendoSwitch({
      size: 'small',
      change: (e) => {
        var checked = e.checked
        if (checked == true) {
          var filter = { logic: "and", filters: [] };
          filter.filters.push({ field: "CMBA_FECHA_VIG_HASTA", operator: "gte", value: kendo.parseDate(new Date(), 'dd-MM-yyyy') });
          filter.filters.push({ field: "CMBA_FECHA_VIG_HASTA", operator: "isnotnull" });
          filter.filters.push({ field: "Porcent_Dto_incluido_en_oferta", operator: "gt", value: 0 });
          grid.dataSource.filter(filter);
        }
        if (checked == false) {
          grid.dataSource.filter({})
        }
      }
    })
  }
}
</script>

<style></style>