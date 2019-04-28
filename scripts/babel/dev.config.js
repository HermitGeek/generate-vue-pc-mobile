const isMobile = require('../../configs/dev.config').isMobile;



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
        '@babel/plugin-syntax-dynamic-import'
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
