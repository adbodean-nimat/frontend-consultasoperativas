<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 class="text-white">Gestión de Exhibición</h3>
                <div class="row row-cols-lg-5 gy-5 mt-2">
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Exhibicion', 'Ventas', 'Compras'])">
                        <router-link :to="{ name: 'rotacion-general-productos-exhibicion' }">
                            <div class="d-flex flex-row justify-content-between rounded-top bg-white"
                                style="width: 100%; height: 100px;">
                                <div class="d-flex flex-row justify-content-between p-3 text-secondary link-success gap-2"
                                    style="width: 30%;">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-arrow-repeat" viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36A.25.25 0 0 1 11.534 7m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                            <path fill-rule="evenodd"
                                                d="M8 3a5 5 0 0 0-3.546 1.474.5.5 0 1 1-.708-.708A6 6 0 0 1 13.466 7H12.45A5 5 0 0 0 8 3m-3.466 6H3.55A5 5 0 0 0 11.546 11.526a.5.5 0 0 1 .708.708A6 6 0 0 1 2.534 9" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="p-3 title-column text-end" style="width: 70%;">
                                    <p>Rotación general de productos</p>
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
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">RGP</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Exhibicion', 'Compras'])">
                        <router-link :to="{ name: 'parametrosexhibicion' }">
                            <div class="d-flex flex-row justify-content-between rounded-top bg-white"
                                style="width: 100%; height: 100px;">
                                <div class="d-flex flex-row justify-content-between p-3 text-secondary link-success gap-2"
                                    style="width: 30%;">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-sliders2" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>

                                </div>
                                <div class="p-3 title-column text-end" style="width: 70%;">
                                    <p>Parametros de exhibición </p>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title='Configuración de los parámetros de exhibición'>
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">PE</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h">
                        <router-link :to="{ name: 'stockrotocpreciosartpyr' }">
                            <div class="d-flex flex-row justify-content-between rounded-top bg-white"
                                style="width: 100%; height: 100px;">
                                <div class="d-flex flex-row justify-content-between p-3 text-secondary link-success gap-2"
                                    style="width: 30%;">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-box-seam" viewBox="0 0 16 16">
                                            <path
                                                d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                                        </svg>
                                    </div>

                                </div>
                                <div class="p-3 title-column text-end" style="width: 70%;">
                                    <p>Stock Rotación OC Precios Art. Pisos y Revis.</p>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Consulta stock rotación OC Precios Art. Pisos y Revistimientos">
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">SROCPAPYR</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="col col-h">
                        <router-link :to="{ name: 'stockrotocpreciosartpyrterminacion' }">
                            <div class="d-flex flex-row justify-content-between rounded-top bg-white"
                                style="width: 100%; height: 100px;">
                                <div class="d-flex flex-row justify-content-between p-3 text-secondary link-success gap-2"
                                    style="width: 30%;">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-box-seam" viewBox="0 0 16 16">
                                            <path
                                                d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="p-3 title-column text-end" style="width: 70%;">
                                    <p>Stock Rotación OC Precios Art. PyR Terminación</p>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Consulta stock rotación OC Precios Art. Pisos y Revistimientos Terminación">
                                        <i class="pi pi-question-circle" aria-hidden="true"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">SROCPAPYR-T</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import { hasRole } from "@/services/roles";
export default {
    name: 'Gestión de Exhibición',
    data: () => {
        return {
            giveName: '',
            IsAllow: '',
            token: '',
        }
    },
    methods: {
        hasRole
    },
    async created() {
        this.token = await getToken();
        if (!this.token) {
            this.$router.push({ name: "Login", query: { redirect: this.$route.fullPath } });
            return;
        } else {
            const payload = decodeJwt(this.token);
            this.giveName = payload.user.givenName;
            this.IsAllow = payload.user.sAMAccountName;
        }
    }
}
</script>

<style scoped>
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
    width: 100%;
    height: 100px;
}

.icon {
    width: 100%;
    height: auto;
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
