import { defineStore } from 'pinia';

export const useStoreCompradores = defineStore('compradores', {
  state: () => ({
    compradores: [
      { label: 'EGE', value: 'EGE' },
      { label: 'SCC', value: 'SCC' },
      { label: 'SMA', value: 'SMA' }
    ]
  }),

  getters: {
    getCompradoresOrdenados: (state) =>
      [...state.compradores].sort((a, b) =>
        a.label.localeCompare(b.label)
      )
  },

  actions: {
    setCompradores(compradores) {
      this.compradores = compradores;
    },

    addCompradores(nuevosCompradores) {
      nuevosCompradores.forEach(nuevo => {
        const existe = this.compradores.some(
          item => item.value === nuevo.value
        );

        if (!existe) {
          this.compradores.push(nuevo);
        }
      });
    },

    removeCompradores(valuesAEliminar) {
      this.compradores = this.compradores.filter(
        item => !valuesAEliminar.includes(item.value)
      );
    },

    updateCompradores(value, nuevoComprador, field) {
      console.log('Update comprador:', value, nuevoComprador, field);
      const comprador = this.compradores.find(
        item => item === value
      );
      comprador[field] = nuevoComprador;
    }
  },

  persist: true
});