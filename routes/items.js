const express = require('express');
const router = express.Router();
const Item = require('../models/item');

 /**
    * @swagger
    * /items:
    *   get:
    *     summary: Retrieve a list of items
    *     responses:
    *       200:
    *         description: A list of items
    *   post:
    *       summary: Add a new item
    *       responses:
    *         201:
    *           description: The newly added item's data
    *   patch:
    *       summary: Update an existing item
    *       responses:
    *         200:
    *           description: The updated item's data
    *   delete:
    *       summary: Delete a item
    *       responses:
    *         200:
    *           description: A confirmation message with the deleted item's id
    */


// Create a new item
router.post('/addItem', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get('/getItems', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an item
router.patch('/updateItem/:itemId', async (req, res) => {
  try {
    const item = await Item.findOne({"itemId": req.params.itemId});
    const updatedItem = await Item.findByIdAndUpdate(item._id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/deleteItem/:itemId', async (req, res) => {
  try {
    const item = await Item.findOne({"itemId": req.params.itemId});

    await Item.findByIdAndDelete(item._id);

    res.json({ message: 'Item deleted with id: ' + req.params.itemId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;