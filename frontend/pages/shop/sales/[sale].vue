<template>
  <div class="row g-3">
    <form class="">
      <div class="col-xs-6">
        <label for="startDate" class="form-label">Data inizio</label>
        <DatePicker id="startDate" v-model="sale.startDate" minimumView="time" inputFormat="yyyy-MM-dd HH:mm"></DatePicker>
      </div>
      <div class="col-xs-6">
        <label for="endDate" class="form-label">Data fine</label>
        <DatePicker id="startDate" v-model="sale.endDate" minimumView="time" inputFormat="yyyy-MM-dd HH:mm"></DatePicker>
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
  setup() {
    definePageMeta({ layout: "admin" });
  },

  data() {
    return {
      sale: {
        startDate: new Date(),
        endDate: new Date(),
        id: "NEW",
      } as Sale,
      shopId: "1", // hack because for the time being there will be just one shop
    };
  },
  async created() {
    const saleId = this.$route.params.sale as string;

    if (saleId.toLowerCase() != "new") {
      const sale = await this.getSale(saleId);
      this.sale = sale;
    }
  },
  methods: {
    isNew(): boolean {
      const saleId = this.$route.params.sale as string;
      return saleId.toLowerCase() == "new";
    },
    async getSale(saleId: string): Promise<Sale> {
      const url = `${API_URL}/sales/${saleId}`;
      let response = await fetch(url);
      let dataResponse = (await response.json()).data;
      let sale_response: SaleDto = dataResponse.attributes;
      this.$log().debug("getSale", sale_response);

      return {
        id: saleId,
        startDate: new Date(sale_response.startDate),
        endDate: new Date(sale_response.endDate),
      };
    },
    async onSave() {
      this.$log().debug("onSave clicked")
      if (this.isNew()) {
        this.$log().debug("Creating new sale");
        this.$loader.startLoader();
        let result = await this.$backend.sales.create({
          startDate: this.sale.startDate,
          endDate: this.sale.endDate
        });
        this.$loader.stopLoader();
        if (result.ok) {
          this.$log().debug("Sale created, redirecting to the right url.")
          navigateTo(`/shop/sales/${result.val}`)
        }
        
      } else {
        const saleId = this.$route.params.saleId as string;
        this.$loader.startLoader();
        await this.updateSale(saleId, this.sale);
        this.$loader.stopLoader();
      }
    },
    async updateSale(saleId: string, sale: Sale) {
      const url = `${API_URL}/sales/${saleId}`;
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            startDate: sale.startDate,
            endDate: sale.endDate,
            disabled: sale.disabled,
          },
        }),
      });
      let sale_response: SaleDto = (await response.json()).response;
      this.$log().debug("updateSale", sale_response);
    },
  },
};
</script>
