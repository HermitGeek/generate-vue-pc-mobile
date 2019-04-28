const isMobile = require('../../configs/base.config').isMobile;


const baseConfig = {
    filename: 'index.html',
    template: './src/index.html'
};


// 如果是移动端
if (isMobile) {
    Object.assign(baseConfig, {
        meta: {
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;'
        }
    });
}


// prod 环境下 移除不必要的输出
const prodConfig = Object.assign({}, baseConfig, {
    hash: true, // html 中引入的资源 加哈希（避免缓存导致的问题）; 默认false
    minify: {
        removeComments: true,           // 去掉注释
        removeAttributeQuotes: true,    // 去掉标签上 属性的双引号
        collapseWhitespace: true,       // 去掉空行
        removeRedundantAttributes: true, // 去掉多余的属性
        removeEmptyAttributes: true,    // 去掉空属性
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    }
});


module.exports = {
    dev: baseConfig,
    prod: prodConfig
};
