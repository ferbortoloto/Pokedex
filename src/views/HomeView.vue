<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useStore } from 'vuex';
import PokemonsList from "@/components/layouts/PokemonsList.vue";
import Loading from "@/components/utilities/Loading.vue";
import SwiperMovement from '@/components/layouts/SwiperMovement.vue'
import SwiperGameIndice from '@/components/layouts/SwiperGameIndice.vue'
import EvolutionList from '@/components/layouts/EvolutionsList.vue'

const store = useStore();

let pokemons = reactive(ref())
let nameSearch = ref()
let loading = ref(true)
let types = reactive(ref())
let selectedType = reactive(ref(""))
let eggGroups = reactive(ref())
let selectedEggGroup = reactive(ref(""))
let selectedOption = reactive(ref("tipo"))

const selectedPokemon = computed(() => store.state.pokemon);
const selectedPokemonEvolutions = computed(() => store.state.pokemon_evolutions);

onMounted(async () => {
  findAllPokemons(),
    findAllTypes(),
    findAllEggGroups()
})

watch(selectedPokemon, () => {
  let myModal = new bootstrap.Modal(document.getElementById('pokemonModal'), {
    keyboard: false
  });
  myModal.show();
})


async function findAllPokemons() {
  await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0").then(r => r.json()).then(data => { pokemons.value = data.results; loading.value = false }).catch(error => { console.log(error); loading.value = false })
  loading.value = false;
}

async function findAllTypes() {
  await fetch(`https://pokeapi.co/api/v2/type/`).then(r => r.json()).then(data => { types.value = data.results })
  loading.value = false;
}

async function findAllEggGroups() {
  await fetch(`https://pokeapi.co/api/v2/egg-group/`).then(r => r.json()).then(data => { eggGroups.value = data.results })
  loading.value = false;
}

watch(nameSearch, () => {
  if (nameSearch.value == '') {
    findAllPokemons()
  }
})

async function searchByName() {
  selectedType.value = "";
  selectedEggGroup.value = "";

  if (nameSearch.value != '') {
    let filteredPokemons = filterPokemonsByName(nameSearch.value);

    if (filteredPokemons.length > 0) {
      pokemons.value = filteredPokemons;
    } else {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${nameSearch.value}`).then(r => r.json()).then(data => { pokemons.value = [data] }).catch(error => { })
    }

  } else {
    findAllPokemons()
  }
}

function filterPokemonsByName(search) {
  return pokemons.value.filter((pokemon) => pokemon.name.includes(search))
}

watch(selectedType, () => {
  selectedEggGroup.value != ""
  findbyType()
})

async function findbyType() {

  await fetch(`https://pokeapi.co/api/v2/type/${selectedType.value}`).then(r => r.json()).then(data => {
    pokemons.value = data.pokemon.map((poke) => {
      return {
        name: poke.pokemon.name,
        url: poke.pokemon.url
      }
    });
  }).catch(error => { })
  loading.value = false;
}

watch(selectedEggGroup, () => {
  selectedType.value != ""
  findByEggGroup()
})


async function findByEggGroup() {
  await fetch(`https://pokeapi.co/api/v2/egg-group/${selectedEggGroup.value}`).then(r => r.json()).then(data => {
    pokemons.value = data.pokemon_species;
  }).catch(error => { })
  loading.value = false;
}

</script>

<template>
  <div class="p-2 d-flex align-items-end justify-content-between mb-3 flex-col">
    <div class="w-25">
      <div class="d-flex w-full btn-group mb-2">
        <input type="radio" class="btn-check" name="options-base" id="option1" value="tipo" v-model="selectedOption"
          autocomplete="off">
        <label class="btn btn-outline-secondary w-full" for="option1">Tipo</label>

        <input type="radio" class="btn-check" name="options-base" id="option2" value="especie" v-model="selectedOption"
          autocomplete="off">
        <label class="btn btn-outline-secondary" for="option2">Espécie</label>
      </div>
      <div class="w-100">
        <select v-if="selectedOption == 'tipo'" class="form-select" v-model="selectedType">
          <option selected value="">Selecione o tipo</option>
          <option v-for="type in types" key="type.name" :value="type.name" type="radio" :id="`type-${type.name}`">{{
            type.name.capitalize() }}</option>
        </select>
        <select v-else class="form-select" v-model="selectedEggGroup">
          <option selected value="">Selecione a espécie</option>
          <option v-for="eggGroup in eggGroups" :key="eggGroup.name" :value="eggGroup.name" type="radio"
            :id="`eggGroup-${eggGroup.name}`">{{ eggGroup.name.capitalize() }}</option>
        </select>
      </div>
    </div>
    <div class="w-25 mb-4">
      <div class="input-group">
        <input v-model="nameSearch" type="text" class="form-control" placeholder="Pesquisar">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2"
          @click="searchByName()">Pesquisar</button>
      </div>
    </div>
  </div>

  <Loading v-if="loading" />

  <PokemonsList v-else :pokemons="pokemons" />

  <div class="modal" id="pokemonModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg ">
      <div
        :class="'modal-content p-4 bg-gradient-' + selectedPokemon?.species?.color.name + '-modal bg-opacity-75 shadow-lg'">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn-close bg-secondary rounded-circle p-2" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body text-black relative">
          <h5 class="modal-title fw-bold text-center mt-4 bg-white rounded-3 bg-opacity-50">{{ selectedPokemon?.name.capitalize() }}</h5>
          <img :src="selectedPokemon?.img" @error="img = img2"
            class="card-img-top position-absolute start-50 translate-middle" alt="..."
            style="height: 150px; width: auto ; top: -50px">
        </div>
        <div class="modal-footer w-full row">
          <SwiperMovement :obj="{ title: 'Attack Movement', moves: selectedPokemon?.moves }" />
          <SwiperGameIndice :obj="{ title: 'Game Indices', game_indices: selectedPokemon?.game_indices }" />
          <section class="mt-4" v-if="selectedPokemonEvolutions">
            <h6 class="text-center fw-bold">Evolutions:</h6>
            <EvolutionList :selectedPokemonEvolutions="selectedPokemonEvolutions" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

#background {
  background: url(https://i.imgur.com/kXMav.jpeg);
  position: absolute;
  max-width: 300p;
  height: auto;
}
</style>