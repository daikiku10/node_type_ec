const router = require('express').Router();
let Toppings = require('../models/toppings.model');

router.post('/add', (req, res) => {
  const toppings = req.body;
  const newToppings = new Toppings ({
    toppings,
  })

  newToppings.save()
    .then(() => res.json('toppings added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;