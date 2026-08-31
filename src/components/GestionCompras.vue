<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 class="text-white">Gestión de Compras</h3>
                <div class="row row-cols-lg-5 gy-5 mt-2">
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Compras'])">
                        <router-link :to="{ name: 'parametrosdecompras' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 rounded text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-sliders2" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>
                                    <div class="title-column">
                                        Parametros de compras
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title='Configuración de los parámetros de compras'>
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">PC</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Compras'])">
                        <router-link :to="{ name: 'ratiocompras' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 rounded text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-table" viewBox="0 0 16 16">
                                            <path
                                                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                                        </svg>
                                    </div>
                                    <div class="title-column">
                                        Ratio de Compras
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title='Ver resultados de la Ratio de Compras'>
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">RC</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Compras', 'Exhibicion'])">
                        <router-link :to="{ name: 'rotacion-general-productos' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 rounded text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-arrow-repeat" viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36A.25.25 0 0 1 11.534 7m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                            <path fill-rule="evenodd"
                                                d="M8 3a5 5 0 0 0-3.546 1.474.5.5 0 1 1-.708-.708A6 6 0 0 1 13.466 7H12.45A5 5 0 0 0 8 3m-3.466 6H3.55A5 5 0 0 0 11.546 11.526a.5.5 0 0 1 .708.708A6 6 0 0 1 2.534 9" />
                                        </svg>
                                    </div>
                                    <div class="title-column" style="text-align: right;">
                                        <p>Rotación general<br>de productos</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary" title="Consultar la rotación general de productos">
                                    <i class="pi pi-question-circle" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">RGP</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Sistemas'])">
                        <router-link :to="{ name: 'infodearticulosquesecomprancorrientemente' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                        </svg>
                                    </div>
                                    <div class="title-column" style="text-align: right;">
                                        <p>Info de art. que se compran <br>corrientemente [Versión 1]</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Detalles de los artículos que se compran con frecuencia">
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">IACC</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Compras'])">
                        <router-link :to="{ name: 'infodearticulosquesecomprancorrientemente2' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                        </svg>
                                    </div>
                                    <div class="title-column float-end" style="text-align: right;">
                                        <p>Info de art. que se compran <br>corrientemente [Versión 2]</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Detalles de los artículos que se compran con frecuencia">
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">2.0.0</span>
                                <span class="fs-6 text-secondary">IACC</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Compras'])">
                        <router-link :to="{ name: 'controlstocknpoc' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-boxes" viewBox="0 0 16 16">
                                            <path
                                                d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                                        </svg>
                                    </div>
                                    <div class="title-column" style="text-align: right;">
                                        <p>Control Stock NP OC</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Control de stock para órdenes de compra no procesadas">
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">CSNPOC</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Compras', 'Exhibicion'])">
                        <router-link :to="{ name: 'recepciondeproveedores' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-box2" viewBox="0 0 16 16">
                                            <path
                                                d="M2.95.4a1 1 0 0 1 .8-.4h8.5a1 1 0 0 1 .8.4l2.85 3.8a.5.5 0 0 1 .1.3V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .1-.3zM7.5 1H3.75L1.5 4h6zm1 0v3h6l-2.25-3zM15 5H1v10h14z" />
                                        </svg>
                                    </div>
                                    <div class="title-column" style="text-align: right;">
                                        <p>Recepción de Proveedores</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Recepción de proveedores">
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">RP</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { hasRole } from "@/services/roles";
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
export default {
    name: 'Gestión de Compras',
    data: () => {
        return {
            giveName: '',
            IsAllow: ''
        }
    },
    methods: {
        hasRole
    },
    async created() {
        const token = getToken();
        if (!token) {
            this.$router.push({ name: "Login", query: { redirect: this.$route.fullPath } });
            return;
        } else {
            const payload = decodeJwt(token);
            this.giveName = payload.user.givenName;
            this.IsAllow = payload.user.sAMAccountName;
        }
    }
}

</script>

<style>
a {
    text-decoration: none !important;
}

.container-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: currentColor;
}

.page-content {
    width: 100%;
    height: auto;
    margin: 50px 0px;
}

.column {
    width: auto;
    height: 100px;
}

.col-h {
    transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0rem);
}

.col-h:hover {
    transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
    ;
    transform: translateY(-0.75rem)
}

.title-column {
    color: black;
}

.icon {
    width: 30%;
    background: #007c3b;
}

.icon svg {
    width: 40%;
}

#tooltip {
    cursor: help;
    pointer-events: help;
}

.column-question {
    padding-bottom: 10px
}

.column-bottom {
    height: 40px;
}

@media (max-width: 1366px) {
    .title-column {
        font-size: 14px;
        text-align: right;
    }

    #tooltip svg {
        width: 15px;
        height: 15px;
    }
}
</style>
