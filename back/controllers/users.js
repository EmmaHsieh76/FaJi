import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
// `jsonwebtoken` 是一個用於創建和驗證 JSON Web Tokens 的 Node.js 套件。JSON Web Tokens 是一種用於安全傳輸資訊的方式，常用於身份驗證和資訊交換。
// 登入要嵌一組token， jsonwebtoken=>來自passport-jwt
import jwt from 'jsonwebtoken'

// 建立使用者
export const create = async (req, res) => {
  try {
    // 不用特別告訴前端建立的資訊，只要告訴前端建立成功就好
    await users.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
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
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        // HTTP 狀態碼 409（CONFLICT）和訊息「帳號已註冊」。
        success: false,
        message: '帳號已註冊'
      })
      // 其他錯誤
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        // INTERNAL_SERVER_ERROR => 500
        success: false,
        message: '未知錯誤'
      })
    }
  }
}

// 登入
export const login = async (req, res) => {
  try {
    // jwt的token => jwt.sign(要保存的id,密鑰,過期)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // 把上面token，放入使用者的token裡面
    req.user.tokens.push(token)
    // 並保存
    await req.user.save()
    // 前端需要的全部資料回傳給前端
    // 前端登入需要的使用者資料全部回回去
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        role: req.user.role,
        // 購物車存商品id和數量，只回傳商品數量加總
        // reduce(()=>{},0) => 0是初始值，total是總數，current是目前的值，會跑迴圈把購物車內的數量加總
        cart: req.user.cart.reduce((total, current) => {
          return total + current.quantity
        }, 0)
      }
    })
  } catch (error) {
    // INTERNAL_SERVER_ERROR => http狀態碼500
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
