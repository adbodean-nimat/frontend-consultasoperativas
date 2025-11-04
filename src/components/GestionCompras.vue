<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 style="color:#fff;">Gestión de Compras</h3>
                <div class="row row-cols-lg-5 gy-5">
                    <div class="col col-h">
                        <router-link to="/gestiondecompras/parametrosdecompras">
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
                                <span class="fs-6"></span>
                                <span class="fs-6">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title='Configuración de los parámetros de compras'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" class="bi bi-question-circle-fill text-secondary"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                        </svg>
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
                    <div class="col col-h">
                        <router-link to="/gestiondecompras/ratiocompras">
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
                                <span class="fs-6"></span>
                                <span class="fs-6">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title='Ver resultados de la Ratio de Compras'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" class="bi bi-question-circle-fill text-secondary"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                        </svg>
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
                    <div class="col col-h">
                        <router-link to="/gestiondecompras/infodearticulosquesecomprancorrientemente">
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
                                        <p>Info de art. que se compran corrientemente</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6"></span>
                                <span class="fs-6">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Detalles de los artículos que se compran con frecuencia">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" class="bi bi-question-circle-fill text-secondary"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                        </svg>
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

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
export default {
    name: 'Gestión de Compras',
    data: () => {
        return {
            giveName: '',
            IsAllow: ''
        }
    },
    async created() {
        if (!store.getters.isLoggedIn) {
            this.$router.push('/');
        }
        this.giveName = store.getters.getUser.givenName;
        this.IsAllow = store.getters.getUser.sAMAccountName;
        //this.secretMessage = await AuthService.getSecretContent();
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