import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'
import ClientNotFoundView from '../views/ClientNotFoundView.vue'
import ProductsListView from '../views/shop/products/ProductsListView.vue'
import ProductView from '../views/shop/products/ProductView.vue'
import SalesListView from '@/views/shop/sales/SalesListView.vue'
import SaleView from '@/views/shop/sales/SaleView.vue'

const routes = [
  { path: '/', component: HomeView },
  { name: 'order', path: '/order/:shop/:user', component: OrderView },
  { name: 'client-not-found', path: '/client-not-found', component: ClientNotFoundView },
  { name: 'products-list', path: '/shop/:shopId/products', component: ProductsListView },
  { name: 'product', path: '/shop/:shopId/products/:productId', component: ProductView },
  { name: 'sales-list', path: '/shop/:shopId/sales', component: SalesListView},
  { name: 'sale', path: '/shop/:shopId/sales/:saleId', component: SaleView}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
