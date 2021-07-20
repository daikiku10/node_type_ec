const router = require('express').Router();
let Items = require('../models/items.model');

// 商品を追加時に作成したコード
router.post('/add', (req, res) => {
  const items = req.body;
  const newItems = new Items ({
    items,
  })

  newItems.save()
    .then(() => res.json('items added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/fetch-all-items', (req, res) => {
  Items.find({}).then((items) => {
    res.send(items);
  })
})

module.exports = router;