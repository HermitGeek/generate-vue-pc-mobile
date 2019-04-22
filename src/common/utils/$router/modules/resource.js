/**
 *  路由命名约束：
 *      父路由 name 带 模块名；子路由 name 带 模块名
 *      父路由 path 带 模块名；子路由 path 不带 模块名
 *
 *  路由跳转约束：
 *      $router.push({
 *          name: '',
 *          params: {}
 *      })
*/
export default [{
    path: 'overview',
    name: 'resource__overview',
    component(resolve) {
        require.ensure([], () => {
            resolve(require('@src/resource/views/overview/index.vue'));
        }, 'views/resource/overview/index');
    },
    meta: {
        keepAlive: true,
        rank: 20
    }
}];
