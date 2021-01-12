import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Restaurants from "./components/Restaurants";
import Cart from "./components/Cart"
import Dishes from "./components/Dishes"
import Login from "./components/Login"

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const routes = [
    {path: '', component: Restaurants, name: 'Restaurants'},
    {path: '/cart', component: Cart, name: 'Cart'},
    {path: '/dishes/:id', component: Dishes, name: 'Dishes'},
    {path: '/login', component: Login, name: 'Login'}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
