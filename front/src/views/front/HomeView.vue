<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows="hover"
    height="100vh"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      cover
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  },
  {
    src: 'https://picsum.photos/1920/1080/?random=1'
  },
  {
    src: 'https://picsum.photos/1920/1080/?random=2'
  },
  {
    src: 'https://picsum.photos/1920/1080/?random=3'
  }
])

</script>

<style scoped>

</style>
