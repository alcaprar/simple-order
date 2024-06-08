<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Gestisci finestra di vendita</h1>
  </div>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <a
        class="nav-link active"
        id="sale-general"
        data-bs-toggle="tab"
        href="#sale-general-tabpanel"
        role="tab"
        aria-controls="sale-general-tabpanel"
        aria-selected="true"
        >Generale</a
      >
    </li>
    <li class="nav-item" role="presentation">
      <a
        class="nav-link"
        id="sale-products"
        data-bs-toggle="tab"
        href="#sale-products-tabpanel"
        role="tab"
        aria-controls="sale-products-tabpanel"
        aria-selected="false"
        >Prodotti</a
      >
    </li>
  </ul>
  <div class="tab-content pt-5" id="tab-content">
    <div
      class="tab-pane active"
      id="sale-general-tabpanel"
      role="tabpanel"
      aria-labelledby="sale-general"
    >
      <div class="row g-3">
        <form class="">
          <div class="col-sm-3">
            <label for="startDate" class="form-label">Data inizio</label>
            <input
              type="text"
              id="startDate"
              class="form-select"
              placeholder="Pomodori"
              required
              v-model="sale.startDate"
            />
          </div>
          <div class="col-sm-3">
            <label for="endDate" class="form-label">Data fine</label>
            <input
              type="text"
              id="endDate"
              class="form-control"
              placeholder="Pomodori"
              required
              v-model="sale.endDate"
            />
          </div>

          <hr class="my-4" />

          <button @click.prevent="onSave" class="w-100 btn btn-primary btn-lg">
            Salva
          </button>
        </form>
      </div>
    </div>
    <div
      class="tab-pane"
      id="sale-products-tabpanel"
      role="tabpanel"
      aria-labelledby="sale-products"
    >
      Prodotti
    </div>

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
        disabled: false,
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
      const saleId = this.$route.params.saleId as string;
      return saleId.toLowerCase() == "new";
    },
    async getSale(saleId: string): Promise<Sale> {
      const url = `${API_URL}/sales/${saleId}`;
      let response = await fetch(url);
      let sale_response: SaleDto = await response.json();
      this.$log().debug("getSale", sale_response);

      return {
        id: saleId,
        startDate: new Date(sale_response.startDate),
        endDate: new Date(sale_response.endDate),
        disabled: sale_response.disabled,
      };
    },
    async onSave() {
      if (this.isNew()) {
        const saleId = await this.createSale(this.sale);

        this.$router.push({
          name: "sale",
          params: { shopId: this.shopId, saleId },
        });
      } else {
        const saleId = this.$route.params.saleId as string;
        await this.updateSale(saleId, this.sale);
      }
    },
    async createSale(sale: Sale): Promise<string> {
      const shopId = this.shopId;
      const url = `${API_URL}/sales`;
      let response = await fetch(url, {
        method: "POST",
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
      this.$log().debug("createSale", sale_response);
      return sale_response.id.toString();
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
