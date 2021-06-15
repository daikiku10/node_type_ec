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

const initialState = {
  products: {
    items: [],
    toppings: [],
  },
  user: null,
}

export default initialState