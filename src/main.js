import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import VueRouter from 'vue-router';
import Cart from "./components/Cart";
import Vuelidate from "vuelidate/src";
import Restaurants from "./components/Restaurants";
import Dishes from "./components/Dishes";
import LoginFormComponent from "./components/LoginFormComponent";
import {isLoggedIn} from "./utils/session_util";

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
    {path: '/cart', component: Cart, name: 'cart'},
    {path: '/', component: Restaurants, name: 'restaurant'},
    {path: '/dishes', component: Dishes, name: 'dishes'},
    {path: '/dishes/:id', component: Dishes, name: 'dishes/:id'},
    {path: '/login', component: LoginFormComponent, name: 'login'}
];

const router = new VueRouter({mode: 'history', routes: routes})

router.beforeEach((to, from, next) => {
    const isAuthenticated = isLoggedIn();
    if (to.name === 'login' && isAuthenticated) {
        next({name: 'restaurant'});
    }
    if (to.name !== 'login' && !isAuthenticated) {
        next({name: 'login'});
    } else {
        next();
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')


