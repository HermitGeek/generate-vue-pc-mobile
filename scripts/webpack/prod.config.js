const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prodEnvConfig = require('../../configs/prod.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

const rootPath = path.resolve(__dirname, '../../');
const contextPath = path.resolve(rootPath, './src/');
const nodeModulesPath = path.resolve(rootPath, './node_modules/');



module.exports = webpackMerge(baseWebpackConfig, {
    mode: 'production',

    output: {
        filename: '[name].js',
        chunkFilename: 'static/[name].[chunkHash:8].js',
        publicPath: prodEnvConfig.build.publicPath // CDN 路径

    },

    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }],
            include: [contextPath, nodeModulesPath]
        }, {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader'
            }],
            include: [contextPath, nodeModulesPath]
        }, {
            test: /\.sass$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader',
                options: {
                    indentedSyntax: true
                }
            }],
            include: [contextPath, nodeModulesPath]
        }, {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader'
            }],
            include: [contextPath, nodeModulesPath]
        }, {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    plugins: [
                        'transform-merge-sibling-variables',
                        'transform-remove-console',
                        'transform-remove-debugger',
                        'transform-remove-undefined'
                    ]
                }
            }],
            include: [contextPath],
            exclude: [nodeModulesPath]
        }, {
            test: /\.(png|jpg|gif|ico)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: `${prodEnvConfig.build.publicPath}static/assets/`
                }
            }]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: `${prodEnvConfig.build.publicPath}static/assets/`
                }
            }]
        }, {
            test: /\.(woff|woff2|otf|svg|eot|ttf)(\?#(iefix|fontawesomeregular))?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: `${prodEnvConfig.build.publicPath}static/assets/`
                }
            }]
        }]
    },

    plugins: [
        // 环境变量
        new webpack.DefinePlugin(prodEnvConfig.env),

        // 抽离 CSS
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contentHash:8].css'
        }),

        // 压缩 CSS
        new OptimizeCss(),

        new HtmlWebpackPlugin({
            filename: 'index.html', // 文件名
            template: './src/index.html', // 指定入口 html
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
        })
    ],

    // webpack 代码分割
    optimization: {
        splitChunks: {
            cacheGroups: {
                libs: {
                    test: /[\\/]node_modules[\\/]iview[\\/]/,
                    priority: 200,
                    name: './libs/iview/index',
                    chunks: 'all',
                    minSize: 1000
                }
            }
        }
    },

    performance: {
        hints: false // 关闭 文件超过250kb的警告
    }
});

