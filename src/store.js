
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
            limits: [
                100,
                500,
                1000,
            ],
            depth: {

            },
            snapshotTime: {

            },
            socket: null,
        }
    },
    mutations: {
        changePair(state, newPair) {
            state.selectedPair = newPair
            state.log.push({
                time: getFormatedDate(),
                action: `User has changed exchange pair to ${newPair}`
            })

            return fetch(`https://api.binance.com/api/v3/depth?symbol=${newPair}&limit=${state.limit}`)
                .then(res => res.json())
                .then(json => {
                    state.depth[newPair] = {
                        bids: {},
                        asks: {},
                    };
                    state.snapshotTime[newPair] = json.lastUpdateId;
                    json.bids.forEach(pq => {
                        state.depth[newPair].bids[pq[0]] = pq[1];
                    })
                    json.asks.forEach(pq => {
                        state.depth[newPair].asks[pq[0]] = pq[1];
                    })

                })
                .catch(err => {
                    console.log("ERR: ", err);
                })
        },
        changeLimit(state, newLimit) {
            state.limit = newLimit

            state.log.push({
                time: getFormatedDate(),
                action: `User has changed display limit to ${newLimit}`
            })
        },
        updateDepthItem(state, newDepth) {
            // console.log({newDepth});
            if (newDepth.v == 0) {
                // delete from the orderbook table if depth been emptied
                delete state.depth[state.selectedPair][newDepth.s][newDepth.k];
            } else {
                // update depth for this price
                state.depth[state.selectedPair][newDepth.s][newDepth.k] = newDepth.v;
            }

        }
    },
    actions: {
        init({ dispatch, state }) {
            dispatch('changePairAction', state.selectedPair)
        },
        async changePairAction({ dispatch, commit, state }, newPair) {
            if (state.pairs.indexOf(newPair) == -1) {
                alert("unsupported pair")
                return
            };
            await commit('changePair', newPair);
            dispatch('connect_wss', newPair);
        },
        changeLimitAction({ dispatch, commit, state }, newLimit) {
            if (state.limits.indexOf(newLimit) == -1) {
                alert("unsupported limit")
                return
            };
            commit('changeLimit', newLimit);
            dispatch('changePairAction', state.selectedPair);

        },
        connect_wss({ commit, state }, newPair) {
            const pair = newPair.toLowerCase();

            // close old socket when user changes pair
            if (state.socket) state.socket.close();

            state.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@depth`);

            state.socket.onopen = function (e) {
                console.log("[open] Connection established");
                console.log("receiving updates for ", newPair);
            };

            state.socket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                console.log(data);

                // skipping if snaphot is not ready
                if (!state.depth[newPair]) {
                    // alert("snaphot is not ready")
                    return
                };
                // skipping if this update is old
                if (data.u <= state.depth[newPair].lastUpdateId) {
                    alert("this update is old")
                    return
                };

                console.log(data.a);

                if (data.a.length > 0) {
                    data.a.forEach(updateAskItem => {

                        commit('updateDepthItem', {
                            s: "asks",
                            k: updateAskItem[0],
                            v: updateAskItem[1],
                        })

                    })
                }

                if (data.b.length > 0) {
                    data.b.forEach(updateAskItem => {

                        commit('updateDepthItem', {
                            s: "bids",
                            k: updateAskItem[0],
                            v: updateAskItem[1],
                        })

                    })
                }
                state.depth[newPair]
            };

            state.socket.onclose = function (event) {
                if (event.wasClean) {
                    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    console.log('[close] Connection died');
                }
            };

            state.socket.onerror = function (error) {
                console.log(`[error]`);
            };
        },
    },
    getters: {
        selectedDepth(state) {
            return state.depth[state.selectedPair]
        }
    }
})



function getFormatedDate() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}


