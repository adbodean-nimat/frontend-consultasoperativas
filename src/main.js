import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core'

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

createApp(App).use(router, store).mount('#app')
