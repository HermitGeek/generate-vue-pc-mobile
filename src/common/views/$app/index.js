import { mapState } from 'vuex';
import BaseLoading from '@src/common/widgets/base-loading';



export default {
    name: 'app',

    components: {
        BaseLoading
    },

    computed: {
        ...mapState({
            $loadingState: state => state.$app.$loadingState
        })
    }
};

