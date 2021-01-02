<template>
  <header>
    <b-navbar toggleable="lg" :sticky="true" variant="dark" type="dark" class="shadow">
      <b-navbar-nav>
        <b-navbar-brand>
          <div class="row">
            <div class="col-6">
              <b-button pill to="/">
                <b-icon-shop></b-icon-shop>
              </b-button>
            </div>
            <div class="col-6">
              <b-button pill to="/cart" style="">
                <b-icon-cart></b-icon-cart>
              </b-button>
            </div>
          </div>


        </b-navbar-brand>
      </b-navbar-nav>
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
