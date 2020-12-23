<template>
  <div id="app">
    <Header></Header>
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

export default {
  name: 'App',
  components: {Footer, Header},
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
