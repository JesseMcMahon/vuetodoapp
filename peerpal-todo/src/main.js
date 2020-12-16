import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"


const base = axios.create({
  baseURL: "http://localhost:4000"
})

// Vue.prototype.$http = base
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
