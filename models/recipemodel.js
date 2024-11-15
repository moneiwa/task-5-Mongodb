const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description required']
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients required']
  },
  instructions: {
    type: String,
    required: [true, 'Instructions required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
