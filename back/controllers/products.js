import products from '../models/products.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    req.body.image = req.file.path
    const result = await products.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    // 驗證錯誤
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      // ?
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        // BAD_REQUEST => 400
        success: false,
        message
      })
      //  MongoDB 伺服器出現錯誤或資料重複
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        // INTERNAL_SERVER_ERROR => 500
        success: false,
        message: '未知錯誤'
      })
    }
  }
}
