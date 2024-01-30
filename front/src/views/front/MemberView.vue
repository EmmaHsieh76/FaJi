<template>
  <v-container>
    <v-tabs fixed-tabs bg-color="light-blue-darken-4" v-model="tab">
      <v-tab
        v-for="tab in tabItems"
        :key="tab.to"
        :to="tab.to"
        class="font-weight-bold text-h6"
        value="tab.num"
      >
        <v-icon>{{ tab.icon }}</v-icon>
        {{ tab.text }}
      </v-tab>
    </v-tabs>
  </v-container>
  <v-card class="mx-auto" max-width="700" elevation="4">
    <v-tabs
      v-model="tab"
      color="yellow-darken-4"
      align-tabs="center"
      fixed-tabs
    >
      <v-tab :value="1"><v-icon>mdi-phone</v-icon>Recents </v-tab>
      <v-tab :value="2"><v-icon>mdi-heart</v-icon>Favorites </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <RegisterView @submit-form="shift"></RegisterView>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <RegisterView @submit-form="shift"></RegisterView>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<!-- <template>
  <!-- <v-container>
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
  </v-container> -->
<!-- <v-card class="mx-auto" max-width="700" elevation="4">
      <v-tabs
      v-model="tab"
      color="yellow-darken-4"
      align-tabs="center"
      fixed-tabs
      >
        <v-tab :value="1" :to="{name:'/register'}"><v-icon>mdi-phone</v-icon>Recents </v-tab>
        <v-tab :value="2" :to="{name:'/login'}"><v-icon>mdi-heart</v-icon>Favorites </v-tab>
      </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
         <router-view></router-view>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-window-item>
    </v-window>
    </v-card>
</template> -->

<script setup>
import { ref } from "vue";
// import RegisterView from '@/views/front/RegisterView.vue'
import { useRouter } from "vue-router";

const router = useRouter();
const tab = ref(1);

// const shift = () => {
//   tab.value = 2
// }

router.afterEach((to) => {
  if (to.name === "login") {
    tab.value = 1;
  } else if (to.name === "register") {
    tab.value = 2;
  }
});

const tabItems = [
  {
    to: "/login",
    text: "登入",
    icon: "mdi-login-variant",
  },
  {
    to: "/register",
    text: "註冊",
    icon: "mdi-account-plus",
  },
];
</script>
