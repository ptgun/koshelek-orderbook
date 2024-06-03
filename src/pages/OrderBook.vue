<template lang="pug">

.screen-wrap.page
  v-row
    v-col
      v-card(
        :variant="variant"
        class="mx-auto order-book"
        color="dark"
        :title="`Order Book`"
      )
        v-card-title
          .selectedPair
            span.gradient-text {{pair}}

        v-row(v-if="store.getters.selectedDepth")
          v-col(
            cols="6"
          )
            OrderBookTable(:bootType="'bids'" :items="store.getters.selectedDepth.bids")
          v-col(
            cols="6"
          )
            OrderBookTable(:bootType="'asks'" :items="store.getters.selectedDepth.asks")

        v-row.show-limit-row
          .display-limit
            span Show 
            v-btn( density="compact" v-for="limit in store.state.limits" @click="showPerPage(limit)") {{ limit }}
            span  elements


</template>

<script setup>
import { useStore } from 'vuex';
import OrderBookTable from '../components/OrderBookTable.vue';
const store = useStore();
const pair = store.state.selectedPair;

function showPerPage(amount) {
  store.dispatch("changeLimitAction", amount)
}
</script>


<style lang="scss" scoped>
.order-book {
  position: relative
}
.selectedPair {
  position: absolute;
  top: 5px;
  right: 15px;
}

.show-limit-row {
  position: relative;
  height: 50px;
  .display-limit {
    position: absolute;
    right: 30px;
    top: 0px;
    .v-btn {
      margin: 0 3px;
      border: 1px solid;
    }
  }
}
</style>