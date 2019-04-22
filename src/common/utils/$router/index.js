import Vue from 'vue';
import VueRouter from 'vue-router';
import businessConf from './modules/business';
import resourceConf from './modules/resource';


// 加载 vue-router
Vue.use(VueRouter);



const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: {
            name: 'login'
        }
    }, {
        path: '/login',
        name: 'login',
        component(resolve) {
            require.ensure([], () => {
                resolve(require('@src/common/views/login/index.vue'));
            }, 'views/common/login/index');
        },
        meta: {
            keepAlive: false,   // 判断 页面是否需要 keep-alive 缓存
            rank: 20            // 动态判断 已缓存的页面 是否需要销毁缓存
        }
    }, {
        path: '/business',
        name: 'business',
        redirect: {
            name: 'business__overview'
        },
        component(resolve) {
            require.ensure([], () => {
                resolve(require('@src/business/views/$app/index.vue'));
            }, 'views/business/$app/index');
        },
        meta: {
            keepAlive: false,   // 判断 页面是否需要 keep-alive 缓存
            rank: 20            // 动态判断 已缓存的页面 是否需要销毁缓存
        },
        children: businessConf
    }, {
        path: '/resource',
        name: 'resource',
        redirect: {
            name: 'resource__resource-list'
        },
        component(resolve) {
            require.ensure([], () => {
                resolve(require('@src/resource/views/$app/index.vue'));
            }, 'views/resource/$app/index');
        },
        meta: {
            keepAlive: false,   // 判断 页面是否需要 keep-alive 缓存
            rank: 20            // 动态判断 已缓存的页面 是否需要销毁缓存
        },
        children: resourceConf
    }]
});


router.beforeEach((to, from, next) => {
    // 系统初始化逻辑
    setTimeout(async () => {
        next();
    }, 0);

    router.app.$store.dispatch('$appSetExcludeKeepAlive', to);
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

