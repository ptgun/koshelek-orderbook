
import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            selectedPair: "BTCUSDT",
            limit: 100,
            log: [{
                time: getFormatedDate(),
                action: "App loaded"
            }],
            pairs: [
                "BTCUSDT",
                "BNBBTC",
                "ETHBTC"
            ],
            depth: {

            }
        }
    },
    mutations: {
        changePair(state, newPair) {
            if (state.pairs.indexOf(newPair) == -1) {
                alert("unsupported pair")
                return
            };
            state.selectedPair = newPair,
                state.log.push({
                    time: getFormatedDate(),
                    action: `User has changed exchange pair to ${newPair}`
                })
            fetch(`https://api.binance.com/api/v3/depth?symbol=${newPair}&limit=${state.limit}`)
                .then(res => res.json())
                .then(json => {
                    state.depth[newPair] = json;
                    console.log(state.depth);
                })
                .catch(err => {
                    console.log("ERR: ", err);
                })
        }
    },
    actions: {
        init({ commit, state }) {
            // alert("ok")
            commit('changePair', state.selectedPair)
        }
    },
    getters: {
        selectedDepth(state) {
            console.log("from gettrs", state.depth);
            return state.depth[state.selectedPair]
        }
    }
})



function getFormatedDate() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}