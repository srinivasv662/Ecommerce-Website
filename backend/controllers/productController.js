const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  //   console.log(req);
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    // message: "Route is working fine"
    productCount,
  });
});

// Get Product Details      // i.e., Get Single Product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product;

  try {
    product = await Product.findById(req.params.id); //basically it's not returning null/undefined, but it's throwing error, that's why i have written try catch block
  } catch (error) {
    // return res.status(500).json({
    //     success: false,
    //     message: "Product Not Found"
    // })
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (error) {
    // return res.status(500).json({
    //     success: false,
    //     message: "Product Not Found"
    // })
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
  } catch (error) {
    // return res.status(500).json({
    //     success: false,
    //     message: "Product Not Found"
    // })
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await Product.findByIdAndRemove(req.params.id);
  // await product.remove();          //not working  // works for version "mongoose": "^6.8.4",

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
