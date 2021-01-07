<template>
  <b-form @submit.prevent="submit">
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card" style="width: 69rem;">
            <div class="card-header">
              {{title}}
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
            <div class="card-footer">
              <button type="submit" class="btn btn-success">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <alert-component
        title="Status"
        :status="submitStatus"
        v-if="isAlertShown"
        @close-alert="onAlertClose">
      <div v-if="submitStatus === 'OK'">Submission successful</div>
      <div v-else>ERROR!!!!</div>
    </alert-component>
  </b-form>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";
import AlertComponent from "./AlertComponent";

export default {
name: "LoginFormComponent",
  components: {AlertComponent},
  props: {
    title: String
  },
  data: function () {
    return {
      email: '',
      password: '',
      submitStatus: '',
      isAlertShown: false
    }
  },
  methods: {
    submit: function () {
      this.isAlertShown = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'OK'
      }
    },
    onAlertClose: function (val) {
      this.isAlertShown = false;
      console.log(val);
    },
    focusEmailInput() {
      this.$refs.inputEmail.focus();
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.focusEmailInput();
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
  }

}
</script>

<style scoped>

</style>