import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
//引入时间格式化
import { parseTime } from '@/utils/index'
Vue.prototype.$parseTime = parseTime

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')