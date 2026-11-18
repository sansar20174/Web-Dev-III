
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },

    sku: {
        type: String,
        required: [true, "SKU is required"],
        unique: true,
        trim: true
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be a whole number"
        }
    },

    reorderLevel: {
        type: Number,
        required: true,
        min: [0, "Reorder level cannot be negative"]
    },

    supplier: {
        type: String,
        required: true,
        trim: true
    }

}, {
    timestamps: true
});

// Calculate total stock value
productSchema.virtual("stockValue").get(function () {
    return this.price * this.quantity;
});

// Include virtual fields in JSON response
productSchema.set("toJSON", {
    virtuals: true
});

module.exports = mongoose.model("Product", productSchema);
