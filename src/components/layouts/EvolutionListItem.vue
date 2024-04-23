<script setup>
    import { onMounted, reactive, ref } from "vue";
    import { useStore } from 'vuex';
    const { evolution } = defineProps(['evolution'])

    const store = useStore();

    let img = ref()
    let img2 = ref()
    let id = ref()

    onMounted(() => {
        findPokemonImages()
    })

    async function findPokemonImages() {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.name}`).then(r => r.json()).then(data => {
            id.value = data.id;
            img.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;
            img2.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
        }).catch(err => { });
    }

</script>
<template>
    <div class="d-flex flex-column gap-2 text-center justify-content-center align-items-center">
        <img :src="img" @error="img=img2" style="width: 80px; height: auto" />
            <span class="badge bg-white fw-bold bg-opacity-50">{{ evolution?.name }}</span>
    </div>
</template>