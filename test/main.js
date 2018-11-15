import Vue from 'vue'
import App from './App.vue'

import "yubi-vuetify-stylus/main.styl"
import ViewportEmulator from "./node_modules/yubi-viewport-emulator"
import Vuetify from 'vuetify'

Vue.component('viewport-emulator', ViewportEmulator)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
