
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

// Import routes
const productRoutes = require("./routes/productRoutes");

// Import error handler
const errorHandler = require("./middleware/errorHandler");

// Product routes
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Inventory Management System API is Running");
});

// 404 handler
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.statusCode = 404;
    next(error);
});

// Centralized error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
