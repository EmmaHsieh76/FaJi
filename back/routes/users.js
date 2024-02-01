import { Router } from 'express'
import { create, login, logout, extend, getProfile } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'

const router = Router()
router.post('/', create)
// 登入要先經過auth.login，再經過login
router.post('/login', auth.login, login)
// 登出要先經過auth.jwt，再經過logout
router.delete('/logout', auth.jwt, logout)
// 舊換新token (petch()用於更新資料)
router.patch('/extend', auth.jwt, extend)
// 取得使用者資料
router.get('/me', auth.jwt, getProfile)

export default router
