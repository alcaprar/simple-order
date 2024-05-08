<template>
  <h1
    class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
  >
    Scegli il negozio
  </h1>

  <form class="max-w-sm mx-auto">
    <div class="mb-6">
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Scegli il negozio</label
      >
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="selected.shop"
      >
        <option v-for="item in shops" v-bind:value="item" v-bind:key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="mb-6">
      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >First name</label
      >
      <input
        type="text"
        id="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="maria481"
        required
        v-model="selected.username"
      />
    </div>
    <button
      @click="onClick"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Vai
    </button>
  </form>
</template>

<script>
const API_URL = `http://localhost:1337/api`

export default {
  data() {
    return {
      message: 'Home!',
      selected: {
        shop: null,
        username: null
      },
      shops: []
    }
  },
  created() {
    this.fetchShops()
  },
  methods: {
    async fetchShops() {
      const url = `${API_URL}/shops`
      let response = await (await fetch(url)).json()
      this.$log.debug('fetchShops', response)
      this.shops = response.data.map((item) => {
        return {
          id: item.attributes.slug,
          name: item.attributes.Name
        }
      })
      this.selected.shop = this.shops[0]
    },
    onClick() {
      this.$log.debug('onClick', this.selected)
      this.$router.push({
        name: 'order',
        params: { shop: this.selected.shop.id, user: this.selected.username }
      })
    }
  }
}
</script>
