const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    // const token = req.cookies;
    const {token} = req.cookies;

    // if(!token) {
    //     return next(new ErrorHandler("Please Login to Access the resource", 401));
    // }

    console.log(token);
})