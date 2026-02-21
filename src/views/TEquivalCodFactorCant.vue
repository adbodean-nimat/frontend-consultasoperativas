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
      <div id="windowpopup">
        <div>
          <div class="row g-3 p-3 align-items-center">
            <div class="col">
              <label for="" class="col-form-label">Exclusión Clasif. 5</label>
              <input id="inputClasif5" value="">
            </div>
          </div>

          <div class="row g-3 p-3 align-items-center">
            <div class="col">
              <label for="" class="col-form-label">Inclusión Clasif. 6</label>
              <input id="inputClasif6" value="">
            </div>
          </div>

          <div class="row g-3">
            <button id="guardar" class="guardar btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
      <datasource ref="remoteDataSourceStockArts" :transport-read="readDataStockArts" :batch="true"></datasource>
      <div id="windowGridFaltante">
        <grid ref="grid2" :height="'700px'" :data-source-ref="'remoteDataSourceStockArts'" :navigatable="true"
          :filterable="true" :sortable-mode="'multiple'" :sortable-allow-unsort="true" :sortable-show-indexes="true">
          <grid-column :field="'ARTS_ARTICULO_EMP'" :title="'Código PTF'"></grid-column>
          <grid-column :field="'ARTS_NOMBRE'" :title="'Nombre'"></grid-column>
          <grid-column :field="'ARVE_BLOQUEO_VENTA'" :title="'Comentarios'"></grid-column>
        </grid>
      </div>
      <datasource ref="remoteDataSourceEquivalCodFactorCant" :transport-read="readData" :transport-update="updateData"
        :transport-destroy="destroyData" :transport-create="createData" :transport-parameter-map="parameterMap"
        :schema-model-id="'id'" :schema-model-fields="fields" :batch="true" :page-size='500' @error="onError"
        @requestend="requestEnd">
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceEquivalCodFactorCant'" :navigatable="true"
        :filterable="true" :pageable='true' :pageable-always-visible="false" :sortable-mode="'multiple'"
        :sortable-allow-unsort="true" :sortable-show-indexes="true" :editable="'inline'"
        :toolbar="['create', { name: 'editar', text: 'Filtro', iconClass: 'k-icon k-i-edit' }, { name: 'faltante', text: 'Ver art. faltantes', iconClass: 'k-icon k-i-data' }, { template: descripcionResumen }]">
        <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
        <grid-column :field="'codigo_ptf'" :title="'Código Plataforma'" :width="150"></grid-column>
        <grid-column :field="'nombre_ptf'" :title="'Nombre PTF'" :width="500"></grid-column>
        <grid-column :field="'codigo_acindar'" :title="'Código para Acindar'"></grid-column>
        <grid-column :field="'nombre_acindar'" :title="'Nombre Acindar'" :width="500"></grid-column>
        <grid-column :field="'factor_cant'" :title="'Factor conver. cant.'"></grid-column>
        <grid-column :field="'obvs_ptf'" :title="'Comentarios'"></grid-column>
        <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
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
  name: 'EquivalCodFactorCant',
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
      title: 'Tabla: Equival. Cod. y Factor Cant.',
      fields: {
        id: { editable: false, nullable: true },
        codigo_ptf: { type: 'string' },
        nombre_ptf: { type: 'string', editable: false },
        codigo_acindar: { type: 'string' },
        nombre_acindar: { type: 'string' },
        factor_cant: { type: 'string' },
        obvs_ptf: { type: 'string', editable: false }
      },
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/acindarequivalcodfactorcant/`
    },
    UrlApiBaseStockArts() {
      return `${process.env.VUE_APP_API_BASE}/stockartsall/`
    },
    UrlApiBaseFiltroPTF() {
      return `${process.env.VUE_APP_API_BASE}/filtroacindarplataforma/`
    },
    UrlApiBaseClasif5() {
      return `${process.env.VUE_APP_API_BASE}/stockartsclasif5/`
    },
    UrlApiBaseClasif6() {
      return `${process.env.VUE_APP_API_BASE}/stockartsclasif6/`
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
  created() {
    this.getFiltroPTF();
  },
  methods: {
    async getFiltroPTF() {
      var token = this.token;
      const res = await fetch(this.UrlApiBaseFiltroPTF, { method: 'GET', headers: { Authorization: `Basic ${token}` } });
      const data = await res.json();
      kendo.jQuery('#inputClasif5').data("kendoMultiSelect").value(data[0].clasif5_exc['c5_e']);
      kendo.jQuery('#inputClasif6').data("kendoMultiSelect").value(data[0].clasif6_inc['c6_i']);
    },
    readData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      var urlApiStockArts = this.UrlApiBaseStockArts
      var data1 = kendo.jQuery.ajax({
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
      });
      var data2 = kendo.jQuery.ajax({
        url: urlApiStockArts,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        contentType: 'application/json',
        success: function (data) {
          e.success(data)
        },
        method: 'GET',
        type: 'GET'
      });
      kendo.jQuery.when(data1, data2).then((response1, response2) => {
        var data1 = response1[0];
        var data2 = response2[0];
        var result = [];
        for (let i = 0; i < data1.length; i++) {
          result.push({
            id: data1[i].id,
            codigo_ptf: data1[i].codigo_ptf,
            nombre_ptf: data2.filter(item => item.ARTS_ARTICULO_EMP == data1[i].codigo_ptf).map(data => data.ARTS_NOMBRE),
            codigo_acindar: data1[i].codigo_acindar,
            nombre_acindar: data2.filter(item => item.ARTS_ARTICULO_EMP == data1[i].codigo_acindar).map(data => data.ARTS_NOMBRE),
            factor_cant: data1[i].factor_cant,
            obvs_ptf: (data2.filter(item => item.ARTS_ARTICULO_EMP == data1[i].codigo_ptf).map(data => data.ARVE_BLOQUEO_VENTA)) == 1 ? 'Bloqueado para la venta.' : data2.filter(item => item.ARTS_ARTICULO_EMP == data1[i].codigo_ptf).map(data => data.ARTS_NOMBRE) == '' ? 'Este art. está excluido por filtro o PTF.' : ''
          })
        }
        e.success(result);
      })
    },
    readDataStockArts: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBaseStockArts
      var urlApi2 = this.UrlApiBase
      var data1 = kendo.jQuery.ajax({
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
      });
      var data2 = kendo.jQuery.ajax({
        url: urlApi2,
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
      kendo.jQuery.when(data1, data2).then((response1, response2) => {
        var data1 = response1[0];
        var data2 = response2[0];
        var totalfalta = data1.length - data2.length
        var resumen = 'Total: PTF: ' + data1.length + ' - ' + 'Acindar: ' + data2.length + ' - ' + 'Faltantes: ' + totalfalta
        kendo.jQuery("#resumen").append(resumen);
        var result = [];
        for (var i = 0; i < data1.length; i++) {
          result.push({
            ARTS_ARTICULO_EMP: data1[i].ARTS_ARTICULO_EMP,
            ARTS_NOMBRE: data1[i].ARTS_NOMBRE,
            ARVE_BLOQUEO_VENTA: data1[i].ARVE_BLOQUEO_VENTA == 1 ? 'Bloqueado para la venta.' : '',
            ARTS_ACINDAR: data2.some(item => item.codigo_ptf == data1[i].ARTS_ARTICULO_EMP)
          })
        }
        var result2 = result.filter(item => item.ARTS_ACINDAR == false).map(data => data)
        e.success(result2)
      });
    },
    descripcionResumen: function () {
      var templateHTML = '<span id="resumen"></div>';
      return templateHTML
    },
    updateData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      kendo.jQuery.ajax({
        method: 'PUT',
        type: 'PUT',
        url: urlApi + e.data.models[0].id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success()
        },
        error: function (data) {
          e.error(data)
        },
        data: kendo.stringify(e.data.models[0]),
        contentType: 'application/json',
      })
    },
    destroyData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      kendo.jQuery.ajax({
        method: 'DELETE',
        type: 'DELETE',
        url: urlApi + e.data.models[0].id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        contentType: 'application/json',
      })
    },
    createData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      kendo.jQuery.ajax({
        method: 'POST',
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
        contentType: 'application/json',
        data: kendo.stringify(e.data.models[0]),
      })
    },
    onError: function (e) {
      console.log(e.status);
      console.error(e.error);
    },
    requestEnd: function (e) {
      var response = e.response;
      var type = e.type;
      //console.log(type + " => type");
      if (type == "create") {
        e.sender.read();
        kendo.jQuery("#resumen").empty();
        this.$refs.remoteDataSourceStockArts.kendoDataSource.read();
      }
      if (type == "destroy") {
        e.sender.read();
        kendo.jQuery("#resumen").empty();
        this.$refs.remoteDataSourceStockArts.kendoDataSource.read();
      }
    },
    parameterMap: function (options, operation) {
      if (operation !== 'read' && options.models) {
        return JSON.stringify(options.models)
      }
    }
  },
  mounted() {
    //this.$refs.remoteDataSourceStockArts.kendoDataSource.fetch();
    var grid = this.$refs.grid.kendoWidget();
    var gridElement = grid.element;
    var toolbarElement = gridElement.find('.k-grid-toolbar');
    var kendoWindowPopup = kendo.jQuery("#windowpopup");
    var kendoWindowFaltante = kendo.jQuery("#windowGridFaltante");

    kendoWindowFaltante.kendoWindow({
      width: "1200px",
      height: '800px',
      modal: true,
      visible: false,
      resizable: true,
      title: 'Art. faltante'
    });

    kendoWindowPopup.kendoWindow({
      width: "500px",
      modal: true,
      visible: false,
      height: 'auto',
      resizable: false,
      title: 'Filtro Art. Plataforma'
    });

    kendo.jQuery('#inputClasif5').kendoMultiSelect({
      dataSource: {
        transport: {
          read: {
            url: this.UrlApiBaseClasif5,
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          }
        }
      },
      dataTextField: "CA05_CLASIF_5",
      dataValueField: "CA05_CLASIF_5",
      itemTemplate: '<span>#: CA05_CLASIF_5 # - #: CA05_NOMBRE #</span>'
    });

    kendo.jQuery('#inputClasif6').kendoMultiSelect({
      dataSource: {
        transport: {
          read: {
            url: this.UrlApiBaseClasif6,
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          }
        }
      },
      dataTextField: "CA06_CLASIF_6",
      dataValueField: "CA06_CLASIF_6",
      itemTemplate: '<span>#: CA06_CLASIF_6 # - #: CA06_NOMBRE #</span>'
    });

    toolbarElement.on('click', '.k-grid-faltante', (e) => {
      e.preventDefault();
      var popup = kendo.jQuery("#windowGridFaltante").data("kendoWindow");
      popup.open();
      popup.center();
    })

    toolbarElement.on('click', '.k-grid-editar', (e) => {
      e.preventDefault();
      var popup = kendo.jQuery("#windowpopup").data('kendoWindow');
      popup.open();
      popup.center();
      popup.wrapper.find(".guardar").click((e) => {
        e.preventDefault();
        var input1 = kendo.jQuery('#inputClasif5').data("kendoMultiSelect").value();
        var input2 = kendo.jQuery('#inputClasif6').data("kendoMultiSelect").value();
        var data = { "clasif5_exc": { "c5_e": input1 }, "clasif6_inc": { "c6_i": input2 } }
        var token = this.token
        kendo.jQuery.ajax({
          url: this.UrlApiBaseFiltroPTF + 1,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token)
          },
          method: 'PUT',
          type: 'PUT',
          success: function (data, textStatus) {
            kendo.alert('Modificado correctamente').element.getKendoAlert().title("Mensaje");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR);
            console.error(textStatus);
            console.error(errorThrown);
          },
          data: kendo.stringify(data),
          contentType: 'application/json',
        })
      });
      popup.bind("close", () => {
        location.reload();
        /* e.preventDefault();
        grid.dataSource.read();
        kendo.jQuery("#resumen").empty();
        this.$refs.remoteDataSourceStockArts.kendoDataSource.read(); */
      })
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