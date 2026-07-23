// Factory functions for CRUD operations

const getAll = (Model) => async (req, res) => {
  try {
    const docs = await Model.find({}).sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (doc) {
      res.json(doc);
    } else {
      res.status(404);
      throw new Error('Document not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (doc) {
      res.json(doc);
    } else {
      res.status(404);
      throw new Error('Document not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (doc) {
      res.json({ message: 'Document removed' });
    } else {
      res.status(404);
      throw new Error('Document not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
