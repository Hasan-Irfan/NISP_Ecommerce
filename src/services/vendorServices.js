// src/services/vendorService.js
import Vendor from "../models/Vendor.js";
import User from "../models/User.js";

export const registerVendor = async (data) => {
    // Check if user exists
    const user = await User.findById(data.userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "Vendor") {
        throw new Error("User must have role 'Vendor' to register as vendor");
    }
    // Check if vendor profile already exists
    const existingVendor = await Vendor
        .findOne({ userId: data.userId });
    if (existingVendor) throw new Error("Vendor profile already exists");
    const vendor = new Vendor(data);
    return await vendor.save();
}

export const updateVendor = async (id, data) => {
    const vendor = await Vendor.findByIdAndUpdate(id, data, { new: true });
    if (!vendor) throw new Error("Vendor not found");
    return vendor;
}

export const getVendors = async (filter = {}) => {
    return await Vendor.find(filter).populate("userId", "username email phone role");
}

export const getVendorByUserId = async (userId) => {
    const vendor = await Vendor.findOne({ userId }).populate("userId", "username email phone role");
    if (!vendor) throw new Error("Vendor not found");
    return vendor;
}
