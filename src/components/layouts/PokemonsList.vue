<script setup>
import { onMounted } from "vue";
import PokemonsListItem from '@/components/layouts/PokemonsListItem.vue';

const  { pokemons } = defineProps(['pokemons'])

</script>

<template>
    <div class="row px-2 w-full">
         <div class="col-lg-4 col-12 col-md-6" v-for="pokemon in pokemons" :key="pokemon.name">
            <PokemonsListItem v-if="pokemon" :pokemonData="pokemon" />
        </div> 
    </div>
</template>
