
const express = require("express");
const router = express.Router();

const validateProduct = require("../middleware/validateProduct");

// CRUD controller
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Inventory controller
const {
    updateStock,
    getLowStockProducts,
    getCategorySummary
} = require("../controllers/inventoryController");

// CRUD Routes
router.post("/", validateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

// Inventory Routes
router.patch("/:id/stock", updateStock);
router.get("/low-stock", getLowStockProducts);
router.get("/summary", getCategorySummary);

module.exports = router;
