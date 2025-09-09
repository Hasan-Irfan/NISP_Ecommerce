import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  orderType: { type: String, enum: ["B2B", "B2C"], required: true },
  orderDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ["Pending","Processing","Shipped","Delivered","Cancelled"], 
    default: "Pending" 
  },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
