<template>
  <div id="sapxep">
    <sort-header @click="sideBar = !sideBar"></sort-header>
    <sort-sidebar @click="sideBar = !sideBar" :class="{'open' : showSideBar}"></sort-sidebar> 
    <router-view class="my-content" @click="sideBar = sideBar && false"></router-view>   
  </div>
</template>

<script>
import router from '../js/sapxep/routes.js'
import Header from './sapxep/Header.vue'
import Sidebar from './sapxep/Sidebar.vue'

export default {
    router,
    components: {
        'sort-header': Header,
        'sort-sidebar': Sidebar,
    },
    data() {
        return {
            sideBar: window.innerWidth > 900,
        }
    },
    computed:{
        showSideBar() {
            return this.sideBar || window.innerWidth > 900
        }
    }
}
</script>
