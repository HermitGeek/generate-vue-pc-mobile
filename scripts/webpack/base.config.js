const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isBuildMode = require('minimist')(process.argv.slice(2)).build;
const isShowMode = require('minimist')(process.argv.slice(2)).show;
const ProgressBarPlugin = require('progress-webpack-plugin');

const rootPath = path.resolve(__dirname, '../../');
const contextPath = path.resolve(rootPath, './src/');
const nodeModulesPath = path.resolve(rootPath, './node_modules/');
const deviceType = require('../../configs/base.config').deviceType;



// 部署打包时, 需要运行的插件
const plugins = [];

// 构建模式
if (isBuildMode) {
    plugins.push(

        // 清空dist文件夹
        new CleanWebpackPlugin(['dist'], {
            root: rootPath,
            verbose: true
        })
    );

    // 构建查看可视化体积
    if (isShowMode) {
        plugins.push(

            // 可视化展示打包体积
            new BundleAnalyzerPlugin()
        );
    }
}



module.exports = {
    entry: {
        index: `./src/index~${deviceType}.js`
    },

    output: {
        path: path.resolve(rootPath, './dist')
    },

    resolve: {
        // 路径别名
        alias: {
            '@src': path.resolve(rootPath, 'src')
        },

        // 依次 自动添加 文件后缀
        extensions: ['.vue', '.js', '.scss', '.css', '.json'],

        // 指明第三方模块存放的位置，以减少搜索步骤
        modules: [nodeModulesPath]
    },

    module: {
        rules: [{
            test: /\.(htm|html)$/,
            use: [{
                loader: 'html-withimg-loader'
            }]
        }, {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }],
            include: [contextPath, nodeModulesPath]
        }]
    },

    plugins: [
        // 部署打包 需要运行的插件（清空dist文件夹、可视化分析）
        ...plugins,

        // 将定义过的其它规则复制并应用到 .vue 文件里相应语言的块
        new VueLoaderPlugin(),

        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.NamedModulesPlugin(),

        // 配合热替换使用
        new webpack.HotModuleReplacementPlugin(),

        // 打包时显示进度
        new ProgressBarPlugin()
    ],

    // webpack 代码分割
    optimization: {
        runtimeChunk: {
            name: 'static/runtime/index'
        }
    },

    // 精简 终端输出（打包部署）
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },

    devServer: {
        // 精简 终端输出（本地运行）
        stats: {
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        },
        contentBase: path.resolve(rootPath, './dist'), // 启动本地服务时，从哪加载内容
        host: '0.0.0.0',    // 可 通过IP 访问，也可以通过 localhost 访问
        useLocalIp: true,   // browser open with your local IP
        port: 3000,
        open: true, // 启动本地服务后，自动打开页面
        hot: true, // 是否启用webpack热替换（局部筛选）
        compress: true, // 是否启用 gzip 压缩（服务器）
        overlay: true, // 编译器错误或警告时, 在浏览器中显示全屏覆盖; 默认false
        inline: true // 在打包后文件里注入一个websocket客户端
    }
};

