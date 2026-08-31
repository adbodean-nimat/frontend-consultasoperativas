<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 class="text-white">Gestión de Ventas</h3>
                <div class="row row-cols-lg-5 gy-5 mt-2">
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Ventas'])">
                        <router-link :to="{ name: 'rotacion-general-productos-ventas' }">
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
                                    <div class="title-column text-end">
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
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">RGP</span>
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

export default {
    name: "GestionVentas",
    methods: { hasRole },
};
</script>

<style scoped>
a {
    text-decoration: none !important;
}

.container-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: currentColor;
}

.page-content {
    width: 100%;
    height: auto;
    margin: 50px 0;
}

.column {
    width: auto;
    height: 100px;
}

.col-h {
    transition: transform .3s cubic-bezier(.4, 0, .2, 1);
    transform: translateY(0);
}

.col-h:hover {
    transform: translateY(-.75rem);
}

.title-column {
    width: 70%;
    color: black;
}

.icon {
    width: 30%;
    background: #007c3b;
}

.icon svg {
    width: 40%;
}

.column-question {
    padding-bottom: 10px;
}

.column-bottom {
    height: 40px;
}

@media (max-width: 1366px) {
    .title-column {
        font-size: 14px;
    }
}
</style>
