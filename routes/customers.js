const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

 /**
    * @swagger
    * /customers:
    *   get:
    *     summary: Retrieve a list of customers
    *     responses:
    *       200:
    *         description: A list of customers
    *   post:
    *       summary: Add a new customer
    *       responses:
    *         201:
    *           description: The newly added customer's data
    *   patch:
    *       summary: Update an existing customer
    *       responses:
    *         200:
    *           description: The updated customer's data
    *   delete:
    *       summary: Delete a customer
    *       responses:
    *         200:
    *           description: A confirmation message with the deleted customer's id
    */


// Create a new customer
router.post('/addCustomer', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all customers
router.get('/getCustomers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a customer
router.patch('/updateCustomer/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findOne({"customerId": req.params.customerId});
    const updatedCustomer = await Customer.findByIdAndUpdate(customer._id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/deleteCustomer/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findOne({"customerId": req.params.customerId});

    await Customer.findByIdAndDelete(customer._id);

    res.json({ message: 'Item deleted with id: ' + req.params.customerId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;