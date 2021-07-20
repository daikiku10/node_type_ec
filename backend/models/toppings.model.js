const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingsSchema = new Schema({
  toppings:[
    {
      _id: {type: String, required: true},
      id: { type: Number, required: true},
      title: { type: String, required: true},
      price: { type: Number, required: true },
    }
  ]
});

const Toppings = mongoose.model('Toppings', toppingsSchema);

module.exports = Toppings;