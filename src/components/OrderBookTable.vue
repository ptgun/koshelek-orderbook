<template>
    <div class="bootType" :class="bootType">
        {{ bootType }}
    </div>
<v-table theme="dark">

    <thead>
        <tr>
            <th class="text-left">
                Price
            </th>
            <th class="text-left" v-if="!isMobile">
                Quantity
            </th>
            <th class="text-left">
                Total
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in items" :key="item.name">
            <td>{{ item.price }}</td>
            <td  v-if="!isMobile">{{ item.quantity }}</td>
            <td>{{ item.price * item.quantity }}</td>
        </tr>
    </tbody>
</v-table>

</template>


<script setup>
import { useWindowWidth } from '@/plugins/windowWidth';
const { width, isMobile } = useWindowWidth();
const props = defineProps(['bootType', 'items'])
</script>


<style lang="scss" scoped>
.bootType {
    text-transform: uppercase;
    width: 100%;
    &.bids {
        color: rgb(0, 255, 115);
        text-align: right;
        font-weight: 500;

    }
    &.asks {
        color: rgb(255, 51, 0);
        text-align: left;
        font-weight: 500;
    }
}
</style>