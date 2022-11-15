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
        <datasource ref="remoteDataSourcePyR"
                          :transport-read-url="UrlApiBase"
                          :transport-read-data-type="'json'"
                          :transport-read-content-type="'application/json'"
                          :transport-read-type="'GET'"
                          :transport-read-cache="false"
                          :schema-model-fields="schemaModelFields"
                          :page-size='50'
                          >
        </datasource>
        <grid ref="grid"
              :height="'95vh'"
              :data-source-ref="'remoteDataSourcePyR'"
              :sortable-mode="'multiple'"
              :pageable-page-sizes="[5, 10, 15, 20, 25, 100]"
              :filterable="true"
              :reorderable="true"
              :resizable="true"
              :groupable="true"
              :column-menu="true"
              :navigatable="true"
              :toolbar="toolbarTemplate"
              :allow-copy="true"
              :selectable="true"
              >
              <grid-column field="CA03_NOMBRE" title="Nombre Cat6" :width="160" :filterable-multi="true"></grid-column>
              <grid-column field="Tipología" title="Tipología" :width="130" :filterable-multi="true"></grid-column>
              <grid-column field="ARTS_ARTICULO_EMP" title="Código Art." :width="100"></grid-column>
              <grid-column field="ARTS_NOMBRE" title="Nombre Art." :width="400"></grid-column>
              <grid-column field="Pre_Cdo_con_IVA_L1" title="Pre Cdo con IVA L1" :format="'{0:c}'"></grid-column>
              <grid-column field="Pre_Cdo_con_IVA_M2" title="Pre Cdo con IVA M2" :format="'{0:c}'"></grid-column>
              <grid-column field="RAC_M2" title="RAC M2"></grid-column>
              <grid-column field="Stock_Uni" title="Stock Uni"></grid-column>
              <grid-column field="Stock_M2" title="Stock M2"></grid-column>
              <grid-column field="M2_Pte_Entr_NP" title="M2 Pte Entr NP"></grid-column>
              <grid-column field="M2_Disp_Habil_Vta" title="M2 Disp Habil Vta"></grid-column>
              <grid-column field="Bloqueado_Vtas" title="Bloqueado Vtas" :filterable-multi="true"></grid-column>
              <grid-column field="M2_Bloqueado_Vta" title="M2 Bloqueado Vta" :filterable-multi="true"></grid-column>
              <grid-column field="Uso" title="Uso" :filterable-multi="true"></grid-column>
        </grid>
      </div>
    </div>
</template>
    
    <script>
    import '@progress/kendo-ui'
    import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
    import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
    import '@progress/kendo-theme-bootstrap/dist/all.css'
    import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
    import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'
    import { Button } from '@progress/kendo-buttons-vue-wrapper'
    import { directive as fullscreen } from 'vue-fullscreen'
    
    export default {
      name: 'ListaPYR',
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
                title: 'Lista de precio - Pisos y Revistimiento con Stock',
                schemaModelFields: {
                    CA03_NOMBRE: {type: 'string'},
                    Tipología: {type: 'string'},
                    ARTS_ARTICULO_EMP: {type: 'string'},
                    ARTS_NOMBRE: {type: 'string'},
                    Pre_Cdo_con_IVA_L1: {type: 'number'},
                    Pre_Cdo_con_IVA_M2: {type: 'number'},
                    RAC_M2: {type: 'number'},
                    Stock_Uni: {type: 'number'},
                    Stock_M2: {type: 'number'},
                    M2_Pte_Entr_NP: {type: 'number'},
                    M2_Disp_Habil_Vta: {type: 'number'},
                    Bloqueado_Vtas: {type: 'string'},
                    M2_Bloqueado_Vta: {type: 'number'},
                    Uso: {type: 'string'}
                }
             }
      },
      computed: {
        UrlApiBase(){
          return `${process.env.VUE_APP_API_BASE}/listapyr`
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
            toolbarTemplate: function() {
            var templateHtml =
                '<span id="form" style="position:absolute; left:5px">' +
                    '<span>'+
                    '<a class="k-pager-refresh k-link k-button refresh" title="Actualizar"><span class="k-icon k-i-reload"></span></a>' +
                    '</span>' +
                '</span>';
            return templateHtml;
            },
          },
          mounted: function(){
            var grid = this.$refs.grid.kendoWidget();
            var gridElement = grid.element;
            var toolbarElement = gridElement.find('.k-grid-toolbar');
            toolbarElement.on("click", ".refresh", function (e) {
              e.preventDefault(); 
              grid.dataSource.read();
            });
          }
    }
    </script>
    
    <style>
    </style>
    