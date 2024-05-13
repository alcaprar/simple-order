import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'
import ClientNotFoundView from '../views/ClientNotFoundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { name: 'order', path: '/order/:shop/:user', component: OrderView },
  { name: 'client-not-found', path: '/client-not-found', component: ClientNotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
