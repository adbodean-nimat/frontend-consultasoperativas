<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 class="text-white">Gestión de Administración</h3>
                <div class="row row-cols-lg-5 gy-5 mt-2">
                    <div class="col col-h" v-if="hasRole(['Gerencia', 'Sistemas', 'Administracion y Finanzas'])">
                        <router-link :to="{ name: 'consultaavisosdeudawhatsapp' }">
                            <div class="d-flex flex-row justify-content-between rounded-top bg-white"
                                style="width: 100%; height: 100px;">
                                <div class="d-flex flex-row justify-content-between p-3 text-secondary link-success gap-2"
                                    style="width: 30%;">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff"
                                            class="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path
                                                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                        </svg>
                                    </div>

                                </div>
                                <div class="p-3 title-column text-end" style="width: 70%;">
                                    <p>Consulta de avisos de deuda vencida por WhatsApp</p>
                                </div>
                            </div>

                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6"></span>
                                <span class="fs-6">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title='Información de seguimiento de avisos de deuda vencida por WhatsApp'>
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
                                <span class="fs-6 text-secondary">CADVW</span>
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
    name: 'Gestión de Administración',
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