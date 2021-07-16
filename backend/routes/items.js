const router = require('express').Router();
let Items = require('../models/items.model');


router.post('/add', (req, res) => {
  const items = req.body;
  const newItems = new Items ({
    items,
  })

  newItems.save()
    .then(() => res.json('items added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;