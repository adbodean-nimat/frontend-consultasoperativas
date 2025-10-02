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
      <datasource ref="remoteDataSourceListaPreciosCostoReposicion" :transport-read="readData"
        :schema-model-fields="schemaModelFields">
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceListaPreciosCostoReposicion'"
        :sortable-mode="'multiple'" :filterable="true" :reorderable="true" :resizable="true" :groupable="false"
        :column-menu="true" :navigatable="true" :toolbar="toolbarTemplate" :allow-copy="true" :selectable="false">
        <grid-column field="ARTS_ARTICULO_EMP" title="Código Arts." :width="100" :locked="true"></grid-column>
        <grid-column field="ARTS_NOMBRE" title="Nombre Arts." :width="400" :locked="true"></grid-column>
        <grid-column field="ARPV_ARTICULO" title="Articulo" :width="100"></grid-column>
        <grid-column field="ARPV_LISTA_PRECVTA" title="Numero de lista de precio" :width="100"></grid-column>
        <grid-column field="ARPV_PRECIO_VTA" title="Precio de venta" :width="100"></grid-column>
        <grid-column field="ARPV_MONEDA" title="Moneda del precio de venta" :width="100"></grid-column>
        <grid-column field="COTI_COTIZACION" title="Importe de cotizacion" :width="100"></grid-column>
        <grid-column field="CIMP_TASA" title="IVA" :width="100"></grid-column>
        <grid-column field="ARTS_CLASIF_2" title="Cod. Clasif. 2 " :width="100"></grid-column>
        <grid-column field="CA02_NOMBRE" title="Nombre Clasif. 2" :width="250"></grid-column>
        <grid-column field="ARTS_UNIMED_HOMSTO" title="Uni." :width="100"></grid-column>
        <grid-column field="ARTS_FACTOR_HOMSTO" title="Uni/M2" :width="100"></grid-column>
        <grid-column field="Precio_L100_pesos_SI" title="Precio L100 pesos sin IVA" :format="'{0:c}'"
          :width="100"></grid-column>
        <grid-column field="Pre_L100_pesos_con_IVA" title="Precio L100 pesos con IVA" :format="'{0:c}'"
          :width="100"></grid-column>
        <grid-column field="M2xCaja" title="M2 x Caja" :width="100"></grid-column>
        <grid-column field="Pre_M2_UN_L100_SI" title="Precio M2/UN L100 sin IVA" :format="'{0:c}'"
          :width="100"></grid-column>
        <grid-column field="Fecha_impresion" title="Fecha impresión" type="date" format="{0:dd/MM/yyyy}"
          :width="100"></grid-column>
        <grid-column field="Hora_impresion" title="Hora impresión" :width="100"></grid-column>
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
kendo.culture("es-AR")
export default {
  name: 'ListaPreciosCostoReposicion',
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
      title: 'Lista de precios 100 - Costo de reposición',
      schemaModelFields: {
        ARTS_ARTICULO_EMP: { type: 'string' },
        ARTS_NOMBRE: { type: 'string' },
        ARPV_ARTICULO: { type: 'string' },
        ARPV_LISTA_PRECVTA: { type: 'string' },
        ARPV_PRECIO_VTA: { type: 'string' },
        ARPV_MONEDA: { type: 'string' },
        COTI_COTIZACION: { type: 'string' },
        CIMP_TASA: { type: 'string' },
        ARTS_CLASIF_2: { type: 'string' },
        CA02_NOMBRE: { type: 'string' },
        ARTS_UNIMED_HOMSTO: { type: 'string' },
        ARTS_FACTOR_HOMSTO: { type: 'string' },
        Precio_L100_pesos_SI: { type: 'number' },
        Pre_L100_pesos_con_IVA: { type: 'number' },
        M2xCaja: { type: 'string' },
        Pre_M2_UN_L100_SI: { type: 'number' },
        Fecha_impresion: { type: 'date' },
        Hora_impresion: { type: 'string' }
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/listaprecioscostoreposicion`
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