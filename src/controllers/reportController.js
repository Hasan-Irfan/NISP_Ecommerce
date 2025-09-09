// src/controllers/reportController.js
import {
    salesByVendorService,
    topSellingProductsService,
    revenueBreakdownService,
    lowStockService,
    customerHistoryService
} from "../services/reportServices.js";

export const getSalesByVendor = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const result = await salesByVendorService(startDate, endDate);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const getTopProducts = async (req, res) => {
    try {
        const { days, limit } = req.query;
        const result = await topSellingProductsService(Number(days) || 30, Number(limit) || 5);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getRevenueBreakdown = async (req, res) => {
    try {
        const result = await revenueBreakdownService();
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getLowStock = async (req, res) => {
    try {
        const { threshold } = req.query;
        const result = await lowStockService(Number(threshold) || 5);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getCustomerHistory = async (req, res) => {
    try {
        const { customerId } = req.params;
        const result = await customerHistoryService(customerId);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
