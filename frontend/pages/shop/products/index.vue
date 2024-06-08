<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Prodotti</h1>
  </div>
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>Nome esposto</th>
          <th>Unità</th>
          <th>
            <NuxtLink :to="`/shop/products/new`"
              ><i class="bi-plus-circle-fill"
            /></NuxtLink>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ formatUnitType(product.unit) }}</td>
          <td>
            <NuxtLink :to="`/shop/products/${product.id}`"
              ><i class="bi-pencil-square"
            /></NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import utils from "~/utils";

const API_URL = `http://localhost:1337/api`;

export default {
  setup() {
    definePageMeta({ layout: "admin" });
  },

  data() {
    return {
      products: [] as Product[],
      shopId: "1", // hack because for the time being there will be just one shop
    };
  },
  async created() {
    this.$log().debug("created");

    let products = await this.getProducts(this.shopId);
    this.products = products;
  },
  methods: {
    async getProducts(shop: string): Promise<Product[]> {
      const url = `${API_URL}/shops/${shop}/products`;
      let response = await fetch(url);
      let products_response: ProductDto[] = await response.json();
      this.$log().debug("products_response", products_response);

      return products_response.map((item) => {
        return {
          id: item.id,
          name: item.name,
          unit: UnitTypefromString(item.unit),
        };
      });
    },
    formatUnitType(unit: UnitType): string {
      this.$log().debug(unit);
      return utils.formatUnitType(unit);
    },
  },
};
</script>
