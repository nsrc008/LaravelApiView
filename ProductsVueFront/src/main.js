import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "../store"; // Importa la tienda Vuex

import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import '@/assets/custom_styles.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')