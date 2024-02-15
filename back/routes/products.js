import { Router } from 'express'
import * as auth from '../middlewares/auth.js'
import { create, getAll } from '../controllers/products.js'
import upload from '../middlewares/upload.js'
import admin from '../middlewares/admin.js'

const router = Router()
// 驗證有無登入，判斷是不是管理員，是的話再處理上傳檔案，再建立資料庫
router.post('/', auth.jwt, admin, upload, create)
router.get('/all', auth.jwt, admin, getAll)

export default router
