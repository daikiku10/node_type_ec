const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  _id: {type: String, required: true},
  uid: String,
  status: Number,
  itemInfo: Array
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;