const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json("Cart empty");
  }
  const order = await Order.create({
    user: req.user._id,
    items: cart.items
  });
  await Cart.deleteOne({ _id: cart._id });

  res.json(order);
});



router.get("/", auth, async (req, res) => {

  const orders = await Order.find({ user: req.user._id }).populate("items");

  res.json(orders);
});

module.exports = router;