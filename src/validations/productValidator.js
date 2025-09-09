// src/validators/productValidator.js
import Joi from "joi";

export const productCreateSchema = Joi.object({
  vendorId: Joi.string().required(), // must be an existing Vendor
  categoryId: Joi.string().required(), // must be an existing Category
  name: Joi.string().min(3).max(150).required(),
  description: Joi.string().allow("", null),
  basePrice: Joi.number().min(0).required(),
  bulkDiscount: Joi.number().min(0).max(100).default(0),
  minOrderQuantity: Joi.number().min(1).default(1),
  quantityAvailable: Joi.number().min(0).required(),
  status: Joi.string().valid("Active", "Inactive").default("Active")
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(150).optional(),
  description: Joi.string().allow("", null).optional(),
  basePrice: Joi.number().min(0).optional(),
  bulkDiscount: Joi.number().min(0).max(100).optional(),
  minOrderQuantity: Joi.number().min(1).optional(),
  quantityAvailable: Joi.number().min(0).optional(),
  status: Joi.string().valid("Active", "Inactive").optional()
});
