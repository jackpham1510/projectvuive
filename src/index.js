import Vue from 'vue'
import VueRouter from 'vue-router'
//import App from './App.vue'
import Sapxep from './components/Sapxep.vue'
import './scss/sapxep.scss'

Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(Sapxep)
})
