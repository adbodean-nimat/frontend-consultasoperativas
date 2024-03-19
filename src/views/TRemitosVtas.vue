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
      
      <datasource ref="remoteDataSourceRemitosVtas"
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
                  :data-source-ref="'remoteDataSourceRemitosVtas'"
                  :navigatable="true"
                  :filterable="true"
                  :pageable='false'
                  :editable="'inline'"
                  :toolbar="['create']">
            <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
            <grid-column :field="'cod_comprobante'" :title="'Código Comprobante'"></grid-column>
            <grid-column :field="'nombre_comprobante'" :title="'Nombre Comprobante'"></grid-column>
            <grid-column :command="['edit','destroy']" :title="'&nbsp;'"></grid-column>
      </grid>
    </div>
    </div>
    </template>
    
    <script>
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
      name: 'RemitosVtas',
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
                title: 'Remitos de Ventas',
                fields: {
                    id: { editable: false, type: 'number', nullable: true},
                    cod_comprobante: { type: 'string'},
                    nombre_comprobante: { type: 'string'},
                  }
                }
        },
      computed: {
        UrlApiBase(){
            return `${process.env.VUE_APP_API_BASE}/remitosvtas/`
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
        readData: function(e) {
            var token = store.state.token
            var urlApi = this.UrlApiBase
            kendo.jQuery.ajax({
                url: urlApi,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                contentType: 'application/json; charset=utf-8',
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
            var data = kendo.stringify(e.data.models[0],["cod_comprobante","nombre_comprobante"])
            kendo.jQuery.ajax({
                method: 'PUT',
                type: 'PUT',
                url: urlApi + id,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
                },
                success: function(data){
                    e.success()
                },
                error: function(data){
                    e.error(data)
                },
                contentType: 'application/json; charset=utf-8',
                data: data
            })
        },
        destroyData: function(e){
            var tkn = this.token
            var urlApi = this.UrlApiBase
            kendo.jQuery.ajax({
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
              contentType: 'application/json; charset=utf-8',
            })
        },
        createData: function(e){
          var tkn = this.token
          var urlApi = this.UrlApiBase
          var data = kendo.stringify(e.data.models[0]);
          console.log(data)
          kendo.jQuery.ajax({
            method: 'POST',
            type: 'POST',
            url: urlApi,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
            },
            success: function(data){
                e.success();
            },
            error: function(data){
                e.error(data)
            },
            contentType: 'application/json; charset=utf-8',
            data: data
          })
        },
        onError: function(e){
            console.log(e.status); // displays "error"
            console.log(e.error);
        },
        requestEnd: function(e) {
            var response = e.response;
            var type = e.type;
            console.log("type => " + type);
        },
        parameterMap: function(options, operation) {            
            if (operation !== 'read' && options.models) {
                return kendo.stringify(options.models)
            }          
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
    