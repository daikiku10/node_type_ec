import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { addCart_action, newCart_action, setCart_action, setItems_action, setToppings_action } from '../redux/products/operations'
import { CartItem, InitialState, Item, ItemInfo, Topping } from '../redux/store/initialState'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, Box } from "@material-ui/core";
import Inner from '../components/inner/Inner';
import { ColorButton } from '../components/atoms';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectItems } from '../features/item/itemsSlice';
import { selectToppings } from '../features/topping/toppingsSlice';
import { selectUser } from '../features/user/userSlice';
import { CartState, newAddCartAsync } from '../features/cart/cartSlice';


// const cartSelector = (state: InitialState) => state.products.cart

type ItemDetailParams = {
  item_id: string
}

const useStyles = makeStyles({
  grid: {
    margin: "50px 50px 100px 50px",
    width: "200"
  },
  form: {
    margin: "20px 0 0 0",
    width: "60%"
  }
});


const ItemDetail = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleLink = (path: any) => history.push(path)
  const classes = useStyles();
  // const getCart = useSelector(cartSelector);
  const getItemsData = useAppSelector(selectItems);
  const getToppingsData = useAppSelector(selectToppings);
  const getUserData = useAppSelector(selectUser);
  const {item_id} = useParams<ItemDetailParams>();
  const item_id_num: number = Number(item_id);
  
  // パラメーターに一致した商品を使う
  let item:any = ''
  if(getItemsData.length > 0 ){
    getItemsData[0].items.forEach((getItem) => {
      if (getItem.id === item_id_num) {
        return item = getItem
      }
    })
  }

  // 個数の値を取得する処理
  const [buyNum, setBuyNum] = useState<string>("1")
  const changeBuyNum = (e: ChangeEvent<HTMLInputElement>): void => {
    setBuyNum(e.target.value)
  }

  // // 選択したトッピングの処理
  const [choiceToppings, setChoiceToppings] = useState<{id: number}[]>([])
  const changeTopping = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      let choiceTopping = [...choiceToppings, {id: Number(e.target.value)}]
      setChoiceToppings(choiceTopping)
    } else if (!e.target.checked) {
      let choiceTopping = choiceToppings.filter(value => value.id !== Number(e.target.value))
      setChoiceToppings(choiceTopping)
    }
  }

  // サイズの値を取得する処理
  const [size, setSize] = useState<string>('M')
  const changeSize = (e: ChangeEvent<HTMLInputElement>): void => {
    setSize(e.target.value)
  }

  // 「カートに入れる」ボタンの処理
  const addCartBtn = () => {
    console.log('カート追加！')
    if (getUserData) {
      const cartItem: CartState = {
        uid: getUserData.uid,
        status: 0,
        itemInfo:[{
          itemId: item_id_num,
          buyNum: Number(buyNum),
          size: size,
          toppings: choiceToppings
        }]
      }
      console.log(cartItem)
      dispatch(newAddCartAsync(cartItem))
    }
    // if(getUserData){
    //   if(!getCart){
    //     dispatch(newCart_action(cartItem, getUser))
    //     handleLink('/cart-item-list')
    //   } else {
    //     const copyCartItem: CartItem = getCart
    //     let addItemInfo: ItemInfo[] = [...copyCartItem.itemInfo, cartItem.itemInfo[0]]
    //     let addCartData: CartItem = {
    //       id: getCart.id,
    //       orderId: getCart.orderId,
    //       status: 0,
    //       itemInfo: addItemInfo
    //     }
    //     dispatch(addCart_action(addCartData, getUser))
    //     handleLink('/cart-item-list')
    //   }
    // }else {
    //   if(!getCart){
    //     dispatch(newCart_action(cartItem, getUser))
    //     handleLink('/cart-item-list')
    //   } else {
    //     const copyCartItem: CartItem = getCart
    //     let addItemInfo: ItemInfo[] = [...copyCartItem.itemInfo, cartItem.itemInfo[0]]
    //     let addCartData: CartItem = {
    //       id: getCart.id,
    //       orderId: getCart.orderId,
    //       status: 0,
    //       itemInfo: addItemInfo
    //     }  
    //     dispatch(addCart_action(addCartData, getUser))
    //     handleLink('/cart-item-list')
    //   }
    // }
  }

  // 選んだトッピング（奇数）
  let toppingNum_ki: number = 0
  let choiceToppingArray1: {id: number}[] = choiceToppings.filter(topping => topping.id % 2 !== 0)
  toppingNum_ki = choiceToppingArray1.length;
  // // 選んだトッピング（偶数）
  let toppingNum_guu: number = 0
  let choiceToppingArray2: {id: number}[] = choiceToppings.filter(topping => topping.id % 2 === 0)
  toppingNum_guu = choiceToppingArray2.length;
  // // 合計金額
  let addPrice = item.priceM
  if (size === 'M') {
      addPrice = item.priceM * Number(buyNum) + ((200 * (toppingNum_ki * Number(buyNum))) + ((300 * toppingNum_guu * Number(buyNum))))
    } else if (size === 'L') {
      addPrice = item.priceL * Number(buyNum) + ((200 * (toppingNum_ki * Number(buyNum))) + ((300 * toppingNum_guu * Number(buyNum))))
    }




  return (
    <Inner>
      {item === '' ? <></>:
      <div className={classes.grid}>
        <Grid container justify='center'>
          <Box>
            <img src={`/${item.imgPath}`} alt='画像'  style={{ width: 400, height: 300 }} ></img>
          </Box>
          <Grid item xs={4} sm={5}>
            <span style={{ fontSize:'20px' }}>商品詳細</span>
              <h3>{item.title}</h3> <br />
              <p>{item.detail}</p>
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <div className={classes.form}>
            <p style={{ fontWeight:'bold' }}>サイズ </p>
            <label>
              <input type='radio' value='M' onChange={(e:ChangeEvent<HTMLInputElement>) => changeSize(e)} checked={size === 'M'}/>
              <span className='price'> Ｍ </span>{Number(item.priceM).toLocaleString()}円(税込)　　
            </label>
            <label>
              <input type='radio' value='L' onChange={(e:ChangeEvent<HTMLInputElement>) => changeSize(e)} checked={size === 'L'}/>
              <span className='price'>  Ｌ </span>{Number(item.priceL).toLocaleString()}円(税込)
            </label>
          </div>
          <div className={classes.form}>
            <label htmlFor='topping'>
              <p>
                <span style={{ fontWeight: 'bold' }}>トッピング：</span>
                <span style={{ color: 'red', fontWeight: 'bold' }}> ※1ヶにつき200円、多めは300円（税込）</span>
              </p>
            </label>
            {getToppingsData[0].toppings.map((topping) => (
              <label key={topping.id}><input type="checkbox" name="topping" value={topping.id} onChange={(e:ChangeEvent<HTMLInputElement>) => changeTopping(e)} />{topping.title}</label>
            ))}
          </div>
          <div className={classes.form}>
            <span style={{ fontWeight: 'bold' }}>数量：</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>数量を選択してください</span><br/>
            <TextField
              id='outlined-number'
              type='number'
              value={buyNum}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              onChange={(e:ChangeEvent<HTMLInputElement>) => changeBuyNum(e)}
            />
          </div>
          <Box textAlign="center" className={classes.form}>
            <h2>ご注文金額合計： {addPrice.toLocaleString()}円(税込)</h2>
            <Button variant='contained' style={{ color: "#fff", backgroundColor: "#CF000D" }} onClick={addCartBtn}>
            カートに入れる
            </Button>
          </Box>
        </Grid>
      </div>
      }
    </Inner>
  )
}

export default ItemDetail