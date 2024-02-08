import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少商品名稱']
  },
  price: {
    type: Number,
    required: [true, '缺少商品價格']
  },
  image: {
    type: String,
    required: [true, '缺少商品圖片']
  },
  description: {
    type: String,
    required: [true, '缺少商品描述']
  },
  category: {
    type: String,
    required: [true, '缺少商品分類'],
    // 值必須是以下其中一個
    enum: {
      values: ['期間限定', '熱門商品', '新品上市', '經典口味'],
      message: '商品分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    default: [true, '缺少商品上下架狀態']
  }
}, {
  // 產生時間戳記=>商品的建立日期
  timestamps: true,
  // 不要顯示版本號=>__v
  versionKey: false
})

export default model('products', schema)
