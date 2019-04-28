<template>
    <div class="module1-app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js" scoped></script>
