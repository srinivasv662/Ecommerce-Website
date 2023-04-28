const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    console.log("Error Middleware awakened. path: middleware/error.js");
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id Error, like: http://localhost:4000/api/v1/product/64476 ----> Cast Error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        // message: err.stack
        message: err.message 
        // error: err
    })
} 