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

      <datasource ref="remoteDataSourceFamilia" :transport-read="readData2" :transport-update="updateData2"
        :transport-destroy="destroyData2" :transport-create="createData2" :schema-model-id="'id'"
        :schema-model-fields="fields2" :batch="true" :page-size='200' @error="onError2" @requestend="requestEnd2">
      </datasource>

      <div id="windowForAssign">
        <grid ref="grid2" :height="'700px'" :data-source-ref="'remoteDataSourceFamilia'" :navigatable="true"
          :filterable="true" :resizable="true" :pageable="true" :sortable-mode="'multiple'"
          :sortable-allow-unsort="true" :sortable-show-indexes="true" :editable="'inline'"
          :toolbar="['create', 'search']">
          <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
          <grid-column :field="'nombre_fami_art'" :title="'Nombre Familia'"></grid-column>
          <grid-column :field="'nro_orden_de_la_fami'" :title="'Orden'"></grid-column>
          <grid-column :field="'set_ventas'" :title="'Set Ventas'" :editor="CodSetDropDownEditor"
            :template="'#= nombre_set #'" :filterable-multi="true" :filterable-search="true"
            :filterable-item-template="filterableItemTemplate"></grid-column>
          <grid-column :field="'nombre_set'" :title="'Nombre Set'" :hidden="true"></grid-column>
          <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
        </grid>
      </div>

      <datasource ref="remoteDataSourceSetVentas" :transport-read="readData3" :transport-update="updateData3"
        :transport-destroy="destroyData3" :transport-create="createData3" :schema-model-id="'id'"
        :schema-model-fields="fields3" :batch="true" :page-size='200' @error="onError3" @requestend="requestEnd3">
      </datasource>

      <div id="windowForAssign2">
        <grid ref="grid3" :height="'700px'" :data-source-ref="'remoteDataSourceSetVentas'" :navigatable="true"
          :filterable="true" :resizable="true" :pageable="true" :sortable-mode="'multiple'"
          :sortable-allow-unsort="true" :sortable-show-indexes="true" :editable="'inline'"
          :toolbar="['create', 'search']">
          <grid-column :field="'id'" :title="'Id'" :hidden="false"></grid-column>
          <grid-column :field="'nombre_set_art'" :title="'Nombre'"></grid-column>
          <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
        </grid>
      </div>

      <component :is="'script'" id="templateDropListFamilia" type="text/x-kendo-tmpl">
        <small> #: nombre_fami_art #</small>
      </component>

      <component :is="'script'" id="templateDropListSets" type="text/x-kendo-tmpl">
        <small> #= nombre_set_art #</small>
      </component>

      <datasource ref="remoteDataSourceVinculararticulosafamilia" :transport-read="readData"
        :transport-update="updateData" :transport-destroy="destroyData" :transport-create="createData"
        :transport-parameter-map="parameterMap" :schema-model-id="'cod'" :schema-model-fields="fields" :batch="true"
        :page-size='200' @error="onError" @requestend="requestEnd">
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceVinculararticulosafamilia'"
        :navigatable="true" :filterable="true" :resizable="true" :pageable="true"
        :pageable-page-sizes="[200, 300, 400, 500]" :sortable-mode="'multiple'" :sortable-allow-unsort="true"
        :sortable-show-indexes="true" :editable="'inline'"
        :toolbar="['create', { name: 'editar', text: 'Editar Familia', iconClass: 'k-icon k-i-edit' }, { name: 'editar2', text: 'Editar Sets Ventas', iconClass: 'k-icon k-i-edit' }, { name: 'refresh', text: '', iconClass: 'k-icon k-i-reload' }]">
        <grid-column :field="'cod'" :title="'Código'" :hidden="true"></grid-column>
        <grid-column :field="'cod_art'" :title="'Código Art.'" :width="100"></grid-column>
        <grid-column :field="'ARTS_NOMBRE'" :title="'Nombre'" :width="500"></grid-column>
        <grid-column :field="'orden_art_familia'" :title="'Nro. Orden Art.'"></grid-column>
        <grid-column :field="'cod_familia'" :title="'Grupo Familia '" :editor="CodFamiliaDropDownEditor"
          template="#= nombre_familia #" :filterable-multi="true" :filterable-search="true"
          :filterable-item-template="filterableItemTemplate2"></grid-column>
        <grid-column :field="'nombre_familia'" :title="'Nombre Familia'" :hidden="true"></grid-column>
        <grid-column :field="'nro_orden_de_la_fami'" :title="'Nro. Orden Familia'"></grid-column>
        <grid-column :field="'nombre_set'" :title="'Nombre Set'" :filterable-multi="true"
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
  name: 'SetsDeVentas',
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
      title: 'Tabla: Vincular articulo a familia',
      fields: {
        cod: { editable: false, type: 'number', nullable: true },
        cod_art: { editable: true, type: 'string' },
        ARTS_NOMBRE: { editable: false, type: 'string' },
        orden_art_familia: { editable: true, type: 'number' },
        cod_familia: { editable: true, type: 'string' },
        nombre_familia: { editable: false, type: 'string' },
        nro_orden_de_la_fami: { editable: false, type: 'number' },
        nombre_set: { editable: false, type: 'string' }
      },
      fields2: {
        id: { editable: false, type: 'number', nullable: true },
        nombre_fami_art: { type: 'string' },
        nro_orden_de_la_fami: { type: 'number' },
        set_ventas: { type: 'string' },
        nombre_set: { editable: false, type: 'string' }
      },
      fields3: {
        id: { editable: false, type: 'number' },
        nombre_set_art: { type: 'string' }
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/vinculararticulosafamilia/`
    },
    UrlApiBaseNombreFam() {
      return `${process.env.VUE_APP_API_BASE}/familiadearticulo/`
    },
    UrlApiBaseSetVentas() {
      return `${process.env.VUE_APP_API_BASE}/setsdeventas/`
    },
    UrlApiStocArts() {
      return `${process.env.VUE_APP_API_BASE}/stocarts/`
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
        return '<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="#: data.set_ventas #" /><span>#: data.nombre_set #</span></label></li>';
      }
    },
    filterableItemTemplate2: function (e) {
      if (e.field == "all") {
        return '<li class="k-item k-check-all-wrap"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md k-check-all"/>#: data.all #</label></div>';
      } else {
        return '<li class="k-item"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="#: data.cod_familia #" /><span>#: data.nombre_familia #</span></label></li>';
      }
    },
    readData: function (e) {
      var tkn = this.token
      var data1 = kendo.jQuery.ajax({
        url: this.UrlApiBase,
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
        url: this.UrlApiBaseNombreFam,
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
      var data3 = kendo.jQuery.ajax({
        url: this.UrlApiStocArts,
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
      var data4 = kendo.jQuery.ajax({
        url: this.UrlApiBaseSetVentas,
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

      kendo.jQuery.when(data1, data2, data3, data4).then(function (firstResponse, secondResponse, threeResponse, fourResponse) {
        var firstResult = firstResponse[0];
        var secondResult = secondResponse[0];
        var threeResult = threeResponse[0];
        var fourResult = fourResponse[0];

        var result = [];
        var result2 = [];

        for (var i = 0; i < firstResult.length; i++) {
          for (var j = 0; j < threeResult.length; j++) {
            if (firstResult[i].cod_art === threeResult[j].ARTS_ARTICULO_EMP)
              result.push({
                cod: firstResult[i].cod,
                cod_art: firstResult[i].cod_art,
                ARTS_NOMBRE: threeResult[j].ARTS_NOMBRE,
                orden_art_familia: firstResult[i].orden_art_familia,
                cod_familia: firstResult[i].cod_familia
              })
          }
        }

        for (var v = 0; v < result.length; v++) {
          result2.push({
            cod: result[v].cod,
            cod_art: result[v].cod_art,
            ARTS_NOMBRE: result[v].ARTS_NOMBRE,
            orden_art_familia: result[v].orden_art_familia,
            cod_familia: result[v].cod_familia,
            nombre_familia: secondResult.filter(codigo => codigo.id == result[v].cod_familia).map(data => data.nombre_fami_art),
            nro_orden_de_la_fami: secondResult.filter(codigo => codigo.id == result[v].cod_familia).map(data => data.nro_orden_de_la_fami),
            nombre_set: fourResult.filter(codigo => codigo.id == (secondResult.filter(codigo => codigo.id == result[v].cod_familia).map(data => data.set_ventas))).map(data => data.nombre_set_art)
          })
        }

        e.success(result2);
      });
    },
    updateData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      var id = kendo.stringify(e.data.models[0].cod);
      var data = kendo.stringify(e.data.models[0], ["cod_art", "orden_art_familia", "cod_familia", "cod_set_ventas"]);
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
      var id = kendo.stringify(e.data.models[0].cod);
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
      kendo.jQuery.ajax({
        method: 'POST',
        type: 'POST',
        url: urlApi,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success();
        },
        error: function (data) {
          e.error(data);
        },
        contentType: 'application/json; charset=utf-8',
        data: data,
      })
    },
    readData2: function (e) {
      var tkn = this.token
      var data1 = kendo.jQuery.ajax({
        url: this.UrlApiBaseNombreFam,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          e.success(data)
        },
        method: 'GET',
        type: 'GET'
      })
      var data2 = kendo.jQuery.ajax({
        url: this.UrlApiBaseSetVentas,
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
      kendo.jQuery.when(data1, data2).then(function (firstResponse, secondResponse) {
        var firstResult = firstResponse[0];
        var secondResult = secondResponse[0];
        var result = [];
        for (var i = 0; i < firstResult.length; i++) {
          result.push({
            id: firstResult[i].id,
            nombre_fami_art: firstResult[i].nombre_fami_art,
            nro_orden_de_la_fami: firstResult[i].nro_orden_de_la_fami,
            set_ventas: firstResult[i].set_ventas,
            nombre_set: secondResult.filter(codigo => codigo.id == firstResult[i].set_ventas).map(data => data.nombre_set_art)
          })
        }
        e.success(result);
      });

    },
    updateData2: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBaseNombreFam
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
      var urlApi = this.UrlApiBaseNombreFam
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
      var urlApi = this.UrlApiBaseNombreFam
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
    readData3: function (e) {
      var tkn = this.token
      kendo.jQuery.ajax({
        url: this.UrlApiBaseSetVentas,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          e.success(data)
        },
        method: 'GET',
        type: 'GET'
      })
    },
    updateData3: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBaseSetVentas
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
      var urlApi = this.UrlApiBaseSetVentas
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
      var data = kendo.stringify(e.data.models[0]);
      kendo.jQuery.ajax({
        type: 'POST',
        url: this.UrlApiBaseSetVentas,
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
      console.error(e.error);
    },
    requestEnd: function (e) {
      var type = e.type;
      //console.log(type + " => type");
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
    },
    onError2: function (e) {
      console.log(e.status);
      console.error(e.error);
    },
    requestEnd2: function (e) {
      var type = e.type;
      //console.log(type + " => type 2");
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
    },
    onError3: function (e) {
      console.log(e.status);
      console.error(e.error);
    },
    requestEnd3: function (e) {
      var type = e.type;
      //console.log(type + " => type 3");
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
    },
    parameterMap: function (options, operation) {
      if (operation !== 'read' && options.models) {
        return JSON.stringify(options.models)
      }
    },
    CodSetDropDownEditor: function (container, options) {
      kendo.jQuery('<input id="CodSetDropDownEditor" data-bind="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
        filter: "contains",
        autoBind: true,
        //optionLabel: "Set...",
        dataTextField: "nombre_set_art",
        dataValueField: "id",
        //valueTemplate: kendo.template(kendo.jQuery("#templateDropListSets").html()),
        //template: kendo.template(kendo.jQuery("#templateDropListSets").html()),
        noDataTemplate: '<span>Datos no encontrados.</span>',
        dataSource: {
          transport: {
            read: {
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              type: 'GET',
              url: this.UrlApiBaseSetVentas,
              headers: {
                'Authorization': 'Bearer ' + store.state.token
              }
            }
          },
          schema: {
            model: {
              id: "id",
              fields: {
                nombre_set_art: { type: "string" }
              }
            }
          },
          sort: {
            field: 'nombre_set_art',
            dir: 'asc'
          }
        }
      })
    },
    CodFamiliaDropDownEditor: function (container, options) {
      kendo.jQuery('<input data-bind="value:' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
        filter: "contains",
        autoBind: true,
        //optionLabel: "Familia...",
        dataTextField: "nombre_fami_art",
        dataValueField: "id",
        valueTemplate: kendo.jQuery("#templateDropListFamilia").html(),
        template: kendo.jQuery("#templateDropListFamilia").html(),
        noDataTemplate: '<span>Datos no encontrados.</span>',
        dataSource: {
          transport: {
            read: {
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              type: 'GET',
              url: this.UrlApiBaseNombreFam,
              headers: {
                'Authorization': 'Bearer ' + store.state.token
              }
            }
          },
          schema: {
            model: {
              id: "id",
              fields: {
                nombre_fami_art: { type: "string" },
                nro_orden_de_la_fami: { type: "string" }
              }
            }
          },
          sort: {
            field: 'nombre_fami_art',
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
      width: "1366px",
      height: '800px',
      modal: true,
      visible: false,
      resizable: true,
      title: 'Editar Familia'
    });

    kendoWindowAssign2.kendoWindow({
      width: "1366px",
      height: '800px',
      modal: true,
      visible: false,
      resizable: true,
      title: 'Editar Sets Ventas'
    });

    toolbarElement.on('click', '.k-grid-editar', (e) => {
      e.preventDefault();
      var popup = kendo.jQuery("#windowForAssign").data('kendoWindow');
      popup.open();
      popup.center();
      popup.bind("close", () => {
        e.preventDefault();
        this.$refs.remoteDataSourceFamilia.kendoDataSource.read();
        this.$refs.remoteDataSourceSetVentas.kendoDataSource.read();
        grid.dataSource.read();
      });
    });

    toolbarElement.on('click', '.k-grid-editar2', (e) => {
      e.preventDefault();
      var popup = kendo.jQuery("#windowForAssign2").data('kendoWindow');
      popup.open();
      popup.center();
      popup.bind("close", () => {
        e.preventDefault();
        this.$refs.remoteDataSourceFamilia.kendoDataSource.read();
        this.$refs.remoteDataSourceSetVentas.kendoDataSource.read();
        grid.dataSource.read();
      });
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
</style>