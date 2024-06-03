import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    { path: '/', name: 'orderbook', component: () => import("./pages/OrderBook.vue") },
    { path: '/settings', name: 'settings', component: () => import("./pages/Settings.vue") },

  ],
})

export default router
