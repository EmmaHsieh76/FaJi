import { Router } from 'express'
import { create, login } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'

const router = Router()
router.post('/', create)
// 登入要先經過auth.login，再經過login
router.post('/login', auth.login, login)

export default router
