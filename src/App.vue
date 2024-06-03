<template>
  <v-app>
    <AppHeader />
    <RouterView />
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch("init")
})
</script>


<style>


:root {
    --bids-color: #62ffa9;
    --asks-color: #ff6a45;

}
  

.html,
body {
  min-width: 475px;
}

.screen-wrap {
  max-width: 1480px;
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 0 20px;

}

.page {
  margin-top: 20px;
}

.pointer {
  cursor: pointer;
}

.gradient-text {

  background: #43A4FE;
  background: -webkit-linear-gradient(to right, #43A4FE, #FF3F8B);
  background: linear-gradient(to right, #43A4FE, #FF3F8B);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

}
</style>