import { defineStore } from "pinia";

export const useStoreExhibiciones = defineStore("exhibiciones", {
	state: () => ({
		parametros: {
			clasif2: "0004",
			dias_previos: 75,
			dias_duros: 74,
		},
	}),
	getters: {
		getExhibiciones: (state) => state.parametros,
	},
	actions: {
		setClasif2(clasif2) {
			this.clasif2 = clasif2;
			console.log("clasif2:", clasif2);
		},
		setDiasPrevios(dias_previos) {
			this.dias_previos = dias_previos;
			console.log("dias_previos:", dias_previos);
		},
		setDiasDuros(dias_duros) {
			this.dias_duros = dias_duros;
			console.log("dias_duros:", dias_duros);
		},
	},
	persist: true,
});
