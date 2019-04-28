import Vue from 'vue';
import VueRouter from 'vue-router';
import module1Conf from './modules/module1';


// 加载 vue-router
Vue.use(VueRouter);



/**
 *  路由命名约束：
 *      父路由： name 带 模块名；path 带 模块名
 *      子路由： name 带 模块名；path 不带 模块名
*/
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: {
            name: 'demo'
        }
    }, {
        path: '/demo',
        name: 'demo',
        component(resolve) {
            require.ensure([], () => {
                resolve(require('@src/common/views/demo/index.vue'));
            }, 'views/common/demo/index');
        },
        meta: {
            keepAlive: false,   // 判断 页面是否需要 keep-alive 缓存
            rank: 20            // 动态判断 已缓存的页面 是否需要销毁缓存
        }
    }, {
        path: '/module1',
        name: 'module1',
        redirect: {
            name: 'module1__demo'
        },
        component(resolve) {
            require.ensure([], () => {
                resolve(require('@src/module1/views/$app/index.vue'));
            }, 'views/module1/$app/index');
        },
        meta: {
            keepAlive: false,   // 判断 页面是否需要 keep-alive 缓存
            rank: 20            // 动态判断 已缓存的页面 是否需要销毁缓存
        },
        children: module1Conf
    }]
});


router.beforeEach((to, from, next) => {
    // 系统初始化逻辑
    setTimeout(async () => {
        next();
    }, 0);
});

router.afterEach(() => {
    // 切换页面后将屏幕滚动至顶端
    window.scrollTo(0, 0);
});


// 通过配置路由 meta.rank，动态销毁 已缓存的页面
Vue.mixin({
    beforeRouteLeave(to, from, next) {
        if (from && from.meta.rank && to.meta.rank && from.meta.rank > to.meta.rank) {
            // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
            if (this.$vnode && this.$vnode.data.keepAlive) {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance &&
                    this.$vnode.parent.componentInstance.cache &&
                    this.$vnode.componentOptions) {
                    const key = this.$vnode.key == null ?
                                    this.$vnode.componentOptions.Ctor.cid +
                                    (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') :
                                    this.$vnode.key;
                    const cache = this.$vnode.parent.componentInstance.cache;
                    const keys = this.$vnode.parent.componentInstance.keys;


                    if (cache[key]) {
                        delete cache[key];
                    }

                    if (cache[key] && keys.length && keys.indexOf(key) > -1) {
                        keys.splice(keys.indexOf(key), 1);
                    }
                }
            }

            this.$destroy();
        }
        next();
    }
});

export default router;

