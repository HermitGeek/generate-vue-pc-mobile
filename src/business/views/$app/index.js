import { mapState } from 'vuex';



export default {
    name: 'business-app',

    computed: {
        ...mapState({
            $excludeKeepAlive: state => state.$app.$excludeKeepAlive
        })
    }
};

