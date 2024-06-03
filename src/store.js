
import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      selectedPair: "BTCUSDT",
      log: [{
        time: getFormatedDate(),
        action: "App loaded"
      }],
      pairs: [
        "BTCUSDT",
        "BNBBTC",
        "ETHBTC"
      ]
    }
  },
  mutations: {
    changePair(state, newPair) {
      state.selectedPair = newPair,
      state.log.push({
        time: getFormatedDate(),
        action: `User has changed exchange pair to ${newPair}`
      })
    }
  }
})



function getFormatedDate() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}