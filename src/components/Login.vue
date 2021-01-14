<template>
  <BasicComponent :loading="isLoading">
    <div class="container-fluid">
      <div class="row justify-content-center" >
        <b-card
            style="width: 30%"
            class="shadow"
            bg-variant="light">
          <template #header>
            <div style="text-align:center">
              Sign in
            </div>
          </template>
          <b-form @submit.prevent="Login">
            <b-form-group>
              <b-input-group>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <b-icon-person-fill></b-icon-person-fill>
                  </div>
                </div>
                <b-form-input v-model="email" placeholder="Email"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <b-icon-key-fill></b-icon-key-fill>
                  </div>
                </div>
                <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-button type="submit" style="color:white" class="w-100">
                  <b-icon-arrow-right></b-icon-arrow-right>
                  Login
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
    </div>
  </BasicComponent>
</template>

<script>
import axios from "axios";
import {config} from "@/config/config";
import BasicComponent from "@/components/BasicComponent";
import BaseMixin from "@/mixins/BaseMixin";
import {saveJwt} from "@/utils/session_util"
import {saveUser} from "@/utils/user_util";
import {email, password, minLength, required} from "vuelidate/lib/validators";
export default {
  name: 'Login',
  components: {BasicComponent},
  mixins: [BaseMixin],
  props: {},
  data: function () {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    Login() {
      let me = this;
      let url = config.serverUrl + "/auth/local";
      this.isLoading = true;
      const loginInfo = {identifier: this.email, password: this.password}
      axios.post(url, loginInfo)
          .then(function (response) {
            let jwt = response.data.jwt;
            let user = response.data.user;
            saveJwt(jwt);
            saveUser(user);
            me.isLoading = false;
            me.$router.push('/');
          })
          .catch(function() {
            me.isLoading = false;
            me.showError("Please try again.");
          })
    }
  },
  validations:{
      email:{
          required,
          minLength: minLength(8),
          email
      },
      password:{
          required,
          minlength: minLength(8),
          password
      }
  }
}
</script>

<style scoped>

</style>
