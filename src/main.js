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
    {path: '/login', component: Login, name: 'Login'},
    {path: '', component: Restaurants, name: 'Restaurants'},
    {path: '/cart', component: Cart, name: 'Cart'},
    {path: '/dishes/:id', component: Dishes, name: 'Dishes'},
    {path: '/login', component: Login, name: 'Login'}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    // if user is not logged in redirect to route /login
    // if the user is in /login and is logged in redirect to /
    // https://router.vuejs.org/guide/advanced/navigation-guards.html
    console.log(to);
    console.log(from);
    console.log(next);
    next();
    // if(to.name!=='Login'){
    //     next({name: 'Login'});
    // }else{
    //
    // }

})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
