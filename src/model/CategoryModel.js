import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
