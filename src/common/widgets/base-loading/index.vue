<template>
    <div v-show="isShow"
         class="base-loading">
        <div class="base-loading__content">
            <font-icon icon="sync"
                       class="spin-icon-load" >
            </font-icon>
            <span>Loading</span>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss"></style>
