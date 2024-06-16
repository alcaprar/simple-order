<template>
  <ul class="nav nav-tabs" id="sale" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">Generale</button>
    </li>
    <li class="nav-item" role="presentation" v-if="!isNew()">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Prodotti</button>
    </li>
  </ul>
  <div class="tab-content">
    <div id="general" class="tab-pane pane show active" role="tabpanel">
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
    </div>
    <div id="products" class="tab-pane fade" role="tabpanel">
      <div class="table-responsive small">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Prodotto</th>
              <th>Prezzo unitario</th>
              <th>Quantità disponibile</th>
              <th>Quantità ordinata</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in produtcs" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.amount_in_minor }}</td>
              <td>Quantità</td>
              <td>Quantità ordinata</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      } as Sale,
      shopId: "1", // hack because for the time being there will be just one shop,
      produtcs: []
    };
  },
  async created() {
    const saleId = this.$route.params.sale as string;

    if (saleId.toLowerCase() != "new") {

      this.$loader.startLoader();
      let result = await this.$backend.sales.get(Number(saleId));
      this.$loader.stopLoader();
      if (result.ok) {
        console.log(result.val)
        if (result.val.id != null ){
          this.sale = {
            id: result.val.id.toString(),
            startDate: new Date(result.val.startDate),
            endDate: new Date(result.val.endDate)
          };
        }
      }
    }
  },
  methods: {
    isNew(): boolean {
      const saleId = this.$route.params.sale as string;
      return saleId.toLowerCase() == "new";
    },
    async onSave() {
      if (this.isNew()) {
        this.$log().debug("Creating new sale");
        this.$loader.startLoader();
        let result = await this.$backend.sales.create({
          startDate: this.sale.startDate.toISOString(),
          endDate: this.sale.endDate.toISOString()
        });
        this.$loader.stopLoader();
        if (result.ok) {
          this.$log().debug("Sale created, redirecting to the right url.")
          navigateTo(`/shop/sales/${result.val}`)
        }
        
      } else {
        const saleId = this.$route.params.sale as string;
        this.$loader.startLoader();
        await this.$backend.sales.update({
          id: Number(this.sale.id),
          startDate: this.sale.startDate.toISOString(),
          endDate: this.sale.endDate.toISOString(),
        });
        this.$loader.stopLoader();
      }
    },
  },
};
</script>
