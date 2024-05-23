import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'
import ClientNotFoundView from '../views/ClientNotFoundView.vue'
import ProductsListView from '../views/shop/products/ProductsListView.vue'

const routes = [
  { path: '/', component: HomeView },
  { name: 'order', path: '/order/:shop/:user', component: OrderView },
  { name: 'client-not-found', path: '/client-not-found', component: ClientNotFoundView },
  { name: 'products-list', path: '/shop/:shopId/products', component: ProductsListView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
