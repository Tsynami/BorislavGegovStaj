<template>
  <header>
    <b-navbar toggleable="lg" :sticky="true" style="">
      <b-nav>
        <b-navbar-brand>
          <b-button pill to="/">
            <b-icon-house-fill></b-icon-house-fill>
            Home
          </b-button>
        </b-navbar-brand>
      </b-nav>
      <b-nav class="ml-auto">
        <b-nav-item>
          <b-button pill to="/cart" right>
            <b-icon-cart-fill></b-icon-cart-fill>
            <b-badge>{{countCardItems}}</b-badge> Cart
          </b-button>
        </b-nav-item>
      </b-nav>
      <b-nav>
        <b-button pill id="profile-btn">
          <b-icon-person-fill></b-icon-person-fill>
          Profile
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

import Profile from './Profile'
import '../assets/sass/main.scss'

export default {
  name: 'Header',
  components: {Profile},
  props:{
    countCardItems: Number
  },
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
