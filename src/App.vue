<template>
  <div id="app">
    <Header :count-card-items="countCardItems"></Header>
    <div class="container-fluid mt-5 mb-3">
      <div class="row">
        <div class="col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from "./components/Header";
import Footer from "./components/Footer";
import './assets/sass/main.scss';
import {EventBus} from "@/utils/event_bus";
import {getCountCartItems} from "@/utils/cart_util";

export default {
  name: 'App',
  components: {Footer, Header},
  data: function () {
    return {
      countCardItems: 0
    };
  },
  methods: {},
  mounted() {
    EventBus.$on('cart-item-event', () => {
      this.countCardItems = getCountCartItems();
    })
  }
}
</script>

<style>
</style>
