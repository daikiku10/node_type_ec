const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  items:[
    {
      id: {type: Number, required: true},
      title: { type: String, required: true},
      detail: { type: String, required: true},
      priceM: { type: Number, required: true },
      priceL: { type: Number, required: true},
      imgPath: { type: String, required: true},
    }
  ]
});

const Items = mongoose.model('Items', itemsSchema);

module.exports = Items;