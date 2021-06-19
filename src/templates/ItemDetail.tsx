import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { addCart_action, newCart_action, setCart_action, setItems_action, setToppings_action } from '../redux/products/operations'
import { CartItem, InitialState, Item, ItemInfo, Topping } from '../redux/store/initialState'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, Box } from "@material-ui/core";


const itemsSelector = (state: InitialState) => state.products.items
const toppingsSelector = (state: InitialState) => state.products.toppings
const userSelector = (state: InitialState) => state.user
const cartSelector = (state: InitialState) => state.products.cart

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const getItems = useSelector(itemsSelector);
  const getToppings = useSelector(toppingsSelector);
  const getUser = useSelector(userSelector);
  const getCart = useSelector(cartSelector);
  console.log(getCart)
  const {item_id} = useParams<ItemDetailParams>();
  const item_id_num: number = Number(item_id);

  useEffect(() => {
    dispatch(setItems_action());
    dispatch(setToppings_action());
    if(getUser){
      dispatch(setCart_action(getUser))
    }
  }, [])
  
  // // パラメーターに一致した商品を使う
  let item:any = ''
  if(getItems !== undefined){
    getItems.forEach((getItem) => {
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

  // 選択したトッピングの処理
  const [selectToppings, setSelectToppings] = useState<{id: number}[]>([])
  const changeTopping = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      let selectTopping = [...selectToppings, {id: Number(e.target.value)}]
      setSelectToppings(selectTopping)

    } else if (!e.target.checked) {
      let selectTopping = selectToppings.filter(value => value.id !== Number(e.target.value))
      setSelectToppings(selectTopping)
    }
  }

  // サイズの値を取得する処理
  const [size, setSize] = useState<string>('M')
  const changeSize = (e: ChangeEvent<HTMLInputElement>): void => {
    setSize(e.target.value)
  }

  // 「カートに入れる」ボタンの処理
  const addCartBtn = () => {
    const cartItem:CartItem = {
      id: new Date().getTime().toString(),
      status: 0,
      itemInfo:[{
        itemId: item_id_num,
        buyNum: Number(buyNum),
        size: size,
        toppings: selectToppings
      }]
    }
    if(getUser){
      if(!getCart){
        dispatch(newCart_action(cartItem, getUser))
      } else {
        const copyCartItem: CartItem = getCart
        let addItemInfo: ItemInfo[] = [...copyCartItem.itemInfo, cartItem.itemInfo[0]]
        let addCartData: CartItem = {
          id: getCart.id,
          orderId: getCart.orderId,
          status: 0,
          itemInfo: addItemInfo
        }
        dispatch(addCart_action(addCartData, getUser))
      }
    }
  }


  return (
    <React.Fragment>
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
            {getToppings.map((topping) => (
              <label key={topping.id}><input type="checkbox" name="topping" value={topping.id} onChange={(e:ChangeEvent<HTMLInputElement>) => changeTopping(e)}/>{topping.title}</label>
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
            <h2>ご注文金額合計：　円(税込)</h2>
            <Button variant='contained' style={{ color: "#fff", backgroundColor: "#CF000D" }} onClick={addCartBtn}>
            カートに入れる
            </Button>
          </Box>
        </Grid>
      </div>
      }
    </React.Fragment>
  )
}

export default ItemDetail