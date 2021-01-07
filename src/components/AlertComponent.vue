<template>
  <b-card :border-variant="status === 'OK' ? 'success' : 'danger'">
    <b-card-text>{{title}}
      <slot></slot>
    </b-card-text>
    <b-button :variant="status === 'OK' ? 'success' : 'danger'" @click="$emit('close-alert', 'closing')"><b-icon-x></b-icon-x> Close</b-button>
  </b-card>

</template>

<script>

import {required, minLength, email} from 'vuelidate/lib/validators';

export default {
  name: 'AlertComponent',
  props: {
    status: String,
    title: String
  },
  data: function () {
    return {
      email: '',
      password: '',
      submitStatus: ''
    }
  },
  methods: {
    submit: function () {
      this.$v.touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'OK'
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  validations: {
    email: {
      required,
      minLength: minLength(4),
      email
    },
    password: {
      minLength: minLength(4)
    }
  }

}
</script>


<style scoped>

</style>
