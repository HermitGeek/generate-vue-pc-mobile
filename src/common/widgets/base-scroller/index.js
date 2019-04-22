import Vue from 'vue';
import vuebar from 'vuebar';
import InfiniteLoading from 'vue-infinite-loading';



Vue.use(vuebar);


/**
 * slot:
 *  第一类  default
 *      name: 无
 *      解释: 滚动容器的内容
 *
 *  第二类  no-results（非必填）
 *      name: no-results
 *      解释:  列表数据为空时，显示的提示
 *
 *  第三类  no-more（非必填）
 *      name: no-more
 *      解释:  没有更多列表数据时，显示的提示
 *
 *  第四类  error（非必填）
 *      name: error
 *      解释:  列表数据请求错误时，显示的提示
 *
 *
 *  event:
 *      infinite-load: 无限滚动开始加载
*/
export default {
    name: 'base-scroll',

    components: {
        InfiniteLoading
    },

    props: {
        /**
         * 滚动条 颜色
         */
        scrollColor: {
            type: String,
            required: false,
            default: '#aeacaa'
        },

        /**
         * 容器 颜色
         */
        containerColor: {
            type: String,
            required: false,
            default: '#fff'
        },

        /**
         * 是否 开启滚动加载
         */
        isInfinite: {
            type: Boolean,
            default: false
        },

        /**
         * 无限滚动 加载状态: 'loaded' 'complete' 'reset' 'error'
         *
         *
         * 组件外部 更新状态规则：
         *      请求到新数据，将状态改成 'loaded'
         *      没有请求到新数据，将状态改成 'complete'
         *      请求失败，将状态改成 'error'
         *      需要重置无限滚动，将状态改成 'reset'（无限滚动组件 初始化，自动请求一次数据）
         */
        infiniteState: {
            type: String,
            required: false,
            default: 'default',
            validator(val) {
                return ['loaded', 'complete', 'reset', 'error', 'default'].includes(val);
            }
        }
    },

    data() {
        return {
            instance: null
        };
    },

    watch: {
        infiniteState(next) {
            if (this.instance && this.instance[next]) {
                this.instance[next]();
                this.$emit('update:infiniteState', 'default');
            }
        },


        scrollColor(next) {
            this.$refs['base-scroll'].style.setProperty('--scrollColor', next);
        },

        containerColor(next) {
            this.$refs['base-scroll'].style.setProperty('--containerColor', next);
        }

    },

    mounted() {
        this.$refs['base-scroll'].style.setProperty('--scrollColor', this.scrollColor);
        this.$refs['base-scroll'].style.setProperty('--containerColor', this.containerColor);
    },

    methods: {
        async handleInfinite($state) {
            this.instance = $state;
            this.$emit('infinite-load');
        }
    }
};
