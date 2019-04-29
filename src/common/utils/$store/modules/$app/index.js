const state = {
    // loading 显示状态
    $loadingState: false
};

const $APP_SET_LOADING_STATE = '$APP_SET_LOADING_STATE';

const mutations = {
    /**
     * 设置loading显示
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_LOADING_STATE](state, mutation) {
        state.$loadingState = mutation.payload;
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
    }
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
