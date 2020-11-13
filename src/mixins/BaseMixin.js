import {config} from "@/config/config";

export default {
    data: function () {
        return {
            isLoading: false,
            serverUrl: String
        };
    },
    mounted() {
        this.serverUrl = config.serverUrl;
    },
    methods: {
        showError(error) {
            this.$bvModal.msgBoxOk(error, {
                title: 'Error',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                centered: true
            })
        }
    }
}