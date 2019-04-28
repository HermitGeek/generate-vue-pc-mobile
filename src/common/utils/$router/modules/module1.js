export default [{
    path: 'demo', // 概览页
    name: 'module1__demo',
    component(resolve) {
        require.ensure([], () => {
            resolve(require('@src/module1/views/demo/index.vue'));
        }, 'views/module1/demo/index');
    },
    meta: {
        keepAlive: true,
        rank: 20
    }
}];

