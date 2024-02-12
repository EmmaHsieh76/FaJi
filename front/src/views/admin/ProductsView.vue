<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center">商品管理</h1>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12">
      <v-btn color="blue-darken-4" variant="tonal" @click="openDialog">新增商品</v-btn>
    </v-col>
  </v-row>
</v-container>
<!-- persistent 點擊對話框外無反應 -->
<v-dialog v-model="dialog" persistent>
  <v-card>
    <v-card-title> {{ dialogId === ''? '新增商品' : '編輯商品'}}</v-card-title>
    <v-card-text></v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" variant="tonal">取消</v-btn>
      <v-btn color="blue-darken-4" variant="tonal">送出</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const dialogId = ref('')

const openDialog = () => {
  dialog.value = ''
  dialog.value = true
}
</script>
