import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true },
  description: { type: String },
  basePrice: { type: Number, required: true },
  bulkDiscount: { type: Number, default: 0 }, // %
  minOrderQuantity: { type: Number, default: 1 },
  quantityAvailable: { type: Number, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
