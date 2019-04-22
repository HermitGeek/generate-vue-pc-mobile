import { mapState } from 'vuex';



export default {
    name: 'resource-app',

    computed: {
        ...mapState({
            $excludeKeepAlive: state => state.$app.$excludeKeepAlive
        })
    }
};

