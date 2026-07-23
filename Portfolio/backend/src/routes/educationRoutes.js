const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAll(Education))
  .post(protect, createOne(Education));

router.route('/:id')
  .get(getOne(Education))
  .put(protect, updateOne(Education))
  .delete(protect, deleteOne(Education));

module.exports = router;
