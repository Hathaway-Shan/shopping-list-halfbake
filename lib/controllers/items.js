const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

const router = Router();

module.exports = router.post('/', authenticate, async (req, res, next) => {
  try {
    req.body.user_id = req.user.id;
    const data = await Item.insert(req.body);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

// TO DO - implement items CRUD
