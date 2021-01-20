<template>
  <div class="card" style="width: 15rem;">
    <div class="card-body">
      <h5 class="card-title">Profile</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Username:
        {{ user.username }}
      </li>
      <li class="list-group-item">Email:
        {{ user.email}}
      </li>
    </ul>
    <div class="card-body">
      <b-button @click="logout" variant="danger">
        Logout
      </b-button>
    </div>
  </div>
</template>

<script>
import {deleteJwt} from "../utils/session_util";
import {removeUser, getUser} from "../utils/user_util";
import {EventBus} from "../utils/event_bus";

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
      EventBus.$emit("reload-event");
    }
  }
}
</script>

<style scoped>

</style>