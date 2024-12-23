let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

let port = 3000;

app.use(express.static('static'));

//Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

//Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;

  res.send(totalCartPrice.toString());
});

//Endpoint 2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let totalCartPrice;
  if (isMember) {
    totalCartPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    totalCartPrice = cartTotal;
  }
  res.send(totalCartPrice.toString());
});

//Endpoint 3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = (cartTotal * taxRate) / 100;
  res.send(totalTax.toString());
});

//Endpoint 4
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryTime;
  if (shippingMethod === 'express') {
    deliveryTime = distance / 100;
  } else {
    deliveryTime = distance / 50;
  }
  res.send(deliveryTime.toString());
});

//Endpoint 5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());
});

//Endpoint 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
