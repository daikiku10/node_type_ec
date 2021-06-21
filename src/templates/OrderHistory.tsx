import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart_action, resetOrder_action, setItems_action, setToppings_action, cancelOrder_action } from '../redux/products/operations';
import { InitialState, OrderData } from '../redux/store/initialState';
import {makeStyles} from "@material-ui/core/styles";
import { Button, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';


const itemsSelector = (state: InitialState) => state.products.items
const toppingsSelector = (state: InitialState) => state.products.toppings
const ordersSelector = (state: InitialState) => state.products.orders
const userSelector = (state: InitialState) => state.user

const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey["100"],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 768
    }
  },
  list: {
    background: '#fff',
    height: 'auto'
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96
  },
  text: {
    width: '100%'
  },
  title: {
    flexGrow: 1,
  }
}))


const OrderHistory = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const getItems = useSelector(itemsSelector);
  const getToppings = useSelector(toppingsSelector);
  const getOrders = useSelector(ordersSelector);
  const getUser = useSelector(userSelector);

  useEffect(() => {
    dispatch(setItems_action());
    dispatch(setToppings_action());
    return () => {
      dispatch(resetOrder_action())
    }
  }, [])

  useEffect(() => {
    if(getUser){
      dispatch(setCart_action(getUser))
    }
  }, [getUser])

  const changeStatusBtn = (orderData: OrderData) => {
    orderData.status = 9
    if(getUser){
      dispatch(cancelOrder_action(orderData, getUser))
    }
  }

  return (
    <>
      <p>注文履歴</p>
      {getOrders.length > 0 ? (
        <div>
          {getOrders.filter((order) => {
            return order.status === 1
          }).map((orderData, index1) => (
            <List className={classes.orderList} key={index1}>
              <div>注文日時：{orderData.orderDate}</div>
              {orderData.itemInfo.map((data, index) => (
                <List key={index}>
                  {getItems.filter((item) =>{
                    return data.itemId === item.id
                  }).map((itemData) => (
                    <ListItem className={classes.list} key={index}>
                      <ListItemAvatar>
                        <img src={`/${itemData.imgPath}`} width="200" height="200" style={{objectFit: "cover"}}></img>
                      </ListItemAvatar>
                      <div className={classes.text}>
                        <ListItemText primary={itemData.title} />
                        {data.size === "M" ? <ListItemText secondary={"サイズ：M 単価：" + itemData.priceM + "円"}/> : <ListItemText secondary={"サイズ：L 単価：" + itemData.priceL + "円"}/>}
                        <ListItemText secondary={"数量：" + data.buyNum + "杯"} />
                        {data.toppings.map((dataTop, indexTop) => (
                          <React.Fragment key={indexTop}>
                            {getToppings.filter((topping) => {
                              return dataTop.id === topping.id
                            }).map((toppingData) => (
                              <React.Fragment key={indexTop}>
                                <ListItemText secondary={toppingData.title + "単価" + ' ' + "：" + toppingData.price + "円"}></ListItemText>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </ListItem>
                  ))}
                </List>
              ))}
              <Grid container justify="flex-end">
                <Button onClick={() => changeStatusBtn(orderData)}>キャンセル</Button>
              </Grid>
            </List>
          ))}
          {getOrders.filter((order) => {
            return order.status === 2
          }).map((orderData, index1) => (
            <List className={classes.orderList} key={index1}>
              <div>注文日時：{orderData.orderDate}</div>
              {orderData.itemInfo.map((data, index) => (
                <List key={index}>
                  {getItems.filter((item) =>{
                    return data.itemId === item.id
                  }).map((itemData) => (
                    <ListItem className={classes.list} key={index}>
                      <ListItemAvatar>
                        <img src={`/${itemData.imgPath}`} width="200" height="200" style={{objectFit: "cover"}}></img>
                      </ListItemAvatar>
                      <div className={classes.text}>
                        <ListItemText primary={itemData.title} />
                        {data.size === "M" ? <ListItemText secondary={"サイズ：M 単価：" + itemData.priceM + "円"}/> : <ListItemText secondary={"サイズ：L 単価：" + itemData.priceL + "円"}/>}
                        <ListItemText secondary={"数量：" + data.buyNum + "杯"} />
                        {data.toppings.map((dataTop, indexTop) => (
                          <React.Fragment key={indexTop}>
                            {getToppings.filter((topping) => {
                              return dataTop.id === topping.id
                            }).map((toppingData) => (
                              <React.Fragment key={indexTop}>
                                <ListItemText secondary={toppingData.title + "単価" + ' ' + "：" + toppingData.price + "円"}></ListItemText>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </ListItem>
                  ))}
                </List>
              ))}
              <Grid container justify="flex-end">
                <Button onClick={() => changeStatusBtn(orderData)}>キャンセル</Button>
              </Grid>
            </List>
          ))}
          {getOrders.filter((order) => {
            return order.status === 9
          }).map((orderData, index1) => (
            <List className={classes.orderList} key={index1}>
              <div>注文日時：{orderData.orderDate}</div>
              {orderData.itemInfo.map((data, index) => (
                <List key={index}>
                  {getItems.filter((item) =>{
                    return data.itemId === item.id
                  }).map((itemData) => (
                    <ListItem className={classes.list} key={index}>
                      <ListItemAvatar>
                        <img src={`/${itemData.imgPath}`} width="200" height="200" style={{objectFit: "cover"}}></img>
                      </ListItemAvatar>
                      <div className={classes.text}>
                        <ListItemText primary={itemData.title} />
                        {data.size === "M" ? <ListItemText secondary={"サイズ：M 単価：" + itemData.priceM + "円"}/> : <ListItemText secondary={"サイズ：L 単価：" + itemData.priceL + "円"}/>}
                        <ListItemText secondary={"数量：" + data.buyNum + "杯"} />
                        {data.toppings.map((dataTop, indexTop) => (
                          <React.Fragment key={indexTop}>
                            {getToppings.filter((topping) => {
                              return dataTop.id === topping.id
                            }).map((toppingData) => (
                              <React.Fragment key={indexTop}>
                                <ListItemText secondary={toppingData.title + "単価" + ' ' + "：" + toppingData.price + "円"}></ListItemText>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </ListItem>
                  ))}
                </List>
              ))}
              <Grid container justify="flex-end">
                <span>キャンセル済み</span>
              </Grid>
            </List>
          ))}
        </div>
      ):(<>注文履歴がありません</>)}
    </>
  )
}

export default OrderHistory