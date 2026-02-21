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
      <datasource ref="remoteDataSourceInformesAcindar" :transport-read="readData"
        :schema-model-fields="schemaModelFields" :aggregate="aggregateDefinition" :page-size='50'>
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceInformesAcindar'" :sortable="true"
        :pageable-page-sizes="[5, 10, 15, 20, 25, 100]" :filterable="true" :reorderable="true" :resizable="true"
        :groupable="true" :column-menu="true" :navigatable="true" :toolbar="toolbarTemplate" :allow-copy="true"
        :selectable="true" @databound="dataBound">
        <grid-column field="DEA" title="DEA"></grid-column>
        <grid-column field="SUCURSAL" title="SUCURSAL"></grid-column>
        <grid-column field="NRO_DOC_LEGAL" title=" N° DOC LEGAL"></grid-column>
        <grid-column field="TIPO_DOC_LEGAL" title="TIPO DOC LEGAL"></grid-column>
        <grid-column field="TIPO_DE_TRANSACCION" title="TIPO DE TRANSACCION"></grid-column>
        <grid-column field="ITEM_DOC_LEGAL" title="ITEM DOC LEGAL"></grid-column>
        <grid-column field="FECHA_DOC_LEGAL" title="FECHA DOC LEGAL"></grid-column>
        <grid-column field="NRO_DOC_REFERENCIA" title="N° DOC REFERENCIA"></grid-column>
        <grid-column field="TIPO_DOC_REF" title="TIPO DOC REF"></grid-column>
        <grid-column field="ITEM_DOC_REF" title="ITEM DOC REF"></grid-column>
        <grid-column field="FECHA_DOC_REF" title="FECHA DOC REF"></grid-column>
        <grid-column field="CUIT" title="CUIT"></grid-column>
        <grid-column field="NRO_INTERNO_CLIENTE" title="N° INTERNO CLIENTE"></grid-column>
        <grid-column field="RAZON_SOCIAL" title="RAZON SOCIAL"></grid-column>
        <grid-column field="SEGMENTO" title="SEGMENTO"></grid-column>
        <grid-column field="DIRECCION" title="DIRECCION"></grid-column>
        <grid-column field="CIUDAD" title="CIUDAD"></grid-column>
        <grid-column field="PROVINCIA" title="PROVINCIA"></grid-column>
        <grid-column field="CODIGO_ART" title="CODIGO ART"></grid-column>
        <grid-column field="DESCRIPCION" title="DESCRIPCION"></grid-column>
        <grid-column field="UMV" title="UMV"></grid-column>
        <grid-column field="CANTIDAD" title="CANTIDAD" :aggregates="['sum']" :footer-template="'#=sum#'"></grid-column>
        <grid-column field="MONTO" title="MONTO" :aggregates="['sum']" footer-template="#= kendo.toString(sum) #"
          format="{0:c2}"></grid-column>
        <grid-column field="FECHA_COSTO" title="FECHA COSTO"></grid-column>
        <grid-column field="DESCRIPCION_COND_VTA" title="DESCRIPCION COND VTA"></grid-column>
        <grid-column field="DIAS" title="DIAS"></grid-column>
        <grid-column field="OBSERVACION" title="OBSERVACION"></grid-column>
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
  name: 'ConsultaInformesAcindar',
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
      title: 'Informes de Acindar',
      schemaModelFields: {
        DEA: { type: 'string' },
        SUCURSAL: { type: 'string' },
        NRO_DOC_LEGAL: { type: 'string' },
        TIPO_DOC_LEGAL: { type: 'string' },
        TIPO_DE_TRANSACCION: { type: 'string' },
        ITEM_DOC_LEGAL: { type: 'string' },
        FECHA_DOC_LEGAL: { type: 'string' },
        NRO_DOC_REFERENCIA: { type: 'string' },
        TIPO_DOC_REF: { type: 'string' },
        ITEM_DOC_REF: { type: 'string' },
        FECHA_DOC_REF: { type: 'string' },
        CUIT: { type: 'string' },
        NRO_INTERNO_CLIENTE: { type: 'number' },
        RAZON_SOCIAL: { type: 'string' },
        SEGMENTO: { type: 'string' },
        DIRECCION: { type: 'string' },
        CIUDAD: { type: 'string' },
        PROVINCIA: { type: 'string' },
        CODIGO_ART: { type: 'string' },
        DESCRIPCION: { type: 'string' },
        UMV: { type: 'string' },
        CANTIDAD: { type: 'number' },
        MONTO: { type: 'number' },
        FECHA_COSTO: { type: 'string' },
        DESCRIPCION_COND_VTA: { type: 'string' },
        DIAS: { type: 'number' },
        OBSERVACION: { type: 'string' },
      },
      aggregateDefinition: [
        { field: "CANTIDAD", aggregate: "sum" },
        { field: "MONTO", aggregate: "sum" }
      ]
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/informesacindar`
    },
    token() {
      return decodeJwt(getToken()).token
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
      var tkn = this.token
      var urlApi = this.UrlApiBase
      kendo.jQuery.ajax({
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        contentType: 'application/json',
        success: function (data) {
          e.success(data)
        },
        method: 'GET',
        type: 'GET'
      })
    },
    toolbarTemplate: function () {
      var templateHtml =
        '<span id="form" style="position:absolute; left:5px">' +
        '<span>' +
        '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"><span class="k-icon k-i-reload"></span></a>' +
        '</span>' +
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
  }
}
</script>
<style></style>