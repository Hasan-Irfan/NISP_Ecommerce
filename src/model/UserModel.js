import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        phone: { type: String },
        role: {
            type: String,
            enum: ["Admin", "Vendor", "Customer", "B2B_Customer"],
            default: "Customer"
        },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
        lastLoginAt: { type: Date, default: null },
        profilePicture: { type: String, default: "" },
        refreshToken: { type: String },
    },
    { timestamps: true }
);


export const User = mongoose.model("User", userSchema);


