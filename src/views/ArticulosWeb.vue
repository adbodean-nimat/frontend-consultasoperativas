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
      <div id="windowForAssign">
        <div id="cron">        
            <div class="row g-3 p-3 align-items-center">
              <div class="col">
                <label for="" class="col-form-label">Lunes a Viernes</label>
                <input id="cron1" value="">
              </div>
            </div>
          
            <div class="row g-3 p-3 align-items-center">
              <div class="col">
                <label for="" class="col-form-label">Sábados</label>
                <input id="cron2" value="">
              </div>
            </div>
            
            <div class="row g-3">
              <button id="guardar-cron" class="guardar-cron btn btn-primary">Guardar</button>
            </div>
        
            <div class="row g-3 text-center">
              <div class="col pt-3">
                <p>Generador Cron: <a href="https://crontab.guru/" target="_blank">Crontab Guru</a></p>
              </div>
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
        :page-size='100'
        @error="onError"
        @requestend="requestEnd">
      </datasource>
      
      <datasource ref="remoteDataSourceArticulosWeb2" 
        :transport-read="readData" 
        :batch="true">
      </datasource>

      <datasource ref="remoteDataSourceCategoriasWeb" 
        :transport-read="readDataCategorias" 
        :batch="true">
      </datasource>
      
      <datasource ref="remoteDataSourceActualizacionWeb" 
        :transport-read="readDataActualizacion" 
        :batch="true">
      </datasource>
      
      <grid id="grid" ref="grid"
                  :height="'95vh'"
                  :data-source-ref="'remoteDataSourceArticulosWeb'"
                  :navigatable="true"
                  :filterable="true"
                  :reorderable="true"
                  :resizable="true"
                  :column-menu="true"
                  :pageable="true"
                  :sortable-mode="'multiple'"
                  :editable="'popup'"
                  :toolbar="['create', {name:'gear', text: 'Editar Cron', iconClass: 'k-icon k-i-gear'}, {name:'download', text: 'Descargar Excel', iconClass: 'k-icon k-i-excel'}, {name:'actualizar', text: 'Actualizar Web'}, {template: toolbarTemplate}, {template: toolbarLoading}, {template: actualizacionautomatica}]"
                  @save="onSave"
                  >
            <grid-column :command="['edit','destroy']" :title="'&nbsp;'" :width="220"></grid-column>
            <grid-column :field="'publicado'" :title="'Publicado'" template="#= publicado == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'codigo_art'" :title="'Código'" :width="100"></grid-column>
            <grid-column :field="'nombre_art'" :title="'Nombre'" :width="400"></grid-column>
            <grid-column :field="'orden_art'" :title="'Orden'" :format="'{0:0000}'" :width="100"></grid-column>
            <grid-column :field="'marcar_nuevo'" :title="'Marcar como nuevo'" template="#= marcar_nuevo == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'mostrar_inicio'" :title="'Mostrar en la página de inicio'" template="#= mostrar_inicio == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'outlet'" :title="'Outlet'" template="#= outlet == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'copete'" :title="'Copete'" :width="100"></grid-column>
            <grid-column :field="'descripcion'" :title="'Descripción'" :width="100"></grid-column>
            <grid-column :field="'bloq_vtas'" :title="'Ver si Bloq. Vtas?'" template="#= bloq_vtas == true ? 'Si' : 'No' #" :width="100"></grid-column>
            <grid-column :field="'min_para_web'" :title="'Uni / M2 Ceram mín para Ver en web'" :width="100"></grid-column>
            <grid-column :field="'stock'" :title="'Stock manual (si Bloq. Vtas es habilitado)'" :width="100"></grid-column>
            <grid-column :field="'categorias1'" :title="'Categoria 1'" :editor="GetCategoriasWeb" :width="50" :hidden="true"></grid-column>
            <grid-column :field="'namecategorias1'" :title="'Categoria 1'" :template="templateNameCategorias1" :width="200"></grid-column>
            <grid-column :field="'categorias2'" :title="'Categoria 2'" :editor="GetCategoriasWebResto" :width="100" :hidden="true"></grid-column>
            <grid-column :field="'namecategorias2'" :title="'Categoria 2'" :template="templateNameCategorias2" :width="200"></grid-column>
            <grid-column :field="'categorias3'" :title="'Categoria 3'" :editor="GetCategoriasWebResto" :width="100" :hidden="true"></grid-column>
            <grid-column :field="'namecategorias3'" :title="'Categoria 3'" :template="templateNameCategorias3" :width="200"></grid-column>
            <grid-column :field="'categorias4'" :title="'Categoria 4'" :editor="GetCategoriasWebResto" :width="100" :hidden="true"></grid-column>
            <grid-column :field="'namecategorias4'" :title="'Categoria 4'" :template="templateNameCategorias4" :width="200"></grid-column>
      </grid>
    </div>
    </div>
    </template>
    
    <script>
    import store from '../store'
    import axios from 'axios'
    import '@progress/kendo-ui'
    import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
    import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
    import '@progress/kendo-theme-bootstrap/dist/all.css'
    import { isValidCron } from 'cron-validator'
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
      data() {
             return {
                IsAllow: '',
                fechaupdate: '',
                timer: "",
                fullscreen: false,
                teleport: true,
                pageOnly: true,
                title: 'Web Nimat - Articulos',
                fields: {
                    id: {editable: false, nullable: true},
                    publicado: {type: 'boolean'},
                    codigo_art: {type: 'string', validation:{
                      required: true,
                      minLength: function(input) { 
                        if (input.is("[name='codigo_art']") && input.val() != "") {
                          input.attr("data-minlength-msg", "Debe tener desde 4 hasta 8 caracteres"); 
                          return /^[0-9]{4,8}$/.test(input.val());
                        }                                
                        return true;
                      }
                    }},
                    nombre_art: {type: 'string'},
                    orden_art: {type: 'number'},
                    marcar_nuevo: {type: 'boolean'},
                    mostrar_inicio: {type: 'boolean'},
                    outlet: {type: 'boolean'},
                    copete: {type: 'string'},
                    descripcion: {type: 'string'},
                    bloq_vtas: {type: 'boolean'},
                    min_para_web: {type: 'number'},
                    stock: {type: 'number'},
                    categorias1: {type: 'string', defaultValue: ''},
                    namecategorias1: {type: 'string', editable: false},
                    categorias2: {type: 'string', defaultValue: ''},
                    namecategorias2: {type: 'string', editable: false},
                    categorias3: {type: 'string', defaultValue: ''},
                    namecategorias3: {type: 'string', editable: false},
                    categorias4: {type: 'string', defaultValue: ''},
                    namecategorias4: {type: 'string', editable: false},
                  }
                }
      },
      created(){
        this.getActualizacionWeb();
        this.timer = setInterval(this.getActualizacionWeb, 60 * 1000 * 5); 
        if (!store.getters.isLoggedIn) {
            this.$router.push('/');
        }
        //this.giveName = store.getters.getUser.givenName;
        this.IsAllow = store.getters.getUser.sAMAccountName;
      },
      methods: {
        isCronValid(freq){
          var cronregex = new RegExp();
          return cronregex.test(freq);
        },
        async getActualizacionWeb(){
          var token = this.token;
          var urlApi2 = this.UrlApiActualizacionWeb;
          const res = await fetch(urlApi2, {method: 'GET',headers: {Authorization: `Basic ${token}`}});
          const data = await res.json();
          var checkedUpdate = data[0].actualizacion_automatica
          var fecha = kendo.toString(new Date(data[0].actualizacion_fecha), "g", "es-AR")
          this.fechaupdate = fecha;
          kendo.jQuery("div#lastupdate").empty();
          kendo.jQuery("div#lastupdate").append(fecha);
          kendo.jQuery("input#cron1").val(data[0].actualizacion_cron_lunesaviernes);
          kendo.jQuery("input#cron2").val(data[0].actualizacion_cron_sabados);

          kendo.jQuery("#input-switch").kendoSwitch({
            size: 'small',
            checked: checkedUpdate,
            change: (e)=>{
              var checked = e.checked
              console.log(checked);
              if(checked == true){
                kendo.jQuery.ajax({
                  url: this.UrlApiJobStart,
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                  },
                  method: 'GET',
                  type: 'GET',
                  success: function(data, textStatus){
                    console.log(data);
                    console.log(textStatus);
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                  }
                })
              } 
              if(checked == false) {
                kendo.jQuery.ajax({
                  url: this.UrlApiJobStop,
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                  },
                  method: 'GET',
                  type: 'GET',
                  success: function(data, textStatus){
                    console.log(data);
                    console.log(textStatus);
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                  }
                })
              }
            }
          });
        },
        cancelAutoUpdate() {
          clearInterval(this.timer);
        },
        readData: function (e) {
          var tkn = this.token
          var urlApi = this.UrlApiBase
          kendo.jQuery.ajax({
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
        readDataCategorias: function(e){
          var tkn = this.token
          var urlApi = this.UrlApiCategoria
          kendo.jQuery.ajax({
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
        readDataActualizacion: function(e){
          var tkn = this.token
          var urlApi = this.UrlApiActualizacionWeb
          kendo.jQuery.ajax({
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
          var grid = this.$refs.grid.kendoWidget();
          var tkn = this.token
          var urlApi = this.UrlApiBase
          var id = e.data.models[0].id
          var data = kendo.stringify(e.data.models[0],["publicado", "codigo_art", "nombre_art", "orden_art", "marcar_nuevo", "mostrar_inicio", "outlet", "copete", "descripcion", "bloq_vtas", "min_para_web", "stock", "categorias1", "categorias2", "categorias3", "categorias4"])
          kendo.jQuery.ajax({
            method: 'PUT',
            type: 'PUT',
            url: urlApi + id,
            contentType: 'application/json',
            data: data,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
            },
            success: function(data){
              e.success()
            },
            error: function(data){
              e.error(data)
            },
            complete: function(e){
              grid.dataSource.bind('sync', () => {
                grid.dataSource.read();
              });
            }
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
              contentType: 'application/json',
            })
        },
        createData: function(e){
          var grid = this.$refs.grid.kendoWidget();
          var tkn = this.token
          var urlApi = this.UrlApiBase
          kendo.jQuery.ajax({
            method: 'POST',
            type: 'POST',
            url: urlApi,
            contentType: 'application/json',
            data: kendo.stringify(e.data.models[0],["publicado", "codigo_art", "nombre_art", "orden_art", "marcar_nuevo", "mostrar_inicio", "outlet", "copete", "descripcion", "bloq_vtas", "min_para_web", "stock", "categorias1", "categorias2", "categorias3", "categorias4"]),
            beforeSend: function(xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
            },
            success: function(data){
              e.success()
            },
            error: function(data){
              e.error(data)
            },
            complete: function(e){
              grid.dataSource.bind('sync', () => {
                grid.dataSource.read();
              });
            }
          })
        },
        onError: function(e){
          console.log(e.status); 
          console.log(e.error);
        },
        requestEnd: function(e) {
          var response = e.response;
          var type = e.type;
          console.log("type => " + type);
        },
        onSave: function(e){
          var currentCodArt = e.model.codigo_art;
          var currentId = e.model.id;
          var dataSourceArtWeb = this.$refs.remoteDataSourceArticulosWeb2.kendoWidget();
          var data = dataSourceArtWeb.view();
          for(const item in data){
            if(data[item].codigo_art == currentCodArt && data[item].id !== currentId){
              e.preventDefault();
              kendo.alert("Este articulo ya existe");
            }
            }
        },
        parameterMap: function(options, operation) {
          if (operation !== 'read' && options.models) {
            return kendo.stringify(options.models)
          }
        },
        GetCategoriasWeb: function(container, options) {
          kendo.jQuery('<input required data-bind="value:' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                    autoBind: true,
                    optionLabel: "Categoria...",
                    dataTextField: "nombre_categorias",
                    dataValueField: "id_categorias",
                    dataSource: {
                        serverFiltering: true,
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
                        },
                        schema:{
                          model:  {
                            id: "id",
                            fields: {
                              id_categorias : {type:"number"},
                              nombre_categorias : {type:"string"},
                            }
                          }
                        },
                        sort: {
                          field: 'nombre_categorias',
                          dir: 'asc'
                        }
                    }
                });
          kendo.jQuery('<span class="k-invalid-msg" data-for="'+ options.field +'"></span>').appendTo(container);
        },
        GetCategoriasWebResto: function(container, options) {
          kendo.jQuery('<input data-bind="value:' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                    autoBind: true,
                    optionLabel: "Categoria...",
                    dataTextField: "nombre_categorias",
                    dataValueField: "id_categorias",
                    dataSource: {
                        serverFiltering: true,
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
                        },
                        schema:{
                          model:  {
                            id: "id",
                            fields: {
                              id_categorias : {type:"number"},
                              nombre_categorias : {type:"string"},
                            }
                          }
                        },
                        sort: {
                          field: 'nombre_categorias',
                          dir: 'asc'
                        }
                    }
                })
        },
        templateNameCategorias1: function(item){
          var itemCategorias1 = item.categorias1
          var dataSourceCategoria = this.$refs.remoteDataSourceCategoriasWeb.kendoWidget();
          dataSourceCategoria.filter({field: 'id_categorias', operator: 'eq', value: itemCategorias1});
          var data = dataSourceCategoria.view()
          var nombreCategorias1 = data.length === 0 ? '' : data[0].nombre_categorias 
          return kendo.toString(nombreCategorias1)   
        },
        templateNameCategorias2: function(item){
          var itemCategorias2 = item.categorias2
          var dataSourceCategoria2 = this.$refs.remoteDataSourceCategoriasWeb.kendoWidget();
          dataSourceCategoria2.filter({field: 'id_categorias', operator: 'eq', value: itemCategorias2});
          var data = dataSourceCategoria2.view()
          var nombreCategorias2 = data.length === 0 ? '' : data[0].nombre_categorias 
          return kendo.toString(nombreCategorias2)
        },
        templateNameCategorias3: function(item){
          var itemCategorias3 = item.categorias3
          var dataSourceCategoria3 = this.$refs.remoteDataSourceCategoriasWeb.kendoWidget();
          dataSourceCategoria3.filter({field: 'id_categorias', operator: 'eq', value: itemCategorias3});
          var data = dataSourceCategoria3.view()
          var nombreCategorias3 = data.length === 0 ? '' : data[0].nombre_categorias 
          return kendo.toString(nombreCategorias3)   
        },
        templateNameCategorias4: function(item){
          var itemCategorias4 = item.categorias4
          var dataSourceCategoria4 = this.$refs.remoteDataSourceCategoriasWeb.kendoWidget();
          dataSourceCategoria4.filter({field: 'id_categorias', operator: 'eq', value: itemCategorias4});
          var data = dataSourceCategoria4.view()
          var nombreCategorias4 = data.length === 0 ? '' : data[0].nombre_categorias        
          return kendo.toString(nombreCategorias4)
        },
        toolbarTemplate: function(){
          var templateHTML = '<span>Última actualización:</span><div id="lastupdate"></div>';
          return templateHTML
        },
        toolbarLoading: function(){
          var templateHTML = '<div class="lds-ring" id="loading" style="display:none"><div></div><div></div><div></div><div></div></div>';
          return templateHTML;
        },
        actualizacionautomatica: function(){
          var templateHTML = 
          '<div class="position-absolute end-0">' +
            '<div id="switch" class="row align-items-center">'+
                '<div class="col">'+
                  '<input id="input-switch" aria-label="Switch" />' +
                  '<label style="margin: 0px 10px;" class="col-form-label">Actualización automática</label>' +
                '</div>' +
            '</div>' +
          '</div>';
          return templateHTML;
        }
      },
      beforeDestroy() {
        this.cancelAutoUpdate();
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/articulosweb/`
        },
        UrlApiCategoria(){
          return `${process.env.VUE_APP_API_BASE}/categoriasweb/`
        },
        UrlToUpdateWeb(){
          return `${process.env.VUE_APP_API_BASE}/jsontosheet/`
        },
        UrlApiActualizacionWeb(){
          return `${process.env.VUE_APP_API_BASE}/actualizacionweb/`
        },
        UrlApiActualizacionWebNow(){
          return `${process.env.VUE_APP_API_BASE}/actualizacionwebnow/`
        },
        UrlApiActualizacionWebCron(){
          return `${process.env.VUE_APP_API_BASE}/actualizacionwebcron/`
        },
        UrlApiJobStart(){
          return `${process.env.VUE_APP_API_BASE}/job-start/`
        },
        UrlApiJobStop(){
          return `${process.env.VUE_APP_API_BASE}/job-stop/`
        },
        UrlApiRestart(){
          return `${process.env.VUE_APP_API_BASE}/job-restart/`
        },
        UrlApiDownload(){
          return `${process.env.VUE_APP_API_BASE}/jsontosheetdownload/`
        },
        token(){
            return store.state.token
        },
        options(){
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
      mounted(){               
        this.$refs.remoteDataSourceCategoriasWeb.kendoDataSource.fetch();
        this.$refs.remoteDataSourceArticulosWeb2.kendoDataSource.fetch();
        var grid = this.$refs.grid.kendoWidget();
        var gridElement = grid.element;
        var toolbarElement = gridElement.find('.k-grid-toolbar');
        var kendoWindowAssign = kendo.jQuery("#windowForAssign");
        var toolbarDownload = document.getElementsByClassName('k-i-excel');
        var toolbarGear = document.getElementsByClassName('k-grid-gear');
        var actualizacionAuto = document.getElementById('switch');

        if(this.IsAllow === 'abodean'|| this.IsAllow === 'avillasalte'|| this.IsAllow === 'dvazquez'|| this.IsAllow === 'ejescobar'){
        } else {
          toolbarDownload[0].style.display = "none";
          toolbarGear[0].style.display = "none";
          actualizacionAuto.style.display = "none";
        }

        kendo.jQuery("#cron1").kendoTextBox({
          fillMode: 'flat'
        });
        kendo.jQuery("#cron2").kendoTextBox({
          fillMode: 'flat'
        });

        kendoWindowAssign.kendoWindow({
          width: "500px",
          modal: true,
          visible: false,
          height: 'auto',
          resizable: false,
          title: 'Editar Cron'
        })

        toolbarElement.on('click', '.k-grid-download', (e)=>{
          var token = store.state.token
          var urlApi = this.UrlApiDownload
          axios.get(urlApi, {
            responseType: 'blob',
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
          }).then((response)=>{
            var data = new Blob([response.data],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var xlsxURL = window.URL.createObjectURL(data);
            var tempLink = document.createElement('a');
            tempLink.href = xlsxURL;
            tempLink.setAttribute('download', `Importar_AgileWorks_M2.xlsx`);
            tempLink.click();
          })
        })

        toolbarElement.on('click', '.k-grid-gear', (e)=>{
          e.preventDefault();
          var popup = kendo.jQuery("#windowForAssign").data('kendoWindow');
          popup.open();
          popup.center();
          popup.wrapper.find(".guardar-cron").click((e)=>{
            e.preventDefault();
            var cron1 = kendo.jQuery('#cron1').val();
            var cron2 = kendo.jQuery('#cron2').val();
            var data = {actualizacion_cron_lunesaviernes: cron1, actualizacion_cron_sabados: cron2}
            var token = store.state.token
            var urlApiCron = this.UrlApiActualizacionWebCron
            var validCron1 = isValidCron(cron1, { seconds: true })
            var validCron2 = isValidCron(cron2, { seconds: true })

            if(validCron1 == false){
              kendo.alert('Cron "Lunes a Viernes" inválida').element.getKendoAlert().title("Mensaje");
            } else if(validCron2 == false){
              kendo.alert('Cron "Sábados" inválida').element.getKendoAlert().title("Mensaje");
            } else {
              kendo.jQuery.when(
                kendo.jQuery.ajax({
                url: urlApiCron + 1,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                method: 'PUT',
                type: 'PUT',
                success: function(data, textStatus){      
                  console.log(textStatus);                 
                },
                error: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);
                },
                data: kendo.stringify(data),
                contentType: 'application/json',
              }),
              kendo.jQuery.ajax({
                url: this.UrlApiRestart,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                method: 'GET',
                type: 'GET',
                dataType: 'html',
                success: function(data, textStatus){
                  console.log(textStatus);
                },
                error: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);
                }
              })
              ).done(
                function(data1, data2){
                  console.log(data1);
                  console.log(data2);
                  kendo.alert('Modificado correctamente').element.getKendoAlert().title("Mensaje");
                }
              )
            }
          });
        });
      
        toolbarElement.on('click', '.k-grid-actualizar', (e)=>{
              e.preventDefault();
              kendo.jQuery("#loading").show();
              var token = store.state.token
              var urlApi = this.UrlToUpdateWeb
              kendo.jQuery.ajax({
                url: urlApi,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                type: 'GET',
                dataType: 'html',
                success: function(data, textStatus){
                  kendo.jQuery("#loading").hide();
                  kendo.alert('Generado correctamente').element.getKendoAlert().title("Mensaje"); 
                  grid.dataSource.read();
                },
                error: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);
                }
              });
              kendo.jQuery.ajax({
                url: this.UrlApiActualizacionWebNow + 1,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                },
                type: 'PUT',
                success: function(data, textStatus){
                  kendo.jQuery("div#lastupdate").empty();
                  kendo.jQuery("div#lastupdate").append(kendo.toString(new Date(), "g", "es-AR"));
                },
                error: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);
                }
              })
        })
      }
    }
    </script>
    
    <style>
    .k-grid td{
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .lds-ring {
      position: relative;
      width: 30px;
      height: 30px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 24px;
      height: 24px;
      margin: 4px;
      border: 4px solid #000;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #008645 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .displaynone{
      display: none !important
    }
    </style>
    