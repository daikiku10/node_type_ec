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
    console.log(cart)
    res.send(cart)
  })
})

module.exports = router;