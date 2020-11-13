<template>
  <b-overlay :show="loading" rounded="sm">
    <div class="container-fluid">
      <slot></slot>
    </div>
  </b-overlay>
</template>

<script>

export default {
  name: 'BasicComponent',
  props: {
    loading: Boolean
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
</script>