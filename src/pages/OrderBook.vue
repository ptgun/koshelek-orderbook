<template lang="pug">
.screen-wrap.page
  v-row
    v-col
      v-card(
        :variant="variant"
        class="mx-auto"
        color="dark"
        title="Order Book"
      )
        v-row
          v-col(
            cols="6"
          )
            OrderBookTable(:bootType="'bids'")
          v-col(
            cols="6"
          )
            OrderBookTable(:bootType="'asks'")
</template>

<script setup>
import OrderBookTable from '../components/OrderBookTable.vue';
</script>
