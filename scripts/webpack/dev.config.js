const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./base.config');
const devEnvConfig = require('../../configs/dev.conf');

const rootPath = path.resolve(__dirname, '../../');
const contextPath = path.resolve(rootPath, './src/');
const nodeModulesPath = path.resolve(rootPath, './node_modules/');
const processArgv = require('minimist')(process.argv.slice(2));



module.exports = webpackMerge(baseWebpackConfig, {
    mode: 'development',

    devtool: processArgv.build ? '' : 'cheap-module-eval-source-map',

    output: {
        filename: '[name].js',
        chunkFilename: 'static/[name].js',
        publicPath: devEnvConfig.build.publicPath // CDN 路径
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'vue-style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }],
            include: [contextPath, nodeModulesPath]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'vue-style-loader'
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
                loader: 'vue-style-loader'
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
                loader: 'vue-style-loader'
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
                loader: 'babel-loader'
            }],
            include: [contextPath],
            exclude: [nodeModulesPath]
        }, {
            test: /\.(png|jpg|gif|ico)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: `${devEnvConfig.build.publicPath}static/assets/`
                }
            }]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: `${devEnvConfig.build.publicPath}static/assets/`
                }
            }]
        }, {
            test: /\.(woff|woff2|otf|svg|eot|ttf)(\?#(iefix|fontawesomeregular))?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/assets/',
                    publicPath: `${devEnvConfig.build.publicPath}static/assets/`
                }
            }]
        }]
    },

    plugins: [
        // 环境变量
        new webpack.DefinePlugin(devEnvConfig.env),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
});
