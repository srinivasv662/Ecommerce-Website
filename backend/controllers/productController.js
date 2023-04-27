const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All Products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
        // message: "Route is working fine"
    });
}

// Get Product Details      // i.e., Get Single Product
exports.getProductDetails = async(req, res, next) => {
    let product;

    try {
        product = await Product.findById(req.params.id);
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }    

    res.status(200).json({
        success: true,
        product
    })

}

// Update Product -- Admin
exports.updateProduct = async (req, res) => {
    let product
    try {
        product = await Product.findById(req.params.id);
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: false
    });


    res.status(200).json({
        success: true,
        product
    })

}

// Delete Product
exports.deleteProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    await Product.findByIdAndRemove(req.params.id);
    // await product.remove();          //not working  // works for version "mongoose": "^6.8.4",

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
}