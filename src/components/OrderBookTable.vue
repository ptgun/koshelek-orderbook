<template>

    <div class="bootType" :class="bootType">
        {{ bootType }}
    </div>


    <v-table height="calc(90vh - 220px)" item-class="depth-item" class="depth-table">
        <thead class="bookHeader" >

            <tr class="d-flex justify-space-between" :class="bootType">
                <th class="text-left">
                    Price
                </th>
                <th class="text-right quantity-th-add-style-1" v-if="!isMobile">
                    Quantity
                </th>
                <th class="text-right">
                    Total
                </th>
            </tr>

        </thead>
        <tbody class="bookBody">
            <tr v-for="itemKey in Object.keys(items)" :key="itemKey" class="depth-item">
                <div class="depth-view-load" :class="bootType" :style="{width: getDepthViewWidth(items[itemKey])}"></div>
                <!-- <div class="text-above"> -->
                <td class="text-left">{{ parseFloat(itemKey).toFixed(fixed_decimals[store.state.selectedPair][1]) }}</td>
                <td class="text-right" v-if="!isMobile">{{ parseFloat(items[itemKey]).toFixed(fixed_decimals[store.state.selectedPair][0]) }}</td>
                <td class="text-right">
                    <span class="txt-above">{{ (itemKey * items[itemKey]).toFixed(fixed_decimals[store.state.selectedPair][1]) }}</span>
                </td>
            <!-- </div> -->

            </tr>
        </tbody>

    </v-table>

</template>


<script setup>
import { useWindowWidth } from '@/plugins/windowWidth';
import { useStore } from 'vuex';
const { width, isMobile } = useWindowWidth();
const props = defineProps(['bootType', 'items']);
const store = useStore();

// fixed number for every pair
const fixed_decimals = {
    "BTCUSDT": [6, 2],
    "BNBBTC": [4, 6],
    "ETHBTC": [6, 6],
};


const depth_max_view = {
    "BTCUSDT": 10,
    "BNBBTC": 100,
    "ETHBTC": 50,
};

function getDepthViewWidth(quantity) {
    const a = ((parseFloat(quantity) / depth_max_view[store.state.selectedPair]) * 100);
    // console.log(a);
    if (a > 95) return "95%";
    return a + 3 + "%";
}
</script>


<style lang="scss" scoped>
.bookHeader {
    tr {
        width: 100%;
        // padding-top: 10px;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important;
        border-bottom: 1px solid var(--bids-color);
        &.bids {
            border-bottom: 1px solid var(--bids-color);
        }

        &.asks {
            border-bottom: 1px solid var(--asks-color);
        }

        th {
            &.quantity-th-add-style-1 {
                width: 30%;
                text-align: left;
            }
            margin-top:20px;
            border: none !important;
            padding-bottom: -10px !important;
            margin-bottom: -30px !important;
        }
    }

    // align-items: stretch;
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    background: #212121;
}

.bookBody {
    margin-top: 260px !important;
    tr {
        td {
            height: 30px !important;
        }
    }
}

.bootType {
    text-transform: uppercase;
    width: 100%;

    &.bids {
        color: var(--bids-color);
        text-align: right;
        font-weight: 500;

    }

    &.asks {
        color: var(--asks-color);
        text-align: left;
        font-weight: 500;
    }
}

.depth-table {
    padding-top: 60px;
    position: relative;
    width: 100%;
    overflow: scroll;
}

.depth-item {
    position: relative;
    .depth-view-load {
        position: absolute;
        right: 0;
        z-index: 0;
        width: 90%;
        height: 90%;
        
        opacity: 0.15;
        &.bids {
            background-color: var(--bids-color);
        }
        &.asks {
            background-color: var(--asks-color);
        }

    }
    background-size: 40% 50% !important;
    background-repeat: no-repeat !important;
    height: 25px !important;
    th {
        position: relative;
        .txt-above {
            position: absolute;
            z-index: 1;

        }
        height: 25px !important;
        margin: 0;
    }
}
</style>