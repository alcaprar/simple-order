<template>
  <div>
    <form class="max-w-sm mx-auto">
      <div class="mb-6">
        {{ sale.id }}
      </div>
      <div class="mb-6">
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Data inizio</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pomodori"
          required
          v-model="sale.startDate"
        />
      </div>
      <div class="mb-6">
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Data fine</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pomodori"
          required
          v-model="sale.endDate"
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
      sale: {
        startDate: new Date(),
        endDate: new Date(),
        id: "NEW",
        disabled: false,
      } as Sale,
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
      let dataResponse = (await response.json()).data;
      let sale_response: SaleDto = dataResponse.attributes;
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
          params: { shopId: this.$route.params.shopId, saleId },
        });
      } else {
        const saleId = this.$route.params.saleId as string;
        await this.updateSale(saleId, this.sale);
      }
    },
    async createSale(sale: Sale): Promise<string> {
      const shopId = this.$route.params.shopId as string;
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
