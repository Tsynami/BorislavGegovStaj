<template>
  <header>
    <b-navbar toggleable="lg" :sticky="true" variant="light" type="light" class="shadow">
      <b-nav>
        <b-navbar-brand>
          <b-button pill to="/">
            <b-icon-shop></b-icon-shop>
          </b-button>
        </b-navbar-brand>
      </b-nav>
      <b-nav class="ml-auto">

      </b-nav>
    </b-navbar>
  </header>
</template>

<script>

export default {
  name: 'Header',
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
