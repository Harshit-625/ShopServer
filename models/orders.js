const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true
  },
  shippingAddress2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pending'
  },
  totalPrice: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);


// REFRENCE JSON 
// {
//   "orderItems" : [
//       {
//           "quantity" : 3,
//           "product" : "669be3c675d492b16867ed7a"
//       },
//       {
//           "quantity" : 2,
//           "product" : "669e2766292f271b02d95643"
//       }
//   ],
//   "shippingAddress1" : "Street 1",
//   "shippingAddress2" : "Street2",
//   "city" : "New Delhi",
//   "zip" : "000000",
//   "country" : "India",
//   "phone" : "098765432456",
//   "user" : "669e95ccbc1eef1c23018d90"
// }