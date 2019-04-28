const isMobile = require('../../configs/prod.config').isMobile;



const config = {
    presets: [
        [
            '@babel/preset-env', {
                modules: false
            }
        ]
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        'transform-merge-sibling-variables',
        'transform-remove-console',
        'transform-remove-debugger',
        'transform-remove-undefined'
    ],
    comments: false
};



// 如果是移动端
if (isMobile) {
    config.plugins.push();
} else {
    config.plugins.push();
}



module.exports = config;
