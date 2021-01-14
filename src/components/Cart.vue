<template>
  <BasicComponent :loading="isLoading">
    <div class="row mb-1">
      <div class="col-12">
        <b-breadcrumb :items="[{text: 'Shopping cart', href:'/cart'}]"></b-breadcrumb>
      </div>
    </div>
    <div class="row mb-4">
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
                <div class="row" v-for="orderedDish in order.dishes" v-bind:key="orderedDish.dish.id">
                  <div class="col-4">{{ orderedDish.dish.name }}</div>
                  <div class="col-4 text">{{ orderedDish.count }}</div>
                  <div class="col-4">{{ orderedDish.full_price }} Lv</div>
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
<<<<<<< HEAD
          <b-button v-if="!order.id" variant="danger" >Finish order</b-button>
=======
          <b-button v-if="!order.id" variant="danger" @click="placeOrder">Finish order</b-button>
>>>>>>> origin/dev
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
    <div class="row mb-4" v-if="order">
      <div class="col-12">
        <ul>
          <li v-for="orderedDish in order.dishes" v-bind:key="orderedDish.dish.id">
            <b-card
                :title="orderedDish.dish.name"
<<<<<<< HEAD
                :img-src="serverUrl + orderedDish.dish.image.url"
=======
                :img-src="serverUrl + orderedDish.dish.image.formats.small.url"
>>>>>>> origin/dev
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
              <b-card-text>
                {{ orderedDish.dish.description }}
              </b-card-text>
              <div>
                <div class="row" v-if="!order.id">
                  <div class="col-4">
                    <b-button @click="removeFromCart(orderedDish)" variant="danger">
                      <b-icon-cart-x></b-icon-cart-x>
                    </b-button>
                  </div>
                  <div class="col-4 text-right align-self-center">
                    <span class="">{{ orderedDish.full_price }} Lv</span>
                  </div>
                  <div class="col-4">
                    <b-form-input
                        v-model="orderedDish.count"
                        min="1"
                        max="20"
                        type="number"
                        @change="updateCartItemCount(orderedDish)"
                    ></b-form-input>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-6">
                    <span class="">Price: {{ orderedDish.full_price }} Lv</span>
                  </div>
                  <div class="col-6 text-right">
                    <span>Ordered: {{ orderedDish.count }}</span>
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
import axios from "axios";
<<<<<<< HEAD
import {config} from "../config/config";
import {getCartItems, removeCartItem, clearCart} from "../utils/cart_util";
import BasicComponent from "./BasicComponent";
import BaseMixin from "../mixins/BaseMixin";
=======
import {config} from "@/config/config";
import {getCartItems, removeCartItem} from "@/utils/cart_util";
import BasicComponent from "@/components/BasicComponent";
import BaseMixin from "@/mixins/BaseMixin";
import {getJwt} from "@/utils/session_util";
import {getHeaders} from "@/utils/axios_util";
import {getUser} from "@/utils/user_util";
import {getOrder} from "@/utils/order_util";
import {hasOrder} from "../utils/order_util";
>>>>>>> origin/dev

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
    getItems() {
      this.cartItems = getCartItems();
      this.isLoading = false;
      this.order = this.constructOrderFromCartItems();
    },
    constructOrderFromCartItems() {
      if (!this.cartItems || this.cartItems.length === 0) {
        return;
      }
      let orderedDishes = this.cartItems.map((item) => {
        return {"dish": item, "full_price": item.price, count: 1}
      });
<<<<<<< HEAD
      let order = {
        status: "Pending",
        dishes: orderedDishes,
=======
      const user = getUser();
      let order = {
        status: "Pending",
        dishes: orderedDishes,
        users_permissions_user: user
>>>>>>> origin/dev
      };
      order.total_price = this.getTotalPrice(order);
      return order;
    },
    removeFromCart(orderedDish) {
<<<<<<< HEAD
=======
      if (this.order.id) {
        this.showError('You have already ordered!');
        return;
      }
>>>>>>> origin/dev
      removeCartItem(orderedDish.dish);
      this.cartItems = getCartItems();
      this.constructOrderFromCartItems();
    },
    updateCartItemCount(dish) {
<<<<<<< HEAD
=======
      if (this.order.id) {
        this.showError('You have already ordered!');
        return;
      }
>>>>>>> origin/dev
      dish.count = Number.parseInt(dish.count);
      dish.full_price = dish.count * dish.dish.price;
      this.order.total_price = this.getTotalPrice(this.order);
    },
<<<<<<< HEAD
    loadOrder(id) {
      let me = this;
      let url = config.serverUrl + "/orders/" + id;
      axios.get(url)
          .then(function (response) {
            if (response.data.status !== 'Cancelled' && response.data.status !== 'Ready') {
              me.order = response.data;
            } else {
              me.showError('This order is no longer active!');
              me.order = null;
              me.cartItems = [];
              clearCart();
            }

            me.isLoading = false;
          })
          .catch(function (error) {
            console.log(error);
            me.isLoading = false;
            me.showError('Error loading order!');
          })
=======
    placeOrder() {
      if (this.order && this.order.id) {
        me.showError('You have already ordered!');
        return;
      }
      let me = this;
      let url = config.serverUrl + "/orders";
      this.isLoading = false;
      const jwt = getJwt();
      let axiosOptions = getHeaders(jwt);
      axios.post(url, this.order, axiosOptions);
>>>>>>> origin/dev
    },
    getTotalPrice(order) {
      let totalPrice = 0;
      for (const item of order.dishes) {
        totalPrice += item.full_price;
      }
<<<<<<< HEAD
      return totalPrice.toFixed(2);
=======
      return totalPrice;
>>>>>>> origin/dev
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
<<<<<<< HEAD
    if (this.order && this.order.id) {
      this.loadOrder(this.order.id);
    } else {
=======
    this.order = getOrder();
    if (!hasOrder()) {
>>>>>>> origin/dev
      this.getItems();
    }

  }
}
</script>

<<<<<<< HEAD
=======
<!-- Add "scoped" attribute to limit CSS to this component only -->
>>>>>>> origin/dev
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
