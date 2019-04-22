import _cloneDeep from 'lodash/cloneDeep';


const state = {
    // loading 显示状态
    $loadingState: false,

    // keep-alive excludeRoute
    $excludeKeepAlive: {
        common: [],
        business: [],
        resource: []
    }
};

const $APP_SET_LOADING_STATE = '$APP_SET_LOADING_STATE';
const $APP_SET_EXCLUDE_KEEP_ALIVE = '$APP_SET_EXCLUDE_KEEP_ALIVE';

const mutations = {
    /**
     * 设置loading显示
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_LOADING_STATE](state, mutation) {
        state.$loadingState = mutation.payload;
    },

    /**
     * 设置 keep-alive excludeRoute
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_EXCLUDE_KEEP_ALIVE](state, mutation) {
        state.$excludeKeepAlive = Object.assign({}, state.$excludeKeepAlive, mutation.payload);
    }
};

const actions = {
    // 设置loading状态
    $appSetLoadingState({
        commit
    }, state) {
        if (typeof state === 'boolean') {
            commit({
                type: $APP_SET_LOADING_STATE,
                payload: state
            });
        } else {
            throw new Error('[$appSetLoadingState] invalid state');
        }
    },


    // 设置 keep-alive excludeRoute
    $appSetExcludeKeepAlive({
        state,
        commit
    }, toRoute) {
        const moduleRoute = toRoute.matched[0];
        const currentRoute = toRoute;

        const moduleExcludeRoute = _cloneDeep(state.$excludeKeepAlive.common);
        const currentExcludeRoute = _cloneDeep(state.$excludeKeepAlive[moduleRoute.name]);


        // 处理 模块路由
        if (!moduleExcludeRoute.includes(moduleRoute.name) && !moduleRoute.meta.keepAlive) {
            moduleExcludeRoute.push(moduleRoute.name);

            commit({
                type: $APP_SET_EXCLUDE_KEEP_ALIVE,
                payload: {
                    common: moduleExcludeRoute
                }
            });
        }

        // 处理 页面路由
        if (currentExcludeRoute && !currentExcludeRoute.includes(currentRoute.name) && !currentRoute.meta.keepAlive) {
            currentExcludeRoute.push(currentRoute.name);

            commit({
                type: $APP_SET_EXCLUDE_KEEP_ALIVE,
                payload: {
                    [moduleRoute.name]: currentExcludeRoute
                }
            });
        }
    }
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
