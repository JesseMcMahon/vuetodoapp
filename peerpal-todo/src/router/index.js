import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import TodoPage from '../components/TodoPage'
import login from "../views/login"
import register from "../views/register"

Vue.use(Router)


  const routes = [
    {
      path: '/home',
      name: 'TodoPage',
      component: TodoPage
    },
    {
      path: "/",
      name: "login",
      component: login
    },
    { 
    path: "/register",
    name: "register",
    component: register
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;