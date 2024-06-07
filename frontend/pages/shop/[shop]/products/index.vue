<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Nome esposto</th>
        <th>Unità</th>
        <th>
          <RouterLink :to="`/shop/${$route.params.shopId}/products/new`"
            ><v-icon name="co-plus"></v-icon
          ></RouterLink>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ formatUnitType(product.unit) }}</td>
        <td>
          <RouterLink
            :to="`/shop/${$route.params.shopId}/products/${product.id}`"
            ><v-icon name="co-pencil"
          /></RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
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
    };
  },
  async created() {
    this.$log().debug("created");
    const shop = this.$route.params.shop as string;
    this.$log().debug({ shop });

    let products = await this.getProducts(shop);
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
