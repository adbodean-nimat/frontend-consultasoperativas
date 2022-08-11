<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container overflow-hidden text-center">
                <div class="row row-cols-4">
                    <div class="col">
                    <router-link to="/controlaltaclientes">
                        <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                            <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
                                </div>
                                <div class="title-column">
                                    Control Alta Clientes
                                </div>
                            </div>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                            <span class="fs-6">1.0.0</span>
                            <span class="fs-6">CAC</span>
                        </div>
                    </router-link>
                    </div>
                    <div class="col">
                    <router-link to="/listadeclientes">
                        <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                            <div class="column d-flex flex-row justify-content-between p-3 rounded text-secondary link-success">
                                <div class="d-flex flex-column justify-content-center align-items-center icon rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
                                </div>
                                <div class="title-column">
                                    Lista de Clientes
                                </div>
                            </div>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                            <span class="fs-6">1.0.0</span>
                            <span class="fs-6">LDC</span>
                        </div>
                    </router-link>
                    </div>
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'TableroVue'
}
</script>

<style>
    a{
        text-decoration: none !important;
    }
    .container-page{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        background-color: currentColor;
    }

    .page-content{
        width: 100%;
        height: 500px;
    }

    .column{
        width: auto;
        height: 150px;
    }

    .icon{
        width: 100px;
        height: 100px;
        background: #008645;
    }

    .column-bottom{
        height: 40px;
    }
</style>