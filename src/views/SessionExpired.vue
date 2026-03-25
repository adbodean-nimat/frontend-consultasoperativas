<template>
    <section class="container-fluid bg-secondary-subtle bg-opacity-50 vw-100 vh-100 position-absolute">
        <div class="session-expired-page">
            <div class="session-card">
                <div class="icon-wrap">
                    <i class="pi pi-lock"></i>
                </div>

                <h1>La sesión expiró</h1>
                <p>
                    Por seguridad, tu sesión finalizó automáticamente.
                    <br>Volvé a iniciar sesión para continuar.
                </p>

                <button type="button" class="btn btn-secondary" @click="goLogin">
                    Volver a iniciar sesión
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { clearLogoutReason } from "@/services/auth";

export default {
    name: "SessionExpired",
    methods: {
        goLogin() {
            clearLogoutReason();
            this.$router.replace({ name: "Login" });
        },
    },
};
</script>

<style scoped>
.session-expired-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: linear-gradient(135deg, #f5f7fb 0%, #e9eef8 100%); */
    padding: 24px;
}

.session-card {
    width: 100%;
    max-width: 460px;
    background: #fff;
    border-radius: 20px;
    padding: 32px 28px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    text-align: center;
}

.icon-wrap {
    width: 82px;
    height: 82px;
    margin: 0 auto 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff3cd;
    color: #b7791f;
    font-size: 34px;
}

h1 {
    margin: 0 0 12px;
    font-size: 28px;
    color: #1f2937;
}

p {
    margin: 0 0 24px;
    color: #6b7280;
    line-height: 1.5;
    font-size: 15px;
}
</style>