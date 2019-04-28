/**
 * 要求: 所有 iview 组件都重命名
 *
 * 命名规则: https://www.iviewui.com/docs/guide/iview-loader
*/
import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import { Input, Message } from 'iview';
import './theme.less';


// 按需注册 iview 组件
Vue.component('i-input', Input);
Vue.prototype.$Message = Message;
