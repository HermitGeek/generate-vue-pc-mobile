import Vue from 'vue';
import '@src/common/widgets/$icons';    // fontAwesome 字体图标
import '@src/common/widgets/$iview';    // pc端 UI组件库
import '@src/common/widgets/$vant';     // 移动端 UI组件库
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
