<template>
  <b-overlay :show="loading">
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
  components: {},
  data: function () {
    return {};
  },
  methods: {},
  mounted() {
  }
}
</script>

<style>
</style>
