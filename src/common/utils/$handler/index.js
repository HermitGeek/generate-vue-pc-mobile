import math from './assets/math-conf';

/**
 * 精准计算
 *
 * @param {Number} expre 数学表达式
 * @returns {String} 转换后的值
 */
const getCalculation = (expre) => {
    const value = Number(math.format(math.eval(expre), 14));

    return Number(value.toString());
};


/**
 * 将数字 转成 千分位分割的字符串
 *
 * @param {Number} value 数字
 * @returns {String} 转换后的值
 * */
const _formatNumberToSeparator = (value) => {
    if (typeof value !== 'number') {
        return '- -';
    }

    const re = /\d{1,3}(?=(\d{3})+$)/g;
    const result = String(Math.abs(value)).replace(/^(\d+)((\.\d+)?)$/, (s, s1, s2) => s1.replace(re, '$&,') + s2);

    return `${value < 0 ? '-' : ''}${result}`;
};

/**
 * 千分位分割的字符串 转成 数字
 *
 * @param {String} value 千分位分割的字符串
 * @returns {Number} 转换后的值
 * */
const formatSeparatorToNumber = value => Number(String(value).replace(/[,]/g, ''));


/**
 * 将数字 转成 保留n位小数的字符串（千分位分割）
 *
 * @param {Number} value 数字
 * @param {Number} n     保留n位小数（默认值 2）
 * @returns {String} 转换后的值
 * */
const formatNumberToFixed = (value, n = 2) => {
    if (typeof value !== 'number') {
        return '- -';
    }

    return _formatNumberToSeparator(Number(value.toFixed(n)));
};


/**
 * 将数字 转成 不带单位的数字（与 formatNumberUnit 配合使用）
 *
 * @param {Number} value     数字
 * @param {Boolean} English   单位是否是英文
 * @param {Number} n         数字保留几位小数
 * @returns {String} 转换后的值
 * */
const formatNumberValue = (value, English = false, n = 2) => {
    if (typeof value !== 'number') {
        return '- -';
    }

    const valueString = String(value);
    const length = valueString.indexOf('.') > -1 ? valueString.indexOf('.') : valueString
    .length;
    const dicts = {
        1: formatNumberToFixed(value, n),
        2: formatNumberToFixed(value, n),
        3: formatNumberToFixed(value, n),
        4: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value, n),
        5: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            10000, n),
        6: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            10000, n),
        7: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            10000, n),
        8: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            10000, n),
        9: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            100000000, n),
        10: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            100000000, n),
        11: English ? formatNumberToFixed(value / 1000, n) : formatNumberToFixed(value /
            100000000, n)
    };

    return dicts[length];
};

/**
 * 将数字 转成 单位（与 formatNumberValue 配合使用）
 *
 * @param {Number} value        数字
 * @param {Boolean} English   单位是否是英文
 * @returns {String} 单位
 * */
const formatNumberUnit = (value, English = false) => {
    if (typeof value !== 'number') {
        return '';
    }

    const valueString = String(value);
    const length = valueString.indexOf('.') > -1 ? valueString.indexOf('.') : valueString
    .length;
    const dicts = {
        1: '',
        2: '',
        3: '',
        4: English ? 'K' : '',
        5: English ? 'K' : '万',
        6: English ? 'K' : '万',
        7: English ? 'K' : '万',
        8: English ? 'K' : '万',
        9: English ? 'K' : '亿',
        10: English ? 'K' : '亿',
        11: English ? 'K' : '亿'
    };

    return dicts[length];
};


/**
 * 计算 日期间隔
 *
 * @param {String} d1       开始日期
 * @param {String} d2       结束日期
 * @returns {Number}        共多少天
 * */
const getDateDays = (d1, d2) => {
    const dateBegin = new Date(d1.replace(/-/g, '/')); // 将-转化为/，使用new Date
    const dateEnd = new Date(d2.replace(/-/g, '/')); // 将-转化为/，使用new Date
    const dateDiff = dateEnd.getTime() - dateBegin.getTime(); // 时间差的毫秒数
    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数

    return dayDiff + 1;
};


/**
 * 获取一定范围内的 n个 随机整数
 *
 * @param {Number} start       开始数字
 * @param {Number} end         结束数字
 * @param {Number}  n           取多少个
 * @returns {Array}            取出后的数组
 * */
const getRandomNumber = (start, end, n) => {
    const arr = [];

    if (start > end) {
        return arr;
    }

    for (let i = 0; i < n; i += 1) {
        const number = Math.floor((Math.random() * ((end - start) + 1)) + start);

        if (arr.indexOf(number) < 0) {
            arr.push(number);
        } else {
            i -= 1;
        }
    }

    return arr;
};


/**
 * 获取 对象/数组 中的值
 *
 * @param {Object} obj                    对象 或 数组
 * @param {String} keys                   字符串 或 数组；键值关联关系，可以是 'a.b.c'，也可以是 ['a', 'b', 'c']
 * @param {result} defaultValue           取不到值时定义的返回值，默认为 undefined
 * @returns {Array}                       取出的值
 * */
const getObjectValue = (obj, keys, defaultValue = undefined) => {
    if (!obj) {
        return defaultValue;
    }

    const keyArr = typeof keys === 'string' ? keys.split('.') : keys;


    if (keyArr.length === 1 && obj[keyArr[0]] !== undefined) {
        return obj[keyArr[0]];
    }


    if (obj[keyArr[0]] && keyArr.length > 1) {
        return getObjectValue(obj[keyArr[0]], keyArr.slice(1), defaultValue);
    }

    return defaultValue;
};

/**
 * 时间格式化
 * @param {DATE} date       时间对象
 * @param {String} format   格式化样式 yyyy-MM-dd hh:mm:ss
 * @return {String} 格式化后的时间
 */
const formatDate = (date, format) => {
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                (o[k]) :
                ((`00${o[k]}`).substr((`${o[k]}`).length)));
        }
    }

    return format;
};


export {
    getDateDays,                // 获取 日期天数
    getCalculation,             // 高精度计算
    getObjectValue,             // 获取 对象/数组 中的值（优化层层判空）
    getRandomNumber,            // 获取一定范围内的 n个 随机整数

    formatDate,                 // 时间格式化
    formatNumberToFixed,        // 将数字 千分位分割的字符串（默认保留2位小数）
    formatSeparatorToNumber,    // 千分位分割的字符串 转成 将数字=
    formatNumberValue,          // 与 formatNumberUnit 配合使用：将原数值 转成 去掉单位后的数值
    formatNumberUnit            // 与 formatNumberValue 配合使用：将原数值 转成 单位
};
