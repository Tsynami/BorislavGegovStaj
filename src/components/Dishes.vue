<template>
  <BasicComponent :loading="isLoading">

    <div class="row mb-1">
      <div class="col-12">
        <b-breadcrumb :items="[{text: 'Restaurants', href: '/'},{text: 'Dishes', href: '/dishes'}]"></b-breadcrumb>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <b-jumbotron>

          <template #header>
            <b-img :src="serverUrl + restaurant.image.url" img-height="300" img-width="100" fluid alt="Restaurant" style="box-shadow: 10px 10px 10px #888;"></b-img>
            {{restaurant.name}}
          </template>
          <template #lead>
            {{restaurant.description}}
          </template>
        </b-jumbotron>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
         <li v-for="dish in dishes" v-bind:key="dish.id">
           <b-card
             :title="dish.name"
             :img-src="serverUrl +dish.image.formats.small.url" img-height="300" img-width="100"
             img-alt="Image"
             img-top
             tag="article"
             style="max-width: 20rem;"
             class="mb-2">
           <b-card-text>
             {{dish.description}}
             <br>{{dish.weight}}
             <br>
             <br>{{dish.price}} lv.
           </b-card-text>
             <div>
               <div class = "row">
                 <div class="col-6">
                   <b-button @click="addCartItem(dish)">Add to cart</b-button>
                 </div>
               </div>
             </div>
           </b-card>
         </li>
      </div>
    </div>
  </BasicComponent>
</template>

<script>
import {config} from "@/config/config";
import BasicComponent from "@/components/BasicComponent";
import axios from "axios";
import {addCartItem} from "../utils/cart_util";
import {getHeaders} from "@/utils/axios_util";
import {getJwt} from "@/utils/session_util";
import {hasOrder} from "@/utils/order_util";
import BaseMixin from "@/mixins/BaseMixin";


export default {
  name: "Dishes",
  components: {BasicComponent},
  mixins: [BaseMixin],
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
      const jwt = getJwt();
      let axiosOptions = getHeaders(jwt);
      this.isLoading = true;
      axios.get(url, axiosOptions)
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
    addCartItem(dish) {
      if(this.hasOrder){
        return;
      }
      addCartItem(dish);
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
    }
  },
  mounted() {
    this.loadDishes();
    this.serverUrl = config.serverUrl;
    this.hasOrder = hasOrder();
  }
}
</script>

<style scoped>
li{display: inline-block}
</style>