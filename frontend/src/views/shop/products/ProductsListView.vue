<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Nome esposto</th>
        <th>Unità</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ formatUnitType(product.unit) }}</td>
        <td>
          <RouterLink :to="`/shop/${$route.params.shopId}/products/${product.id}`"
            ><v-icon name="co-pencil"
          /></RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
const API_URL = `http://localhost:1337/api`
import { UnitType, fromString } from '../../../models/unit_type'
import { Product } from '../../../models/product'
import { Product as ProductDto } from '../../../api_contract/product'
import utils from '../../../utils'
export default {
  data() {
    return {
      products: []
    }
  },
  async created() {
    this.$log.debug('created')
    const shop = this.$route.params.shopId as string
    this.$log.debug({ shop })

    let products = await this.getProducts(shop)
    this.products = products
  },
  methods: {
    async getProducts(shop: string): Promise<Product[]> {
      const url = `${API_URL}/shops/${shop}/products`
      let response = await fetch(url)
      let products_response: ProductDto[] = await response.json()
      this.$log.debug('products_response', products_response)

      return products_response.map((item) => {
        return {
          id: item.id,
          name: item.name,
          unit: fromString(item.unit)
        }
      })
    },
    formatUnitType(unit: UnitType): string {
      this.$log.debug(unit)
      return utils.formatUnitType(unit)
    }
  }
}
</script>
