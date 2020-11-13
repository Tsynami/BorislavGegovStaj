<template>
  <BasicComponent :loading="isLoading">
    <div class="row mb-4">
      <div class="col-12">
        <h3>Restaurants</h3>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <b-form @submit.prevent="search">
          <b-form-group>
            <b-input-group>
              <b-form-input v-model="searchTerm" placeholder="Search"></b-form-input>
              <b-input-group-append class="input-group-append">
                <b-button @click="search">
                  <b-icon-search></b-icon-search>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <ul>
          <li v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <b-card
                :title="restaurant.name"
                :img-src="serverUrl + restaurant.image.formats.small.url"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
              <b-card-text>
                {{ restaurant.description }}
              </b-card-text>

              <b-button :to="'/dishes/'+restaurant.id" style="color: white" tex>Dishes</b-button>
            </b-card>
          </li>
        </ul>
      </div>
    </div>
  </BasicComponent>
</template>

<script>
import axios from "axios";
import {config} from "@/config/config";
import BasicComponent from "@/components/BasicComponent";
import BaseMixin from "@/mixins/BaseMixin";
import {getJwt} from "@/utils/session_util";
import {getHeaders} from "@/utils/axios_util"

export default {
  name: 'Restaurants',
  components: {BasicComponent},
  mixins: [BaseMixin],
  props: {},
  data: function () {
    return {
      restaurants: Array,
      searchTerm: ""
    };
  },
  methods: {
    search() {
      this.searchRestaurants(this.searchTerm);
    },
    searchRestaurants(name) {
      let me = this;
      let url = config.serverUrl + "/restaurants";
      if (name) {
        url += "?name_contains=" + name;
      }
      const jwt = getJwt();
      let axiosOptions = getHeaders(jwt);
      this.isLoading = true;
      axios.get(url, axiosOptions)
          .then(function (response) {
            me.restaurants = response.data;
            me.isLoading = false;
          })
          .catch(function (error) {
            console.log(error);
            me.isLoading = false;
            me.showError('Error loading!');
          })
    }
  },
  mounted() {
    this.searchRestaurants();
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
