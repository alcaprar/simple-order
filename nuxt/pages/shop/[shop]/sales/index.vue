<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>ID</th>
        <th>Data inizio</th>
        <th>Data fine</th>
        <th>Chiusura forzata</th>
        <th>
          <RouterLink :to="`/shop/${$route.params.shopId}/sales/new`"
            ><v-icon name="co-plus"></v-icon
          ></RouterLink>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sale in sales" :key="sale.id">
        <td>{{ sale.id }}</td>
        <td>{{ sale.startDate.toLocaleString() }}</td>
        <td>{{ sale.endDate.toLocaleString() }}</td>
        <td>{{ sale.disabled }}</td>
        <td>
          <RouterLink :to="`/shop/${$route.params.shopId}/sales/${sale.id}`"
            ><v-icon name="co-pencil"
          /></RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
const API_URL = `http://localhost:1337/api`;
export default {
  data() {
    return {
      sales: [] as Sale[],
    };
  },
  async created() {
    this.$log().debug("created");
    const shop = this.$route.params.shop as string;
    this.$log().debug({ shop });

    let sales = await this.getSales(shop);
    this.sales = sales;
  },
  methods: {
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
          disabled: item.disabled,
        } as Sale;
      });
    },
  },
};
</script>
