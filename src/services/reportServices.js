// src/services/reportService.js
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

  // 1. Sales by Vendor
  export const salesByVendorService = async(startDate, endDate) => {
    return await Order.aggregate([
      { $match: { orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: "$vendorId", totalSales: { $sum: "$totalAmount" }, count: { $sum: 1 } } },
      { $lookup: { from: "vendors", localField: "_id", foreignField: "_id", as: "vendor" } },
      { $unwind: "$vendor" },
      { $project: { vendorName: "$vendor.companyName", totalSales: 1, count: 1 } }
    ]);
  };

  // 2. Top-Selling Products (last 30 days)
  export const topSellingProductsService = async (days = 30, limit = 5) =>{
    const since = new Date();
    since.setDate(since.getDate() - days);

    return await OrderItem.aggregate([
      { $lookup: { from: "orders", localField: "orderId", foreignField: "_id", as: "order" } },
      { $unwind: "$order" },
      { $match: { "order.orderDate": { $gte: since } } },
      { $group: { _id: "$productId", totalQuantity: { $sum: "$quantity" }, revenue: { $sum: "$subtotal" } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: limit },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      { $project: { productName: "$product.name", totalQuantity: 1, revenue: 1 } }
    ]);
  }

  // 3. Revenue Breakdown (B2B vs B2C)
  export const revenueBreakdownService = async () => {
    return await Order.aggregate([
      { $group: { _id: "$orderType", totalRevenue: { $sum: "$totalAmount" }, count: { $sum: 1 } } },
      { $project: { orderType: "$_id", totalRevenue: 1, count: 1, _id: 0 } }
    ]);
  }

  // 4. Low Stock Products (threshold)
  export const lowStockService = async (threshold = 5) => {
    return await Product.find({ quantityAvailable: { $lt: threshold } }, "name quantityAvailable");
  }

  // 5. Customer Purchase History
  export const customerHistoryService = async (customerId) => {
    return await Order.find({ customerId })
      .populate("vendorId", "companyName")
      .populate("customerId", "fullName email")
      .lean();
  }
