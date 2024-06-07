<template>
  <div>
    <form class="max-w-sm mx-auto">
      <div class="mb-6">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Unità</label
        >
        <select
          id="unit"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="product.unit"
        >
          <option :value="UnitType.Kilogram">Kilogrammo</option>
          <option :value="UnitType.Hectogram">Ettogrammo</option>
          <option :value="UnitType.Piece">Pezzo</option>
        </select>
      </div>
      <div class="mb-6">
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nome esposto</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pomodori"
          required
          v-model="product.name"
        />
      </div>
      <button
        @click.prevent="onSave"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Salva
      </button>
    </form>
  </div>
</template>

<script lang="ts">
const API_URL = `http://localhost:1337/api`;
export default {
  data() {
    return {
      product: {
        unit: UnitType.Kilogram,
        name: "",
      },
      UnitType: UnitType,
    };
  },
  async created() {
    const productId = this.$route.params.product as string;

    if (productId.toLowerCase() != "new") {
      const product = await this.getProduct(productId);
      this.product = product;
    }
  },
  methods: {
    isNew(): boolean {
      const productId = this.$route.params.productId as string;
      return productId.toLowerCase() == "new";
    },
    async getProduct(productId: string): Promise<Product> {
      const url = `${API_URL}/products/${productId}`;
      let response = await fetch(url);
      let product_response: ProductDto = (await response.json()).data
        .attributes;
      this.$log().debug("getProduct", product_response);

      return {
        id: product_response.id,
        name: product_response.name,
        unit: UnitTypefromString(product_response.unit),
      };
    },
    async onSave() {
      if (this.isNew()) {
        const productId = await this.createProduct(
          this.product.name,
          this.product.unit
        );

        this.$router.push({
          name: "product",
          params: { shopId: this.$route.params.shopId, productId },
        });
      } else {
        const productId = this.$route.params.productId as string;
        await this.updateProduct(
          productId,
          this.product.name,
          this.product.unit
        );
      }
    },
    async createProduct(name: string, unit: UnitType): Promise<number> {
      const shopId = this.$route.params.shopId as string;
      const url = `${API_URL}/products`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: name,
            shop: Number(shopId),
            unit: UnitTypetoString(unit),
          },
        }),
      });
      let product_response: ProductDto = (await response.json()).response;
      this.$log().debug("createProduct", product_response);
      return product_response.id;
    },
    async updateProduct(productId: string, name: string, unit: UnitType) {
      const url = `${API_URL}/products/${productId}`;
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: name,
            unit: UnitTypetoString(unit),
          },
        }),
      });
      let product_response: ProductDto = (await response.json()).response;
      this.$log().debug("createProduct", product_response);
    },
  },
};
</script>
