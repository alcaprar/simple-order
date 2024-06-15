<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Finestre di vendita</h1>
  </div>
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Data inizio</th>
          <th>Data fine</th>
          <th>Stato</th>
          <th>
            <NuxtLink :to="`/shop/sales/new`"
              ><i class="bi-plus-circle-fill"
            /></NuxtLink>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id">
          <td>{{ sale.id }}</td>
          <td>{{ sale.startDate.toLocaleString() }}</td>
          <td>{{ sale.endDate.toLocaleString() }}</td>
          <td>
            {{ isSaleActive(sale) ? "🟢 In corso" : "🔴 Conclusa" }}
          </td>
          <td>
            <NuxtLink :to="`/shop/sales/${sale.id}`"
              ><i class="bi-pencil-fill"
            /></NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
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
      sales: [] as Sale[],
      shopId: "1", // hack because for the time being there will be just one shop
    };
  },
  async created() {
    this.$log().debug("created");

    let sales = await this.getSales(this.shopId);
    this.sales = sales;
  },
  methods: {
    isSaleActive(sale: Sale): bool {
      const now = new Date();
      return now >= sale.startDate && now <= sale.endDate
    },
    async getSales(shop: string): Promise<Sale[]> {
      const url = `${API_URL}/shops/${shop}/sales`;
      let response = await fetch(url);
      let sales_response: SaleDto[] = await response.json();
      this.$log().debug("sales_response", sales_response);

      return sales_response.map((item) => {
        return {
          id: item.id.toString(),
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        } as Sale;
      });
    },
  },
};
</script>
