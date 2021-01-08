<template>
  <BasicComponent :loading="isLoading">
    <div class="container-fluid">
      <div class="row justify-content-center" style="margin-top: 10%">
        <b-card
            header="Sign in"
            style="width: 30%"
            class="shadow"
            bg-variant="light">
          <b-form @submit.prevent="login">
            <b-form-group>
              <b-input-group>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <b-icon-person></b-icon-person>
                  </div>
                </div>
                <b-form-input
                    v-model="email"
                    :state="$v.$dirty ? !$v.email.$error:null"
                    placeholder="Email"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <b-icon-key></b-icon-key>
                  </div>
                </div>
                <b-form-input
                    v-model="password"
                    :state="$v.$dirty ? !$v.password.$error:null"
                    type="password"
                    placeholder="Password"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-button type="submit" variant="danger" class="w-100">
                  <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right>
                  Login
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-form>
          <template #footer>
            <div class="footer-copyright text-center">© 2020 Copyright:
              <a href="https://localhost:8080">MG Plovdiv</a>
            </div>
          </template>
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
import {required, minLength, email} from 'vuelidate/lib/validators';

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
  validations: {
    email: {
      required,
      minLength: minLength(4),
      email
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    login() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }
      let me = this;
      let url = config.serverUrl + "/auth/local";
      this.isLoading = true;
      const loginData = {identifier: this.email, password: this.password}
      axios.post(url, loginData)
          .then(function (response) {
            let jwt = response.data.jwt;
            let user = response.data.user;
            saveJwt(jwt);
            saveUser(user);
            me.isLoading = false;
            me.$router.push('/');
          })
          .catch(function (error) {
            let errorMessage = (
                error.response &&
                error.response.data &&
                error.response.data.data[0] &&
                error.response.data.data[0].messages &&
                error.response.data.data[0].messages[0].message
            ) ?
                (error.response.data.data[0].messages[0].message) :
                "Error logging in";
            me.isLoading = false;
            me.showError(errorMessage);
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
