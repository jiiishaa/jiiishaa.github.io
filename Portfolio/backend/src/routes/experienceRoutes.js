const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAll(Experience))
  .post(protect, createOne(Experience));

router.route('/:id')
  .get(getOne(Experience))
  .put(protect, updateOne(Experience))
  .delete(protect, deleteOne(Experience));

module.exports = router;
