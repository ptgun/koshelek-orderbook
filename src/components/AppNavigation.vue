<template>

<router-link v-for="item in items" :to="{ name: item.routeName }">
    <v-btn class="h100-btn">
        <v-icon>{{ item.icon }}</v-icon>
        <span class="h-btn-title">{{ item.title }}</span>
    </v-btn>
</router-link>

</template>

<script setup>


const items = [
    {
        title: 'OrderBook',
        icon: `mdi-swap-horizontal`,
        routeName: 'orderbook',
    },
    {
        title: 'Settings',
        icon: `mdi-cog`,
        routeName: 'settings',
    }
]
</script>


<style lang="scss">
.h100-btn {
    height: 100% !important;
    border-radius: 0 !important;

    @media screen and (max-width: 760px) {
        i {
            font-size: 30px;
        }

        .h-btn-title {
            display: none;

        }
    }

}
</style>