
const Product = require("../models/Product");

// 1. Create Product
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 2. Get All Products with Search, Filter, Sorting and Pagination
const getAllProducts = async (req, res, next) => {
    try {
        const {
            category,
            search,
            minPrice,
            maxPrice,
            sortBy,
            order,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }

            if (
                Object.values(filter.price).some(
                    value => !Number.isFinite(value)
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Price filters must be valid numbers"
                });
            }

            if (
                minPrice !== undefined &&
                maxPrice !== undefined &&
                Number(minPrice) > Number(maxPrice)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Minimum price cannot exceed maximum price"
                });
            }
        }

        const allowedSortFields = [
            "name",
            "price",
            "quantity",
            "createdAt"
        ];

        const sortField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        const sortOrder = order === "asc" ? 1 : -1;

        const currentPage = Number(page);
        const pageLimit = Number(limit);

        if (
            !Number.isInteger(currentPage) ||
            !Number.isInteger(pageLimit) ||
            currentPage < 1 ||
            pageLimit < 1 ||
            pageLimit > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or limit value"
            });
        }

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip((currentPage - 1) * pageLimit)
            .limit(pageLimit);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage,
            totalPages: Math.ceil(totalProducts / pageLimit),
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get Single Product
const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 4. Update Product
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// 5. Delete Product
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };
