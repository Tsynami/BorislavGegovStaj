<template>
  <div class="container">
    <div class="row">
      <div class="col-4 font-weight-bold">
        User
      </div>
      <div class="col-8 text-right">
        {{ user.username }}
      </div>
    </div>
    <div class="row">
      <div class="col-4 font-weight-bold">
        Email
      </div>
      <div class="col-8 text-right">
        {{ user.email }}
      </div>
    </div>
    <hr class="my-4">
    <div class="row">
      <div class="col-12 text-right">
        <b-button @click="logout" variant="danger">
          <b-icon-unlock></b-icon-unlock>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteJwt} from "@/utils/session_util";
import {removeUser, getUser} from "@/utils/user_util";

export default {
  data() {
    return {
      user: {}
    }
  },
  watch: {},
  mounted() {
    this.user = getUser();
  },
  methods: {
    logout() {
      deleteJwt();
      removeUser();
      this.$router.push('/login');
    }
  }
}
</script>