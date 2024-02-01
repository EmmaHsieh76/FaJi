// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserRole } from '@/enums/UserRole'

export const useUserStore = defineStore('user', () => {
  // 使用者要保存的資料
  const token = ref('')
  const account = ref('')
  const cart = ref(0)
  const name = ref('')
  const phone = ref('')
  const blacklist = ref(false)
  const blacklistReason = ref('')
  const role = ref(UserRole.USER)
  return {
    token,
    account,
    cart,
    name,
    phone,
    blacklist,
    blacklistReason,
    role
  }
})
