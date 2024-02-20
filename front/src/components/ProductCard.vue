<template>
  <v-card class="product-card" width="380">
    <RouterLink
    :to="'/products/' + _id"
    class="text-decoration-none text-ninth"
    >
    <v-img
        :src="images[0]"
        cover
        width="100%"
        height="300"
      >
    </v-img>
    <v-card-title class="font-weight-bold text-h5">
      {{name}}
    </v-card-title>
    </RouterLink>
    <v-card-subtitle>${{price}}</v-card-subtitle>
    <!--  white-space:pre => 才能顯示後端文字說明的換行，不然字會在同一行-->
    <!-- <v-card-text style="white-space:pre"> {{ description }}</v-card-text> -->
    <v-card-actions>
      <v-btn color="seventh" prepend-icon="mdi-cart" variant='elevated' @click="addCart" width="100%">加入購物車</v-btn>
    </v-card-actions>
  </v-card>
</template>
<!-- class="text-decoration-none text-ninth font-weight-bold text-h5 " -->
<script setup>
import { useApi } from '@/composables/axios'
// 換掉原本預設的購物車值，原本設定為0
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

// 有哪些接收的資料
const props = defineProps(['_id', 'category', 'description', 'images', 'name', 'price', 'sell'])

const addCart = async () => {
  // 如果使用者沒有登入，就導向登入頁面
  if (!user.isLogin) {
    router.push('/signup')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: 1
    })
    user.cart = data.result
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}
</script>

<style>
</style>
