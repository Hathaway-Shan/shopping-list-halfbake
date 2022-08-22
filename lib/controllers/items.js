const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

const router = Router();

module.exports = router
  .post('/', authenticate, async (req, res, next) => {
    try {
      req.body.user_id = req.user.id;
      const data = await Item.insert(req.body);

      res.json(data);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const response = await Item.getAll(req.user.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const response = await Item.updateById(req.params.id, req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

// TO DO - implement items CRUD
