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

module.exports = router;