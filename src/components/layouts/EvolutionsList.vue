<script setup>
import EvolutionListItem from '@/components/layouts/EvolutionListItem.vue'

const { selectedPokemonEvolutions } = defineProps(['selectedPokemonEvolutions']);
</script>

<template>
    <div class="row align-items-center justify-content-center">
        <EvolutionListItem :evolution="selectedPokemonEvolutions?.chain?.species"
                :key="selectedPokemonEvolutions?.chain?.species" />
        <div class="col" v-for="firstEvolution in selectedPokemonEvolutions?.chain.evolves_to"
            :key="firstEvolution.species.name">
            <div class="row">
                <EvolutionListItem class="col" :evolution="firstEvolution.species" />
                <div class="col" v-for="seccondEvolution in firstEvolution.evolves_to" :key="seccondEvolution.species.name">
                    <EvolutionListItem :evolution="seccondEvolution.species" />
                </div>
            </div>
        </div>
    </div>
</template>