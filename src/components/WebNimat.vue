<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 style="color:#fff;">Web NIMAT</h3>
                <div class="row row-cols-lg-5 gy-5">
                    <div class="col col-h">
                        <router-link to="/webnimat/categorias">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                                    </div>
                                    <div class="title-column">
                                    <p>Categorias</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                            <span class="fs-6">1.0.0</span>
                            <span class="fs-6">WNC</span>
                        </div>
                    </div>
                    <div  class="col col-h">
                        <router-link to="/webnimat/articulos">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div class="column d-flex flex-row justify-content-between p-3 rounded text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center flex-shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                                    </div>
                                    <div class="title-column">
                                        Articulos
                                    </div>
                                </div>
                            </div>
                        </router-link>
                        <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                            <span class="fs-6"></span>
                            <span class="fs-6">
                                <div id="tooltip" data-toggle="tooltip" data-placement="right" title=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>
                                </div>   
                            </span>
                        </div>
                        <div class="column-bottom text-center h-10 d-flex justify-content-between align-items-center px-4 rounded-bottom bg-light">
                            <span class="fs-6">1.0.0</span>
                            <span class="fs-6">WNA</span>
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
    name: 'Web NIMAT',
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
    a{
        text-decoration: none !important;
    }
    .container-page{
        width: 100%;
        height: 100vh;
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