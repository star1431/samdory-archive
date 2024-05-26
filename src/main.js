import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
// css,js
import '@/assets/css/app.css'
// import CommonJs from '@/assets/js/common.js'
import store from '@/store/store'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')