// src/services/inventoryService.js
import Product from "../models/Product.js";

export const update = async(productId, quantity) =>{
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    // Replace stock
    product.quantityAvailable = quantity;
    return await product.save();
  };

  export const adjust = async(productId, adjustment) =>{
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const newQty = product.quantityAvailable + adjustment;
    if (newQty < 0) throw new Error("Insufficient stock");

    product.quantityAvailable = newQty;
    return await product.save();
  };
