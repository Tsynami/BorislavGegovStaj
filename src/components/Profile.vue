<template>
  <div>
    <b-button @click="logout">
      <b-icon-unlock></b-icon-unlock>
    </b-button>
  </div>
</template>

<script>
import {deleteJwt} from "@/utils/session_util";
import {removeUser} from "@/utils/user_util";


export default {
  data() {
    return {}
  },
  watch: {},
  methods: {
    logout() {
      deleteJwt();
      removeUser();
      this.$router.push('/login');
    }
  }
}
</script>