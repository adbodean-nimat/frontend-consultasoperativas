<template>
  <div class="directive-fullscreen-wrapper">
    <div class="container-fluid page-grid">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg> -->
          <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
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

      <datasource ref="remoteDataSourceLPBUI" :transport-read-url="UrlApiBase"
        :transport-read-content-type="'application/json; charset=utf-8'" :transport-read-data-type="'json'"
        :transport-update-url="UrlApiBase" :transport-update-content-type="'application/json; charset=utf-8'"
        :transport-update-data-type="'json'" :transport-destroy-url="UrlApiBase"
        :transport-destroy-content-type="'application/json; charset=utf-8'" :transport-destroy-data-type="'json'"
        :transport-create-url="UrlApiBase" :transport-create-content-type="'application/json; charset=utf-8'"
        :transport-create-data-type="'json'" :transport-parameter-map="parameterMap" :schema-model-id="'id'"
        :schema-model-fields="fields" :batch="true" @error="onError" @requestend="requestEnd" :page-size='100'>
      </datasource>
      <grid ref="grid" :height="'95vh'" :data-source-ref="'remoteDataSourceLPBUI'"
        :pageable-page-sizes="[5, 10, 15, 20, 25, 50, 100]" :navigatable="true" :pageable='true' :editable="'inline'"
        :toolbar="['create']">
        <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
        <grid-column :field="'arts_articulo_emp'" :title="'Código Art'" :width="130" :format="'{0:n}'"></grid-column>
        <grid-column :field="'arts_nombre'" :title="'Nombre Art'"></grid-column>
        <grid-column :field="'grupo_del_art'" :title="'Grupo del Art'" :filterable-multi="true"></grid-column>
        <grid-column :field="'comentario'" :title="'Comentario'"></grid-column>
        <grid-column :field="'nro_orden_art'" :title="'Nro. Orden Art'" :width="100"></grid-column>
        <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
      </grid>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
import { Button } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'

export default {
  name: 'ListadePrecioBreveUsoInterno',
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
      title: 'Lista de precio breve - Uso interno',
      fields: {
        id: { editable: false, nullable: true },
        arts_articulo_emp: {
          type: 'numeric', validation: {
            required: true,
            minLength: function (input) {
              if (input.is("[name='arts_articulo_emp']") && input.val() != "") {
                input.attr("data-minlength-msg", "Debe tener hasta 8 caracteres");
                return /^[0-9]{8}$/.test(input.val());
              }
              return true;
            }
          }
        },
        arts_nombre: { type: 'varchar' },
        grupo_del_art: { type: 'varchar' },
        comentario: { type: 'text' },
        nro_orden_art: {
          type: 'numeric', validation: {
            required: true,
            numberonly: function (input) {
              if (input.is("[name='nro_orden_art']") && input.val() != "") {
                input.attr("data-numberonly-msg", "Debe tener números");
                return /^[0-9]$/.test(input.val());
              }
              return true;
            }
          }
        },
      }
    }
  },
  computed: {
    UrlApiBase() {
      return `${process.env.VUE_APP_API_BASE}/listadepreciobreveusointerno/`
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
    onError: function (e) {
      console.log(e.status); // displays "error"
      console.log(e.error);
    },
    requestEnd: function (e) {
      var response = e.response;
      var type = e.type;
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(type + " => type");
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(response.length);
      if (type == "create") {
        e.sender.read();
      } else
        if (type == "update") {
          e.sender.read();
        }
    },
    parameterMap: function (options, operation) {
      if (operation == 'read') {
        //console.log(operation + " operation");
        //console.log(options.models);
        //console.log(JSON.stringify(options));
        return options
      }
      if (operation == 'destroy') {
        //console.log(operation);
        //console.log(options.models);
        //console.log(JSON.stringify(options.models[0],["id"]));
        var Id = JSON.stringify(options.models[0].id);
        let params = {
          "ARTS_ARTICULO_EMP": JSON.stringify(options.models[0].arts_articulo_emp),
          "ARTS_NOMBRE": JSON.stringify(options.models[0].arts_nombre),
          "grupo_del_art": JSON.stringify(options.models[0].grupo_del_art),
          "comentario": JSON.stringify(options.models[0].comentario),
          "nro_orden_art": JSON.stringify(options.models[0].nro_orden_art),
        };
        let json = JSON.stringify(params);
        var destroyUrl = `${process.env.VUE_APP_API_BASE}/listadepreciobreveusointerno/`
        $.ajax({
          method: "DELETE",
          url: destroyUrl + Id,
          dataType: "json",
          data: json
        });
      }
      if (operation == 'create') {
        //console.log(operation);
        //console.log(options.models);
        //console.log(JSON.stringify(options.models[0],["cod_depos","nombre_deposito"]));
        let params = JSON.stringify(options.models[0], ["arts_articulo_emp", "arts_nombre", "grupo_del_art", "comentario", "nro_orden_art"])
        let json = JSON.parse(params)
        var createUrl = `${process.env.VUE_APP_API_BASE}/listadepreciobreveusointerno/`
        $.ajax({
          method: "POST",
          url: createUrl,
          dataType: "json",
          data: json
        });
      }
      if (operation == 'update') {
        //console.log(operation);
        //console.log(options.models);
        //console.log(JSON.stringify(options.models[0],["id","cod_depos","nombre_deposito"]));
        var Id = JSON.stringify(options.models[0].id);
        let params = JSON.stringify(options.models[0], ["arts_articulo_emp", "arts_nombre", "grupo_del_art", "comentario", "nro_orden_art"]);
        let json = JSON.parse(params);
        var updateUrl = `${process.env.VUE_APP_API_BASE}/listadepreciobreveusointerno/`
        $.ajax({
          method: "PUT",
          url: updateUrl + Id,
          dataType: "json",
          data: json
        });
      }

    },
  }
}
</script>

<style>
.k-grid td {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.k-callout-n {
  left: 15% !important;
}
</style>