import echarts from 'echarts/lib/echarts'; // 引入 ECharts 主模块
import 'echarts/lib/component/tooltip'; // 引入提示框
import 'echarts/lib/component/title'; // 引入标题组件
import 'echarts/lib/component/legendScroll'; // 引入 legend 图例
import 'echarts/lib/chart/pie'; // 引入饼图



export default {
    name: 'base-chart',

    props: {
        /**
         * 图表 宽
         */
        width: {
            type: [String, Number],
            default: '100%'
        },

        /**
         * 图表 高
         */
        height: {
            type: [String, Number],
            default: '100%'
        },

        /**
         * 图表配置项
         * 参考：http://echarts.baidu.com/option.html#title
         */
        options: {
            type: Object,
            default: () => {}
        },

        /**
         * loading 是否显示
         */
        loadingIsShow: {
            type: Boolean,
            default: false
        },

        /**
         * loading 样式
         * 参考：https://echarts.baidu.com/api.html#echartsInstance.showLoading
         */
        loadingStyle: {
            type: Object,
            default: () => ({
                text: '',
                color: '#ff238d',
                maskColor: 'rgba(255, 255, 255, 0.8)',
                zlevel: 0
            })
        }
    },

    data() {
        return {
            // chart 实例
            chartInstance: null
        };
    },

    computed: {
        containerStyle() {
            return [{
                width: typeof this.width === 'string' ? this.width : `${this.width}px`
            }, {
                height: typeof this.height === 'string' ? this.height : `${this.height}px`
            }];
        }
    },

    watch: {
        options: {
            deep: true,
            handler() {
                this.chartInstance.setOption(this.options, true);
            }
        },

        loadingIsShow: {
            immediate: true,
            handler(val) {
                this.$nextTick(() => {
                    if (val) {
                        this.chartInstance.showLoading('default', this.loadingStyle);
                    } else {
                        this.chartInstance.hideLoading();
                    }
                });
            }
        }
    },

    mounted() {
        this.chartInstance = echarts.init(this.$el);
        this.chartInstance.setOption(this.options, true);

        window.addEventListener('resize', this.chartInstance.resize);
    },

    destroyed() {
        window.removeEventListener('resize', this.chartInstance.resize);
    }
};
