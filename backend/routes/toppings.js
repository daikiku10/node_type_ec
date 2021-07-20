const router = require('express').Router();
let Toppings = require('../models/toppings.model');

// トッピングを追加時に作成したコード
router.post('/add', (req, res) => {
  const toppings = req.body;
  const newToppings = new Toppings ({
    toppings,
  })

  newToppings.save()
    .then(() => res.json('toppings added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

// DBのトッピングデータ取得
router.get('/fetch-all-toppings', (req, res) => {
  Toppings.find({}).then((toppings) => {
    res.send(toppings)
  })
})

module.exports = router;