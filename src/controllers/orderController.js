// src/controllers/orderController.js
import { placeOrderService , getOrderByIdService , getOrdersService , updateOrderStatusService } from "../services/orderServices";

export const placeOrder = async (req, res) => {
  try {
    const order = await placeOrderService(req.validatedBody);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await getOrdersService();
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const result = await getOrderByIdService(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await updateOrderStatusService(req.params.id, req.body.status);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
