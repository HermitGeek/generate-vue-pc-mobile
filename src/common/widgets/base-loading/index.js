export default {
    name: 'base-loading',

    model: {
        prop: 'isShow',
        event: 'on-change'
    },

    props: {
        isShow: {
            type: Boolean,
            default: false,
            required: false
        }
    }
};
