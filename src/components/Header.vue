<template>
  <b-navbar toggleable="lg" :sticky="true" variant="light" type="light" class="shadow">
    <b-nav>
      <b-navbar-brand>
        <b-button pill to="/">
          <b-icon-shop></b-icon-shop>
        </b-button>
      </b-navbar-brand>
    </b-nav>
    <b-nav class="ml-auto">
      <b-nav-item to="/cart" right>
        <b-button pill>
          <b-icon-cart></b-icon-cart>
          <b-badge>{{ countCardItems }}</b-badge>
        </b-button>
      </b-nav-item>
      <b-nav-item>
        <b-button pill id="profile-btn">
          <b-icon-person></b-icon-person>
        </b-button>
        <b-popover target="profile-btn" title="Profile" triggers="focus" placement="bottom">
          <Profile></Profile>
        </b-popover>
      </b-nav-item>
    </b-nav>
    <b-navbar-toggle target="nav-collapse" class="ml-auto"></b-navbar-toggle>
  </b-navbar>
</template>

<script>


import Profile from "@/components/Profile";

export default {
  name: 'Header',
  components: {Profile},
  props: {
    countCardItems: Number
  },
  data() {
    return {}
  },
  watch: {},
  methods: {}
}
</script>