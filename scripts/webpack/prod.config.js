const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prodEnvConfig = require('../../configs/prod.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

const rootPath = path.resolve(__dirname, '../../');
const contextPath = path.resolve(rootPath, './src/');
const nodeModulesPath = path.resolve(rootPath, './node_modules/');
const babelProdOptions = require('../babel').prod;
const htmlPluginProdOptions = require('../html-webpack-plugin').prod;



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
                options: babelProdOptions
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

        new HtmlWebpackPlugin(htmlPluginProdOptions)
    ],

    performance: {
        hints: false // 关闭 文件超过250kb的警告
    }
});

