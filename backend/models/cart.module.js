const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  _id: String,
  uid: String,
  status: Number,
  itemInfo: Array,
  name: String,
  email: String,
  zipcode: String,
  address: String,
  tel: String,
  orderDateTime: String,
  destinationTime: String,
  payType: String,
  cardNo: String,
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;