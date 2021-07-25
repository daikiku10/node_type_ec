const mongoose = require('mongoose');
const router = require('express').Router();
const Cart = require('../models/cart.module');

// カート情報の取得
router.post('/fetch-cart', (req, res) => {
  const uid = req.body.uid
  Cart.findOne({ uid: uid, status: 0}).then((cart) => {
    res.send(cart);
  })
})

// カートの新規作成
router.post('/new-add', (req, res) => {
  const new_cart = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  }
  const newCart = new Cart(new_cart)
  newCart.save().then((cart) => {
    res.send(cart)
  })
})

// カートの追加処理（データ更新）
router.post('/update-cart', (req, res) => {
  const new_itemInfo = req.body.itemInfo;
  const uid = req.body.uid;
  Cart.findOneAndUpdate(
    { uid: uid, status: 0},
    { itemInfo: new_itemInfo },
    { new: true}
  ).then((cart) => {
    res.send(cart)
  })
})

// ------------------------------------------
// ここからは注文時処理

// 注文情報の取得
router.post('/fetch-order', (req, res) => {
  const uid = req.body.uid;
  //「$ne」は指定の値に一致しないもの
  Cart.find({ uid: uid, status: { $ne: 0 }}).then((orders) => {
    console.log(orders)
    res.send(orders)
  })
})

// カート商品を購入する処理
router.post('/add-order', (req, res) => {
  const orderInfo = req.body;
  const uid = orderInfo.uid;
  Cart.findOneAndUpdate(
    { uid: uid, status: 0},
    { $set: { 
      status: req.body.status,
      name: req.body.name,
      email: req.body.email,
      zipcode: req.body.zipcode,
      address: req.body.address,
      tel: req.body.tel,
      orderDateTime: req.body.orderDateTime,
      destinationTime: req.body.destinationTime,
      payType: req.body.payType,
      cardNo: req.body.cardNo
    }},
    { new: true }
  ).then((order) => {
    res.send(order)
  })
})

// 注文をキャンセルする（ステータス変更）
router.post('/change-order-status', (req, res) => {
  const _id = req.body._id;
  const status = req.body.status;
  Cart.findOneAndUpdate(
    { _id: _id},
    { status: status},
    { new: true }
  ).then(() => {
    Cart.find({}
    ).then((orders) => {
      res.send(orders)
    })
  })
})

module.exports = router;