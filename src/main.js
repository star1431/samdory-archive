import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import store from '@/store/store'
// css
import '@/assets/css/lib/xeicon.css'
import '@/assets/css/app.css'
// lib
import 'overlayscrollbars/overlayscrollbars.css'
// chart
import VueApexCharts from "vue3-apexcharts"
// custom
import PopupUI from '@/components/popup/PopupUI.vue'
const app = createApp(App)

app.use(router)
app.use(store)
// app.use(OverlayScrollbarsComponent)
app.use(VueApexCharts)
app.component('PopupUI', PopupUI)
app.mount('#app')