<template>
  <div id="app">
    <Header v-if="isLoggedIn" :count-card-items="countCardItems">

    </Header>
    <div class="container-fluid nt-5 nb-3">
      <div class="col-12">
        <router-view></router-view>
      </div>
    </div>
    <Footer>

    </Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import './assets/sass/main.scss';
import {EventBus} from "./utils/event_bus";
import {getCountCartItems} from "./utils/cart_util";
import {isLoggedIn} from "./utils/session_util";

export default {
  name: 'App',
  components: {Footer, Header},
  data: function () {
    return {
      countCardItems: 0,
      isLoggedIn: false
    };
  },
  methods: {},
  mounted() {
    EventBus.$on('reload-event', () => {
      this.isLoggedIn = isLoggedIn();
    })
    EventBus.$on('cart-item-event', () => {
      this.countCardItems = getCountCartItems();
    })
  }
}
</script>

<style>

</style>
