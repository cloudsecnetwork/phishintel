// errorHandler.js

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack trace for debugging

    const statusCode = err.statusCode || 500;  // Default to 500 for server errors
    const message = err.message || 'Internal Server Error';  // Default message

    res.status(statusCode).json({
        success: false,
        message,
        // Optionally include the stack trace (not recommended in production)
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;
