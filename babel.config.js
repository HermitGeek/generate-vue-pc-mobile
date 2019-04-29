const deviceType = require('./configs/base.config').deviceType;



const config = {
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
if (deviceType === 'mobile') {
    // 动态加载 vant 样式
    config.plugins.push([
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
    config.plugins.push([
        'import',
        {
            libraryName: 'iview',
            libraryDirectory: 'src/components'
        }
    ]);
}


module.exports = config;
