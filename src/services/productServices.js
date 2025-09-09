// src/services/productService.js
import Product from "../model/ProductModel.js";
import Vendor from "../model/VendorModel.js";
import Category from "../model/CategoryModel.js";

export const createProduct = async (data) => {
    // Check if Vendor exists
    const vendor = await Vendor.findById(data.vendorId);
    if (!vendor) throw new Error("Vendor not found");   

    // Check if Category exists
    const category = await Category.findById(data.categoryId);
    if (!category) throw new Error("Category not found");

    const product = new Product(data);
    return await product.save();
}

export const updateProduct = async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new Error("Product not found");
    return product;
}

export const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error("Product not found");
    return product;
}

export const getProducts = async (query) => {
  const { category, vendor, minPrice, maxPrice, status, page = 1, limit = 10, sort } = query;

  let filter = {};

  if (category) filter.categoryId = category;
  if (vendor) filter.vendorId = vendor;
  if (status) filter.status = status;
  if (minPrice || maxPrice) {
    filter.basePrice = {};
    if (minPrice) filter.basePrice.$gte = Number(minPrice);
    if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Sorting
  let sortOptions = {};
  if (sort) {
    const [field, order] = sort.split("_"); // e.g. "price_asc"
    sortOptions[field] = order === "desc" ? -1 : 1;
  } else {
    sortOptions = { createdAt: -1 }; // default newest first
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("vendorId", "companyName")
      .populate("categoryId", "name")
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOptions),
    Product.countDocuments(filter)
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    limit: Number(limit),
    products
  };
};

export const getProductById = async (id) => {
    const product = await Product.findById(id)
        .populate("vendorId", "companyName")
        .populate("categoryId", "name");
    if (!product) throw new Error("Product not found");
    return product;
}
