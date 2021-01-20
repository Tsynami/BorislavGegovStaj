<template>
  <BasicComponent :loading="isLoading">
    <div class="row mb-1">
      <div class="col-12">
        <b-breadcrumb :items="[{text: 'Restaurants', href: '/'}]"></b-breadcrumb>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <h3>Restaurants</h3>
      </div>
      <img>

    </div>
    <div class="row mb-4">
      <div class="col-12">
        <b-form @submit.prevent="search">
          <b-form-group>
            <b-input-group>
              <b-form-input v-model="searchTerm" placeholder="Search"></b-form-input>
              <b-input-group-append>
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
        <ul class="list-unstyled">
          <li v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <b-card
                :title=restaurant.name
                :img-src="serverUrl + restaurant.image.formats.thumbnail.url" img-height="200" img-width="100"
                img-alt="ERROR"
                img-top
                tag="article"
                style="max-width: 20rem; min-height: 400px"
                class="mb-2"
            >
              <b-card-text>
                {{restaurant.description}}
              </b-card-text>
              <b-card-text>
                Address:
                {{restaurant.address}}
              </b-card-text>

              <b-button :to="'/dishes/'+restaurant.id" style="color: white">Dishes</b-button>

            </b-card>
          </li>
        </ul>
      </div>
    </div>
  </BasicComponent>
</template>

<script>

import BasicComponent from "./BasicComponent";
import BaseMixin from "../mixins/BaseMixin";
import {config} from "@/config/config";
import axios from "axios";
import {getJwt} from "../utils/session_util";
import {getHeaders} from "../utils/axios_util";

export default {
  name: 'Restaurants',
  components: {BasicComponent},
  mixins: [BaseMixin],
  data: function () {
    return {
      restaurants: Array,
      searchTerm: ""
    };
  },
  methods: {
    search() {
      this.loadRestaurants(this.searchTerm);
    },
    loadRestaurants: function (term) {
      const me = this;
      let url = config.serverUrl + "/restaurants";
      if(term){
        url += '?name_contains=' + term;
      }
      this.isLoading = true;
      const jwt = getJwt();
      const axiosAuth = getHeaders(jwt);
      axios.get(url, axiosAuth)
          .then(function (response) {
            me.restaurants = response.data;
            me.isLoading = false;
          })
          .catch(function (error) {
            console.error(error);
            me.showError('Error loading!');
            me.isLoading = false;
          });
    }
  },
  mounted() {
    this.loadRestaurants();
  }
}
</script>

<style scoped>
  li{
    display: inline-block;
    margin: 0 10px;
  }
</style>
