<template>
    <div class="resource-app">
        <keep-alive :exclude="$excludeKeepAlive.resource">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js" scoped></script>
