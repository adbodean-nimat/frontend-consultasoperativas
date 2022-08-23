<template>
  <div class="container-fluid page-grid">
    <div style="background-color: #008645; height: 45px; border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; align-items: center;">
    <div style="margin-left: 5px; color: white;" class="icon-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
      </div>
      <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
      <span style="color: white; margin-left: 5px;">{{ title }}</span>
    </div>
  
  <datasource ref="remoteDataSource3"
                    :transport-read-url="'http://localhost:8090/api/deposanoconsiderar/'"
                    :transport-read-data-type="'json'"
                    :transport-update-url="'http://localhost:8090/api/deposanoconsiderar/Update'"
                    :transport-update-data-type="'json'"
                    :transport-destroy-url="'http://localhost:8090/api/deposanoconsiderar/Destroy'"
                    :transport-destroy-data-type="'json'"
                    :transport-create-url="'http://localhost:8090/api/deposanoconsiderar/'"
                    :transport-create-data-type="'json'"
                    :transport-parameter-map="parameterMap"
                    :schema-model-fields="schemaModelFields"
                    :batch='true'
                    :page-size='15'
                    >
  </datasource>
  <grid ref="grid"
              :height="750"
              :data-source-ref="'remoteDataSource3'"
              :pageable='true'
              :editable="'inline'"
              :toolbar="['create']">
        <grid-column :field="'Cod_Depos'" :title="'Código Deposito'"></grid-column>
        <grid-column :field="'Nombre_Deposito'" :title="'Nombre Deposito'"></grid-column>
        <grid-column :command="['edit', 'destroy']" :title="'&nbsp;'"></grid-column>
  </grid>
</div>
</template>

<script>
import '@progress/kendo-ui'
import '@progress/kendo-ui/js/messages/kendo.messages.es-AR'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-AR'
import '@progress/kendo-theme-bootstrap/dist/all.css'
import { DataSource } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper'

export default {
  name: 'DeposaNoConsiderar',
  components: {
    "grid": Grid,
    "grid-column": GridColumn,
    "datasource": DataSource
    },
  data: function () {
         return {
            title: 'Deposito a No Considerar',
            schemaModelFields: {
                Cod_Depos: { type: 'number'},
                Nombre_Deposito: { type: 'text'},
            }
         }
    },
   methods: {
        parameterMap: function(options, operation) {
            if (operation !== 'read' && options.models) {
                return { models: kendo.stringify(options.models) };
            }
        }
    }
}
</script>

<style>
.k-grid td{
    white-space: nowrap;
    text-overflow: ellipsis;
}

.page-grid{
  padding: 20px 0px;
  background-color: currentColor;
}
</style>
