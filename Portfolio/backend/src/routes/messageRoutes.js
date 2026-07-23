const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudController');
const { protect } = require('../middlewares/authMiddleware');

// Anyone can create a message (contact form)
router.post('/', createOne(Message));

// Only admin can view and delete messages
router.get('/', protect, getAll(Message));
router.get('/:id', protect, getOne(Message));
router.put('/:id', protect, updateOne(Message)); // e.g., mark as read
router.delete('/:id', protect, deleteOne(Message));

module.exports = router;
