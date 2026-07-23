const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAll(Project))
  .post(protect, createOne(Project));

router.route('/:id')
  .get(getOne(Project))
  .put(protect, updateOne(Project))
  .delete(protect, deleteOne(Project));

module.exports = router;
