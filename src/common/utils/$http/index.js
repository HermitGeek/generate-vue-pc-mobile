/* global __API__ */
import {
    normalize
} from 'normalizr';
import axios from 'axios';
import $cache from '../$cache';



/**
 * 接口状态，分别对应等待响应、响应成功和响应失败
 * @type {String}
 */
const STATUS_PENDING = 'PENDING';
const STATUS_SUCCESS = 'SUCCESS';
const STATUS_FAILURE = 'FAILURE';



/**
 * 用于记录每个接口的信息（请求参数、详情参数、请求状态、XHR）
 * @type {Object}
 */
const requestApis = {};



/**
 * 全局 http 请求方法
 *
 * @param {Object} {} 请求信息
 * @return {Object} 响应数据
 */
const $http = async ({
    config,
    params
}) => {
    if (!(typeof config === 'object' && config !== null)) {
        throw new Error('$http invalid $api-config');
    }

    if (requestApis[config.name] && requestApis[config.name].status === STATUS_PENDING &&
        JSON.stringify(requestApis[config.name].params) === JSON.stringify(params)) {
        // 中断尚未收到响应的请求
        requestApis[config.name].canceler();

        // 标记 同一个请求被取消次数
        if (!requestApis[config.name].canceledNumber) {
            requestApis[config.name].canceledNumber = 0;
        }

        requestApis[config.name].canceledNumber += 1;
    }

    // 尝试读取已有缓存
    let cacheKey = config.cacheKey;
    let cacheValue;
    const useCache = typeof cacheKey === 'string';

    if (useCache) {
        cacheKey = cacheKey.replace(/\{(.[^{}]*)}/g, (value, $1) => params[$1]);
        cacheValue = await $cache.getItem(cacheKey);

        if (cacheValue !== null) {
            Object.assign(params, {
                timestamp: cacheValue.timestamp
            });
        }
    }

    // 组装 axios() 参数
    let canceler = null;
    const proxy = config.proxy;
    const methodIsPostRelevant = proxy.method.toUpperCase() === 'POST' ||
        proxy.method.toUpperCase() === 'PUT' ||
        proxy.method.toUpperCase() === 'PATCH';
    const _options = Object.assign(proxy, {
        // 不修改绝对路径
        url: /^http(s)?:\/\//.test(proxy.url) ? proxy.url : __API__.BASEURL + proxy.url,
        params: !methodIsPostRelevant ? params : '',
        data: !methodIsPostRelevant ? '' : params,
        cancelToken: new axios.CancelToken((cancel) => {
            canceler = cancel;
        })
    });



    const axiosXHR = axios(_options);


    if (!requestApis[config.name]) {
        requestApis[config.name] = {};
    }

    requestApis[config.name].status = STATUS_PENDING;
    requestApis[config.name].params = proxy.data;
    requestApis[config.name].XHR = axiosXHR;
    requestApis[config.name].canceler = canceler;

    try {
        const response = await Promise.resolve(axiosXHR);

        // 判断已有缓存是否有效
        // TODO: 张新 验证
        if (useCache) {
            switch (response.data.code) {
                case 0:
                    await $cache.setItem(cacheKey, response.data);
                    break;

                case 208:
                    response.data = cacheValue;
                    break;

                default:
            }
        }

        if (response.data.code === 0) {
            requestApis[config.name].status = STATUS_SUCCESS;
            requestApis[config.name].response = response.data;

            const originalData = response.data.data;

            // 对设置了 schema 的接口响应进行范式化处理
            if (config.schema) {
                return normalize(originalData, config.schema);
            }

            return originalData;
        }



        throw response.data;
    } catch (error) {
        let response;

        // TODO: 登录校验 跳转

        if (error.code) {
            response = error;
        } else if (requestApis[config.name].canceledNumber) {
            response = {
                code: -1,
                data: `$api ${config.name} abort`
            };

            requestApis[config.name].canceledNumber -= 1;
        } else {
            response = {
                code: -2,
                data: `$api ${config.name} error`
            };
        }

        requestApis[config.name].status = STATUS_FAILURE;

        throw response;
    }
};

export default $http;
