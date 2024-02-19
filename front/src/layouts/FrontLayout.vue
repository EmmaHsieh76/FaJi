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
      <v-list-item v-if="user.isLogin" @click="logout">
        <v-list-item-title class="" d-flex justify-center>
          <v-icon start icon="mdi-logout"></v-icon>登出
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar color="third" style="height: 64px;">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false" color="ninth">
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
          <v-btn :to="item.to" v-if="item.show" color="ninth" >{{ item.text }}</v-btn>
        </template>
        <v-btn prepend-icon="mdi-logout" v-if="user.isLogin" @click="logout">登出</v-btn>
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
import { useApi } from '@/composables/axios'
// useSnackbar=>彈出提示訊息
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
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
    { to: '/about', text: '關於發記', show: true && !user.isAdmin },
    { to: '/news', text: '最新消息', show: true && !user.isAdmin },
    { to: '/introduce', text: '冰品介紹', show: true && !user.isAdmin },
    { to: '/product', text: '快速預訂', show: true },
    { to: '/content', text: '聯繫我們', show: true && !user.isAdmin },
    { to: '/cart', text: '我的購物車', show: user.isLogin && !user.isAdmin },
    // show: !user.isLogin => 使用者沒有登入時顯示
    { to: '/signup', text: '會員專區', show: !user.isLogin },
    { to: '/member', text: '會員專區', show: user.isLogin && !user.isAdmin },
    { to: '/admin', text: '管理', show: user.isLogin && user.isAdmin }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'buttom'
      }
    })
    // 登出後回首頁
    router.push('/')
  } catch (error) {
    const text = error?.response?.data?.message || '登出失敗'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'buttom'
      }
    })
  }
}

</script>

<style scoped lang="scss">

 .v-app-bar-title {
  font-size: 1.5rem;
  font-weight: bold;
 }

 .v-btn{
  font-size: 1.2rem;
  font-weight: bold;
 }
</style>
