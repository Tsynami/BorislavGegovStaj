<template>
  <div id="app">
    <Header>

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
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header, Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
