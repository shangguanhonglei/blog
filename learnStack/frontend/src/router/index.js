import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/home/dashboard/Index'
import Register from '../views/register/Index'
import Login from '../views/login/Index'
import User from '../views/home/user/Index'
import Main from '../views/home/Main'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home/dashboard'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Main,
    redirect: '/home/dashboard',
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'user',
        component: User
      }
    ]
  }
]

export default new VueRouter({
  base: process.env.BASE_URL,
  routes
})