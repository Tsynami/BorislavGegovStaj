import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Restaurants from "@/components/Restaurants";
import Dishes from "@/components/Dishes";
import Cart from "@/components/Cart";
import Login from "@/components/Login";
import {isLoggedIn} from "@/utils/session_util";

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const routes = [
    {path: '/login', component: Login, name: 'Login'},
    {path: '', component: Restaurants, name: 'Restaurants'},
    {path: '/dishes/:id', component: Dishes, name: 'Dishes'},
    {path: '/cart', component: Cart, name: 'Cart'}
]


const router = new VueRouter({
        mode: 'history',
        routes: routes
    }
)
router.beforeEach((to, from, next) => {
    const isAuthenticated = isLoggedIn();
    if (to.name === 'Login' && isAuthenticated) {
        next({name: 'Restaurants'});
    }
    if (to.name !== 'Login' && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next();
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
