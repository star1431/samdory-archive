import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
// css,js
import '@/assets/css/lib/xeicon.css'
import '@/assets/css/app.css'
// import CommonJs from '@/assets/js/common.js' // del (UI부분은 컴포넌트별로 setup 내 작업)
import store from '@/store/store'
// lib
import 'overlayscrollbars/overlayscrollbars.css'
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
// chart
import VueApexCharts from "vue3-apexcharts"

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(OverlayScrollbarsComponent)
app.use(VueApexCharts)
app.mount('#app')