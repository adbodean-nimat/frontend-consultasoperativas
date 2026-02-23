import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara'
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip'
import ConfirmationService from 'primevue/confirmationservice';
import "./style.css";
import 'primeicons/primeicons.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core'

const app = createApp(App);
app.directive('tooltip', Tooltip);
app.use(ConfirmationService);
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
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'dd/mm/yy',
        weekHeader: 'Sem',
        firstDayOfWeek: 1, // 1 para que la semana empiece en Lunes
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