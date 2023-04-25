const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter the Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter the Product Price"],
        maxLength: [8, "Price Cannot exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter the Product Category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter the Product Stock"],
        maxLength: [4, "Stock Cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);