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
        <input type="text" id="name" class="form-control" placeholder="Pomodori" required v-model="product.name" />
      </div>

      <hr class="my-4" />

      <button @click.prevent="onSave" class="w-100 btn btn-primary btn-lg">
        Salva
      </button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    definePageMeta({ layout: "admin" });
  },
  data() {
    return {
      product: {
        unit: UnitType.Kilogram,
        name: "",
      } as Product,
    };
  },
  async created() {
    const productId = this.$route.params.product as string;

    if (productId.toLowerCase() != "new") {
      this.$loader.startLoader();
      let result = await this.$backend.products.get(Number(productId));
      this.$loader.stopLoader();
      if (result.ok) {
        console.log(result.val)
        if (result.val.id != null) {
          this.product = {
            id: result.val.id,
            name: result.val.name,
            unit: UnitTypefromString(result.val.unit)
          };
        }
      }
    }
  },
  methods: {
    isNew(): boolean {
      const productId = this.$route.params.product as string;
      return productId.toLowerCase() == "new";
    },
    async onSave() {
      if (this.isNew()) {
        this.$loader.startLoader();
        let result = await this.$backend.products.create({
          name: this.product.name,
          unit: UnitTypetoString(this.product.unit)
        });
        this.$loader.stopLoader();
        if (result.ok) {
          navigateTo(`/shop/products/${result.val}`)
        }
      } else {
        const productId = this.$route.params.product as string;
        this.$loader.startLoader();
        let result = await this.$backend.products.update({
          id: Number(productId),
          name: this.product.name,
          unit: UnitTypetoString(this.product.unit)
        })
        this.$loader.stopLoader();
      }
    }
  },
};
</script>
