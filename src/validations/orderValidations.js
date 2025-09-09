// src/validators/orderValidator.js
import Joi from "joi";

export const orderCreateSchema = Joi.object({
  customerId: Joi.string().required(),
  vendorId: Joi.string().required(),
  orderType: Joi.string().valid("B2B", "B2C").required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required()
    })
  ).min(1).required()
});

export const orderStatusSchema = Joi.object({
  status: Joi.string().valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled").required()
});
