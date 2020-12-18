<template>
  <BasicComponent :loading="isLoading">
    <div class="row mb-1">
      <div class="col-12">
        <b-breadcrumb :items="[{text: 'Cart', href: '/cart'}]"></b-breadcrumb>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <h3>Cart</h3>
      </div>
    </div>
    </BasicComponent>
</template>

<script>
import BasicComponent from "./BasicComponent";
export default {
name: "cart",
  components: {BasicComponent}

}
</script>

<style scoped>

</style>