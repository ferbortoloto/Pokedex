<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();

const { pokemonData } = defineProps(["pokemonData"])
let pokemon = reactive(ref())
let img = ref()
let img2 = ref()
let species = reactive(ref())

onMounted(() => {
    getPokemonData()
})

async function getPokemonData() {
    try {
       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData?.name}`);
       
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
       
            img.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;
            img2.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
            pokemon.value = data;
    } catch (err) {
    }

    try {
        await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData?.name}`).then(r =>  r.json()).then(data => species.value = data).catch(err => {console.clear()})
    } catch (err) {
        console.clear()
    }
}

function errorImage(event) {
    event.target.style = "height: 150px; width: 90%"
}
</script>

<template>
    <div :class="'rounded-3 shadow-none card mb-3 py-4 bg-gradient-' + species?.color.name + ' bg-opacity-50'"
        @click="store.dispatch('openPokemonModal', { pokemon: { name: pokemon.name, id: pokemon.id, img: img, img2: img2, moves: pokemon.moves, game_indices: pokemon.game_indices, species: species } })"
        v-if="pokemon">
        <img :src="img" @error="img = img2, errorImage($event)" class="card-img-top" alt="..."
            style="height: 150px; width: auto">
        <div class="card-body">
            <div class="">
                <h4 class="text-center fw-semibold ">
                    {{ pokemon.id + '. ' + pokemon.name.capitalize() }}</h4>
            </div>
            <div class="d-flex justify-content-center gap-2">
                <span :class="'badge badge-bg-' + eggGroup.name" v-for="eggGroup in species?.egg_groups"
                    :key="eggGroup.name">
                    <span>{{ eggGroup.name }}</span>
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped>
.cardList {
    cursor: pointer;
}
</style>