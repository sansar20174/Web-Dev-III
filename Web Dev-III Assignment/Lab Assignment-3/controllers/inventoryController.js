
const Product = require("../models/Product");

// 1. Update Stock
const updateStock = async (req, res, next) => {
    try {
        const change = Number(req.body.change);

        if (!Number.isInteger(change) || change === 0) {
            return res.status(400).json({
                success: false,
                message: "Stock change must be a non-zero integer"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: Math.max(0, -change) }
            },
            {
                $inc: { quantity: change }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            const existingProduct = await Product.findById(req.params.id);

            if (!existingProduct) {
                const error = new Error("Product not found");
                error.statusCode = 404;
                throw error;
            }

            return res.status(400).json({
                success: false,
                message: "Insufficient stock available"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 2. Get Low Stock Products
const getLowStockProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get Category Summary
const getCategorySummary = async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },
                    avgPrice: { $avg: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalItems: 1,
                    totalQuantity: 1,
                    totalStockValue: {
                        $round: ["$totalStockValue", 2]
                    },
                    avgPrice: {
                        $round: ["$avgPrice", 2]
                    }
                }
            },
            {
                $sort: { category: 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            totalCategories: summary.length,
            data: summary
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {updateStock,getLowStockProducts,getCategorySummary};
