module.exports = {
    // 是否是移动端
    isMobile: false,

    // 运行 环境变量
    env: {
        __API__: {
            BASE_URL: '" "'
        }
    },

    // 构建 环境变量
    build: {
        // 部署阶段文件加载路径
        publicPath: '/'
    }
};
