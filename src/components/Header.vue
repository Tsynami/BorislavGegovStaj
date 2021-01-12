<template>
  <header>
    <b-navbar toggleable="lg" :sticky="true" variant="dark" type="dark" class="shadow">
      <b-nav>
        <b-navbar-brand>
          <b-button pill to="/">
            <b-icon-shop></b-icon-shop>
            Home
          </b-button>
        </b-navbar-brand>
      </b-nav>
      <b-nav class="ml-auto">
        <b-nav-item>
          <b-button pill to="/cart" right>
            <b-icon-cart-fill></b-icon-cart-fill>
            Cart
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button pill to="/login" right>
            <b-icon-person-fill></b-icon-person-fill>
            Login
          </b-button>
        </b-nav-item>
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
