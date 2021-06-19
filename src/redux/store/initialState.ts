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

    // 注文商品
    orders: {
      orderId?: string
      id: string
      status: number
      itemInfo: ItemInfo[]
      destinationName: string
      destinationEmail: string
      destinationZipcode: string
      destinationAddress: string
      tel: string
      destinationTime: string
      orderDate: string
      paymentMethod: string
      creditCardNo?: string
    }[]
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

export type OrderData = {
  orderId: string
  id: string
  status: number
  itemInfo: ItemInfo[]
  destinationName: string
  destinationEmail: string
  destinationZipcode: string
  destinationAddress: string
  tel: string
  destinationTime: string
  orderDate: string
  paymentMethod: string
  creditCardNo: string
}

const initialState = {
  products: {
    items: [],
    toppings: [],
    cart: '',
    orders: []
  },
  user: null,
}

export default initialState