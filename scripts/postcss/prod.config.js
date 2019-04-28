const autoprefixer = require('autoprefixer');
const postcssPxToViewport = require('postcss-px-to-viewport');
const isMobile = require('../../configs/prod.config').isMobile;



const config = {
    plugins: [
        autoprefixer({
            browsers: [
                '> 1%',
                'not ie <= 11',
                'last 2 versions',
                'last 3 iOS versions',
                'Android >= 4.0'
            ]
        })
    ]
};


// 如果是移动端
if (isMobile) {
    config.plugins.push(

        // https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
        postcssPxToViewport({
            dpr: 2,
            unitToConvert: 'px',    // 需要转换的单位
            viewportWidth: 750,     // 设计稿的视口宽度
            unitPrecision: 5,       // 单位转换后保留的精度
            viewportUnit: 'vw',     // 希望使用的视口单位
            propList: ['*', 'border-radius', '!border', '!font*', '!margin*', '!padding*'], // 能转化为vw的属性列表
            selectorBlackList: ['.ignore'],  // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
            minPixelValue: 1,       // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false,      // 是否需要转换 媒体查询里的单位
            exclude: /(\/|\\)(node_modules)(\/|\\)/
        })
    );
}



module.exports = config;
