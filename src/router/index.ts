import { createMemoryHistory, createRouter } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { name: 'order', path: '/order/:shop/:user', component: OrderView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
