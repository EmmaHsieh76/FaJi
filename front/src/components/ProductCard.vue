<template>
  <v-card class="product-card">
    <RouterLink
    :to="'/products/' + _id"
    class="text-decoration-none text-ninth "
    >
      <v-img
        :src="image"
        cover
        height="300"
      >
    </v-img>
    <v-card-title class="font-weight-bold text-h5">
      {{name}}
    </v-card-title>
    </RouterLink>
    <v-card-subtitle>${{price}}</v-card-subtitle>
    <!--  white-space:pre => 才能顯示後端文字說明的換行，不然字會在同一行-->
    <v-card-text style="white-space:pre"> {{ description }}</v-card-text>
    <v-card-actions>
      <v-btn color="seventh" prepend-icon="mdi-cart" variant='elevated'>加入購物車</v-btn>
    </v-card-actions>
  </v-card>
</template>
<!-- class="text-decoration-none text-ninth font-weight-bold text-h5 " -->
<script setup>
// 有哪些接收的資料
const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell'])
</script>

<style>
</style>