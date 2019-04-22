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
    path: 'overview', // 概览页
    name: 'business__overview',
    component(resolve) {
        require.ensure([], () => {
            resolve(require('@src/business/views/overview/index.vue'));
        }, 'views/business/overview/index');
    },
    meta: {
        keepAlive: true,
        rank: 20
    }
}];

