// src/validators/vendorValidator.js
import Joi from "joi";

export const vendorRegisterSchema = Joi.object({
  userId: Joi.string().required(), // must be an existing user
  companyName: Joi.string().min(3).max(100).required(),
  businessLicense: Joi.string().optional(),
  taxId: Joi.string().optional(),
  paymentTerms: Joi.string().valid("Prepaid", "Net 30", "Net 60").default("Prepaid"),
  status: Joi.string().valid("Active", "Inactive").default("Active")
});

export const vendorUpdateSchema = Joi.object({
  companyName: Joi.string().min(3).max(100).optional(),
  businessLicense: Joi.string().optional(),
  taxId: Joi.string().optional(),
  paymentTerms: Joi.string().valid("Prepaid", "Net 30", "Net 60").optional(),
  status: Joi.string().valid("Active", "Inactive").optional()
});
