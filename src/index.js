import Vue from 'vue';
import $http from '@src/common/utils/$http';
import $store from '@src/common/utils/$store';
import $router from '@src/common/utils/$router';
import $app from '@src/common/views/$app';
import config from '../configs/base.config';



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



if (config.isMobile) {
    // 移动端 UI组件库
    require('@src/common/widgets/$vant');

    /**
     * 移动端 生产环境下 兼容 vm
     *
     * viewport units (vh|vw|vmin|vmax) in Mobile Safari
     * viewport units inside calc() expressions in Mobile Safari and IE9+ (hack)
     * vmin, vmax in IE9+ (hack)
     * viewport units in old Android Stock Browser (hack)
    */
    if (process.env.NODE_ENV === 'production') {
        require('viewport-units-buggyfill').init({
            hacks: require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
        });
    }
} else {

    // pc端 UI组件库
    // require('@src/common/widgets/$iview');

    // // fontAwesome 字体图标
    // require('@src/common/widgets/$icons');
}

