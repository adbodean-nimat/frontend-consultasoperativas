<template>
    <div class="directive-fullscreen-wrapper">
      <div class="container-fluid page-grid">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg>
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
      
      <datasource ref="remoteDataSourceTablas"
                        :transport-read-url="UrlApiBase"
                        :transport-read-content-type="'application/json; charset=utf-8'"
                        :transport-read-data-type="'json'"
                        :transport-update-url="UrlApiBase"
                        :transport-update-content-type="'application/json; charset=utf-8'"
                        :transport-update-data-type="'json'"
                        :transport-destroy-url="UrlApiBase"
                        :transport-destroy-content-type="'application/json; charset=utf-8'"
                        :transport-destroy-data-type="'json'"
                        :transport-create-url="UrlApiBase"
                        :transport-create-content-type="'application/json; charset=utf-8'"
                        :transport-create-data-type="'json'"
                        :transport-parameter-map="parameterMap"
                        :schema-model-id="'id'"
                        :schema-model-fields="fields"
                        :batch="true"
                        @error="onError"
                        @requestend="requestEnd"
                        >
      </datasource>
      <grid ref="grid"
                  :height="'95vh'"
                  :data-source-ref="'remoteDataSourceTablas'"
                  :navigatable="true"
                  :pageable='false'
                  >
            <grid-column :field="'id'" :title="'&nbsp;'" :width="30"></grid-column>
            <grid-column :field="'nombre_tablas'" :title="'Nombre tabla'"></grid-column>
            <grid-column :field="'url_tablas'" :title="'URL'" :hidden="true"></grid-column>
            <grid-column :field="'consultas_tablas'" :title="'Consultas'"></grid-column>
            <grid-column :template="templateBotonEditar"></grid-column>
            <!-- <grid-column :command="['edit','destroy']" :title="'&nbsp;'"></grid-column> -->
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
      name: 'movimientosContenedores',
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
                title: 'Tablas',
                fields: {
                    id: { editable: false, nullable: true},
                    nombre_tablas: { type: 'string'},
                    url_tablas: { type: 'string'},
                    consultas_tablas: {type: 'string'}
                }
             }
        },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/tablas/`
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
        templateBotonEditar: function(item){
            var templateHTML ='<span style="margin-left:5px">'+
                                '<a class="k-pager-refresh k-link k-button edit" title="Editar tabla" href="'+ item.url_tablas +'"><span class="k-icon k-i-edit"></span></a>' +
                              '</span>'; 
            return templateHTML
        },
            onError: function(e){
              console.log(e.status); // displays "error"
              console.log(e.error);
            },
            requestEnd: function(e) {
                var response = e.response;
                var type = e.type;
                console.log(type);
                console.log(response.length);

                if (type == "create") {
                    e.sender.read();
                }
                if (type == "update") {
                    e.sender.read();
                }
            },
            parameterMap: function(options, operation) {            
                if (operation == 'read') {
                    return options
                } 
                if (operation == 'destroy') {              
                    var Id = JSON.stringify(options.models[0].id);
                    let params = {
                    "nombre_tablas": JSON.stringify(options.models[0].nombre_tablas),
                    "url_tablas": JSON.stringify(options.models[0].url_tablas),
                    "consultas_tablas": JSON.stringify(options.models[0].consultas_tablas),
                    };
                    let json = JSON.stringify(params);
                    var destroyUrl = `${process.env.VUE_APP_API_BASE}/tablas/`
                    $.ajax({
                        method: "DELETE",
                        url: destroyUrl + Id,
                        dataType: "json",
                        data: json
                    });   
                } 
                if (operation == 'create') {
                    let params = JSON.stringify(options.models[0],["nombre_tablas","url_tablas", "consultas_tablas"])
                    let json = JSON.parse(params)
                    var createUrl = `${process.env.VUE_APP_API_BASE}/tablas/`
                    $.ajax({
                        method: "POST",
                        url: createUrl,
                        dataType: "json",
                        data: json
                    });
                } 
                if (operation == 'update') {
                    var Id = JSON.stringify(options.models[0].id);
                    let params = JSON.stringify(options.models[0],["nombre_tablas","url_tablas", "consultas_tablas"]);
                    let json = JSON.parse(params);
                    var updateUrl = `${process.env.VUE_APP_API_BASE}/tablas/`
                    $.ajax({
                        method: "PUT",
                        url: updateUrl + Id,
                        dataType: "json",
                        data: json
                    });
                }
               
            },
      },
    }
    </script>
    
    <style>
    .k-grid td{
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    </style>
    