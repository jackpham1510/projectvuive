<template>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <a class="my-title" href="#">Project Vui Vẻ</a>
        <span style="height: 60px;">
            <span class="glyphicon glyphicon-th-list menu-button" @click="$emit('click')"></span>
        </span>
         
    </nav> 
</template>

<style lang="scss">
    $green-vue: #42b983;
    .navbar{
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        .my-title{    
            height: 60px;  
            padding: 0;
            padding-right: 15px;
            color: $green-vue;
            font-size: 22px;
            font-weight: bold;
        }
        .menu-button{
            font-size: 22px;
            display: none;
            float: left;
            line-height: 60px;
            cursor: pointer;
        }
    }
</style>
