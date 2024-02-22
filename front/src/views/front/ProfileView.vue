<template>
  <v-row>
    <v-col cols="12">
        <h2 class="text-center">修改個人資料</h2>
      </v-col>
    <v-col cols="6">
     <v-form>
      <v-card
        class="mx-auto"
        max-width="344"
      >
      <!-- 帳號 密碼 名字 手機 -->
      <v-card-title class="third font-weight-bold text-center" >個人基本資料</v-card-title>
        <v-container>
          <h4>帳號</h4>
          <h4 color="forth" class="pb-4">{{ account }}</h4>
          <v-text-field
            v-model="name"
            color="forth"
            label="名字"
            variant="underlined"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="phone"
            color="forth"
            label="手機"
            placeholder="Enter your password"
            variant="underlined"
            clearable
          ></v-text-field>

        </v-container>

          <v-btn color="forth" size="x-large" class="font-weight-bold d-flex w-100" block variant="tonal">
          確認修改個人資料
          </v-btn>

      </v-card>
     </v-form>
    </v-col>
    <v-col cols="6">
      <v-form>
        <v-card
          class="mx-auto"
          max-width="344"
        >
    <!-- 帳號 密碼 名字 手機 -->
    <v-card-title class="third font-weight-bold text-center" >修改密碼</v-card-title>
      <v-container>
        <v-text-field
          v-model="password"
          color="forth"
          label="舊密碼"
          variant="underlined"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          color="forth"
          label="輸入新密碼"
          variant="underlined"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          color="forth"
          label="確認新密碼"
          variant="underlined"
          clearable
        ></v-text-field>
      </v-container>
        <v-btn color="forth" size='x-large' class="font-weight-bold d-flex w-100" block variant="tonal">
        確認修改密碼
        </v-btn>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()

// 帳號 密碼 名字 手機預設為會員資料
const account = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')

name.value = user.name
phone.value = user.phone
account.value = user.account
password.value = user.password
</script>

<style scoped>
.third{
  color:#F9C80E;
}
</style>
