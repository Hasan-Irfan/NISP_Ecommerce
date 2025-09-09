// src/controllers/categoryController.js
import {
  createCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService
} from "../services/categoryService.js";

export const createCategory = async (req, res) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await updateCategoryService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await deleteCategoryService(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
