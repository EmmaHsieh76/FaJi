import axios from 'axios'

// 原本的寫法，會重複寫baseURL(http://localhost:4000)
// axios.get('http://localhost:4000/users/register')
// axios.get('http://localhost:4000/users/login')

// 不用重複寫baseURL的寫法
// 測試是在localhost 但正式會上雲端ramdom，所以要寫成.env比較方便
// export const api = axios.create({
//   baseURL: 'http://localhost:4000'
// })
// import.meta.env.VITE_API 等於 .env.development裡面的VITE_API=http://localhost:4000
export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})
