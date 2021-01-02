import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Restaurant from "./components/Restaurant";
import Cart from "./components/Cart"
import Dishes from "./components/Dishes"

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const routes = [
    {path: '', component: Restaurant, name: 'Restaurants'},
    {path: '/cart', component: Cart, name: 'Cart'},
    {path: '/dishes/:id', component: Dishes, name: 'Dishes'}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
