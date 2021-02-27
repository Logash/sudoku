import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Menu from '../views/Menu.vue'
import Login from '../views/Login.vue'
import Game from '../views/Game.vue'
import Records from '../views/Records.vue'
import userStore from '@/store/modules/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to: Route, from: Route, next: any) => {
  if (userStore.isAuthenticated) {
    to.name === 'Login'
      ? next({ name: 'Menu' })
      : next()
  } else {
    to.name === 'Login'
      ? next()
      : next({ name: 'Login' })
  }
})

export default router
