<template>
  <div id="app">
    <Header
        :count-card-items="countCardItems"
        v-if="isLoggedIn"></Header>
    <div class="container-fluid mt-5 mb-3" style="min-height: 70vh">
      <div class="row">
        <div class="col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer v-if="isLoggedIn"></Footer>
  </div>
</template>

<script>

import "./assets/sass/main.scss";
import {getCountCartItems} from "@/utils/cart_util";

import {isLoggedIn} from "@/utils/session_util";
import {EventBus} from "@/utils/event_bus";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {Header, Footer},
  data: function () {
    return {
      countCardItems: 0,
      isLoggedIn: false
    };
  },
  methods: {},
  mounted() {
    this.countCardItems = getCountCartItems();
    this.isLoggedIn = isLoggedIn();
    EventBus.$on('cart-item-event', () => {
      this.countCardItems = getCountCartItems();
    });
  }
}
</script>

<style>
</style>
