import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  businessLicense: { type: String },
  taxId: { type: String },
  paymentTerms: { type: String, default: "Prepaid" },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: true });

export const Vendor = mongoose.model("Vendor", vendorSchema);
