/* global __API__ */
export default {
    /**
     * 用户登陆
     * @type {Object}
     */
    USER_LOGIN: {
        name: 'USER_LOGIN',
        proxy: {
            url: `${__API__.BASE_URL}/user/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            transformRequest: [function (data) {
                const params = new URLSearchParams();

                for (const key in data) {
                    params.append(key, data[key]);
                }

                return params;
            }],
            withCredentials: true
        }
    },

    /**
     * 用户注销
     * @type {Object}
     */
    USER_LOGOUT: {
        name: 'USER_LOGOUT',
        proxy: {
            url: `${__API__.BASE_URL}/user/logout`,
            method: 'POST',
            withCredentials: true
        }
    }
};
