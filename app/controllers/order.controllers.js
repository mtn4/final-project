import { Order } from "../models/order/order.model.js";

export const createOrder = async (req, res) => {
  const order = new Order({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await order.save();
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.user._id }).populate(
      "orderItems.product"
    );
    if (!orders) {
      return res.status(404).send();
    }
    res.send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderItems.product");
    if (!req.user.isAdmin || !orders) {
      return res.status(404).send();
    }
    res.send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
