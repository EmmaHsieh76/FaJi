<template>
  <VContainer>
    <VRow>
      <VCol col="12">
        <VForm :disabled="isSubmitting" @submit.prevent="submit">
          <VTextField
          label="身分證字號" type="text" class="mb-3"
          placeholder="A123456789"
          v-model="national_id.value.value"
          :error-messages="national_id.errorMessage.value"
          ></VTextField>
          <VTextField
            label="電子信箱" type="email" class="mb-3"
            placeholder="taipeivet@gmail.com"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value">
          </VTextField>
          <VTextField
            label="手機號碼" type="tel" class="mb-3"
            placeholder="0912345678"
            v-model="phone.value.value"
            :error-messages="phone.errorMessage.value">
          </VTextField>
          <VTextField
            label="密碼" type="password" class="mb-3"
            hint="密碼長度：6 ~ 20 之間"
            minlength="6" maxlength="20" counter
            v-model="password.value.value"
            :error-messages="password.errorMessage.value">
          </VTextField>
          <VTextField
            label="確認密碼" type="password" class="mb-3"
            hint="請再輸入一次密碼"
            minlength="6" maxlength="20" counter
            v-model="passwordConfirm.value.value"
            :error-messages="passwordConfirm.errorMessage.value">
          </VTextField>
          <VBtn type="submit" color="teal" block>註冊</VBtn>
        </VForm>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
// 雖然 vee-validate 也可以驗證email
// 但是後端是用 validator 驗證
// 如果用不同驗證會出現前端通過，後端沒過的情況
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios' // 不用打副檔名

const { api } = useApi()
const createSnackbar = useSnackbar()

// 定義註冊表單格式
const schema = yup.object({
  email: yup
    .string()
    .required('信箱為必填欄位')
    .test('isEmail', '信箱格式錯誤', (value) => { return validator.isEmail(value) }),
  phone: yup
    .string()
    .required('手機號碼為必填欄位')
    .test('isPhone', '手機號碼格式錯誤', (value) => { return validator.isMobilePhone(value, 'zh-TW') }),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(6, '密碼長度過短')
    .max(20, '密碼長度過長')
})

// 先 useForm，再 useField
// isSubmitting 正在提交時
const { handleSubmit, isSubmitting } = useForm({
  // 跟上面的 schema 綁定
  validationSchema: schema
})
// useField('') 內容要與 schema 名稱相符
const email = useField('email')
const phone = useField('phone')
const password = useField('password')
const emit = defineEmits([''])

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/users', {
      email: values.email,
      phone: values.phone,
      password: values.password
    })
    emit('submitForm')
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
  } catch (error) {
    console.log(error)
    // ?. => 如果是 undefined 可以繼續往下讀取
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'error',
        location: 'bottom'
      }
    })
  }
})
</script>
