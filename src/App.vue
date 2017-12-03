<template>
    <v-app>
        <!-- Sidebar -->
        <v-navigation-drawer app fixed v-model="drawer">
            <!-- Header of Sidebar -->
            <v-toolbar style="background: #42b983">
                <v-list>
                    <v-list-tile >
                        <v-list-tile-action>
                            <!-- <img src="img/v.png" alt="vue-logo" width="32" height="32"> -->
                            <v-icon class="m-title">favorite</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="m-title">Project Vui Vẻ</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <!-- End Header of Sidebar -->

            <v-list class="mt-3" two-line>
                <template v-for="item in items">
                    <v-list-tile :key="item.title" @click="$router.push(item.href)">
                        <v-list-action style="width: 56px">
                            <v-icon>favorite</v-icon>
                        </v-list-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="item.title + ' divider'" class="ma-0"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <!-- End Sidebar -->

        <!-- Header -->
        <v-toolbar fixed app style="background: #42b983">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="m-title"></v-toolbar-side-icon>
            <v-toolbar-title style="width: 100%; margin-left: -33.91px">
                <p class="text-xs-center ma-0 m-title">Sắp xếp</p>
            </v-toolbar-title>
        </v-toolbar>
        <!-- End Header -->


        <!-- Main -->
        <v-content style="background: white">
            <v-container fluid style="background: white">
                <v-fade-transition mode="out-in">
                    <v-layout column>
                        <router-view></router-view>
                    </v-layout>
                </v-fade-transition>
            </v-container>    
        </v-content>
        <!-- End Main -->
    </v-app>
</template>

<style>
    .m-title{
        font-size: 24px; 
        font-weight: bold;
        color: white !important;
    }
</style>


<script>
import router from './js/sapxep/routes.js'
export default {
    router,
    data() {
        return { 
            drawer: true,
            items: [
                {title: 'Sắp xếp chọn', href: '/sapxep/selection-sort'},
                {title: 'Sắp xếp chèn', href: '/sapxep/insertion-sort'},
                {title: 'Sắp xếp nổi bọt', href: '/sapxep/buble-sort'},
                {title: 'Sắp xếp vun đống', href: '/sapxep/heap-sort'},
                {title: 'Sắp xếp nhanh', href: '/sapxep/quick-sort'},
                {title: 'Sắp xếp trộn', href: '/sapxep/merge-sort'}
            ]
        }
    }
}
</script>