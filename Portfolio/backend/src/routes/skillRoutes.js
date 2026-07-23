const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAll(Skill))
  .post(protect, createOne(Skill));

router.route('/:id')
  .get(getOne(Skill))
  .put(protect, updateOne(Skill))
  .delete(protect, deleteOne(Skill));

module.exports = router;
