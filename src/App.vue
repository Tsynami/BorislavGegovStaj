<template>
  <div id="app">
    <b-navbar toggleable="lg" :sticky="true" variant="light">
      <b-nav>
        <b-navbar-brand>
          <router-link to="/">
            <b-icon-shop></b-icon-shop>
          </router-link>
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
          <b-button pill id="profile-btn"><b-icon-person></b-icon-person></b-button>
          <b-popover target="profile-btn" title="Profile" triggers="focus" placement="bottom">
            <Profile></Profile>
          </b-popover>
        </b-nav-item>
      </b-nav>
      <b-navbar-toggle target="nav-collapse" class="ml-auto"></b-navbar-toggle>
    </b-navbar>
    <div class="container-fluid" style="min-height: 70vh">
      <div class="row">
        <div class="col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer class="page-footer font-small blue pt-4">
      <div class="footer-copyright text-center">© 2020 Copyright:
        <a href="https://vuejs.org/">Vue.js</a>
      </div>
    </footer>
  </div>
</template>

<script>

import "./assets/sass/main.scss";
import {getCountCartItems} from "@/utils/cart_util";
import {EventBus} from "@/utils/event_bus";
import Profile from "@/components/Profile";

export default {
  name: 'App',
  components: {Profile},
  data: function () {
    return {
      countCardItems: 0
    };
  },
  methods: {},
  mounted() {
    this.countCardItems = getCountCartItems();
    EventBus.$on('cart-item-event', () => {
      this.countCardItems = getCountCartItems();
    });
  }
}
</script>

<style>
</style>
