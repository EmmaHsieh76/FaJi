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
<v-dialog v-model="dialog" persistent width="500px">
  <v-form :disabled="isSubmitting" @submit.prevent="submit">
    <v-card>
    <v-card-title> {{ dialogId === ''? '新增商品' : '編輯商品'}}</v-card-title>
    <v-card-text>
      <v-text-field
      label="名稱"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      ></v-text-field>
      <v-text-field
      label="價格"
      type="number" min="0"
      v-model="price.value.value"
      :error-messages="price.errorMessage.value"
      ></v-text-field>
      <v-select
      label="分類"
      :items="categories"
      v-model="category.value.value"
      :error-messages="category.errorMessage.value"
      ></v-select>
      <v-checkbox
      label="上架"
      v-model="sell.value.value"
      :error-messages="sell.errorMessage.value"
      ></v-checkbox>
      <v-textarea
      label="說明"
      v-model="description.value.value"
      :error-messages="description.errorMessage.value"
      ></v-textarea>
      <VueFileAgent
      v-model="fileRecords"
      v-model:rawModelValue="rawFileRecords"
      accept="image/png, image/jpeg, image/jpg"
      deletable
      :error-text="{type:'檔案格式不支援',size:'檔案超過 1MB 限制'}"
      help-text="點擊檔案或拖曳檔案至此"
      :max-files="1"
      max-size="1MB"
      ref="fileAgent"
      ></VueFileAgent>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" variant="tonal" :disabled="isSubmitting" @click="closeDialog">取消</v-btn>
      <v-btn color="blue-darken-4" variant="tonal" type="submit" :loading="isSubmitting">送出</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</v-dialog>

</template>

<script setup>
import { ref } from 'vue'
// 驗證套件
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)

// 表單對話框開啟的狀態
const dialog = ref(false)
// 表單對話框正在編輯的商品 id ，空字串為新增商品
const dialogId = ref('')

// 開啟編輯對話框
const openDialog = () => {
  dialogId.value = ''
  dialog.value = true
}

// 關閉對話框
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

// 分類
const categories = ['人氣商品', '期間限定', '經典口味', '新品上市']

// 表單驗證
const schema = yup.object({
  name: yup
    .string()
    .required('缺少商品名稱'),
  price: yup
    .number()
    .typeError('商品價格必須是數字')
    .required('缺少商品價格')
    .min(0, '價格不可小於 0'),
  description: yup
    .string()
    .required('缺少商品說明'),
  category: yup
    .string()
    .required('缺少商品分類')
    .test('isCategory', '商品分類錯誤', value => categories.includes(value)),
  sell: yup.boolean()
})
// handleSubmit => 處理表單送出時的事件
// isSubmitting => 判斷是否送出表單，如果表單正在送出中，則把表單停用
// resetForm => 對話框關閉後會重置表單，每次開始對話框都是一個新的表單
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false
  }
})
// 設定表單欄位
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value.length === 0 || fileRecords.value[0].error) return
  try {
    // 建立 formData 物件
    // 使用 fd.append(欄位,值) 將資料放進去
    const fd = new FormData()

    for (const key in values) {
      fd.append(key, values[key])
    }
    fd.append('image', fileRecords.value[0].file)
    await apiAuth.post('/products', fd)

    createSnackbar({
      text: '新增成功',
      // 不要出現關閉的按鈕
      showCloseButton: false,
      // snackbarProps => vuetify的snackbar樣式
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
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
})
</script>
