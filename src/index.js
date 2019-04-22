import Vue from 'vue';
import '@src/common/widgets/$icons';
import '@src/common/widgets/$iview';
import $http from '@src/common/utils/$http';
import $store from '@src/common/utils/$store';
import $router from '@src/common/utils/$router';
import $app from '@src/common/views/$app';



// 创建 vue根实例
const vm = new Vue({
    el: '#mount',
    router: $router,
    store: $store,
    render: createElement => createElement($app)
});

Vue.prototype.$vm = vm;
Vue.prototype.$http = $http;


export default vm;
