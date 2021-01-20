<template>
  <div class="container-fluid" style="color: white">
    <div class="row">
      <div class="col-4 font-weight-bold">
        User
        </div>
      <div class="col-8 text-right">
        {{user.username}}
        </div>
    </div>
    <div class="row">
      <div class="col-4 font-weight-bold">
        Email
        </div>
      <div class="col-8 text-right">
        {{user.email}}
        </div>
    </div>
    <hr class="my-4">
    <div class="row">
      <div class="col-lg-12">
        <b-button @click="Logout" variant="danger">
          <b-icon-unlock></b-icon-unlock>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteJwt} from "@/utils/session_util";
import {removeUser, getUser} from "@/utils/user_util"
import {EventBus} from '../utils/event_bus'
import '../assets/sass/main.scss'
 
export default {
  name: 'Profile',
  components: {},
  data: function () {
    return {
      user:{}
    };
  },
  methods: {
    Logout() {
      removeUser();
      deleteJwt();
      EventBus.$emit('loggedIn')
      this.$router.push('/login');
    }
  },
  mounted() {
    this.user = getUser();
    console.log(this.user);
  }
}
</script>

<style>
</style>
