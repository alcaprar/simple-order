<template>
  <div class="antialiased text-gray-900 px-6">
    <div class="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
      <div class="py-8">
        <h1 class="text-4xl font-bold">Pagina ordine</h1>
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
              {{ item.quantity }}
              <button
                class="rounded-full bg-sky-500 p-2 text-lg font-bold disabled:opacity-25"
                :disabled="item.available_quantity == 0"
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
            <textarea v-model="order.notes" placeholder="Lascia qui qualsiasi nota" rows="4" class="col-span-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Order } from '../models/order'
import { UnitType } from '../models/unit_type'

import utils from '../utils'

export default {
  data() {
    let order: Order = {
      notes: 'Ciao',
      items: [
        {
          id: '1',
          name: 'Pomodori',
          available_quantity: 1,
          quantity: 0,
          unit: UnitType.Kilogram,
          price_per_unit_in_minor: 100
        },
        {
          id: '2',
          name: 'Zucchine',
          available_quantity: 3,
          quantity: 1,
          unit: UnitType.Kilogram,
          price_per_unit_in_minor: 150
        },
        {
          id: '2',
          name: 'Patate',
          available_quantity: 0,
          quantity: 1,
          unit: UnitType.Piece,
          price_per_unit_in_minor: 133
        }
      ]
    }
    return {
      order
    }
  },
  methods: {
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
