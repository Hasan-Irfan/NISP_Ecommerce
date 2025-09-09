// src/services/categoryService.js
import { Category } from "../model/CategoryModel";

export const createCategoryService = async ({ name, slug, parentId, description }) => {
  const category = new Category({
    name,
    slug,
    parentId: parentId || null,
    description
  });
  await category.save();
  return category;
};

export const getAllCategoriesService = async () => {
  const categories = await Category.find();
  // Build nested structure recursively
  const buildTree = (parentId = null) => {
    return categories
      .filter(cat => String(cat.parentId) === String(parentId))
      .map(cat => ({
        ...cat.toObject(),
        children: buildTree(cat._id)
      }));
  };
  return buildTree();
};

export const updateCategoryService = async (id, data) => {
  const updated = await Category.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

export const deleteCategoryService = async (id) => {
  const child = await Category.findOne({ parentId: id });
  if (child) {
    throw new Error("Category has subcategories, delete them first.");
  }
  const deleted = await Category.findByIdAndDelete(id);
  return deleted;
};
