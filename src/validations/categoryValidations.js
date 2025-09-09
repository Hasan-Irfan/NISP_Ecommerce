// src/validations/categoryValidation.js
import { body, param } from "express-validator";

export const createCategoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("slug").optional().isString(),
  body("parentId").optional().isString(),
  body("description").optional().isString()
];

export const updateCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid category id"),
  body("name").optional().isString(),
  body("slug").optional().isString(),
  body("parentId").optional().isString(),
  body("description").optional().isString()
];

export const deleteCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid category id"),
];
