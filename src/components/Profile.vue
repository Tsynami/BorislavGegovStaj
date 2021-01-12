<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 font-weight-bold">User</div>
      <div class="col-lg-8 text-right">username</div>
    </div>
    <div class="row">
      <div class="col-lg-4 font-weight-bold">Email</div>
      <div class="col-lg-8 text-right">email</div>
    </div>
    <hr class="my-4">
    <div class="row">
      <div class="col-lg-12">
        <b-button variant="danger">
          <b-icon-unlock></b-icon-unlock>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  components: {},
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
