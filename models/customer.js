const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true}
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;