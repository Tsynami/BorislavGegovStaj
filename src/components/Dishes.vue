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
          <template #header>
            <div class="row">
              <div class="col-4">
                <b-img
                    thumbnail
                    rounded="circle"
                    fluid
                    v-if="restaurant.image"
                    :src="serverUrl + restaurant.image.url"
                    alt="Responsive image"></b-img>
              </div>
              <div class="col-8">
                <div class="row" v-if="restaurant.id">
                  {{ restaurant.name }}
                </div>
                <div class="row" style="font-size: 2rem">
                  {{ restaurant.description }}
                </div>
              </div>
            </div>
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
                {{ dish.description }}
              </b-card-text>
              <b-card-text>
                Weight:
                {{dish.weight}}g
              </b-card-text>
              <div>
                <div class="row">
                  <div class="col-6">
                    <b-button v-if="!hasOrder" @click="addToCart(dish)">
                      <b-icon-cart></b-icon-cart>
                    </b-button>
                  </div>
                  <div class="col-6 text-right align-self-center">
                    <span class="">{{ dish.price.toFixed(2)}} Lv</span>
                  </div>
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
// Components
import BasicComponent from "@/components/BasicComponent";

// Utils
import {addCartItem, findCartItem} from "@/utils/cart_util";
import {getJwt} from "@/utils/session_util";
import {getHeaders} from '../utils/axios_util';
import {EventBus} from '../utils/event_bus';
import {hasOrder} from '../utils/order_util';

// Misc.
import axios from "axios";
import {config} from "@/config/config";
import BaseMixin from "@/mixins/BaseMixin";

export default {
  name: 'Dishes',
  components: {BasicComponent},
  props: {},
  mixins: [BaseMixin],
  data: function () {
    return {
      restaurant: Object,
      dishes: Array,
      serverUrl: String,
      searchTerm: ""
    };
  },
  methods: {
    search() {
      this.loadDishes(this.searchTerm);
    },
    loadDishes(name) {
      let me = this;
      let url = config.serverUrl + "/restaurants/" + this.$route.params.id;
      if (name) {
        url += "?name_contains=" + name;
      }
      const jwt = getJwt();
      let axiosAuth = getHeaders(jwt);
      this.isLoading = true;
      axios.get(url, axiosAuth)
          .then(function (response) {
            me.restaurant = response.data
            me.dishes = me.restaurant.dishes;
            me.isLoading = false;
          })
          .catch(function (error) {
            console.log(error);
            me.isLoading = false;
            me.showError('Error loading!');
          })
    },
    addToCart(dish) {
      if(!findCartItem(dish)){
        addCartItem(dish);
        EventBus.$emit('update-cart-item');
      }
      else{
        this.showError('Dish is already in cart!');
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
    }
  },
  mounted() {
    this.serverUrl = config.serverUrl;
    this.loadDishes();
    this.hasOrder = hasOrder();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
