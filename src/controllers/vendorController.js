// src/controllers/vendorController.js
import * as vendorService from "../services/vendorServices.js";

export const registerVendor = async (req, res) => {
  try {
    const vendor = await vendorService.registerVendor(value);
    res.status(201).json({ success: true, data: vendor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await vendorService.updateVendor(req.params.id, value);
    res.json({ success: true, data: vendor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const listVendors = async (req, res) => {
  try {
    const vendors = await vendorService.getVendors();
    res.json({ success: true, data: vendors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getVendor = async (req, res) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id);
    res.json({ success: true, data: vendor });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
