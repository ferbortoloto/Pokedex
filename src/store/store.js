// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      pokemon: null,
      pokemon_evolutions: null
    };
  },
  mutations: {
    updatePokemonInfo(state, payload) {
      state.pokemon = payload.pokemon
    },
    updatePokemonEvolutionInfo(state, payload) {
      state.pokemon_evolutions = payload
    }
  },
  actions: {
    async openPokemonModal({commit}, payload) {
        await fetch(payload.pokemon.species.evolution_chain.url).then(r => r.json()).then(data => commit('updatePokemonEvolutionInfo', data))
        commit('updatePokemonInfo', payload)
    }
  },
  getters: {
  }
});

export default store;
