import firebase from 'firebase'

export type InitialState = {
  products: {
    // ラーメン商品
    items:{
      id: number
      title: string
      detail: string
      priceM: number
      priceL: number
      imgPath: string
    }[]
  
    // トッピング商品
    toppings:{
      id: number
      title: string
      price: number
    }[]

    // カート商品
    cart:{
      orderId?: string
      id: string
      status: number
      itemInfo: ItemInfo[]
    }
  }

  // ユーザー関係
  user: firebase.User | null
}

export type Products = InitialState['products']
export type ItemsList = Products['items']
export type Item = {
  id: number
  title: string
  detail: string
  priceM: number
  priceL: number
  imgPath: string
}
export type ToppingsList = Products['toppings']
export type Topping = {
  id: number
  title: string
  price: number
}

export type CartItem = {
  orderId?: string
  id: string
  status: number
  itemInfo: ItemInfo[]
}
export type ItemInfo = {
  itemId: number
  buyNum: number
  size: string
  toppings:{
    id: number
  }[]
}

const initialState = {
  products: {
    items: [],
    toppings: [],
    cart: ''
  },
  user: null,
}

export default initialState