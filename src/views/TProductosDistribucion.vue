<template>
  <div class="directive-fullscreen-wrapper">
    <div class="container-fluid page-grid">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil"
            viewBox="0 0 16 16">
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
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

      <component id="kendoDropDownListFooter" :is="'script'" type="text/x-kendo-tmpl">
        <!-- <div class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base m-1 agregar">
          <span class="k-icon k-i-plus k-button-icon"></span>
          <span class="k-button-text">Agregar</span>
        </div> -->
        <div id="buttoneditar">
          <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base m-1 editar">
            <span class="k-icon k-i-edit k-button-icon"></span>
            <span class="k-button-text">Editar</span>
          </button>
          <!-- <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base m-1 eliminar">
            <span class="k-icon k-i-close k-button-icon"></span>
            <span class="k-button-text">Eliminar</span>
          </button> -->
        </div>
      </component>

      <component :is="'script'" id="templateDropList" type="text/x-kendo-tmpl">
        <small> #: nombre_familia #</small>
      </component>

      <datasource ref="remoteDataSourceFamiliaDistribuciones" :transport-read="readData2"
        :transport-update="updateData2" :transport-destroy="destroyData2" :transport-create="createData2"
        :schema-model-id="'id'" :schema-model-fields="fields2" :batch="true" @error="onError2"
        @requestend="requestEnd2">
      </datasource>

      <div id="windowForAssign">
        <grid ref="grid2" :height="'700px'" :data-source-ref="'remoteDataSourceFamiliaDistribuciones'"
          :navigatable="true" :filterable="true" :sortable-mode="'multiple'" :sortable-allow-unsort="true"
          :sortable-show-indexes="true" :editable="'inline'" :toolbar="['create', 'search']">
          <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
          <grid-column :field="'nombre_familia'" :title="'Nombre Familia'"></grid-column>
          <grid-column :field="'orden_familia'" :title="'Orden'"></grid-column>
          <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
        </grid>
      </div>

      <datasource ref="remoteDataSourceRubros" :transport-read="readData3" :transport-update="updateData3"
        :transport-destroy="destroyData3" :transport-create="createData3" :schema-model-id="'id'"
        :schema-model-fields="fields3" :batch="true" @error="onError3" @requestend="requestEnd3">
      </datasource>

      <div id="windowForAssign2">
        <grid ref="grid3" :height="'700px'" :data-source-ref="'remoteDataSourceRubros'" :navigatable="true"
          :filterable="true" :sortable-mode="'multiple'" :sortable-allow-unsort="true" :sortable-show-indexes="true"
          :editable="'inline'" :toolbar="['create', 'search']">
          <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
          <grid-column :field="'rubros_id'" :title="'Código'"></grid-column>
          <grid-column :field="'rubros_nombres'" :title="'Nombre'"></grid-column>
          <grid-column :field="'orden_rubros'" :title="'Nro. Orden'"></grid-column>
          <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
        </grid>
      </div>

      <datasource ref="remoteDataSourceProductosDistribucion" :transport-read="readData" :transport-update="updateData"
        :transport-destroy="destroyData" :transport-create="createData" :transport-parameter-map="parameterMap"
        :schema-model-id="'id'" :schema-model-fields="fields" :batch="true" :page-size='100' @error="onError"
        @requestend="requestEnd">
      </datasource>

      <datasource ref="remoteDataSourceFamiliaDistribucion" :transport-read="readDataFamilia" :batch="true">
      </datasource>

      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceProductosDistribucion'" :groupable="true"
        :navigatable="true" :filterable="true" :pageable='true' :pageable-always-visible="false" :resizable="true"
        :sortable-mode="'multiple'" :sortable-allow-unsort="true" :sortable-show-indexes="true"
        @filtermenuinit="filterMenuInitSort" :editable="'inline'"
        :toolbar="['create', { name: 'editar', text: 'Editar Familia', iconClass: 'k-icon k-i-edit' }, { name: 'editar2', text: 'Editar Rubros Vtas', iconClass: 'k-icon k-i-edit' }, { name: 'refresh', text: '', iconClass: 'k-icon k-i-reload' }]">
        <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
        <grid-column :field="'Codigo_producto'" :title="'Código'" :width="150"></grid-column>
        <grid-column :field="'ARTS_NOMBRE'" :title="'Nombre'" :width="400"></grid-column>
        <grid-column :field="'Orden_producto'" :title="'Nro. Orden Art.'" :width="150"></grid-column>
        <!-- <grid-column :field="'Familia_producto'" :title="'Grupo familia'" :filterable-multi="true" :filterable-search="true" :width="350"></grid-column> -->
        <grid-column :field="'Cod_Familia_producto'" :title="'Grupo familia'" :editor="CodFamiliaDropDownEditor"
          :filterable-multi="true" :filterable-search="true" :filterable-item-template="filterableItemTemplate"
          :width="500" template="#= Familia_producto #"
          :group-header-template="groupHeaderTemplateFamilia"></grid-column>
        <grid-column :field="'Familia_orden'" :title="'Nro. Orden Familia'" :filterable-multi="true"
          :filterable-search="true" :width="150" :hidden="false"></grid-column>
        <grid-column :field="'Set_Familia'" :title="'Rubros'" :filterable-multi="true"
          :filterable-search="true"></grid-column>
        <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
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
  name: 'ProductospDistribucion',
  directives: {
    fullscreen,
  },
  components: {
    "grid": Grid,
    "grid-column": GridColumn,
    "datasource": DataSource,
    "kbutton": Button
  },
  data() {
    return {
      fullscreen: false,
      teleport: true,
      pageOnly: true,
      title: 'Tabla: Productos para Distribución',
      fields: {
        id: { editable: false, type: 'number', nullable: true },
        Codigo_producto: { editable: true, type: 'string' },
        ARTS_NOMBRE: { editable: false, type: 'string' },
        Orden_producto: { editable: true, type: 'number' },
        Cod_Familia_producto: { editable: true, type: 'string' },
        Familia_producto: { editable: false, type: 'string', defaultValue: '' },
        Familia_orden: { editable: false, type: 'number' },
        Set_Familia: { editable: false, type: 'string' }
      },
      fields2: {
        id: { editable: false, type: 'number', nullable: true },
        nombre_familia: { type: 'string' },
        orden_familia: { type: 'number' }
      },
      fields3: {
        id: { editable: false, type: 'number', nullable: true },
        rubros_id: { editable: false, type: 'string' },
        rubros_nombres: { editable: false, type: 'string' },
        orden_rubros: { type: 'number' },
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/productospdistribucion/`
    },
    UrlApiBaseFamiliaArt() {
      return `${process.env.VUE_APP_API_BASE}/familiaartdistribucion/`
    },
    UrlApiStocArts() {
      return `${process.env.VUE_APP_API_BASE}/stocarts/`
    },
    UrlApiFamiliaDistribuciones() {
      return `${process.env.VUE_APP_API_BASE}/familiadistribuciones/`
    },
    UrlApiRubros() {
      return `${process.env.VUE_APP_API_BASE}/rubrosventas/`
    },
    token() {
      return store.state.token
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
    filterableItemTemplate: function (e) {
      if (e.field == "all") {
        return '<li class="k-item k-check-all-wrap"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md k-check-all"/>#: data.all #</label></div>';
      } else {
        return '<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="#: data.Cod_Familia_producto #" /><span>#: data.Familia_producto #</span></label></li>';
      }
    },
    groupHeaderTemplateFamilia: function (e) {
      var groupTemplate = kendo.template('');
      return groupTemplate(e)
    },
    readData: function (e) {
      var tkn = this.token
      var urlApi1 = this.UrlApiBase
      var urlApi2 = this.UrlApiFamiliaDistribuciones
      var urlApi3 = this.UrlApiStocArts

      var data1 = kendo.jQuery.ajax({
        url: urlApi1,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          e.success(data)
        },
        method: 'GET',
        type: 'GET'
      });

      var data2 = kendo.jQuery.ajax({
        url: urlApi2,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        dataType: 'json',
        success: function (data) {
          e.success(data)
        },
        type: 'GET'
      });

      var data3 = kendo.jQuery.ajax({
        url: urlApi3,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        dataType: 'json',
        success: function (data) {
          e.success(data)
        },
        type: 'GET'
      });

      kendo.jQuery.when(data1, data2, data3).then(function (firstResponse, secondResponse, threeResponse) {
        var firstResult = firstResponse[0];
        var secondResult = secondResponse[0];
        var threeResult = threeResponse[0];

        var result = [];
        var result2 = [];

        for (var i = 0; i < firstResult.length; i++) {
          for (var j = 0; j < threeResult.length; j++) {
            if (firstResult[i].Codigo_producto === threeResult[j].ARTS_ARTICULO_EMP)
              result.push({
                id: firstResult[i].id,
                Codigo_producto: firstResult[i].Codigo_producto,
                ARTS_NOMBRE: threeResult[j].ARTS_NOMBRE,
                Orden_producto: firstResult[i].Orden_producto,
                Cod_Familia_producto: firstResult[i].Cod_Familia_producto,
              })
          }
        }

        for (var v = 0; v < result.length; v++) {
          result2.push({
            id: result[v].id,
            Codigo_producto: result[v].Codigo_producto,
            ARTS_NOMBRE: result[v].ARTS_NOMBRE,
            Orden_producto: result[v].Orden_producto,
            Cod_Familia_producto: result[v].Cod_Familia_producto,
            Familia_producto: secondResult.filter(codigo => codigo.id == result[v].Cod_Familia_producto).map(data => data.nombre_familia),
            Familia_orden: secondResult.filter(codigo => codigo.id == result[v].Cod_Familia_producto).map(data => data.orden_familia),
            Set_Familia: threeResult.filter(codigo => codigo.ARTS_ARTICULO_EMP == result[v].Codigo_producto).map(data => data.RUBV_NOMBRE)
          })
        }
        e.success(result2);
      });
    },
    readData2: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiFamiliaDistribuciones
      kendo.jQuery.ajax({
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        dataType: 'json',
        success: function (data) {
          e.success(data)
        },
        type: 'GET'
      })
    },
    readData3: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiRubros
      kendo.jQuery.ajax({
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        dataType: 'json',
        success: function (data) {
          e.success(data)
        },
        type: 'GET'
      })
    },
    readDataFamilia: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBaseFamiliaArt
      kendo.jQuery.ajax({
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        dataType: 'json',
        success: function (data) {
          e.success(data)
        },
        type: 'GET'
      })
    },
    updateData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      var id = kendo.stringify(e.data.models[0].id);
      var data = kendo.stringify(e.data.models[0]);
      kendo.jQuery.ajax({
        type: 'PUT',
        url: urlApi + id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8',
        data: data
      })
    },
    destroyData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      var id = kendo.stringify(e.data.models[0].id);
      kendo.jQuery.ajax({
        method: 'DELETE',
        type: 'DELETE',
        url: urlApi + id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8'
      })
    },
    createData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      var data = kendo.stringify(e.data.models[0]);
      console.log(data)
      kendo.jQuery.ajax({
        type: 'POST',
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8',
        data: data
      })
    },
    updateData2: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiFamiliaDistribuciones
      var id = kendo.stringify(e.data.models[0].id);
      var data = kendo.stringify(e.data.models[0]);
      kendo.jQuery.ajax({
        type: 'PUT',
        url: urlApi + id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8',
        data: data
      })
    },
    destroyData2: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiFamiliaDistribuciones
      var id = kendo.stringify(e.data.models[0].id);
      kendo.jQuery.ajax({
        method: 'DELETE',
        type: 'DELETE',
        url: urlApi + id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8'
      })
    },
    createData2: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiFamiliaDistribuciones
      var data = kendo.stringify(e.data.models[0]);
      kendo.jQuery.ajax({
        type: 'POST',
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8',
        data: data
      })
    },
    updateData3: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiRubros
      var id = kendo.stringify(e.data.models[0].id);
      var data = kendo.stringify(e.data.models[0]);
      kendo.jQuery.ajax({
        type: 'PUT',
        url: urlApi + id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8',
        data: data
      })
    },
    destroyData3: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiRubros
      var id = kendo.stringify(e.data.models[0].id);
      kendo.jQuery.ajax({
        method: 'DELETE',
        type: 'DELETE',
        url: urlApi + id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8'
      })
    },
    createData3: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiRubros
      var data = kendo.stringify(e.data.models[0]);
      kendo.jQuery.ajax({
        type: 'POST',
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json; charset=utf-8',
        data: data
      })
    },
    onError: function (e) {
      console.log(e.status);
      console.log(e.error);
    },
    requestEnd: function (e) {
      var response = e.response;
      var type = e.type;
      console.log(type + " => type");
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
    },
    onError2: function (e) {
      console.log(e.status);
      console.log(e.error);
    },
    requestEnd2: function (e) {
      var type = e.type;
      console.log(type + " => type 2");
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
    },
    onError3: function (e) {
      console.log(e.status);
      console.log(e.error);
    },
    requestEnd3: function (e) {
      var type = e.type;
      console.log(type + " => type 3");
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
    },
    filterMenuInitSort: function (e) {
      var grid = this.$refs.grid.kendoWidget();
      var gridElement = grid.element;
      if (e.field === "Cod_Familia_producto") {
        var filterMultiCheck = gridElement.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
        filterMultiCheck.container.empty();
        filterMultiCheck.checkSource.sort({ field: e.field, dir: "asc" });
        filterMultiCheck.checkSource.filter([])
        filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
        filterMultiCheck.createCheckBoxes();
      }
    },
    parameterMap: function (options, operation) {
      if (operation !== 'read' && options.models) {
        return JSON.stringify(options.models)
      }
    },
    templateSetFamilia: function (item) {
      var itemFamilia = item.Familia_producto
      var dataSourceFamiliaDistribucion = this.$refs.remoteDataSourceFamiliaDistribuciones.kendoWidget();
      dataSourceFamiliaDistribucion.filter({ field: 'nombre_familia', operator: 'eq', value: itemFamilia });
      var data = dataSourceFamiliaDistribucion.view()
      var dataFamilia = data.length === 0 ? '' : data[0].nombre_set_art
      return kendo.toString(dataFamilia)
    },
    CodFamiliaDropDownEditor: function (container, options) {
      var grid = this.$refs.grid.kendoWidget();

      kendo.jQuery('<input id="CodFamiliaDropDownEditor" data-bind="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
        filter: "contains",
        autoBind: true,
        // optionLabel: "Familia...",
        dataTextField: "nombre_familia",
        dataValueField: "id",
        valueTemplate: kendo.jQuery("#templateDropList").html(),
        template: kendo.jQuery("#templateDropList").html(),
        footerTemplate: kendo.jQuery('#kendoDropDownListFooter').html(),
        open: function (e) {
          var listFooter = kendo.jQuery(e.sender.footer)
          listFooter.on('click', '.editar', function () {
            var popup = kendo.jQuery("#windowForAssign").data('kendoWindow');
            popup.open();
            popup.center();
            popup.bind("close", () => {
              e.preventDefault();
              grid.dataSource.read();
            })
          })
        },
        noDataTemplate: '<span>Datos no encontrados.</span>',
        dataSource: {
          transport: {
            read: {
              contentType: 'application/json',
              dataType: 'json',
              type: 'GET',
              url: this.UrlApiFamiliaDistribuciones,
              headers: {
                'Authorization': 'Bearer ' + store.state.token
              }
            }
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "string" },
                nombre_familia: { type: "string" },
                orden_familia: { type: "number" }
              }
            }
          },
          sort: {
            field: 'nombre_familia',
            dir: 'asc'
          }
        }
      });
    },
    FamiliaDropDownEditor: function (container, options) {
      kendo.jQuery('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
        filter: "contains",
        autoBind: false,
        dataTextField: "nombre_familia",
        dataValueField: "nombre_familia",
        dataSource: {
          transport: {
            read: {
              contentType: 'application/json',
              dataType: 'json',
              type: 'GET',
              url: this.UrlApiFamiliaDistribuciones,
              headers: {
                'Authorization': 'Bearer ' + store.state.token
              }
            }
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                nombre_familia: { type: "string" },
                orden_familia: { type: "number" }
              }
            }
          },
          sort: {
            field: 'nombre_familia',
            dir: 'asc'
          }
        }
      })
    }
  },
  mounted() {
    var grid = this.$refs.grid.kendoWidget();
    var gridElement = grid.element;
    var toolbarElement = gridElement.find('.k-grid-toolbar');

    var kendoWindowAssign = kendo.jQuery("#windowForAssign");
    var kendoWindowAssign2 = kendo.jQuery("#windowForAssign2");

    kendoWindowAssign.kendoWindow({
      width: "1200px",
      height: '800px',
      modal: true,
      visible: false,
      resizable: true,
      title: 'Editar Familia'
    });

    kendoWindowAssign2.kendoWindow({
      width: "1200px",
      height: '800px',
      modal: true,
      visible: false,
      resizable: true,
      title: 'Editar Rubros Ventas'
    });

    toolbarElement.on('click', '.k-grid-editar', (e) => {
      e.preventDefault();
      var popup = kendo.jQuery("#windowForAssign").data('kendoWindow');
      popup.open();
      popup.center();
      popup.bind("close", () => {
        e.preventDefault();
        this.$refs.remoteDataSourceFamiliaDistribuciones.kendoDataSource.read();
        grid.dataSource.read();
      })
    });

    toolbarElement.on('click', '.k-grid-editar2', (e) => {
      e.preventDefault();
      var popup = kendo.jQuery("#windowForAssign2").data('kendoWindow');
      popup.open();
      popup.center();
    });

    toolbarElement.on("click", ".k-grid-refresh", (e) => {
      e.preventDefault();
      grid.dataSource.read();
    });
  }
}
</script>

<style>
.k-grid td {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.k-no-data {
  display: table;
  width: 100%;
  padding-top: 20px;
}
</style>