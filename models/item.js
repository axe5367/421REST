const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: { type: String, required: true},
  name: { type: String, required: true },
  description: { type: String }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;