import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
// css,js
import '@/assets/css/lib/xeicon.css'
import '@/assets/css/app.css'
// import CommonJs from '@/assets/js/common.js'
import store from '@/store/store'
// lib
import 'overlayscrollbars/overlayscrollbars.css'
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(OverlayScrollbarsComponent)
app.mount('#app')