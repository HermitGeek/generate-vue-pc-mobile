const isMobile = require('../../configs/base.config').isMobile;



const baseConfig = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ]
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import'
    ],
    comments: false
};



// 如果是移动端
if (isMobile) {
    // 动态加载 vant 样式
    baseConfig.plugins.push([
        'import',
        {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        },
        'vant'
    ]);
} else {
    // 动态加载 iview 样式
    baseConfig.plugins.push([
        'import',
        {
            libraryName: 'iview',
            libraryDirectory: 'src/components'
        }
    ]);
}


// prod 环境下 移除不必要的输出
const prodConfig = JSON.parse(JSON.stringify(baseConfig));

prodConfig.plugins.push(
    'transform-merge-sibling-variables',
    'transform-remove-console',
    'transform-remove-debugger',
    'transform-remove-undefined'
);

module.exports = {
    dev: baseConfig,
    prod: prodConfig
};
