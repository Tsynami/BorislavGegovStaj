<template>
  <div id="app">
    <Header v-if="isLoggedIn" :count-card-items="countCardItems"></Header>
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
// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Utils
import {EventBus} from './utils/event_bus';
import {getCountCartItems} from './utils/cart_util';
import {isLoggedIn} from './utils/session_util';

// Misc.
import './assets/sass/main.scss';

export default {
  name: 'App',
  components: {Footer, Header},
  data: function () {
    return {
      isLoggedIn: false,
      countCardItems: 0
    };
  },
  methods: {},
  mounted() {
    EventBus.$on('loggedIn', ()=>{
      this.isLoggedIn = isLoggedIn();
    })
    this.isLoggedIn = isLoggedIn();
    this.countCardItems = getCountCartItems();
    EventBus.$on('update-cart-item', ()=>{
      this.countCardItems = getCountCartItems();
    })
  }
}
</script>

<style>
.popover{
  width: 500px;
}
div{
  margin: 0px;
}
</style>
