<!-- 前台的布局 -->
<template>
<v-navigation-drawer v-model="drawer" temporary location="left" v-if="isMobile"></v-navigation-drawer>
  <v-app-bar color="yellow-darken-4">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">
        <v-app-bar-title> 發記冰品 </v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- 手機板導覽列 -->
      <template v-if="isMobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>
      <!-- 電腦版導覽列 -->
      <template v-else>
        <template v-for="item in navItems" :key="item.to">
          <v-btn :to="item.to">{{ item.text }}</v-btn>
        </template>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'

// 判斷是否為手機板=>變成漢堡
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機板側欄開關
const drawer = ref(false)

// 導覽列的連結
const navItems = [
  { to: '/about', text: '關於發記' },
  { to: '/news', text: '最新消息' },
  { to: '/introduce', text: '冰品介紹' },
  { to: '/product', text: '快速預訂' },
  { to: '/content', text: '聯繫我們' },
  { to: '/cart', text: '我的購物車' },
  { to: '/member', text: '會員專區' },
  { to: '/admin', text: '管理' }
]
</script>
