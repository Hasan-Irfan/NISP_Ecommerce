// src/services/orderService.js
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";

export const placeOrderService = async (data) => {
    const { customerId, vendorId, orderType, items } = data;

    // Check vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) throw new Error("Vendor not found");

    // Prepare order items + check stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);

        if (product.vendorId.toString() !== vendorId) {
            throw new Error(`Product ${product.name} does not belong to this vendor`);
        }

        if (product.quantityAvailable < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        // Calculate subtotal
        const unitPrice = product.basePrice;
        const subtotal = unitPrice * item.quantity;
        totalAmount += subtotal;

        // Deduct stock
        product.quantityAvailable -= item.quantity;
        await product.save();

        orderItems.push({
            productId: product._id,
            quantity: item.quantity,
            unitPrice,
            subtotal
        });
    }

    // Create order
    const order = new Order({
        customerId,
        vendorId,
        orderType,
        status: "Pending",
        totalAmount
    });
    await order.save();

    // Create order items
    for (const oi of orderItems) {
        await new OrderItem({ ...oi, orderId: order._id }).save();
    }

    return order;
}

export const getOrdersService = async (filter = {}) => {
    return await Order.find(filter)
        .populate("customerId", "fullName email")
        .populate("vendorId", "companyName");
}

export const getOrderByIdService = async (id) => {
    const order = await Order.findById(id)
        .populate("customerId", "fullName email")
        .populate("vendorId", "companyName");
    if (!order) throw new Error("Order not found");

    const items = await OrderItem.find({ orderId: id }).populate("productId", "name");
    return { order, items };
}

export const updateOrderStatusService = async (id, status) => {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) throw new Error("Order not found");
    return order;
}


