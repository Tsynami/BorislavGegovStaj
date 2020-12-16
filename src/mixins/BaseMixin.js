import {config} from "@/config/config"

export default {
    data: function () {
        return {
            isLoading: false,
            serverUrl: String
        }
    },
    mounted() {
        this.serverUrl = config.serverUrl;
    },
    methods: {
        showSuccess(msg) {
            this.$bvModal.msgBoxOk(msg, {
                title: 'Success',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                centered: true
            })
        },
        showError(err) {
            this.$bvModal.msgBoxOk(err, {
                title: 'Error',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                centered: true
            })
        }
    }
}