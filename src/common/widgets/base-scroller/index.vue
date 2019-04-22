<template>
    <div v-bar="{useScrollbarPseudo: true}"
         ref="base-scroll"
         style="height: 100%;">
        <div infinite-wrapper>
            <slot></slot>

            <infinite-loading v-if="isInfinite"
                              :distance="30"
                              :force-use-infinite-wrapper="true"
                              spinner="circles"
                              @infinite="handleInfinite">
                <template slot="no-results">
                    <slot name="no-results"></slot>
                </template>
                <template slot="no-more">
                    <slot name="no-more"></slot>
                </template>
                <template slot="error">
                    <slot name="error"></slot>
                </template>
            </infinite-loading>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss"></style>
