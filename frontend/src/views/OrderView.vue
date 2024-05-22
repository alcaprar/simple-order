<template>
  <div class="antialiased text-gray-900 px-6">
    <div class="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
      <div class="py-8">
        <h1 class="text-4xl font-bold">Pagina ordine #{{ order.id }}</h1>
        <p class="mt-2 text-lg text-gray-600">Scegli quello che ti serve. Salva automaticamente.</p>
      </div>
      <div class="py-4">
        <div class="mt-8">
          <div class="grid grid-cols-5" v-for="item in order.items" :key="item.id">
            <span class="col-span-3 text-gray">{{ item.name }}</span>
            <span class="col-span-1"
              >{{ formatAmountInMinor(item.price_per_unit_in_minor) }}€/{{
                formatUnitType(item.unit)
              }}</span
            >
            <span class="col-span-1">
              <button
                class="rounded-full bg-sky-500 p-2 text-lg font-bold disabled:opacity-25"
                :disabled="item.quantity == 0"
              >
                -
              </button>
              {{ item.quantity }} {{ formatUnitType(item.unit) }}
              <button
                class="rounded-full bg-sky-500 p-2 text-lg font-bold disabled:opacity-25"
                :disabled="item.available_quantity == 0"
                @click="increment(item.id)"
              >
                +
              </button>
            </span>
          </div>
          <div class="grid grid-cols-5">
            <span class="col-start-4 col-span-1"
              >Totale: {{ formatAmountInMinor(calculateTotalInMinor()) }}€
            </span>
          </div>
          <div class="grid grid-cols-5 mt-2">
            <textarea
              v-model="order.notes"
              placeholder="Lascia qui qualsiasi nota"
              rows="4"
              class="col-span-5"
              @keyup="onNotesChanges"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const API_URL = `http://localhost:1337/api`
import { Order, OrderItem } from '../models/order'
import { UnitType, fromString } from '../models/unit_type'

import { Order as OrderDto, OrderItem as OrderItemDto } from '../api_contracts/order'

import utils from '../utils'

export default {
  data() {
    let order: Order = {
      id: -1,
      notes: '',
      items: []
    }
    return {
      order,
      timeout: -1
    }
  },
  async created() {
    this.$log.debug('created')
    const shop = this.$route.params.shop as string
    const clientUsername = this.$route.params.user as string
    this.$log.debug({ shop, clientUsername })
    if (!(await this.clientExist(shop, clientUsername))) {
      this.$log.info('client does not exist')
      this.$router.push({
        name: 'client-not-found'
      })
    }
    let order = await this.getOrder(shop, clientUsername)
    this.order = order
  },
  methods: {
    async clientExist(shop: string, clientUsername: string): Promise<boolean> {
      const url = `${API_URL}/shops/${shop}/${clientUsername}`
      let response = await await fetch(url)
      this.$log.debug('clientExist', response)
      if (response.status !== 200) {
        return false
      } else {
        return true
      }
    },
    async getOrder(shop: string, clientUsername: string): Promise<Order> {
      const url = `${API_URL}/shops/${shop}/${clientUsername}/last-order`
      let response = await fetch(url)
      let order_response: OrderDto = await response.json()
      this.$log.debug('getOrder', order_response)

      return {
        id: order_response.id,
        notes: order_response.notes,
        items: order_response.order_items.map(
          (item: OrderItemDto): OrderItem => ({
            id: item.id,
            name: item.product_sale.product.name,
            price_per_unit_in_minor: item.product_sale.amount_in_minor,
            quantity: item.quantity,
            available_quantity: item.product_sale.current_available,
            unit: fromString(item.product_sale.product.unit)
          })
        )
      }
    },
    onNotesChanges() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        this.$log.debug('onNotesChanges', this.order.notes)
        const url = `${API_URL}/orders/${this.order.id}/notes`
        let response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            notes: this.order.notes
          })
        })
        this.$log.debug('onNotesChanges POST response', response)
      }, 1000)
    },
    async increment(orderItemId: number) {
      this.$log.debug('increment', orderItemId)

      const url = `${API_URL}/order-items/${orderItemId}/increment`
      let response = await fetch(url, {
        method: 'POST'
      })
      this.$log.debug('increment POST response', response)
      if (response.ok) {
        const shop = this.$route.params.shop as string
        const clientUsername = this.$route.params.user as string
        let order = await this.getOrder(shop, clientUsername)
        this.order = order
      }
    },
    formatUnitType(unit: UnitType): string {
      this.$log.debug(unit)
      return utils.formatUnitType(unit)
    },
    formatAmountInMinor(amount: number): number {
      return utils.formatAmountInMinor(amount)
    },
    calculateTotalInMinor(): number {
      return this.order.items.reduce(
        (sum, current) => sum + current.quantity * current.price_per_unit_in_minor,
        0
      )
    }
  }
}
</script>
