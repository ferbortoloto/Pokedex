<script setup>
const {obj} = defineProps(['obj']);
</script>
<template>
    <section>
        <h4 class="text-dark text-center swiper-title">{{ obj.title }}</h4>
        <swiper-container  slides-per-view="4" loop="true" navigation="true" :style="{
      '--swiper-navigation-color': '#6c757d',
       '--swiper-navigation-bg-color': '#fff'
    }">
            <swiper-slide class="badge ms-2 bg-white text-dark" v-for="move in obj.moves" :key="move.move.name">
                <span class="fw-semibold">{{ move.move.name }}</span>
            </swiper-slide>
        </swiper-container>
    </section>
</template>
