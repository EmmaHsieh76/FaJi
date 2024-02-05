<!-- 前台的布局 -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    v-if="isMobile"
    location="left"
    style="width:100vw;"
  >
    <v-list nav>
      <template v-for="item in navItems" :key="item.to">
        <!-- :to綁定可以換頁 -->
        <v-list-item :to="item.to" v-if="item.show">
          <v-list-item-title class="list-style"
            >{{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar color="yellow-darken-4">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">
        <v-app-bar-title class="font-weight-bold"> 發記冰品 </v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- 手機板導覽列 -->
      <template v-if="isMobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>
      <!-- 電腦版導覽列 -->
      <template v-else>
        <template v-for="item in navItems" :key="item.to">
          <v-btn :to="item.to" class="list-style" v-if="item.show">{{ item.text }}</v-btn>
        </template>
      </template>
    </v-container>
  </v-app-bar>
<!-- 每個分頁頁面內容 -->
<v-main>
  <router-view></router-view>
</v-main>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
// import { useFormErrors } from 'vee-validate';

const user = useUserStore()

// 判斷是否為手機板=>變成漢堡
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機板側欄開關
const drawer = ref(false)

// 導覽列的連結
// computed=>判斷登入狀態，顯示不同的導覽列
const navItems = computed(() => {
  return [
    { to: '/about', text: '關於發記', show: true },
    { to: '/news', text: '最新消息', show: true },
    { to: '/introduce', text: '冰品介紹', show: true },
    { to: '/product', text: '快速預訂', show: true },
    { to: '/content', text: '聯繫我們', show: true },
    { to: '/cart', text: '我的購物車', show: user.isLogin },
    // show: !user.isLogin => 使用者沒有登入時顯示
    { to: '/signup', text: '會員專區', show: !user.isLogin },
    { to: '/member', text: '會員專區', show: user.isLogin },
    { to: '/admin', text: '管理', show: user.isLogin && user.isAdmin }
  ]
})

</script>

<style scoped lang="scss">
.list-style {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
</style>
