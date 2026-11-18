
const errorHandler = (err, _req, res, _next) => {

    console.log(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }

    // Invalid MongoDB ID
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid Product ID";
    }

    // Duplicate SKU error
    if (err.code === 11000) {
        statusCode = 400;
        message = "SKU already exists";
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;
