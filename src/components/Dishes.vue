<template>
  <BasicComponent :loading="isLoading">
    <div class="row mb-1">
      <div class="col-12">
        <b-breadcrumb :items="[{text: 'Restaurants', href: '/'}, {text: 'Dishes', href: '/dishes/'}]"></b-breadcrumb>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <b-jumbotron>
          <div class="mb-4">
            <b-img :src="serverUrl + restaurant.image.formats.thumbnail.url" fluid alt="Responsive image"></b-img>
          </div>
          <template #header>
            {{ restaurant.name }}
          </template>
          <template #lead>
            {{ restaurant.description }}
          </template>
        </b-jumbotron>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <ul class="list-unstyled">
          <li v-for="dish in dishes" v-bind:key="dish.id">
            <b-card
                :title=dish.name
                :img-src="serverUrl + dish.image.formats.thumbnail.url" img-height="200" img-width="100"
                img-alt="ERROR"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
              <b-card-text>
                {{dish.description}}
              </b-card-text>

              <b-card-text>
                Weight:
                {{dish.weight}}g
              </b-card-text>
              <div class="row">
                <div class="col-6">
                  <b-button><b-icon-cart></b-icon-cart></b-button>
                </div>
                <div class="col-6 text-right align-self-center">
                  <b-card-text>
                    {{dish.price}}lv.
                  </b-card-text>
                </div>
              </div>


            </b-card>
          </li>
        </ul>
      </div>
    </div>
  </BasicComponent>
</template>

<script>
import {config} from "@/config/config";
import BasicComponent from "@/components/BasicComponent";
import axios from "axios";

export default {
  name: "Dishes",
  components: {BasicComponent},
  data: function () {
    return {
      restaurant: Object,
      dishes: Array,
      serverUrl: String,
    };
  },
  methods: {
    loadDishes: function (term) {
      const me = this;
      let url = config.serverUrl + "/restaurants/" + this.$route.params.id;
      if (term) {
        url += '?name_contains=' + term;
      }
      this.isLoading = true;
      axios.get(url)
          .then(function (response) {
            me.dishes = response.data.dishes;
            me.restaurant = response.data;
            me.isLoading = false;
          })
          .catch(function (error) {
            console.error(error);
            me.showError('Error loading!');
            me.isLoading = false;
          });
    },
  },
  mounted() {
    this.loadDishes();
    this.serverUrl = config.serverUrl;
  }
}
</script>

<style scoped>
  li {
    display: inline-block;
    margin: 0 10px
  }

</style>