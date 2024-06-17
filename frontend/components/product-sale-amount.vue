<template>
    <div class="row">
        <div v-if="!edit">{{ formatAmountInMinor(currentAmount) }}€</div>
        <div v-if="edit"><input type="number" v-model="currentAmount"></div>
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
        amount: {

        }
    },
    data() {
        return {
            edit: false,
            initialAmount: Number(this.amount),
            currentAmount: Number(this.amount)
        }
    },
    methods: {
        formatAmountInMinor(amount: number): number {
            return this.$formatter.amountInMinor(amount)
        },
        onEditClicked() {
            this.$log().debug("[ProductSaleAmount] onEditClicked")
            this.edit = true
        },
        onCancelClicked() {
            this.$log().debug("[ProductSaleAmount] onCancelClicked")
            this.edit = false
            this.currentAmount = this.initialAmount
        },
        async onSaveClicked() {
            this.$log().debug("[ProductSaleAmount] onSaveClicked")
            this.$loader.startLoader()
            this.edit = false
            let result = await this.$backend.sales.updateProductAmount(Number(this.productSaleId), this.currentAmount);
            if (result.ok) {
                this.initialAmount = this.currentAmount
            } else {
                this.currentAmount = this.initialAmount
            }
            this.$loader.stopLoader()
        }
    }
}
</script>