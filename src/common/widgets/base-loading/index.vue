<template>
    <div v-show="isShow"
         class="base-loading">
        <div class="base-loading__content ignore-to-vw">
            <svg aria-hidden="true"
                 focusable="false"
                 data-prefix="fas"
                 data-icon="sync"
                 role="img"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"
                 class="spin-icon svg-inline--fa fa-sync fa-w-16">
                <path :d="svgPath"
                      fill="currentColor">
                </path>
            </svg>

            <span>Loading</span>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss"></style>
