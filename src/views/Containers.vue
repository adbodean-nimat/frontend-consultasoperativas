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
      <datasource ref="remoteDataSourceContainers" :transport-read="readData" :schema-model-fields="schemaModelFields"
        :aggregate="aggregateDefinition" :page-size='50'>
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceContainers'" :sortable="true"
        :pageable-page-sizes="[5, 10, 15, 20, 25, 100]" :filterable="true" :reorderable="true" :resizable="true"
        :groupable="true" :column-menu="true" :navigatable="true" :toolbar="toolbarTemplate" :allow-copy="true"
        :selectable="true">
        <grid-column field="Movimientos" title="¿Movimientos?" :width="140" :filterable-multi="true" :locked="true"
          :footer-template="'Total'"></grid-column>
        <grid-column field="Longitud" title="Longitud" :width="100" :filterable-multi="true"
          :locked="true"></grid-column>
        <grid-column field="Tipo" title="Tipo" :width="100" :filterable-multi="true" :locked="true"></grid-column>
        <grid-column field="Cód_Art" title="Cód Art" :width="100" :locked="true"></grid-column>
        <grid-column field="Nombre_art" title="Nombre art" :width="340" :locked="true"></grid-column>
        <grid-column field="Stock_Uni" title="Stock Uni" :width="120" :aggregates="['sum']"
          :footer-template="'#=sum#'"></grid-column>
        <grid-column field="Uni_Pte_Entr_NP" title="Uni_Pte_Entr_NP" :filterable-multi="true" :width="120"
          :aggregates="['sum']" :footer-template="'#=sum#'"></grid-column>
        <grid-column field="Stk_Disp_pVta" title="Stk Disp p/Vta" :filterable-multi="true" :width="120"
          :aggregates="['sum']" :footer-template="'#=sum#'"></grid-column>
        <grid-column field="Pre_Cdo_USD_con_IVA" title="Pre Cdo USD con IVA" :width="120"
          :format="'{0:c}'"></grid-column>
        <grid-column field="Pre_Cdo_AR_cIVA_L1" title="Pre Cdo AR c/IVA L1" :width="120"
          :format="'{0:c}'"></grid-column>
        <grid-column field="Cant_Mov_Nro" title="Cant Mov Nro" :width="120" :filterable-multi="true"></grid-column>
        <grid-column field="Precio_ARxmov_01500026" title="Precio AR$ x mov 01500026" :width="120"
          :format="'{0:c}'"></grid-column>
        <grid-column field="Total_mov" title="Total mov" :width="120" :format="'{0:c}'"></grid-column>
        <grid-column field="Contenedor_c_mov_AR_cdo_efect" title="Contenedor c/ mov AR$ cdo efect" :width="120"
          :format="'{0:c}'"></grid-column>
        <grid-column field="Depósito" title="Depósito" :width="120" :filterable-multi="true"></grid-column>
        <grid-column field="Moneda_del_Precio_Lista_en_USD" title="Moneda del Precio Lista en USD"
          :width="250"></grid-column>
        <grid-column field="Cotización" title="Cotización" :width="120" :format="'{0:c}'"></grid-column>
        <grid-column field="IVA_incluido_en_precio" title="IVA incluido en precio" :width="120"></grid-column>
        <grid-column field="Año_de_fabricación" title="Año de fabricación" :filterable-multi="true"
          :width="120"></grid-column>
        <grid-column field="Peso_aprox_Kg" title="Peso aprox Kg" :width="120"></grid-column>
        <grid-column field="Nro_cliente" title="Nro. cliente" :filterable-multi="true" :width="120"></grid-column>
        <grid-column field="Nombre_Cliente" title="Nombre Cliente" :filterable-multi="true" :width="300"></grid-column>
        <grid-column field="Observación_NP" title="Observación NP" :width="600"></grid-column>
        <grid-column field="Vendedor" title="Vendedor" :filterable-multi="true" :width="150"></grid-column>
        <grid-column field="Medidas_interiores" title="Medidas Interiores" :width="400"></grid-column>

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

export default {
  name: 'ListaContainers',
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
      title: 'Lista de precios - Containers',
      schemaModelFields: {
        Movimientos: { type: 'string' },
        Longitud: { type: 'string' },
        Tipo: { type: 'string' },
        Cód_Art: { type: 'string' },
        Nombre_art: { type: 'string' },
        Stock_Uni: { type: 'number' },
        Uni_Pte_Entr_NP: { type: 'number' },
        Stk_Disp_pVta: { type: 'number' },
        Pre_Cdo_USD_con_IVA: { type: 'number' },
        Pre_Cdo_AR_cIVA_L1: { type: 'number' },
        Cant_Mov_Nro: { type: 'number' },
        Precio_ARxmov_01500026: { type: 'number' },
        Total_mov: { type: 'number' },
        Contenedor_c_mov_AR_cdo_efect: { type: 'number' },
        Depósito: { type: 'string' },
        Moneda_del_Precio_Lista_en_USD: { type: 'string' },
        Cotización: { type: 'number' },
        IVA_incluido_en_precio: { type: 'string' },
        Año_de_fabricación: { type: 'string' },
        Peso_aprox_Kg: { type: 'number' },
        Nro_cliente: { type: 'number' },
        Nombre_Cliente: { type: 'string' },
        Observación_NP: { type: 'string' },
        Vendendor: { type: 'string' },
        Medidas_interiores: { type: 'string' }
      },
      aggregateDefinition: [
        { field: "Stock_Uni", aggregate: "sum" },
        { field: "Uni_Pte_Entr_NP", aggregate: "sum" },
        { field: "Stk_Disp_pVta", aggregate: "sum" }
      ]
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/listacontenedores`
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
      var urlApi = `${process.env.VUE_APP_API_BASE}/listacontenedores`
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