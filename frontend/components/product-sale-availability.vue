<template>
    <div class="row">
        <div v-if="!edit">{{ currentAvailability }}</div>
        <div v-if="edit"><input type="number" v-model="currentAvailability"></div>
        <div v-if="!edit" @click.prevent="onEditClicked"><i class="bi-pencil-square" /></div>
        <div v-if="edit" @click.prevent="onSaveClicked"><i class="bi-check-circle-fill" /></div>
        <div v-if="edit" @click.prevent="onCancelClicked"><i class="bi-x-circle-fill" /></div>
    </div>
</template>
<script lang="ts">
export default {
    props: {
        productSaleId: {

        },
        availability: {

        }
    },
    data() {
        return {
            edit: false,
            initialAvailability: Number(this.availability),
            currentAvailability: Number(this.availability)
        }
    },
    methods: {
        onEditClicked() {
            this.$log().debug("[ProductSaleAvailability] onEditClicked")
            this.edit = true
        },
        onCancelClicked() {
            this.$log().debug("[ProductSaleAvailability] onCancelClicked")
            this.edit = false
            this.currentAvailability = this.initialAvailability
        },
        async onSaveClicked() {
            this.$log().debug("[ProductSaleAvailability] onSaveClicked")
            this.$loader.startLoader()
            this.edit = false
            let result = await this.$backend.sales.updateProductAvailability(Number(this.productSaleId), this.currentAvailability);
            if (result.ok) {
                this.initialAvailability = this.currentAvailability
            } else {
                this.currentAvailability = this.initialAvailability
            }
            this.$loader.stopLoader()
        }
    }
}
</script>