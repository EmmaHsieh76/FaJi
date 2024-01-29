<template>
  <!-- <h2 class="text-center font-weight-bold text-h4">會員專區</h2> -->
  <v-container>
    <v-tabs fixed-tabs bg-color="light-blue-darken-4" v-model="tab" >
      <v-tab
      v-for="tab in tabItems"
      :key="tab.to"
        :to="tab.to"
        class="font-weight-bold text-h6"
        value="tab.num"
        >
        <v-icon>{{tab.icon}}</v-icon>
        {{tab.text }}
      </v-tab>
    </v-tabs>
  <!-- <v-card> -->
    <!-- <v-tabs 
    v-model="tab"
    bg-color="deep-purple-accent-4"
    fixed-tabs
    >
      <v-tab value="tab-1">
        <v-icon>mdi-phone</v-icon>
        Recents
      </v-tab>
      <v-tab value="tab-2">
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="i in 3" :key="i" :value="'tab-' + i">
      <v-card>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
      </v-window-item>
    </v-window>
  </v-card> -->
  </v-container>
</template>

<script setup>
const tabItems = [
  {
    to: '/login',
    text: '登入',
    icon: 'mdi-login-variant'
  },
  {
    to: '/register',
    text: '註冊',
    icon: 'mdi-account-plus'
  }
]
</script>
