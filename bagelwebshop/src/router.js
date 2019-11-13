import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Basket from './views/Basket.vue'
import Women from './views/Women'
import Men from './views/Men'
import Login from "./components/admin/Login";
import Admin from "./views/Admin";
import Orders from "./views/Orders";
import AddNewItems from "./components/admin/AddNewItems";

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/women',
      name: 'women',
      component: Women
    },
    {
      path: '/men',
      name: 'men',
      component: Men
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/addNew',
      name: 'addNew',
      component: AddNewItems,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '*',
      redirect:'/'
    },
  ]
});

router.beforeEach((to, from, next) =>{
   const currentUser = firebase.auth().currentUser;
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

   if (requiresAuth && !currentUser) next('login');
  else next();
});

export default router