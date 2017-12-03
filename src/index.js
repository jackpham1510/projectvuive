import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import Example from './Vuetify.vue'
import Sapxep from './components/Sapxep.vue'
import 'vuetify/dist/vuetify.css'
import './scss/sapxep.scss'

Vue.use(Vuetify)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App)
})
