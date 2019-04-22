<template>
    <div id="app">
        <div id="app__body">
            <keep-alive :exclude="$excludeKeepAlive.common">
                <router-view></router-view>
            </keep-alive>
        </div>

        <div v-show="$loadingState"
             id="app__loading">
            <base-loading v-model="$loadingState"></base-loading>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
