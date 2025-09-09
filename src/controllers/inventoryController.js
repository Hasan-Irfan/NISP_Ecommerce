// src/controllers/inventoryController.js
import { update , adjust } from "../services/inventoryServices";

export const updateStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.validatedBody;

    const updated = await update(productId, quantity);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const adjustStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { adjustment } = req.validatedBody;

    const updated = await adjust(productId, adjustment);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
