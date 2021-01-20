<template>
  <BasicComponent :loading="isLoading">
    <div class="row mb-1"> <!--- Breadcrumb --->
      <div class="col-12">
        <b-breadcrumb :items="[{text: 'Shopping cart', href:'/cart'}]"></b-breadcrumb>
      </div>
    </div>
    <div class="row mb-4"> <!--- Shopping cart --->
      <div class="col-12">
        <b-jumbotron v-if="order">
          <template #header>
            <b-icon-cart></b-icon-cart>
            Shopping cart
          </template>
          <template #lead>
            <hr class="my-4">
            <div class="col-4">
              <div class="container-fluid">
                <div class="row" style="font-weight: bold">
                  <div class="col-4">Name</div>
                  <div class="col-4">Count</div>
                  <div class="col-4">Price</div>
                </div>
                <hr class="my-4">
                <div class="row" v-for="dish in order.dishes" v-bind:key="dish.dish.id">
                  <div class="col-4">{{ dish.dish.name }}</div>
                  <div class="col-4 text">{{ dish.count }}</div>
                  <div class="col-4">{{ dish.full_price.toFixed(2) }} Lv</div>
                </div>
                <hr class="my-4">
                <div class="row" style="font-weight: bold">
                  <div class="col-4">Total Price</div>
                  <div class="col-4"></div>
                  <div class="col-4">{{ order.total_price }} Lv</div>
                </div>
              </div>
            </div>
          </template>
          <hr class="my-4">
          <b-button v-if="!order.id" variant="danger" @click="makeOrder">Finish order</b-button>
          <div v-else>
            Order status: {{ order.status }}
          </div>
        </b-jumbotron>
        <b-jumbotron v-else>
          <template #header>
            <b-icon-cart></b-icon-cart>
            Shopping cart
          </template>
          <template #lead>
            Cart empty
          </template>
        </b-jumbotron>
      </div>
    </div>
    <div class="row mb-4" v-if="order"> <!--- Dishes in Cart --->
      <div class="col-12">
        <ul>
          <li v-for="dish in order.dishes" v-bind:key="dish.dish.id">
            <b-card
                :title="dish.dish.name"
                :img-src="serverUrl + dish.dish.image.url"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
              <b-card-text>
                {{ dish.dish.description }}
              </b-card-text>
              <div>
                <div class="row" v-if="!order.id">
                  <div class="col-4">
                    <b-button @click="removeFromCart(dish)" variant="danger">
                      <b-icon-cart-x></b-icon-cart-x>
                    </b-button>
                  </div>
                  <div class="col-4 text-right align-self-center">
                    <span class="">{{ dish.full_price.toFixed(2) }} Lv</span>
                  </div>
                  <div class="col-4">
                    <b-form-input
                        v-model="dish.count"
                        min="1"
                        max="20"
                        type="number"
                        @change="updateCartItemCount(dish)"
                    ></b-form-input>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-6">
                    <span class="">Price: {{ dish.full_price.toFixed(2) }} Lv</span>
                  </div>
                  <div class="col-6 text-right">
                    <span>Ordered: {{ dish.count }}</span>
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
import BasicComponent from "./BasicComponent";

// Utils
import {clearCart, getCartItems, removeCartItem} from "../utils/cart_util";
import {getOrder, hasOrder, saveOrder, removeOrder} from "../utils/order_util";
import {getUser} from "../utils/user_util";
import {getJwt} from "../utils/session_util";
import {EventBus} from '../utils/event_bus';
import {getHeaders} from '../utils/axios_util';

// Misc.
import {config} from "../config/config";
import axios from "axios";
import BaseMixin from "../mixins/BaseMixin";

export default {
  name: 'Cart',
  components: {BasicComponent},
  mixins: [BaseMixin],
  props: {},
  data: function () {
    return {
      restaurant: Object,
      cartItems: Array,
      serverUrl: String,
      order: Object
    };
  },
  methods: {
    loadOrder(id) {
      let me = this;
      let url = config.serverUrl + "/orders/" + id;
      const jwt = getJwt();
      let axiosAuth = getHeaders(jwt);
      axios.get(url, axiosAuth)
          .then(function (response) {
            if(response.data.status != 'Ready' && response.data.status != 'Paid'){
              me.order = response.data;
              me.isLoading = false;
            }     
            else{
              removeOrder();
              clearCart();
            }      
          })
          .catch(function (error) {
            console.log(error);
            me.isLoading = false;
            me.showError('Error loading order!');
          })
    },
    getItems() {
      this.cartItems = getCartItems();
      this.isLoading = false;
      this.order = this.createOrder();
    },
    createOrder() {
      if (!this.cartItems || this.cartItems.length === 0) {
        return;
      }
      let orderedDishes = this.cartItems.map((item) => {
        return {"dish": item, "full_price": item.price, count: 1}
      });
      let user = getUser();
      let order = {
        status: "Pending",
        dishes: orderedDishes,
        users_permissions_user: user
      };
      order.total_price = this.totalPrice(order);
      return order;
    },
    removeFromCart(dish) {
      removeCartItem(dish.dish);
      this.cartItems = getCartItems();
      this.createOrder();
      EventBus.$emit('update-cart-item');
    },
    updateCartItemCount(dish) {
      dish.count = Number.parseInt(dish.count);
      dish.full_price = dish.count * dish.dish.price;
      this.order.total_price = this.totalPrice(this.order);
    },   
    totalPrice(order) {
      let totalPrice = 0;
      for (const item of order.dishes) {
        totalPrice += item.full_price;
      }
      return totalPrice.toFixed(2);
    },
    makeOrder() {
      let me = this;
      let url = config.serverUrl + "/orders";
      this.isLoading = true;
      const jwt = getJwt();
      let axiosAuth = getHeaders(jwt);
      axios.post(url, this.order, axiosAuth)
        .then(function (response){
          me.order = response.data;
          saveOrder(response.data);
          me.isLoading = false;
        })
        .catch(function (error){
          console.log(error);
          me.isLoading = false;
          me.showError('Error! Please try again.');
        })
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
    this.order = getOrder();
    if (hasOrder()) {
      this.loadOrder(this.order.id);
    } else {
      this.getItems();
    }
    EventBus.$on('update-cart-item', ()=>{
      this.getItems();
    })
  }
}
</script>
 
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