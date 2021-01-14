// Essentials
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Components
import Restaurants from "./components/Restaurants";
import Cart from "./components/Cart"
import Dishes from "./components/Dishes"
import Login from "./components/Login"

// Utils
import {isLoggedIn} from "./utils/session_util.js"

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
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    const authenticated = isLoggedIn();
    if (to.name !== 'Login' && !authenticated) {
        next({name: 'Login'});
    } 
    if (to.name === 'Login' && authenticated) {
        next({name: 'Restaurants'});
    }
    else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
