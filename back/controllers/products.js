import products from '../models/products.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'

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

// 查所有商品
export const getAll = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = parseInt(req.query.sortOrder) || -1
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 20
    const page = parseInt(req.query.page) || 1
    const regex = new RegExp(req.query.search || '', 'i')

    // itemsPerPage =10 如果一頁10筆資料
    // page= 1 地一頁
    // skip = 0 跳過0筆資料
    // limit = 10  取10筆資料

    // page = 2
    // skip = 10 = (2-1)*10 跳過10筆資料

    // page = 3
    // skip = 10 = (3-1)*10 跳過20筆資料

    // .skip((page - 1) * itemsPerPage) 跳過多少筆資料

    const data = await products
      .find({
        $or: [
        // 名字或說明要符合正則表達式
          { name: regex },
          { description: regex }
        ]
      })
      .sort({ [sortBy]: sortOrder })
      // 如果一頁10筆資料，第一頁要跳過0筆資料，第二頁要跳過10筆資料
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)

    // estimatedDocumentCount() 計算總資料數
    const total = await products.estimatedDocumentCount()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: {
        data,
        total
      }
    })
  } catch (error) {

  }
}

// 只取有上架的所有商品
export const get = async (req, res) => {
}

// 取單個商品
export const getId = async (req, res) => {
  try {
    // 判斷網址的參數id是否格式正確
    if (!validator.isMongoId(req.params.id)) throw new Error('ID格式錯誤')

    // 網址格式正確
    const result = await products.findById(req.params.id)

    // 如果找不到
    if (!result) throw new Error('找不到商品')

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    if (error.name === 'CastError' || error.message === 'ID格式錯誤') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'ID格式錯誤'
      })
    } else if (error.message === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無商品'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}
