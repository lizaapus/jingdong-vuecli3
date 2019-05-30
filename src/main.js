import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'amfe-flexible'
import axios from 'axios'
import setaxios from './setaxios'
import Cube from 'cube-ui'


Vue.use(Cube)

setaxios();

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')