<template>
    <div class="business-app">
        <keep-alive :exclude="$excludeKeepAlive.business">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js" scoped></script>
