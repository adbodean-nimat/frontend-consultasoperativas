<template>
    <div class="directive-fullscreen-wrapper">
      <div class="container-fluid page-grid">
        <div class="encabezado-titulo">
          <div style="margin-left: 5px; color: white;" class="icon-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-list-columns-reverse" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"/></svg>
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
          <div class="row">
            <div class="col m-3">
              <a class="icon-link" target="_black" href="/tabla/acopio/comprobantesaomitir">
                Comprobantes a Omitir
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
            </div>
            <div class="col m-3">
              <a class="icon-link" target="_black" href="/tabla/acopio/remitosdeventas">
                Remitos de Ventas
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col m-3">
              <a class="icon-link" target="_black" href="/tabla/npaconsiderar">
                NP A Considerar
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>
              </a>
            </div>
          </div>
        </div>
        <datasource ref="remoteDataSourceAcopioCementoLN"
                          :transport-read="readData"
                          :schema-model-fields="schemaModelFields"
                          :page-size='100'
                          :aggregate="aggregateDefinition"
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourceAcopioCementoLN'"
              :sortable-mode="'multiple'"
              :pageable-page-sizes="[5, 10, 15, 20, 25, 100]"
              :filterable="true"
              :reorderable="true"
              :resizable="true"
              :column-menu="true"
              :navigatable="true"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              :auto-bind="false"
              @databound="dataBound"
              >
              <grid-column :field="'CVCL_FECHA_EMI'" :title="'Fecha'" template="#: kendo.toString(kendo.parseDate(CVCL_FECHA_EMI, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"></grid-column>
              <grid-column :field="'Dia_semana'" :title="'Día semana'"></grid-column>
              <grid-column :field="'Cantidad_de_facturas'" :title="'Facturado'" :aggregates="['sum']" :footer-template="'#=sum#'"></grid-column>
              <grid-column :field="'Cantidad_de_remitos'" :title="'Remitos'" :aggregates="['sum']" :footer-template="'#=sum#'"></grid-column>
              <grid-column :field="'SumaDePendentregNP'" :title="'Pend. Entrega NP'" :hidden="true"></grid-column>
              <grid-column :field="'Stock_Cemento_todos_los_Depos'" :title="'Stock Cemento todos los Depositos'" :hidden="true"></grid-column>
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
      name: 'AcopioCementoLN',
      directives: {
        fullscreen,
      },
      components: {
        "grid": Grid,
        "grid-column": GridColumn,
        "datasource": DataSource,
        "kbutton": Button
    },
      data: function () {
             return {
                fullscreen: false,
                teleport: true,
                pageOnly: true,
                title: 'Acopio - Cemento Loma Negra',
                emocion: require('@/assets/emocion.png'),
                schemaModelFields: {
                    CVCL_FECHA_EMI: {type: 'datetime'},
                    Dia_semana: {type: 'string'},
                    Cantidad_de_facturas: {type: 'number'},
                    Cantidad_de_remitos: {type: 'number'},
                    SumaDePendentregNP: {type: 'number'},
                    Stock_Cemento_todos_los_Depos: {type: 'number'}      
                },
                aggregateDefinition: [
                    {field: "Cantidad_de_facturas", aggregate: "sum"},
                    {field: "Cantidad_de_remitos", aggregate: "sum"}
                ]
             }
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/acopiocemento/`
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
            var token = this.token
            var urlApi = this.UrlApiBase
            var fdesde = kendo.jQuery("#fechadesde").data("kendoDatePicker").value();
            //console.log(kendo.toString(fdesde, "MM-dd-yyyy"))
            kendo.jQuery.ajax({
              url: urlApi + kendo.toString(fdesde, "MM-dd-yyyy"),
              beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
              },
              dataType: 'json',
              success: function (data) {
                e.success(data)
              },
              type: 'GET'
            })
        },
        toolbarTemplate: function() {
            var templateHtml =
              '<div class="d-flex flex-column" id="form">' +
                '<div>' +
                  `<label style="margin-right: 5px;" for="fechadesde">Fecha desde: </label>` +
                  '<input id="fechadesde"/>' +
                  '<span style="margin-left:5px">'+
                    '<a class="k-pager-refresh k-link k-button play" title="Ralizar consulta"><span class="k-icon k-i-play"></span></a>' +
                  '</span>'+
                  '<span style="margin-left:5px">'+
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"><span class="k-icon k-i-reload"></span></a>' +
                  '</span>' +
                  '<span style="margin-left:5px">'+
                    '<a class="k-pager-refresh k-link k-button edit" title="Editar tablas"><span class="k-icon k-i-edit"></span></a>' +
                  '</span>' +
                  '<span style="margin-left:5px" id="text3"></span>' +
                  '<span style="margin-left:5px" id="text4"></span>' +
                  '<span style="margin-left:5px" id="text1"></span>' + 
                  '<span style="margin-left:5px" id="text2"></span>' +
                  '<span style="position: absolute; right: 15px" id="img1"></span>' + 
                '</div>' +
                
                '<div>' +
                  '<small>En "Facturado" se excluyen las facturas de acopio M2. En "Remitos" están las que corresponden a acopios y a ventas normales.</small>' +
                '</div>' +  
              '</div>';
            return templateHtml;
        },
        dataBound: function(e){
            var fdesde = kendo.jQuery("#fechadesde").data("kendoDatePicker").value();
            var dataSource = e.sender.dataSource;
            var data = dataSource.view();
            var data1 = data[0].SumaDePendentregNP
            var data2 = data[0].Stock_Cemento_todos_los_Depos
            var text1 = document.getElementById("text1");
            var text2 = document.getElementById("text2");
            var text3 = document.getElementById("text3");
            var text4 = document.getElementById("text4");
            var img1 = document.getElementById("img1");
            text1.innerHTML = '| Pendiente en NP sin fact.: <strong>' + data1 + '</strong>';
            text2.innerHTML = '| Stock actual: <strong>' + data2 + '</strong>';
            text3.innerHTML = 'Bolsas acopiadas en LN: <strong>2880</strong>';
            text4.innerHTML = '| Stock hora 0 del '+ kendo.toString(fdesde, "dd-MM-yyyy") +': <strong>1965</strong>'
            img1.innerHTML = '<img src="'+ this.emocion + '" height="64" widght="64"/>';
        },
    },
      mounted: function(){
          var grid = this.$refs.grid.kendoWidget();
          var gridElement = grid.element;
          var toolbarElement = gridElement.find('.k-grid-toolbar');
          var fechadesde = gridElement.find('#fechadesde');
          var kendoWindowAssign = kendo.jQuery("#windowForAssign");

          fechadesde.kendoDatePicker({
            culture: "es-AR",
            format: "dd-MM-yyyy"
          });

          kendoWindowAssign.kendoWindow({
            width: "500px",
            modal: true,
            visible: false,
            height: 'auto',
            resizable: false,
            title: 'Editar las tablas'
          })

          toolbarElement.on("click", ".refresh", function (e) {
            e.preventDefault(); 
            var fdesde = fechadesde.data("kendoDatePicker").value();
            if(fdesde){
              grid.dataSource.read();
            }
          });

          toolbarElement.on("click", ".play", function(){
            var fdesde = fechadesde.data("kendoDatePicker").value();
            if(fdesde){
              grid.dataSource.read();
            }
          });

          toolbarElement.on('click', '.edit', (e)=>{
            var popup = kendo.jQuery("#windowForAssign").data('kendoWindow');
            popup.open();
            popup.center();
          });
      }
  }
    </script>
    
    <style>
    </style>
    