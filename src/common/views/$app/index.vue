<template>
    <div id="app">
        <div id="app__body">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>

        <div v-show="$loadingState"
             id="app__loading">
            <base-loading v-model="$loadingState"></base-loading>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
