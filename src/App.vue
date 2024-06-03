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
</script>


<style>
.html, body {
  min-width: 475px;
}

.screen-wrap {
  max-width: 1480px;
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 0 20px;

}
.v-card-title {
  /* text-transform: uppercase !important; */
}
.page {
  margin-top: 20px;
}
</style>