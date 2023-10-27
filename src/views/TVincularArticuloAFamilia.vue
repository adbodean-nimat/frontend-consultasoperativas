<template>
    <div class="directive-fullscreen-wrapper">
      <div class="container-fluid page-grid">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
          <span style="color: white; margin-left: 5px;">{{ title }}</span>
        </div>
        <div class="button-fullscreen">
            <div style="margin-right: 15px;">
            <kbutton v-fullscreen="options">
              <svg v-show="!fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>
              <svg v-show="fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>
            </kbutton>
            </div>
       </div>
      </div>
      
      <datasource ref="remoteDataSourceVinculararticulosafamilia"
                        :transport-read="readData"
                        :transport-update="updateData"
                        :transport-destroy="destroyData"
                        :transport-create="createData"
                        :transport-parameter-map="parameterMap"
                        :schema-model-id="'cod'"
                        :schema-model-fields="fields"
                        :batch="true"
                        @error="onError"
                        @requestend="requestEnd"
                        >
      </datasource>
      <datasource ref="remoteDataSourceNombreFam"
                        :transport-read="readDataNombreFam"
                        >
      </datasource>
      <grid ref="grid"
                  :height="'100vh'"
                  :data-source-ref="'remoteDataSourceVinculararticulosafamilia'"
                  :navigatable="true"
                  :filterable="true"
                  :pageable='false'
                  :sortable-mode="'multiple'"
                  :sortable-allow-unsort="true"
                  :sortable-show-indexes="true"
                  :editable="'inline'"
                  :toolbar="['create']">
            <grid-column :field="'cod'" :title="'Código'" :hidden="false"></grid-column>
            <grid-column :field="'cod_art'" :title="'Código Art.'"></grid-column>
            <grid-column :field="'cod_familia'" :title="'Código Familia '" :filterable-multi="true"></grid-column>
            <grid-column :field="'nombre_fami_art'" :title="'Nombre Familia'" :template="templateNombreFamilia" :filterable="false"></grid-column>
            <grid-column :field="'orden_art_familia'" :title="'Orden Art. Familia'"></grid-column>
            <grid-column :command="['edit','destroy']" :title="'&nbsp;'"></grid-column>
      </grid>
    </div>
    </div>
    </template>
    
    <script>
    import $ from 'jquery'
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
      data () {
             return {
                fullscreen: false,
                teleport: true,
                pageOnly: true, 
                title: 'Tabla: Vincular articulo a familia',
                fields: {
                    cod: { editable: false, nullable: true},
                    cod_art: { type: 'string'},
                    cod_familia: { type: 'string'},
                    nombre_fami_art: {type: 'string', editable: false},
                    orden_art_familia: {type: 'number'}
                },
             }
        },
      computed: {
        UrlApiBase(){
              return `${process.env.VUE_APP_API_BASE}/vinculararticulosafamilia/`
        },
        UrlApiBaseNombreFam(){
          return `${process.env.VUE_APP_API_BASE}/familiadearticulo/`
        },
        token(){
          return store.state.token
        },
        options () {
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
              var tkn = this.token
              var urlApi = this.UrlApiBase
              $.ajax({
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
      readDataNombreFam: function(e){
              var tkn = this.token
              var urlApi = this.UrlApiBaseNombreFam
              $.ajax({
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
      updateData: function(e) {
            var tkn = this.token
            var urlApi = this.UrlApiBase
            $.ajax({
              method: 'PUT',
              type: 'PUT',
              url: urlApi + JSON.stringify(e.data.models[0].cod),
              beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
              },
              success: function(data){
                e.success(data)
              },
              error: function(data){
                e.error(data)
              },
              data: JSON.stringify(e.data.models[0],["cod_art", "cod_familia", "orden_art_familia"]),
              dataType: 'json',
              contentType: 'application/json',
            })
        },
        destroyData: function(e){
            var tkn = this.token
            var urlApi = this.UrlApiBase
            $.ajax({
              method: 'DELETE',
              type: 'DELETE',
              url: urlApi + JSON.stringify(e.data.models[0].cod),
              beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
              },
              success: function(data){
                e.success(data)
              },
              error: function(data){
                e.error(data)
              },
              dataType: 'json',
              contentType: 'application/json',
            })
        },
        createData: function(e){
          var tkn = this.token
          var urlApi = this.UrlApiBase
          $.ajax({
            method: 'POST',
            type: 'POST',
            url: urlApi,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
            },
            success: function(data){
              e.success(data)
            },
            error: function(data){
              e.error(data)
            },
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(e.data.models[0],["cod_art", "cod_familia", "orden_art_familia"]),
          })
        },  
            onError: function(e){
              console.log(e.status); // displays "error"
              console.log(e.error);
            },
            /* onChange: function(e) {
              console.log("request change");
            },
            requestStart: function(e) {
              /* The result can be observed in the DevTools(F12) console of the browser. */
              //console.log("request started"); 
            //},
            requestEnd: function(e) {
                var response = e.response;
                var type = e.type;
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(type + " => type");
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
            parameterMap: function(options, operation) {
                if (operation !== 'read' && options.models) {
                    return JSON.stringify(options.models)
                }
            },
            templateNombreFamilia: function(item){
              var itemFam = item.cod_familia
              var dataSourceNomFam = this.$refs.remoteDataSourceNombreFam.kendoWidget();
              dataSourceNomFam.filter({field: 'cod_fami_art', operator: 'eq', value: itemFam});
              var data = dataSourceNomFam.view()
              var nombreFamilia = data.length === 0 ? '' : data[0].nombre_fami_art
              return kendo.toString(nombreFamilia)
            }
      }
    }
    </script>
    
    <style>
    .k-grid td{
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    </style>
    