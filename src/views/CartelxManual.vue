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

      <datasource ref="remoteDataSourceCartelManual" :data="ProductosParaDistribucion" :transport-read="readData"
        :transport-update="updateData" :transport-destroy="destroyData" :transport-create="createData"
        :transport-parameter-map="parameterMap" :schema-model-id="'id'" :schema-model-fields="fields" :batch="true"
        :page-size='100' @error="onError" @requestend="requestEnd">
      </datasource>

      <grid ref="grid" :height="'100vh'" :data-source-ref="'remoteDataSourceCartelManual'" :navigatable="true"
        :filterable="true" :pageable='true' :sortable-mode="'multiple'" :sortable-allow-unsort="true"
        :sortable-show-indexes="true" :editable="'popup'" :toolbar="['create']">
        <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
        <grid-column :field="'titulo'" :title="'Titulo'"></grid-column>
        <grid-column :field="'subtitulo'" :title="'Copete'"></grid-column>
        <grid-column :field="'precio'" :title="'Precio'"></grid-column>
        <grid-column :field="'unimed'" :title="'Uni/Med'"></grid-column>
        <grid-column :field="'outlet'" :title="'¿Outlet?'" template="#= outlet == true ? 'Si' : 'No' #"></grid-column>
        <grid-column :command="['edit', 'destroy', { text: 'Imprimir', click: customPrint }]"
          :title="'&nbsp;'"></grid-column>
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
  name: 'CartelxManual',
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
      title: 'Cartel: Manual',
      fields: {
        id: { editable: false },
        titulo: { type: 'string' },
        subtitulo: { type: 'string' },
        precio: { type: 'string' },
        unimed: { type: 'string' },
        outlet: { type: 'boolean' }
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/cartelmanual/`
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
    customPrint: function (e) {
      e.preventDefault();
      var grid = this.$refs.grid.kendoWidget();
      var dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
      var theDate = new Date();
      var printableContent = '';
      var win = window.open('', '', 'width=1200, height=800, resizable=1, scrollbars=1'),
        doc = win.document.open();
      var htmlStart =
        '<html lang="es-AR">' +
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
        '<span><small></small></span>' +
        '</div>' +
        '</div>' +
        '<div class="row pb-2 mb-4 border-bottom border-success border-3">' +
        '<div class="col text-start">' +
        '<span style="font-size: 1rem"><strong>' + dataItem.titulo + '</strong></span>' +
        '</div>' +
        '<div class="col text-end">' +
        '<span><small>Fecha de emisión: ' + kendo.toString(theDate, "dd/MM/yyyy") + '</small></span>' +
        '</div>' +
        '</div>' +

        '<div class="row mb-4">' +
        '<div class="col text-center">' +
        '<span><h4><strong>' + dataItem.subtitulo + '</strong></h4></span>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="col text-center">' +
        '<span style="font-size:200px; font-weight: bold;">' + dataItem.precio + '</span>' +
        '</div>' +
        '</div>' +

        '<div class="row mb-4">' +
        '<div class="col"></div>' +
        '<div class="col text-center bg-success text-white"><span style="font-size: 25px;"><strong>Por ' + dataItem.unimed + ', contado*</strong></span></div>' +
        '<div class="col"></div>' +
        '</div>' +

        '<div class="row mb-4">' +
        '<div class="col text-center"><span><small>* Pago en efectivo, tarjeta de débito o medios electónicos. <br> Consúltanos por pagos en cuotas con tarjetas créditos.</small></span></div>' +
        '</div>' +
        '<div class="row mb-2">' +
        '<div class="col text-center"><span><small>Sin reserva. Sin devolución.</small></span></div>' +
        '</div>' +
        '</div>';

      var contentBodyConCuotas =
        '<div style="border: 15px solid #198754;" class="container-xxl rounded-1">' +
        '<div class="row pb-2">' +
        '<div class="col">' +
        '<span><small></small></span>' +
        '</div>' +
        '</div>' +
        '<div class="row align-items-start pb-2 mb-2">' +
        '<div class="col text-center">' +
        '<span style="font-size: 5rem"><strong>OUTLET</strong></span>' +
        '</div>' +
        '</div>' +

        '<div class="row pb-2 mb-4 border-bottom border-success border-3">' +
        '<div class="col text-start">' +
        '<span><strong>' + dataItem.titulo + '</strong></span>' +
        '</div>' +
        '<div class="col text-end">' +
        '<span><small>Fecha de emisión: ' + kendo.toString(theDate, "dd/MM/yyyy") + '</small></span>' +
        '</div>' +
        '</div>' +

        '<div class="row mb-4">' +
        '<div class="col text-center">' +
        '<span><h4><strong>' + dataItem.subtitulo + '</strong></h4></span>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="col text-center">' +
        '<span style="font-size:10rem; font-weight: bold;">' + dataItem.precio + '</span>' +
        '</div>' +
        '</div>' +

        '<div class="row mb-4">' +
        '<div class="col"></div>' +
        '<div class="col text-center bg-success text-white"><span style="font-size: 25px;"><strong>Por ' + dataItem.unimed + ', contado*</strong></span></div>' +
        '<div class="col"></div>' +
        '</div>' +

        '<div class="row mb-4">' +
        '<div class="col text-center"><span><small>* Pago en efectivo, tarjeta de débito o medios electónicos. <br> Consúltanos por pagos en cuotas con tarjetas créditos.</small></span></div>' +
        '</div>' +

        '<div class="row mb-2">' +
        '<div class="col text-center"><span><small>Sin reserva. Sin devolución.</small></span></div>' +
        '</div>' +
        '</div>';

      var htmlEnd = '</body></html>';

      if (dataItem.outlet == false) {
        printableContent = contentBody
      } else {
        printableContent = contentBodyConCuotas
      }

      doc.write(htmlStart + printableContent + htmlEnd);
      doc.close();
      setTimeout(function () {
        win.print()
      }, 500);
    },
    readData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
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
      kendo.jQuery.ajax({
        method: 'PUT',
        type: 'PUT',
        url: urlApi + JSON.stringify(e.data.models[0].id),
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        data: JSON.stringify(e.data.models[0], ["titulo", "subtitulo", "precio", "unimed", "outlet"]),
        dataType: 'json',
        contentType: 'application/json',
      })
    },
    destroyData: function (e) {
      var tkn = this.token
      var urlApi = this.UrlApiBase
      kendo.jQuery.ajax({
        method: 'DELETE',
        type: 'DELETE',
        url: urlApi + JSON.stringify(e.data.models[0].id),
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
        },
        success: function (data) {
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        dataType: 'json',
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
          e.success(data)
        },
        error: function (data) {
          e.error(data)
        },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(e.data.models[0], ["titulo", "subtitulo", "precio", "unimed", "outlet"]),
      })
    },
    onError: function (e) {
      console.log(e.status); // displays "error"
      console.error(e.error);
    },
    /* onChange: function(e) {
      console.log("request change");
    },
    requestStart: function(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
    //console.log("request started"); 
    //},
    requestEnd: function (e) {
      var response = e.response;
      var type = e.type;
      /* The result can be observed in the DevTools(F12) console of the browser. */
      // console.log(type + " => type");
      /* The result can be observed in the DevTools(F12) console of the browser. */
      // console.log(response.length);
      if (type == "create") {
        e.sender.read();
      }
      if (type == "update") {
        e.sender.read();
      }
      if (type == undefined) {
        e.sender.read();
      }
    },
    parameterMap: function (options, operation) {
      if (operation !== 'read' && options.models) {
        return JSON.stringify(options.models)
      }
    }
  }
}
</script>

<style>
.k-grid td {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>