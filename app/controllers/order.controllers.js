import { Order } from "../models/order/order.model.js";
import { Product } from "../models/product/product.model.js";

export const createOrder = async (req, res) => {
  const order = new Order({
    ...req.body,
    owner: req.user._id,
  });
  try {
    for (let i = 0; i < order.orderItems.length; i++) {
      const product = await Product.findOne({
        _id: order.orderItems[i].product,
      });
      if (product.cntInStock - order.orderItems[i].qty >= 0) {
        product.cntInStock -= order.orderItems[i].qty;
      } else {
        product.cntInStock = 0;
      }
      await product.save();
    }
    await order.save();
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.user._id });
    if (!orders) {
      return res.status(404).send({ message: "Orders not found" });
    }
    res.send(orders);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).send({ message: "Orders not found" });
    }
    res.send(orders);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    let order = await Order.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!order) {
      order = await Order.findOne({
        _id: req.params.id,
      });
      if (!order || !req.user.isAdmin) {
        return res.status(404).send({ message: "Order not found" });
      }
    }
    res.send(order);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
