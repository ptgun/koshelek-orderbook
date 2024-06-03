<template>

<v-footer height="40" app>
  <a v-for="item in items" :key="item.title" :href="item.href" :title="item.title"
    class="d-inline-block mx-2 social-link" rel="noopener noreferrer" target="_blank">
    <v-icon :icon="item.icon" :size="24" />
  </a>
</v-footer>

</template>

<script setup>
const items = [

  {
    title: 'Source Code',
    icon: `mdi-github`,
    href: 'https://github.com/ptgun/koshelek-orderbook',
  },
]
</script>

<style scoped lang="scss">
.social-link :deep(.v-icon) {
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));
  text-decoration: none;
  transition: .2s ease-in-out;

  &:hover {
    color: rgba(25, 118, 210, 1);
  }
}
</style>
