<template>
  <BasicComponent :loading="isLoading">
    <b-form @submit.prevent="Login">
      <div class="row justify-content-center">
        <div class="row">
          <div class="col-13">
            <div class="card" style="width: 20rem;">
              <div class="card-header">
                Login
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b-input-group>
                    <b-form-input v-model="email" placeholder="E-mail"></b-form-input>
                  </b-input-group>
                </li>
                <li class="list-group-item">
                  <b-input-group>
                    <b-form-input type = "password" v-model="password" placeholder="Password"></b-form-input>
                  </b-input-group>
                </li>
              </ul>
              <b-input-group>
                <div class="card-footer">
                  <button type="submit" class="btn btn-success">Send</button>
                </div>
              </b-input-group>
            </div>
          </div>
        </div>
      </div>
    </b-form>
  </BasicComponent>
</template>

<script>
import axios from "axios";
import {config} from "../config/config";
import BasicComponent from "../components/BasicComponent";
import BaseMixin from "../mixins/BaseMixin";
import {saveJwt} from "../utils/session_util"
import {saveUser} from "../utils/user_util";
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
      minlength: minLength(4),
      password
    }
  }
}
</script>

<style scoped>

</style>