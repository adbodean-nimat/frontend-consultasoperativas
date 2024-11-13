<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-5 text-center">
                <h3 style="color:#fff;">Hola, {{ giveName }}</h3>

                <div class="row row-cols-lg-5 gy-5">
                    <div class="col col-h">
                        <router-link to="/consultas">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg>
                                    </div>
                                    <div class="title-column">
                                    <p>Consultas Operativas</p>
                                    </div>
                                </div>
                            </div>
                        
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title="Consultas operativas.">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill text-secondary" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                            <span class="fs-6 text-secondary">1.0.0</span>
                            <span class="fs-6 text-secondary">CO</span>
                        </div>
                    </router-link>
                    </div>
                    <div class="col col-h">
                        <router-link to="/cartelerias">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div class="column d-flex flex-row justify-content-between p-3 rounded text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg> -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-card-heading" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/></svg>
                                    </div>
                                    <div class="title-column">
                                        Cartelería
                                    </div>
                                </div>
                            </div>
                        
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title='Cartelería.'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill text-secondary" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>   
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                            <span class="fs-6 text-secondary">1.0.0</span>
                            <span class="fs-6 text-secondary">CA</span>
                        </div>
                        </router-link>
                    </div>
                    <div class="col col-h">
                        <router-link to="/webnimat">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-globe2" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/></svg>
                                    </div>
                                    <div class="title-column">
                                    <p>Web NIMAT</p>
                                    </div>
                                </div>
                            </div>
                        
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title="Web NIMAT">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill text-secondary" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                            <span class="fs-6 text-secondary">1.0.0</span>
                            <span class="fs-6 text-secondary">WN</span>
                        </div>
                        </router-link> 
                    </div>
                    <div class="col col-h">
                    <div v-if="IsAllow === 'abodean'||IsAllow === 'avillasalte'||IsAllow === 'dvazquez'||IsAllow === 'ejescobar'" class="col col-h">
                    <router-link to="/consultascadplataforma">
                        <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                            <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg>
                                </div>
                                <div class="title-column" style="text-align: right;">
                                   <p>Clientes entre CAD y PLATAFORMA</p>
                                </div>
                            </div>
                        </div>
                    
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title="Consulta para el control del clientes comparar en CAD y PLATAFORMA.">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill text-secondary" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                            <span class="fs-6 text-secondary">1.0.0</span>
                            <span class="fs-6 text-secondary">CAD</span>
                        </div>
                    </router-link>
                    </div>
                    </div>
                    <div class="col col-h">
                    <div v-if="IsAllow === 'abodean'||IsAllow === 'avillasalte'||IsAllow === 'dvazquez'||IsAllow === 'ejescobar'||IsAllow === 'gescobar'" class="col col-h">
                    <router-link to="/consultainformesacindarentrefechas">
                        <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                            <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/></svg>
                                </div>
                                <div class="title-column" style="text-align: right;">
                                   <p>Informes Acindar</p>
                                </div>
                            </div>
                        </div>
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title="Consulta informes de Acindar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill text-secondary" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                            <span class="fs-6 text-secondary">1.3.0</span>
                            <span class="fs-6 text-secondary">CIA</span>
                        </div>
                    </router-link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
export default{
    name: 'TableroVue',
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

<style scope>
    a{
        text-decoration: none !important;
    }
    .container-page{
        width: 100%;
        height: auto;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        background-color: currentColor;
    }

    .page-content{
        width: 100%;
        height: auto;
        margin: 50px 0px;
    }

    .column{
        width: auto;
        height: 100px;
    }

    .col-h{
        transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(0rem);
    }

    .col-h:hover{
        transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);;
        transform: translateY(-0.75rem)
    }

    .title-column{
        color: black;
    }

    .icon{
        width: 30%;
        background: #008645;
    }

    .icon svg{
        width: 40%;
    }

    #tooltip{
        cursor: help;
        pointer-events: help;
    }

    .column-question{
        padding-bottom: 10px
    }

    .column-bottom{
        height: 40px;
    }

    @media (max-width: 1366px){
        .title-column{
            font-size: 14px;
            text-align: right;
        }
        #tooltip svg{
            width: 15px;
            height: 15px;
        }
    }
</style>