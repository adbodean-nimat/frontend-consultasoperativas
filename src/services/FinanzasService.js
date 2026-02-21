import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";
import axios from 'axios';

// Ajusta la URL base según tu configuración (ej. localhost:3000 o tu IP)
const API_URL = process.env.VUE_APP_API_BASE; 

const apiClient = axios.create({
    baseURL: `${API_URL}`, // Tu URL base
    headers: {
        'Content-Type': 'application/json'
    }
});

// INTERCEPTOR: Se ejecuta antes de cada petición
apiClient.interceptors.request.use(config => {
    // Obtenemos el token actual del store
    const token = decodeJwt(getToken()).token;
    
    // Si existe, lo agregamos al header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default {
    // Aceptamos un tercer parámetro 'tipo' (dia, semana, indicadores, otros)
    getRegistros(desde, hasta, tipo = 'dia') {
        let url = `/registros-financieros?tipo=${tipo}`;
        if (desde && hasta) {
            url += `&desde=${desde}&hasta=${hasta}`;
        }
        return apiClient.get(url);
    },

    // Importación (sigue igual, el backend ya lo separa solo)
    uploadExcel(formData) {
        return apiClient.post('/importar-finanzas', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    createRegistro(data, tipo = 'dia') {
        return apiClient.post(`/registros-financieros?tipo=${tipo}`, data);
    },

    updateRegistro(id, data, tipo = 'dia') {
        return apiClient.put(`/registros-financieros/${id}?tipo=${tipo}`, data);
    },

    deleteRegistro(id, tipo = 'dia') {
        return apiClient.delete(`/registros-financieros/${id}?tipo=${tipo}`);
    }
};