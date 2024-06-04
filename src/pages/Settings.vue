<template lang="pug">

.screen-wrap.page
  v-row(
    class="mb-6"
  )
    v-col(
  class="v-col-12"

    md="4"

    )
      v-card
        v-text-field(
          v-model="search"
          density="compact"
          label="Exchange Pair"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details)
        v-table
          tbody
            tr(v-for="pair in filteredPairs" :key="pair")
              td.pair-btn.pointer(@click="selectPair(pair)") {{ pair }}
      
    v-col(
      class="v-col-12"


      md="8"

    )
      v-card(
        :variant="variant"
        class="mx-auto"
        color="dark"
        title="Log"
      )
        v-table
          tbody
            tr(v-for="logItem in logItems" :key="logItem.time")
              td 
                | <span class="gradient-text">[{{ logItem.time }}]</span> {{ logItem.action }}

</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore();
const logItems = store.state.log;


import { computed, ref } from "vue"

const search = ref("")

const filteredPairs = computed(() => store.state.pairs.filter(
  pair => pair.indexOf(search.value.toUpperCase()) != -1
))

function selectPair(newPair) {
  store.dispatch('changePairAction', newPair)
}
</script>


<style lang="scss">
.pair-btn {
  font-size: 18px;
  font-weight: bold;
}

</style>