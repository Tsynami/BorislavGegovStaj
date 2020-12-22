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
        <ul class="list-unsettled">
          <li v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <b-card
                style="max-width: 20rem"
                :img-src= 'serverUrl + restaurant.image.formats.small.url '
                img-alt="Card Image"
                text-variant="dark"
                :title= restaurant.name
                class="font-weight-bold"
            >
              <b-card-text>
                {{ restaurant.description }}
                <div></div>
                Address:
                {{ restaurant.address }}
              </b-card-text>
              <b-button :to="'/dishes/'+restaurant.id" variant="primary" tex>Dishes</b-button>
            </b-card>
            <b-card-group>

            </b-card-group>
          </li>
        </ul>
      </div>
    </div>
  </BasicComponent>
</template>

<script>

import BasicComponent from "./BasicComponent";
import BaseMixin from "../mixins/BaseMixin";
import {config} from "../config/config";
import axios from "axios";

export default {
  name: 'Restaurant',
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
      axios.get(url)
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
