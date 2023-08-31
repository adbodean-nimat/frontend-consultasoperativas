<template>
    <div class="directive-fullscreen-wrapper">
      <div class="container-fluid page-grid">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg>
          <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
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
      
      <datasource ref="remoteDataSourceArticulosWeb"
                        :transport-read="readData"
                        :transport-update="updateData"
                        :transport-destroy="destroyData"
                        :transport-create="createData"
                        :transport-parameter-map="parameterMap"
                        :schema-model-id="'id'"
                        :schema-model-fields="fields"
                        :batch="true"
                        @error="onError"
                        @requestend="requestEnd"
                        >
      </datasource>
      <grid ref="grid"
                  :height="'100vh'"
                  :data-source-ref="'remoteDataSourceArticulosWeb'"
                  :navigatable="true"
                  :filterable="true"
                  :pageable='false'
                  :editable="'popup'"
                  :toolbar="['create']">
            <grid-column :field="'id'" :title="'Id'" :hidden="true" :width="100"></grid-column>
            <grid-column :field="'publicado'" :title="'Publicado'" template="#= publicado == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'codigo_art'" :title="'Código'" :width="100"></grid-column>
            <grid-column :field="'nombre_art'" :title="'Nombre'" :width="400"></grid-column>
            <grid-column :field="'orden_art'" :title="'Orden'" :width="100"></grid-column>
            <grid-column :field="'marcar_nuevo'" :title="'Marcar como nuevo'" template="#= marcar_nuevo == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'mostrar_inicio'" :title="'Mostrar en la página de inicio'" template="#= mostrar_inicio == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'outlet'" :title="'Outlet'" template="#= outlet == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'copete'" :title="'Copete'" :width="100"></grid-column>
            <grid-column :field="'descripcion'" :title="'Descripción'" :width="100"></grid-column>
            <grid-column :field="'bloq_vtas'" :title="'Ver si Bloq. Vtas?'" template="#= bloq_vtas == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'min_para_web'" :title="'Uni / M2 Ceram mín para Ver en web'" :width="100"></grid-column>
            <grid-column :field="'min_para_obs'" :title="'Uni / M2 Ceram mín para Obs. en web'" :width="100"></grid-column>
            <grid-column :field="'categorias1'" :title="'Categoria'" :editor="GetCategoriasWeb" :template="'#=categorias1#'" :width="200"></grid-column>
            <grid-column :field="'categorias2'" :title="'Categoria 2'" :editor="GetCategoriasWeb" :width="200"></grid-column>
            <grid-column :field="'categorias3'" :title="'Categoria 3'" :editor="GetCategoriasWeb" :width="200"></grid-column>
            <grid-column :field="'categorias4'" :title="'Categoria 4'" :editor="GetCategoriasWeb" :width="200"></grid-column>
            <grid-column :command="['edit','destroy']" :title="'&nbsp;'" :width="300"></grid-column>
      </grid>
    </div>
    </div>
    </template>
    
    <script>
    import $ from 'jquery'
    import store from "../store"
    import '@progress/kendo-ui'
    import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
    import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
    import '@progress/kendo-theme-bootstrap/dist/all.css'
    import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
    import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
    import { Button } from '@progress/kendo-buttons-vue-wrapper'
    import { directive as fullscreen } from 'vue-fullscreen'
    
    export default {
      name: 'ArticulosWeb',
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
                title: 'Web Nimat - Articulos',
                fields: {
                    id: {editable: false, nullable: true},
                    publicado: {type: 'boolean'},
                    codigo_art: {type: 'string'},
                    nombre_art: {type: 'string'},
                    orden_art: {type: 'number', format: '0000'},
                    marcar_nuevo: {type: 'boolean'},
                    mostrar_inicio: {type: 'boolean'},
                    outlet: {type: 'boolean'},
                    copete: {type: 'string'},
                    descripcion: {type: 'string'},
                    bloq_vtas: {type: 'boolean'},
                    min_para_web: {type: 'number'},
                    min_para_obs: {type: 'number'},
                    categorias1: {type: 'string'},
                    categorias2: {type: 'string'},
                    categorias3: {type: 'string'},
                    categorias4: {type: 'string'},
                  }
                }
        },
      computed: {
        UrlApiBase(){
            return `${process.env.VUE_APP_API_BASE}/articulosweb/`
        },
        UrlApiCategoria(){
            return `${process.env.VUE_APP_API_BASE}/categoriasweb/`
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
              var tkn = this.token
              var urlApi = this.UrlApiBase
              $.ajax({
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
        updateData: function(e) {
            var tkn = this.token
            var urlApi = this.UrlApiBase
            var id = e.data.models[0].id
            var data = kendo.stringify(e.data.models[0],["publicado", "codigo_art", "nombre_art", "orden_art", "marcar_nuevo", "mostrar_inicio", "outlet", "copete", "descripcion", "bloq_vtas", "min_para_web", "min_para_obs", "categorias1", "categorias2", "categorias3", "categorias4"])
            $.ajax({
                method: 'PUT',
                type: 'PUT',
                url: urlApi + id,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
                },
                success: function(data){
                    e.success(data)
                },
                error: function(data){
                    e.error(data)
                },
                contentType: 'application/json',
                data: data
            })
        },
        destroyData: function(e){
            var tkn = this.token
            var urlApi = this.UrlApiBase
            $.ajax({
              method: 'DELETE',
              type: 'DELETE',
              url: urlApi + kendo.stringify(e.data.models[0].id),
              beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
              },
              success: function(data){
                e.success(data)
              },
              error: function(data){
                e.error(data)
              },
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
            contentType: 'application/json',
            data: kendo.stringify(e.data.models[0],["publicado", "codigo_art", "nombre_art", "orden_art", "marcar_nuevo", "mostrar_inicio", "outlet", "copete", "descripcion", "bloq_vtas", "min_para_web", "min_para_obs", "categorias1", "categorias2", "categorias3", "categorias4"]),
          })
        },
        onError: function(e){
              console.log(e.status); 
              console.log(e.error);
            },
            requestEnd: function(e) {
                var response = e.response;
                var type = e.type;
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("type => " + type);
                /* The result can be observed in the DevTools(F12) console of the browser. */
                // console.log(response.length);
                 if (type == "create") {
                  e.sender.read();
                }
                if (type == "update") {
                  e.sender.read();
                } 
                /* if (type == undefined) {
                  e.sender.read();
                } */
            },
            parameterMap: function(options, operation) {
                if (operation !== 'read' && options.models) {
                    return kendo.stringify(options.models)
                }
            },
            GetCategoriasWeb: function(container, options) {
                kendo.jQuery('<input name="'+ options.field +'" />').appendTo(container).kendoDropDownList({
                    autoBind: false,
                    dataTextField: "nombre_categorias",
                    dataValueField: "id_categorias",
                    dataSource: {
                        transport:{
                            read:{
                                contentType: 'application/json',
                                dataType: 'json',
                                type: 'GET',
                                url: this.UrlApiCategoria,
                                headers: {
                                'Authorization': 'Bearer ' + store.state.token
                                }
                            }
                        }
                    }
                })
            },
      }
    }
    </script>
    
    <style>
    .k-grid td{
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    </style>
    