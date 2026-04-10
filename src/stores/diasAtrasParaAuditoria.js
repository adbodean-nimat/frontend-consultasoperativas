import { defineStore } from 'pinia';

export const useStore = defineStore('diasAtrasParaAuditoria', {
    state: () => ({
      diasAtrasParaAuditoria: 90
    }),
    getters: {
        getDiasAtrasParaAuditoria: (state) => state.diasAtrasParaAuditoria
    },
    actions: {
        setDiasAtrasParaAuditoria(diasAtrasParaAuditoria) {
            this.diasAtrasParaAuditoria = diasAtrasParaAuditoria;
            console.log('diasAtrasParaAuditoria:', diasAtrasParaAuditoria);
        }
    },
    persist: true
});