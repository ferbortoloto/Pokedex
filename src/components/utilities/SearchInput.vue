<script setup>
import { useStore } from 'vuex';

const store = useStore();

</script>

<template>
    <div class="form-floating">
        <input class="form-control" v-model="nameSearch" />
        <label>Pesquisar</label>
    </div>
</template>