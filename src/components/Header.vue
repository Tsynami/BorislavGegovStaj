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
      <b-nav>
        <b-button pill id="profile-btn">
          <b-icon-person></b-icon-person>
        </b-button>
        <b-popover
            target="profile-btn"
            title="Profile"
            triggers="focus"
            placement="bottom"
        >
          <Profile></Profile>
        </b-popover>
      </b-nav>
    </b-navbar>
  </header>
</template>

<script>

import Profile from "./Profile";

export default {
  name: 'Header',
  components: {Profile},
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
