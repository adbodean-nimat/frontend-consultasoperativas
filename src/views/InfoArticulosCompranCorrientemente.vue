<template>
    <div class="directive-fullscreen-wrapper">
        <div class="container-fluid page-grid min-vh-100">
            <div class="encabezado-titulo">
                <div style="margin-left: 5px; color: white;" class="icon-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                        class="bi bi-lightning-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                    </svg>
                    <!-- <span style="margin-left: 5px; color: white;" class="k-icon k-i-grid-layout"></span> -->
                    <span style="color: white; margin-left: 5px;">{{ title }}</span>
                </div>
                <div class="button-fullscreen d-flex flex-row align-items-center">
                    <div style="margin-right: 15px;">
                        <router-link to="/gestiondecompras/parametrosdecompras">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff"
                                class="bi bi-sliders2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </router-link>
                    </div>
                    <!-- <div style="margin-right: 15px;">
                        <kbutton v-fullscreen="options">
                            <svg v-show="!fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                            </svg>
                            <svg v-show="fullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                            </svg>
                        </kbutton>
                    </div> -->
                </div>
            </div>
            <div class="">
                <div class="">
                    <Toolbar class="mb-2">
                        <template #start>
                            <div class="d-flex flex-row align-items-center gap-2 w-full">
                                <label class="w-auto">Comprador:</label>
                                <Select class="w-auto" name="comprador" v-model="Comprador" :options="compradores"
                                    optionLabel="Nombre" optionValue="Id"
                                    v-on:change="getRUBROSantes(this.Comprador)" />
                                <label class="w-auto">Rubros de compras:</label>
                                <MultiSelect name="rubros" v-model="rubrosseleccionados" :options="rubros"
                                    optionLabel="RUBC_NOMBRE" optionValue="RUBC_RUBRO_COMPRA" filter
                                    :filter-fields="['RUBC_NOMBRE', 'RUBC_RUBRO_COMPRA']"
                                    placeholder="Seleccione rubros" :maxSelectedLabels="0"
                                    emptyFilterMessage="No se encontraron resultados"
                                    :selected-items-label="'{0} rubros seleccionados'" class="w-full md:w-80">
                                    <template #option="slotProps">
                                        <div class="d-flex flex-row align-items-center gap-2">
                                            <div>{{ slotProps.option.RUBC_RUBRO_COMPRA }} - {{
                                                slotProps.option.RUBC_NOMBRE }}</div>
                                        </div>
                                    </template>
                                </MultiSelect>
                                <label class="w-auto">Días hacia atrás fecha de NP:</label>
                                <InputNumber class="w-auto" name="dias_hacia_atras"
                                    v-model="Dias_hacia_atrás_fecha_de_NP" :min="1" :max="365" fluid>
                                </InputNumber>
                                <label class="w-auto">Días atrás para evaluar SM4:</label>
                                <InputNumber class="w-auto" name="cant_dias_atras"
                                    v-model="Cant_días_atrás_para_evaluar_SM4" :min="1" :max="90" fluid>
                                </InputNumber>
                                <Button icon="pi pi-play" outlined class="border-2" @click="getData"></Button>
                                <Button v-if="this.articulos.length > 0" icon="pi pi-replay" outlined class="border-2"
                                    @click="resetData"></Button>
                                <template v-if="cargando == true">
                                    <ProgressSpinner style="width: 24px; height: 24px; color: var(--primary-color);"
                                        strokeWidth="4" fill="transparent" />
                                </template>
                            </div>
                        </template>
                        <template #end>
                            <div v-if="tiempoejecucion !== ''">
                                <span>Tiempo de ejecución: </span>
                                <Badge severity="info" size="large" class="text-white">{{ tiempoejecucion }}
                                    ms.</Badge>
                            </div>
                        </template>
                    </Toolbar>
                    <Toolbar v-if="articulos.length > 0" class="my-2 bg-transparent border-0 text-white">
                        <template #start>
                            <div class="d-flex flex-row align-items-center gap-2">
                                <span>Fecha de emisión: <Badge severity="secondary" size="large"> {{
                                    articulos.length > 0 ? fechaHoy
                                        : '' }}</Badge></span>
                            </div>
                        </template>
                        <template #center>
                            <div class="d-flex flex-row justify-around align-items-center gap-2">
                                <span>Fecha NP desde: <Badge severity="secondary" size="large">{{
                                    dayjs(fecha_desde_NP).format('DD/MM/YYYY') }}</Badge></span>

                                <span>Fecha NP hasta: <Badge severity="secondary" size="large">{{
                                    dayjs(fecha_hasta_NP).format('DD/MM/YYYY') }}</Badge></span>
                            </div>

                        </template>
                        <template #end>
                            <div class="d-flex flex-row align-items-center gap-2">
                                <span>Total de artículos de esta vista: <Badge severity="secondary" size="large">{{
                                    articulos.length
                                        }}</Badge></span>
                            </div>
                        </template>
                    </Toolbar>
                </div>
                <div v-if="articulos.length > 0" class="container-fluid mb-4 h-1/6">
                    <div class="row gap-3">
                        <Card class="col border-5 border-start border-danger">
                            <template #content>
                                <div class="m-0 d-flex flex-row justify-content-between align-items-center">
                                    <span v-if="itemROJOS.total >= 0">
                                        <span class="h4">{{ itemROJOS.total }} <small
                                                class="text-body-secondary">Item(s)</small></span>
                                        <span class="ms-2" style="font-size: small;">
                                            {{ itemROJOS.descripcion }}
                                        </span>
                                    </span>

                                    <span v-if="itemROJOS.total > 0">
                                        <ToggleButton onLabel="Sacar items" offLabel="Ver items"
                                            class="text-danger link-danger" onIcon="pi pi-eye-slash" offIcon="pi pi-eye"
                                            size="small" v-model="itemROJOS.verMas"
                                            @update:model-value="
                                                itemROJOS.verMas ? filters['1_Stock-NP_más_bajo_que_SM_Sin_OC'].value = 1 : !itemROJOS.verMas ? filters['1_Stock-NP_más_bajo_que_SM_Sin_OC'].value = null : '',
                                                itemAMARILLOS.verMas ? (itemAMARILLOS.verMas = false, filters['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'].value = null) : '',
                                                itemAZULES.verMas ? (itemAZULES.verMas = false, filters['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'].value = null) : ''" />

                                    </span>
                                </div>
                            </template>
                        </Card>
                        <Card class="col border-5 border-start border-warning">
                            <template #content>
                                <div class="m-0 d-flex flex-row justify-content-between align-items-center">
                                    <span v-if="itemAMARILLOS.total >= 0">
                                        <span class="h4">{{ itemAMARILLOS.total }} <small
                                                class="text-body-secondary">Item(s)</small></span>
                                        <span class="ms-2" style="font-size: small;">
                                            {{ itemAMARILLOS.descripcion }}
                                        </span>
                                    </span>

                                    <span v-if="itemAMARILLOS.total > 0">
                                        <ToggleButton onLabel="Sacar items" offLabel="Ver items"
                                            class="text-warning link-warning" label="Ver items" variant="text"
                                            onIcon="pi pi-eye-slash" offIcon="pi pi-eye" size="small"
                                            name="itemAMARILLOS" v-model="itemAMARILLOS.verMas"
                                            @update:model-value="itemAMARILLOS.verMas ? filters['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'].value = 1 : !itemAMARILLOS.verMas ? filters['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'].value = null : '',
                                                itemROJOS.verMas ? (itemROJOS.verMas = false, filters['1_Stock-NP_más_bajo_que_SM_Sin_OC'].value = null) : '',
                                                itemAZULES.verMas ? (itemAZULES.verMas = false, filters['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'].value = null) : ''" />

                                    </span>
                                </div>

                            </template>
                        </Card>
                        <Card class="col border-5 border-start border-primary">
                            <template #content>
                                <div class="m-0 d-flex flex-row justify-content-between align-items-center">
                                    <span v-if="itemAZULES.total >= 0">
                                        <span class="h4">{{ itemAZULES.total }} <small
                                                class="text-body-secondary">Item(s)</small></span>
                                        <span class="ms-2" style="font-size: small;">
                                            <small>{{ itemAZULES.descripcion }}</small>
                                        </span>
                                    </span>

                                    <span v-if="itemAZULES.total > 0">

                                        <ToggleButton onLabel="Sacar items" offLabel="Ver items"
                                            class="text-primary link-primary" label="Ver items" variant="text"
                                            onIcon="pi pi-eye-slash" offIcon="pi pi-eye" size="small"
                                            v-model="itemAZULES.verMas"
                                            @update:model-value="itemAZULES.verMas ? filters['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'].value = 1 :
                                                !itemAZULES.verMas ? filters['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'].value = null : '',
                                                itemAMARILLOS.verMas ? (itemAMARILLOS.verMas = false, filters['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'].value = null) : '',
                                                itemROJOS.verMas ? (itemROJOS.verMas = false, filters['1_Stock-NP_más_bajo_que_SM_Sin_OC'].value = null) : ''" />

                                    </span>
                                </div>
                            </template>
                        </Card>

                    </div>
                </div>
                <div class="card my-0 directive-fullscreen-wrapper-grid h-screen" v-if="articulos.length > 0">
                    <DataTable v-model:filters="filters" filter-display="menu" :loading="cargando" :value="articulos"
                        selection-mode="multiple" row-group-mode="subheader" group-rows-by="RUBC_NOMBRE"
                        resizableColumns columnResizeMode="fit" size="small" :row-class="rowClass" scrollable
                        scroll-height="flex" showGridlines
                        :globalFilterFields="['Comprador', 'ARTS_ARTICULO_EMP', 'ARTS_NOMBRE', 'RUBC_NOMBRE', '1_Stock-NP_más_bajo_que_SM_Sin_OC', '2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo', '3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba']">
                        <template #empty>No se han encontrado datos. </template>
                        <template #loading>Cargando datos. Por favor, espere. </template>
                        <template #header>
                            <div class="d-flex justify-content-between align-items-center">
                                <ToggleButton v-model="Frozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open"
                                    onLabel="Inmovilizar" offLabel="Inmovilizar" />
                                <div class="d-flex justify-end flex-row-reverse align-items-center">
                                    <Button type="button" v-fullscreen="FullScreenGrid" class="mr-2"
                                        style="height: 45px;">
                                        <span v-show="fullscreengrid"
                                            class="pi pi-arrow-down-left-and-arrow-up-right-to-center"></span>
                                        <span v-show="!fullscreengrid"
                                            class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></span>
                                    </Button>
                                    <Button type="button" icon="pi pi-filter-slash" label="Limpiar filtros" class="mx-2"
                                        @click="clearFilter()" />
                                    <IconField>
                                        <InputIcon>
                                            <i class="pi pi-search" />
                                        </InputIcon>
                                        <InputText v-model="filters['global'].value" />
                                    </IconField>

                                </div>
                            </div>

                        </template>
                        <ColumnGroup type="header">
                            <Row>
                                <Column header="#" :rowspan="2" />
                                <Column header="Rubro compra" :rowspan="2" field="RUBC_NOMBRE" />
                                <Column header="Código" :rowspan="2" field="ARTS_ARTICULO_EMP" />
                                <Column header="Nombre" :rowspan="2" field="ARTS_NOMBRE" />
                                <Column header="¿Bloq. Vtas?" :rowspan="2" field="¿BloqVtas?" />
                                <Column header="S.M. Uni." :rowspan="2" field="Stock_mín_2y4" />
                                <Column header="S.M. Días" :rowspan="2" field="Días_stock_mínimo" />
                                <Column header="Pte. en NP" :rowspan="2" field="Pend_entrega_NP" />
                                <Column header="Pte. en OC" :rowspan="2" field="Cant_pend_entrega_OC" />
                                <Column header="Stock físico" :colspan="6" />
                                <Column header="Clasif. 8" :rowspan="2" field="ARTS_CLASIF_8" />
                                <Column header="Clasificador 8" :rowspan="2" field="CA08_NOMBRE" />
                                <Column header="Cons. diario" :rowspan="2" field="Consumo_diario" />
                                <Column header="Días y fechas remitos p/SM2" :colspan="3" />
                                <Column header="Cant. rtos" :rowspan="2" field="Cant_remito_MS2yMS4" />
                                <Column header="Stock Mín" :rowspan="2" field="ARTS_MODO_STOC_MIN" />
                                <Column header="Nombre modo stock mín." :rowspan="2" field="Nombre_modo_stock" />
                                <Column header="F.U. Rto. Vtas" :rowspan="2" field="Fecha_Ultimo_Remito_Venta" />
                                <Column header="F.U. Ent. Prov." :rowspan="2" field="Fecha_Ultima_Entrega_Proveedor" />
                                <Column header="Cant. U. E. Prov." :rowspan="2"
                                    field="Cantidad_Ultima_Entrega_Proveedor" />
                                <Column header="Días S/Rto. Vtas." :rowspan="2" field="Dias_sin_remitos_ventas" />
                                <Column header="Días U. E. Prov." :rowspan="2" field="Dias_ultima_entrega_proveedor" />
                            </Row>
                            <Row>
                                <Column header="Dep. 940" field="Stock_Uni_depós_940" />
                                <Column header="Dep. 950" field="Stock_Uni_depós_950" />
                                <Column header="Otros dep." field="Stock_Uni_sin_940_y_sin_950" />
                                <Column header="Todos dep." field="Stock_Unidades_todos_los_depós" />
                                <Column header="Stock - NP" field="Stock-NP" />
                                <Column header="Stock - NP días" field="Stock-NP_días" />
                                <Column header="Desde" field="Fecha_desde_TP1_y_2_y_MS4" />
                                <Column header="Hasta" field="Fecha_hasta_TP1_y_2_Y_MS4" />
                                <Column header="Días" field="Días_stock_Períodos_1_2_y_4" />
                            </Row>
                        </ColumnGroup>
                        <!--<Column header="#" headerStyle="width:3rem">
                            <template #body="slotProps">
                                {{ slotProps.index + 1 }}
                            </template>
                        </Column>
                        <Column field="Nombre_RC" header="Nombre RC">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.Nombre_RC }} - {{ calculateTotal(slotProps.data.Nombre_RC)
                                }}</span>
                            </template>
                        </Column> -->
                        <template #groupheader="slotProps">
                            <div class="mt-4 mb-1 p-2 text-white" style="background: #007c3b;">
                                <span class="fs-6 fw-semibold fst-italic">{{ slotProps.data.ARCO_RUBRO_COMPRA }} - {{
                                    slotProps.data.RUBC_NOMBRE }} - {{ calculateTotal(slotProps.data.Nombre_RC) }}
                                    items</span>
                            </div>
                        </template>
                        <Column header="#" header-style="width:1rem">
                            <template #body="slotProps">
                                <div v-if="slotProps.data['Leyenda_derivados'] === 'Ver derivados'">
                                    <Badge v-tooltip="'Derivados'" severity="info" size="small"
                                        @contextmenu="onVerDerivados($event, slotProps.data['ARTS_ARTICULO_EMP'])">
                                    </Badge>
                                    <ContextMenu ref="menuderivados" :model="itemsDerivados" />
                                </div>
                                <div
                                    v-if="this.itemreclamados.filter(item => item.ARTS_ARTICULO_EMP === slotProps.data['ARTS_ARTICULO_EMP']).length > 0">
                                    <Badge v-tooltip="'Item(s) reclamado al proveedor'" severity="warn" size="small"
                                        @contextmenu="onVerOC($event, slotProps.data['ARTS_ARTICULO_EMP'])">
                                        {{this.itemreclamados.filter(item =>
                                            item.ARTS_ARTICULO_EMP === slotProps.data['ARTS_ARTICULO_EMP']).length}}
                                    </Badge>
                                    <ContextMenu ref="menu" :model="items" />
                                </div>
                                <div
                                    v-if="this.itemvinculados.filter(item => item.ARTS_ARTICULO_EMP === slotProps.data['ARTS_ARTICULO_EMP']).length > 0">
                                    <Badge v-tooltip="'Item(s) vinculado(s) a OC'" severity="success" size="small"
                                        @contextmenu="onVerVinculados($event, slotProps.data['ARTS_ARTICULO_EMP'])">
                                        {{this.itemvinculados.filter(item =>
                                            item.ARTS_ARTICULO_EMP === slotProps.data['ARTS_ARTICULO_EMP']).length}}
                                    </Badge>
                                    <ContextMenu ref="menuvinculados" :model="itemsVinculados" />
                                </div>
                            </template>
                        </Column>
                        <Column field="RUBC_NOMBRE" header="Rubro">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['ARCO_RUBRO_COMPRA'] }}</span>
                            </template>
                        </Column>
                        <Column field="ARTS_ARTICULO_EMP" header="Código" :frozen="Frozen">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['ARTS_ARTICULO_EMP'] }}</span>
                            </template>
                        </Column>
                        <Column field="ARTS_NOMBRE" header="Nombre" :frozen="Frozen">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['ARTS_NOMBRE'] }}</span>
                            </template>
                        </Column>
                        <Column field="¿BloqVtas?" header="¿Bloq. Vtas?" class="text-center">
                            <template #body="slotProps">
                                <Badge :value="slotProps.data['¿BloqVtas?']"
                                    :severity="slotProps.data['¿BloqVtas?'] === 'Si' ? 'danger' : 'secondary'"
                                    size="small" />
                            </template>
                        </Column>
                        <Column field="Stock_mín_2y4" header="Stock Mín Uni." class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Stock_mín_2y4'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{ Number(slotProps.data['Stock_mín_2y4']).toFixed(2)
                                    }}</span>
                            </template>
                        </Column>
                        <Column field="Días_stock_mínimo" header="Stock Mín Días" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Días_stock_mínimo'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        slotProps.data['Días_stock_mínimo'] }}</span>
                            </template>
                        </Column>
                        <Column field="Pend_entrega_NP" header="Pend. en NP" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Pend_entrega_NP'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        slotProps.data['Pend_entrega_NP'] }}</span>
                            </template>
                        </Column>
                        <Column field="Cant_pend_entrega_OC" header="Pend. en OC" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Cant_pend_entrega_OC'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        slotProps.data['Cant_pend_entrega_OC'] }}</span>
                            </template>
                        </Column>
                        <Column field="Stock_Uni_depós_940" header="Depós. 940" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Stock_Uni_depós_940'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        slotProps.data['Stock_Uni_depós_940'] }}</span>
                            </template>
                        </Column>
                        <Column field="Stock_Uni_depós_950" header="Depós. 950" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Stock_Uni_depós_940'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        slotProps.data['Stock_Uni_depós_950'] }}</span>
                            </template>
                        </Column>
                        <Column field="Stock_Uni_sin_940_y_sin_950" header="Otros depós." class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Stock_Uni_sin_940_y_sin_950']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Stock_Unidades_todos_los_depós" header="Todos depós." class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Stock_Unidades_todos_los_depós']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Stock-NP" header="Stock - NP" class="text-end">
                            <template #body="{ data, field }">
                                <div
                                    :class="data['1_Stock-NP_más_bajo_que_SM_Sin_OC'] === 1 ? 'text-white bg-danger' :
                                        data['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] === 1 ? 'text-white bg-warning' :
                                            data['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] === 1 ? 'text-white bg-primary' : 'bg-success-subtle'">
                                    <span style="font-size: small;">{{ data[field] }}</span>
                                </div>

                            </template>
                        </Column>
                        <Column field="Stock-NP_días" header="Stock - NP días" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Stock-NP_días'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        Number(slotProps.data['Stock-NP_días']).toFixed(0) }}</span>
                            </template>
                        </Column>
                        <Column field="ARTS_CLASIF_8" header="Clas. 8" class="text-center">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['ARTS_CLASIF_8'] }}</span>
                            </template>
                        </Column>
                        <Column field="CA08_NOMBRE" header="Clasificador 8" class="text-center">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['CA08_NOMBRE'] }}</span>
                            </template>
                        </Column>
                        <Column field="Consumo_diario" header="Cons. diario" class="text-center">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ Number(slotProps.data['Consumo_diario']).toFixed(4)
                                    }}</span>
                            </template>
                        </Column>
                        <Column field="Fecha_desde_TP1_y_2_y_MS4" header="Desde" class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{
                                    slotProps.data['Fecha_desde_TP1_y_2_y_MS4']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Fecha_hasta_TP1_y_2_Y_MS4" header="Hasta" class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{
                                    slotProps.data['Fecha_hasta_TP1_y_2_Y_MS4']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Días_stock_Períodos_1_2_y_4" header="Días" class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Días_stock_Períodos_1_2_y_4']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Cant_remito_MS2yMS4" header="Cant. rtos" class="text-end">
                            <template #body="slotProps">
                                <span :class="slotProps.data['Cant_remito_MS2yMS4'] === 0 ? 'text-white' : null"
                                    style="font-size: small;">{{
                                        slotProps.data['Cant_remito_MS2yMS4'] }}</span>
                            </template>
                        </Column>
                        <Column field="ARTS_MODO_STOC_MIN" header="Stock Mín" class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['ARTS_MODO_STOC_MIN'] }}</span>
                            </template>
                        </Column>
                        <Column field="Nombre_modo_stock" header="Nombre modo stock mín." class="text-center">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Nombre_modo_stock'] }}</span>
                            </template>
                        </Column>
                        <Column field="Fecha_Ultimo_Remito_Venta" header="Fecha Último Rto. Vtas" class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Fecha_Ultimo_Remito_Venta'] }}</span>
                            </template>
                        </Column>
                        <Column field="Fecha_Ultima_Entrega_Proveedor" header="Fecha Última Ent. Proveedor"
                            class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Fecha_Ultima_Entrega_Proveedor']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Cantidad_Ultima_Entrega_Proveedor" header="Cant. Última Ent. Proveedor"
                            class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Cantidad_Ultima_Entrega_Proveedor']
                                }}</span>
                            </template>
                        </Column>
                        <Column field="Dias_sin_remitos_ventas" header="Días sin remitos ventas" class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Dias_sin_remitos_ventas'] }}</span>
                            </template>
                        </Column>
                        <Column field="Dias_ultima_entrega_proveedor" header="Días ult. Ent. Proveedor"
                            class="text-end">
                            <template #body="slotProps">
                                <span style="font-size: small;">{{ slotProps.data['Dias_ultima_entrega_proveedor']
                                }}</span>
                            </template>
                        </Column>
                    </DataTable>
                    <Dialog v-model:visible="visibleDialog" modal header="Detalles de Orden de compra"
                        :style="{ width: '50rem' }">
                        <div class="d-flex flex-column gap-2">
                            <DataTable :value="selectedItem" :scrollable="true" selectionMode="single"
                                dataKey="ARTS_ARTICULO_EMP">
                                <Column field="Fecha_OC" header="Fecha O. compra"></Column>
                                <Column header="Orden de compra">
                                    <template #body="slotProps">
                                        {{ String(slotProps.data['CODC_DIVISION']).padStart(4, '0')
                                        }}-{{ slotProps.data['CODC_TIPO_OC'] }}-{{ slotProps.data['CODC_NUM_OC']
                                        }}/{{ String(slotProps.data['RODC_REN_OC']).padStart(4, '0') }}
                                    </template>
                                </Column>
                                <Column field="Pend_Entrega" header="Cant. pendiente de entrega"></Column>
                            </DataTable>
                        </div>
                        <div class="d-flex justify-content-end my-2">
                            <Button type="button" label="Cerrar" severity="secondary"
                                @click="visibleDialog = false"></Button>
                        </div>
                    </Dialog>
                    <Dialog v-model:visible="visibleDialogDerivados" modal header="Artículos derivados"
                        :style="{ width: '50rem' }">
                        <div class="d-flex flex-column gap-2">
                            <DataTable :value="articulosderivados" :scrollable="true" selectionMode="single"
                                dataKey="ARTS_ARTICULO">
                                <Column field="ARTS_ARTICULO_EMP" header="Código"></Column>
                                <Column field="ARTS_NOMBRE" header="Nombre"></Column>
                            </DataTable>
                        </div>
                        <div class="d-flex justify-content-end my-2">
                            <Button type="button" label="Cerrar" severity="secondary"
                                @click="visibleDialogDerivados = false"></Button>
                        </div>
                    </Dialog>
                    <Dialog v-model:visible="visibleDialogVinculados" modal header="Artículos vinculados a OC"
                        :style="{ width: 'auto' }">
                        <div class="d-flex flex-column gap-2">
                            <DataTable :value="selectedItemVinculados" :scrollable="true" selectionMode="single"
                                dataKey="RODC_ARTICULO">
                                <Column header="Orden de compra">
                                    <template #body="slotProps">
                                        {{ String(slotProps.data['CODC_DIVISION']).padStart(4, '0')
                                        }}-{{ slotProps.data['CODC_TIPO_OC'] }}-{{ slotProps.data['CODC_NUM_OC']
                                        }}/{{ String(slotProps.data['RODC_REN_OC']).padStart(4, '0') }}
                                    </template>
                                </Column>
                                <Column header="Nota de pedido vinculado">
                                    <template #body="slotProps">
                                        {{ String(slotProps.data['NPDE_DIVISION_NPCA']).padStart(4, '0')
                                        }}-{{ slotProps.data['NPDE_TIPO_NPCA'] }}-{{ slotProps.data['NPDE_NUMERO_NPCA']
                                        }}/{{ String(slotProps.data['NPDE_RENGLON']).padStart(4, '0') }}
                                    </template>
                                </Column>
                                <Column field="Cantpend_ent" header="Cant. pendiente entrega"></Column>
                                <Column field="CODC_OBSERVACION" header="Observación"></Column>
                            </DataTable>
                        </div>
                        <div class="d-flex justify-content-end my-2">
                            <Button type="button" label="Cerrar" severity="secondary"
                                @click="visibleDialogVinculados = false"></Button>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
import minMax from 'dayjs/plugin/minMax';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputNumber from 'primevue/inputnumber';
import ToggleButton from 'primevue/togglebutton';
import Select from 'primevue/select';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import ContextMenu from 'primevue/contextmenu';
import Dialog from 'primevue/dialog';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { Button as KButton } from '@progress/kendo-buttons-vue-wrapper'
import { directive as fullscreen } from 'vue-fullscreen'
export default {
    name: 'InfoArticulosCompranCorrientemente',
    directives: {
        fullscreen
    },
    components: {
        Card,
        DataTable,
        Toolbar,
        Column,
        ColumnGroup,
        Row,
        Toast,
        ProgressSpinner,
        InputNumber,
        Button,
        InputText,
        IconField,
        InputIcon,
        Select,
        Badge,
        ToggleButton,
        MultiSelect,
        ContextMenu,
        Dialog,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        "kbutton": KButton
    },
    data() {
        return {
            dayjs,
            useToast,
            fullscreen: false,
            fullscreengrid: false,
            teleport: true,
            pageOnly: true,
            cargando: false,
            Frozen: true,
            items: [
                {
                    label: 'Ver el nro. de Orden de compra',
                    icon: 'pi pi-search',
                    command: () => {
                        this.visibleDialog = true;
                    }
                }
            ],
            itemsDerivados: [
                {
                    label: 'Ver artículos derivados',
                    icon: 'pi pi-search',
                    command: () => {
                        this.visibleDialogDerivados = true;
                    }
                }
            ],
            itemsVinculados: [
                {
                    label: 'Ver artículos vinculados a OC',
                    icon: 'pi pi-search',
                    command: () => {
                        this.visibleDialogVinculados = true;
                    }
                }
            ],
            codigoderivado: '',
            codigovinculado: '',
            visibleDialog: false,
            visibleDialogDerivados: false,
            visibleDialogVinculados: false,
            selectedItem: null,
            selectedItemVinculados: null,
            Cant_días_atrás_para_evaluar_SM4: 90,
            Dias_hacia_atrás_fecha_de_NP: 365,
            fechaHoy: '',
            fecha_desde_NP: '',
            fecha_hasta_NP: '',
            title: 'Información de artículos que compran corrientemente',
            articulos: [],
            articulosderivados: [],
            articulosbygroupcomprador: [],
            compradores: [
                { Id: 0, Nombre: 'TODOS' },
                { Id: 1, Nombre: 'EGE' },
                { Id: 2, Nombre: 'SCC' },
                { Id: 3, Nombre: 'SMA' },
            ],
            Comprador: 0,
            rubros: [],
            rubrosseleccionados: [],
            itemreclamados: [],
            itemvinculados: [],
            tiempoejecucion: '',
            itemROJOS: {
                total: 0,
                title: 'Item ROJO',
                descripcion: 'Sin pendientes de OC.',
                icon: 'pi pi-exclamation-triangle',
                color: 'red',
                iconColor: 'red',
                verMas: false
            },
            itemAMARILLOS: {
                total: 0,
                title: 'Item AMARILLO',
                descripcion: 'Con pendientes de OC sigue abajo.',
                icon: 'pi pi-exclamation-triangle',
                color: 'yellow',
                iconColor: 'yellow',
                verMas: false
            },
            itemAZULES: {
                total: 0,
                title: 'Item AZUL',
                descripcion: 'Con pendientes de OC queda arriba.',
                icon: 'pi pi-exclamation-triangle',
                color: 'blue',
                iconColor: 'blue',
                verMas: false
            },
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                '1_Stock-NP_más_bajo_que_SM_Sin_OC': { value: null, matchMode: FilterMatchMode.EQUALS },
                '2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo': { value: null, matchMode: FilterMatchMode.EQUALS },
                '3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba': { value: null, matchMode: FilterMatchMode.EQUALS }
            },
        }
    },
    methods: {
        onVerVinculados(event, codigo) {
            this.$refs.menuvinculados.show(event);
            this.codigovinculado = codigo
            this.selectedItemVinculados = this.itemvinculados.filter(item => item['ARTS_ARTICULO_EMP'] === codigo);
            event.preventDefault();
        },
        onVerOC(event, codigo) {
            this.$refs.menu.show(event);
            this.selectedItem = this.itemreclamados.filter(item => item['ARTS_ARTICULO_EMP'] === codigo);
            //console.log('Selected item:', this.selectedItem);
            event.preventDefault();
        },
        onVerDerivados(event, codigo) {
            this.$refs.menuderivados.show(event);
            this.codigoderivado = codigo
            this.getVerArtsDerivados();
            event.preventDefault();
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                '1_Stock-NP_más_bajo_que_SM_Sin_OC': { value: null, matchMode: FilterMatchMode.EQUALS },
                '2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo': { value: null, matchMode: FilterMatchMode.EQUALS },
                '3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba': { value: null, matchMode: FilterMatchMode.EQUALS }
            };
        },
        clearFilter() {
            this.initFilters();
        },
        rowClass(data) {
            return [
                { 'text-bg-danger': data['1_Stock-NP_más_bajo_que_SM_Sin_OC'] === 1 },
                { 'text-bg-warning': data['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo'] === 1 },
                { 'text-bg-primary': data['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba'] === 1 }
            ];
        },
        calculateTotal(name) {
            let total = 0;

            if (this.articulos) {
                for (let articulo of this.articulos) {
                    if (articulo.Nombre_RC === name) {
                        total++;
                    }
                }
            }
            return total;
        },
        async getItemVinculadosAOC() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/itemsvinculadosaoc', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.itemvinculados = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos vinculados a OC.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos vinculados a OC.', life: 3000 });
            }
        },
        async getItemReclamadosAlProveedor() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/itemreclamadosalproveedor', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.itemreclamados = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos reclamados al proveedor.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos reclamados.', life: 3000 });
            }
        },
        async getVerArtsDerivados() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/verartsderivados/' + this.codigoderivado.substring(1, 8), {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.articulosderivados = response.data.filter(item => item.ARTS_ARTICULO_EMP !== this.codigoderivado);
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos derivados.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos derivados.', life: 3000 });
            }
        },
        async getRUBROS() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/cpagrubc', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data) {
                    this.rubros = response.data;
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron rubros de compras.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async getRUBROSantes(e) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/cpagrubc', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                if (response.data && e == 0) {
                    this.rubros = response.data;
                } else if (response.data && e != 0) {
                    this.rubros = response.data.filter(rubro => rubro['RUBC_NOMBRE'].includes(this.compradores[e].Nombre));
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron rubros de compras.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información.', life: 3000 });
            }
        },
        async getData() {
            //console.time('getItemReclamadosAlProveedor');
            this.getItemReclamadosAlProveedor();
            //console.timeEnd('getItemReclamadosAlProveedor');
            //console.time('getItemVinculadosAOC');
            this.getItemVinculadosAOC();
            //console.timeEnd('getItemVinculadosAOC');
            const start = new Date();
            //console.time('getData');
            try {
                dayjs.locale('es-us');
                dayjs.extend(minMax);
                dayjs.extend(LocalizedFormat)
                this.fechaHoy = dayjs().format('LLL')
                this.cargando = true;
                const token = this.token;
                const response = await axios.get(`${process.env.VUE_APP_API_BASE}` + '/gdc/infodeartquesecomprancorrientemente', {
                    params: {
                        cantdiasatrasparaevaluarsm4: this.Cant_días_atrás_para_evaluar_SM4,
                        diashaciaatrasfechadeNP: this.Dias_hacia_atrás_fecha_de_NP,
                        comprador: this.compradores[this.Comprador]?.Nombre || '',
                        rubros: this.rubrosseleccionados?.length > 0 ? this.rubrosseleccionados?.map(rubro => `'${rubro}'`).join(',') : ''
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data && this.Comprador == 0) {
                    this.cargando = false;
                    this.itemROJOS.total = response.data.map(item => item['1_Stock-NP_más_bajo_que_SM_Sin_OC']).reduce((a, b) => a + b, 0);
                    this.itemAMARILLOS.total = response.data.map(item => item['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo']).reduce((a, b) => a + b, 0);
                    this.itemAZULES.total = response.data.map(item => item['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba']).reduce((a, b) => a + b, 0);
                    this.articulos = response.data.sort((a, b) => (a['RUBC_NOMBRE'].localeCompare(b['RUBC_NOMBRE']) || a['ARTS_NOMBRE'].localeCompare(b['ARTS_NOMBRE'] || a['ARTS_ARTICULO_EMP'].localeCompare(b['ARTS_ARTICULO_EMP']))));
                    this.articulosbygroupcomprador = Object.groupBy(this.articulos, ({ Comprador }) => Comprador);
                    console.log(this.articulosbygroupcomprador.length);
                    this.fecha_hasta_NP = dayjs.max(...response.data.map(item => dayjs(item.Fecha_hasta_para_incluir_NP)));
                    this.fecha_desde_NP = dayjs.min(...response.data.map(item => dayjs(item.Fecha_desde_para_incluir_NP)));
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos obtenidos correctamente.', life: 3000 });
                } else if (response.data && this.Comprador != 0) {
                    this.cargando = false;
                    this.itemROJOS.total = response.data.filter(item => item['Comprador'] === this.compradores[this.Comprador].Nombre).map(item => item['1_Stock-NP_más_bajo_que_SM_Sin_OC']).reduce((a, b) => a + b, 0);
                    this.itemAMARILLOS.total = response.data.filter(item => item['Comprador'] === this.compradores[this.Comprador].Nombre).map(item => item['2_Stock-NP_más_bajo_que SM_Con_OC_sigue_abajo']).reduce((a, b) => a + b, 0);
                    this.itemAZULES.total = response.data.filter(item => item['Comprador'] === this.compradores[this.Comprador].Nombre).map(item => item['3_Stock-NP_más_bajo_que_SM_Con_OC_queda_arriba']).reduce((a, b) => a + b, 0);
                    this.articulos = response.data.filter(item => item['Comprador'] === this.compradores[this.Comprador].Nombre).sort((a, b) => (a['RUBC_NOMBRE'].localeCompare(b['RUBC_NOMBRE'])) || a['ARTS_NOMBRE'].localeCompare(b['ARTS_NOMBRE'] || a['ARTS_ARTICULO_EMP'].localeCompare(b['ARTS_ARTICULO_EMP'])));
                    this.fecha_hasta_NP = dayjs.max(...this.articulos.map(item => dayjs(item.Fecha_hasta_para_incluir_NP)));
                    this.fecha_desde_NP = dayjs.min(...this.articulos.map(item => dayjs(item.Fecha_desde_para_incluir_NP)));
                    this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos obtenidos correctamente.', life: 3000 });
                }
                else {
                    this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron artículos.', life: 3000 });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de artículos.', life: 3000 });
            }
            //console.timeEnd('getData');
            const end = new Date();
            this.tiempoejecucion = end.getTime() - start.getTime();
        },
        reloadPage() {
            window.location.reload();
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.call(this));
            this.getRUBROS();
        }
    },
    mounted() {
        this.getRUBROS();
    },
    computed: {
        token() {
            return store.state.token
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
        },
        FullScreenGrid() {
            return {
                callback: (isFullscreen) => {
                    this.fullscreengrid = isFullscreen
                },
                target: '.directive-fullscreen-wrapper-grid',
                pageOnly: true,
                teleport: true
            }
        }
    }
}
</script>

<style>
.p-datatable-frozen-column {
    color: #000;
}

.p-card-body {
    padding: 1rem;
}

.p-datatable.p-datatable-sm .p-datatable-tbody>tr>td {
    padding: 0.1rem !important;
}
</style>