import axios from 'axios'
import { useUserStore } from '@/store/user'

// 原本的寫法，會重複寫baseURL(http://localhost:4000)
// axios.get('http://localhost:4000/users/register')
// axios.get('http://localhost:4000/users/login')

// 不用重複寫baseURL的寫法
// 測試是在localhost 但正式會上雲端ramdom，所以要寫成.env比較方便
// export const api = axios.create({
//   baseURL: 'http://localhost:4000'
// })
// import.meta.env.VITE_API 等於 .env.development裡面的VITE_API=http://localhost:4000

const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})
// 執行順序
// 1.呼叫 axios.get / axios.post
// 2.iterceptors.request 請求攔截器
// 3.送出請求
// 4.iterceptors.response 回應攔截器
// 5.回傳到呼叫的地方 .then() .catch()
// 送出請求前(apiAuth.interceptors)，都會先執行這個函式
// config => 這次請求的設定
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  // 每一次送請求前headers的驗證 加上 jwt的token
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})
// 執行順序
// 1. apiAuth.get('/users/me')
// 2-1. 如果不是 JWT 過期錯誤，將 apiAuth.get('/users/me') 的錯誤回傳
// 2-2. 如果發生 JWT 過期錯誤，進到 3
// 3. 傳送舊換新請求
// 3-1. 如果舊換新成功，修改 apiAuth.get('/users/me') 的 jwt 為新的後送出
// 3-2. 如果舊換新失敗，將 apiAuth.get('/users/me') 的錯誤回傳

// apiAuth.interceptors.response(成功時執行,失敗時執行)
apiAuth.interceptors.response.use((res) => {
  // 成功時執行原本資料
  return res
}, (error) => {
  // 如果失敗有收到回應
  if (error.response) {
    // 如果錯誤訊息是jwt 過期，且不是舊換新請求
    if (error.response.data.message === 'JWT 過期' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      // 傳送舊換新請求
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          // 更新 pinia 保存的 token
          user.token = data.result
          // 修改發生錯誤的原請求設定的 jwt
          error.config.headers.Authorization = 'Bearer ' + user.token
          // 重新傳送原請求
          return axios(error.config)
        })
        .catch(() => {
          // 如果舊換新失敗，登出
          user.logout()
          // 回傳原錯誤到呼叫的地方
          return Promise.reject(error)
        })
    }
  }
  // 如果請求沒回應，或不是過期的錯誤，就回傳原錯誤到呼叫的地方
  return Promise.reject(error)
})

export const useApi = () => {
  return { api, apiAuth }
}
