// 身分驗證策略
import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
// 加密
import bcrypt from 'bcrypt'
import users from '../models/users'


// 允許使用者用過期的jwt來請求
// passport.use(驗證方式, 驗證策略)
passport.use('login', new passportLocal.Strategy({
  // 設定傳進來的資料欄位
  usernameField: 'account',
  passwordField: 'password',
}, async (account, password, done) => {
  try {
    // 尋找傳入的帳號
    const user = await users.findOne({ account })
    // 如果沒有找到，拋出錯誤
    if(!user) throw new Error('ACCOUNT')
    // 比較明文密碼跟加密密碼，不一樣時拋出錯誤
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('PASSWORD')
    }
    // 身分驗證完成
    return done(null,user,null)

  } catch (error) {
    if (error.message === 'ACCOUNT') {
      return done(null,null,{message:'帳號不存在'})

    } else if (error.message === 'PASSWORD') {
      return done(null,null,{message:'密碼錯誤'})

    } else {
      return done(null,null,{message:'未知錯誤'})
    }
  }
}
))
