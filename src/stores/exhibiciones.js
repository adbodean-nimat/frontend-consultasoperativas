import { defineStore } from "pinia";

export const useStoreExhibiciones = defineStore("exhibiciones", {
	state: () => ({
		parametros: {
			clasif2_pyr: "0004",
			clasif2_terminacion: "0005",
			dias_previos: 75,
			dias_duros: 74,
		},
	}),
	getters: {
		getExhibiciones: (state) => state.parametros,
	},
	actions: {
		setClasif2_pyr(clasif2_pyr) {
			this.clasif2_pyr = clasif2_pyr;
			console.log("clasif2_pyr:", clasif2_pyr);
		},
		setClasif2_terminacion(clasif2_terminacion) {
			this.clasif2_terminacion = clasif2_terminacion;
			console.log("clasif2_terminacion:", clasif2_terminacion);
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
