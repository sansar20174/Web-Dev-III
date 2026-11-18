
const validateProduct = (req, _res, next) => {
    const {
        name,
        sku,
        category,
        price,
        quantity,
        reorderLevel,
        supplier
    } = req.body;

    const reject = (message) => {
        const error = new Error(message);
        error.statusCode = 400;
        return next(error);
    };

    // Check text field types first
    if (
        typeof name !== "string" ||
        typeof sku !== "string" ||
        typeof category !== "string" ||
        typeof supplier !== "string"
    ) {
        return reject("Text fields must be strings");
    }

    // Check required fields
    if (
        !name.trim() ||
        !sku.trim() ||
        !category.trim() ||
        price === undefined ||
        quantity === undefined ||
        reorderLevel === undefined ||
        !supplier.trim()
    ) {
        return reject("All product fields are required");
    }

    // Check numeric fields
    if (
        typeof price !== "number" ||
        typeof quantity !== "number" ||
        typeof reorderLevel !== "number"
    ) {
        return reject("Numeric fields must be numbers");
    }

    // Check negative values
    if (price < 0 || quantity < 0 || reorderLevel < 0) {
        return reject("Values cannot be negative");
    }

    // Check integer values
    if (
        !Number.isInteger(quantity) ||
        !Number.isInteger(reorderLevel)
    ) {
        return reject("Quantity and reorder level must be integers");
    }

    next();
};

module.exports = validateProduct;
