<template>
    <div class="container-page">
        <div class="page-content">
            <div class="container-fluid px-4 text-center">
                <h3 class="text-white">Gestión de Finanzas</h3>
                <div class="row row-cols-lg-5 gy-5 mt-2">
                    <div class="col col-h">
                        <router-link :to="{ name: 'consultatransferenciasduplicadas' }">
                            <div class="d-flex flex-column justify-content-between rounded-top bg-white">
                                <div
                                    class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
                                    <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded">
                                        <i class="pi pi-search text-white" style="font-size: 2rem"></i>
                                    </div>
                                    <div class="title-column" style="text-align: right;">
                                        <p>Consulta de transferencias duplicadas</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
                                <span class="fs-6 text-secondary"></span>
                                <span class="fs-6 text-secondary">
                                    <div id="tooltip" data-toggle="tooltip" data-placement="right"
                                        title="Consulta administrativa de solo lectura; no envía avisos ni modifica datos">
                                        <i class="pi pi-question-circle-fill text-secondary"></i>
                                    </div>
                                </span>
                            </div>
                            <div
                                class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
                                <span class="fs-6 text-secondary">1.0.0</span>
                                <span class="fs-6 text-secondary">CTD</span>
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
export default {
    name: 'Gestión de Distribución',
    data: () => {
        return {
            giveName: '',
            IsAllow: ''
        }
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
