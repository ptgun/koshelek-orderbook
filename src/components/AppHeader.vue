<template lang="pug">

header
  .screen-wrap
    router-link(:to="{name: 'orderbook'}")
      .header-logo-wrap
        img(src="../assets/logo.svg", alt="", srcset="")
    .header-nav
      AppNavigation

</template>

<script setup>
import AppNavigation from './AppNavigation.vue';
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 60px;
  background: #212121;

  .header-logo-wrap {
    padding-top: 18px;
    float: left;
  }

  .header-nav {
    height: 60px;
    float: right;
  }
}
</style>
