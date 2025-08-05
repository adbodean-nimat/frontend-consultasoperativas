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