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
      
      <datasource ref="remoteDataSourceProductosDistribucion"
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

      <datasource ref="remoteDataSourceFamiliaDistribucion" :transport-read="readDataFamilia" :batch="true"></datasource>

      <grid ref="grid"
                  :height="'100vh'"
                  :data-source-ref="'remoteDataSourceProductosDistribucion'"
                  :navigatable="true"
                  :filterable="true"
                  :pageable='true'
                  :sortable-mode="'multiple'"
                  :sortable-allow-unsort="true"
                  :sortable-show-indexes="true"
                  :sortable-initial-direction="'asc'"
                  @filtermenuinit="filterMenuInitSort"
                  :editable="'inline'"
                  :toolbar="['create']">
            <grid-column :field="'id'" :title="'Id'" :hidden="true"></grid-column>
            <grid-column :field="'Codigo_producto'" :title="'Código'" :width="200"></grid-column>
            <grid-column :field="'ARTS_NOMBRE'" :title="'Nombre'" :width="500"></grid-column>
            <grid-column :field="'Orden_producto'" :title="'Nro. Orden'"></grid-column>
            <grid-column :field="'Cod_Familia_producto'" :title="'Código grupo familia'" :editor="CodFamiliaDropDownEditor" :filterable-multi="true" :filterable-search="true"></grid-column>
            <grid-column :field="'Familia_producto'" :title="'Grupo familia'" :filterable-multi="true" :filterable-search="true"></grid-column>
            <grid-column :field="'Set_Familia'" :title="'Set Familia'" :filterable-multi="true" :filterable-search="true"></grid-column>
            <grid-column :command="['edit','destroy']" :title="'&nbsp;'"></grid-column>
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
      data () {
             return {
                fullscreen: false,
                teleport: true,
                pageOnly: true,
                title: 'Tabla: Productos para Distribución',
                fields: {
                    id: { editable: false, type: 'number', nullable: true},
                    Codigo_producto: {editable: true, type: 'string'},
                    ARTS_NOMBRE: {editable: false, type: 'string'},
                    Orden_producto: {editable: true, type: 'number'},
                    Cod_Familia_producto: {editable: true, type: 'string', defaultValue: '', nullable: true},
                    Familia_producto: {editable: false, type: 'string', defaultValue: ''},
                    Set_Familia: {editable: false, type: 'string'}
                }
             }
        },
      computed: {
        UrlApiBase(){
              return `${process.env.VUE_APP_API_BASE}/productospdistribucion/`
        },
        UrlApiBaseFamiliaArt(){
            return `${process.env.VUE_APP_API_BASE}/familiaartdistribucion/`
        },
        UrlApiStocArts(){
          return `${process.env.VUE_APP_API_BASE}/stocarts/`
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
              var urlApi1 = this.UrlApiBase
              var urlApi2 = this.UrlApiBaseFamiliaArt
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
                beforeSend: function(xhr){
                  xhr.setRequestHeader('Authorization', 'Bearer ' + tkn)
                },
                dataType: 'json',
                success: function(data){
                  e.success(data)
                },
                type: 'GET'
              });

              kendo.jQuery.when(data1, data2, data3).then(function(firstResponse, secondResponse, threeResponse) {
                var firstResult = firstResponse[0];
                var secondResult = secondResponse[0];
                var threeResult = threeResponse[0];

                var result = [];
                var result2 = [];
                
                for(var i=0; i < firstResult.length; i++){
                  for(var j=0; j < threeResult.length; j++){
                    if(firstResult[i].Codigo_producto === threeResult[j].ARTS_ARTICULO_EMP)
                    result.push({
                      id: firstResult[i].id,
                      Codigo_producto: firstResult[i].Codigo_producto,
                      ARTS_NOMBRE: threeResult[j].ARTS_NOMBRE,
                      Orden_producto: firstResult[i].Orden_producto,
                      Cod_Familia_producto: firstResult[i].Cod_Familia_producto,
                    })  
                  }
                }

                for(var v=0; v < result.length; v++){
                  result2.push({
                    id: result[v].id,
                    Codigo_producto: result[v].Codigo_producto,
                    ARTS_NOMBRE: result[v].ARTS_NOMBRE,
                    Orden_producto: result[v].Orden_producto,
                    Cod_Familia_producto: result[v].Cod_Familia_producto,
                    Familia_producto: secondResult.filter(codigo => codigo.cod_familia_art == result[v].Cod_Familia_producto).map(data => data.nombre_familia_art),
                    Set_Familia: secondResult.filter(codigo => codigo.cod_familia_art == result[v].Cod_Familia_producto).map(data => data.nombre_set_art)
                  })
                }
                console.log(result2)
                e.success(result2);
              });
        },
        readDataFamilia: function(e){
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
        updateData: function(e) {
            var tkn = this.token
            var urlApi = this.UrlApiBase
            var id = kendo.stringify(e.data.models[0].id);
            var data = kendo.stringify(e.data.models[0]);
            kendo.jQuery.ajax({
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
            var id = kendo.stringify(e.data.models[0].id);
            kendo.jQuery.ajax({
              method: 'DELETE',
              type: 'DELETE',
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
              contentType: 'application/json; charset=utf-8'
            })
        },
        createData: function(e){
          var tkn = this.token
          var urlApi = this.UrlApiBase
          var data = kendo.stringify(e.data.models[0]);
          kendo.jQuery.ajax({
            method: 'POST',
            type: 'POST',
            url: urlApi,
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
        onError: function(e){
              console.log(e.status);
              console.log(e.error);
            },
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
        },
        filterMenuInitSort: function(e){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;

          if (e.field === "Familia_producto") {
                var filterMultiCheck = gridElement.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
                filterMultiCheck.container.empty();
                filterMultiCheck.checkSource.sort({field: e.field, dir: "asc"});
                filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
                filterMultiCheck.createCheckBoxes();
              }
        },
        parameterMap: function(options, operation) {
                if (operation !== 'read' && options.models) {
                    return JSON.stringify(options.models)
                }
        },
        templateSetFamilia: function(item){
          var itemFamilia = item.Familia_producto
          var dataSourceFamiliaDistribucion = this.$refs.remoteDataSourceFamiliaDistribucion.kendoWidget();
          dataSourceFamiliaDistribucion.filter({field: 'nombre_familia_art', operator: 'eq', value: itemFamilia});
          var data = dataSourceFamiliaDistribucion.view()
          var dataFamilia = data.length === 0 ? '' : data[0].nombre_set_art 
          return kendo.toString(dataFamilia) 
        },
        CodFamiliaDropDownEditor: function(container, options) {
                kendo.jQuery('<input data-bind="value:' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
                  filter: "contains",  
                  autoBind: true,
                  optionLabel: "Familia...",
                  dataTextField: "nombre_familia_art",
                  dataValueField: "cod_familia_art",
                  valuePrimitive: true,
                  dataSource: {
                    transport:{
                      read:{
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        url: this.UrlApiBaseFamiliaArt,
                        headers: {
                          'Authorization': 'Bearer ' + store.state.token
                        }
                      }
                    },
                    schema:{
                      model:  {
                        id: "id",
                        fields: {
                          cod_familia_art: {type:"string"},
                          nombre_familia_art: {type:"string"},
                          nro_orden_familia: {type:"string"},
                          cod_set_art: {type:"string"},
                          nombre_set_art: {type:"string"}
                        }
                      }
                    },
                    sort: {
                      field: 'nombre_familia_art',
                      dir: 'asc'
                    }
                  }
                })
        },
        FamiliaDropDownEditor: function(container, options) {
                kendo.jQuery('<input name="'+ options.field +'" />').appendTo(container).kendoDropDownList({
                  filter: "contains",  
                  autoBind: false,
                  dataTextField: "nombre_familia_art",
                  dataValueField: "nombre_familia_art",
                  dataSource: {
                    transport:{
                      read:{
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        url: this.UrlApiBaseFamiliaArt,
                        headers: {
                          'Authorization': 'Bearer ' + store.state.token
                        }
                      }
                    },
                    schema:{
                      model:  {
                        id: "id",
                        fields: {
                          cod_familia_art: {type:"number"},
                          nombre_familia_art: {type:"string"},
                          nro_orden_familia: {type:"number"},
                          cod_set_art: {type:"string"},
                          nombre_set_art: {type:"string"}
                        }
                      }
                    },
                    sort: {
                      field: 'nombre_familia_art',
                      dir: 'asc'
                    }
                  }
                })
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
    