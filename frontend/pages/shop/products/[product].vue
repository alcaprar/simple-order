<template>
  <div class="row g-3">
    <form class="">
      <div class="col-12">
        <label for="unit" class="form-label">Unità</label>
        <select id="unit" class="form-select" v-model="product.unit">
          <option :value="UnitType.Kilogram">Kilogrammo</option>
          <option :value="UnitType.Hectogram">Ettogrammo</option>
          <option :value="UnitType.Piece">Pezzo</option>
        </select>
      </div>
      <div class="col-12">
        <label for="name" class="form-label">Nome esposto</label>
        <input
          type="text"
          id="name"
          class="form-control"
          placeholder="Pomodori"
          required
          v-model="product.name"
        />
      </div>

      <hr class="my-4" />

      <button @click.prevent="onSave" class="w-100 btn btn-primary btn-lg">
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
      shopId: "1", // hack because for the time being there will be just one shop
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
          params: { shopId: this.shopId, productId },
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
      const shopId = this.shopId;
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
