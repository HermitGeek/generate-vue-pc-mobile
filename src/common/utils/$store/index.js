// https://github.com/vuejs/vuex/issues/451
import 'core-js/fn/promise';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import $group from './modules/$group';
import $app from './modules/$app';



Vue.use(Vuex);



export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    plugins: [
        createPersistedState({
            key: '$group',
            paths: ['$group']
        })
    ],
    modules: {
        $group,
        $app
    }
});
