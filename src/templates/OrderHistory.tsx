import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {makeStyles} from "@material-ui/core/styles";
import { Button, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Inner from '../components/inner/Inner';
import { changeOrderStatusAsync, fetchOrderAsync, OrderType, selectOrder } from '../features/order/orderSlice';
import { selectUser } from '../features/user/userSlice';
import { selectItems } from '../features/item/itemsSlice';
import { selectToppings } from '../features/topping/toppingsSlice';



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
  const dispatch = useAppDispatch();
  const getUser = useAppSelector(selectUser);
  const getItems = useAppSelector(selectItems);
  const getToppings = useAppSelector(selectToppings);
  const getOrders = useAppSelector(selectOrder);
  console.log(getOrders)

  useEffect(() => {
    if(getUser){
      dispatch(fetchOrderAsync(getUser));
    }
  }, [getUser])

  const changeStatusBtn = (orderData: OrderType) => {
    const copyOrderData = JSON.parse(JSON.stringify(orderData))
    copyOrderData.status = 9
     dispatch(changeOrderStatusAsync(copyOrderData))
  }

  return (
    <Inner>
      <p>注文履歴</p>
      {getOrders.length > 0 ? (
        <div>
          {getOrders.filter((order) => {
            return order.status === 1
          }).map((orderData, index1) => (
            <List className={classes.orderList} key={index1}>
              <div>注文日時：{orderData.destinationTime}</div>
              {orderData.itemInfo.map((data, index) => (
                <List key={index}>
                  {getItems[0].items.filter((item) =>{
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
                            {getToppings[0].toppings.filter((topping) => {
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
              <div>注文日時：{orderData.destinationTime}</div>
              {orderData.itemInfo.map((data, index) => (
                <List key={index}>
                  {getItems[0].items.filter((item) =>{
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
                            {getToppings[0].toppings.filter((topping) => {
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
              <div>注文日時：{orderData.destinationTime}</div>
              {orderData.itemInfo.map((data, index) => (
                <List key={index}>
                  {getItems[0].items.filter((item) =>{
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
                            {getToppings[0].toppings.filter((topping) => {
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
    </Inner>
  )
}

export default OrderHistory