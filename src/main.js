import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara'
/* import Material from '@primeuix/themes/material' */
/* import Nora from '@primeuix/themes/nora' */
/* import Aura from '@primeuix/themes/aura'  */
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip'
import "./style.css";
import 'primeicons/primeicons.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core'

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

const app = createApp(App);
app.directive('tooltip', Tooltip);
app.use(router);
app.use(store); 
app.use(ToastService);
app.use(PrimeVue, { 
    locale: {
        accept: 'Si',
        reject: 'No',
        startsWith: 'Comienza con',
        contains: 'Contiene',
        notContains: 'No contiene',
        endsWith: 'Termina con',
        equals: 'Igual a',
        notEquals: 'No es igual a',
        noFilter: 'Sin filtro',
        clear: 'Limpiar',
        apply: 'Aplicar',
        cancel: 'Cancelar',
        lt: 'Menor que',
        lte: 'Menor o igual que',
        gt: 'Mayor que',
        gte: 'Mayor o igual que',
        dateIs: 'La fecha es',
        dateIsNot: 'La fecha no es',
        dateBefore: 'La fecha es anterior a',
        dateAfter: 'La fecha es posterior a',
        emptyMessage: 'No se encontraron resultados',
        matchAll: 'Coincidir con todo',
        matchAny: 'Coincidir con cualquiera',
        addRule: 'Agregar regla',
        removeRule: 'Eliminar regla',
        searchMessage: '{0} resultados encontrados',
        selectionMessage: '{0} elementos seleccionados',
        emptySelectionMessage: 'No se encontraron resultados',
        emptySearchMessage: 'No se han encontrado resultados',
    },
    theme: {
        preset: Lara, // Change to Lara, Nora, or Aura as needed
        options: {
            prefix: 'p',
            darkModeSelector: 'none',
            cssLayer: false
        }
    }
});
app.mount('#app');