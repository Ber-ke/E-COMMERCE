const moongose = require("mongoose");

ReviewSchema = moongose.Schema(
    {
        text: {type: String, required: true},
        rating: {type: Number, required: true},
        user: {type: moongose.Schema.Types.ObjectId, ref: "User", required: true},
    }, {timestamps: true}
);

const productSchema = moongose.Schema(
    {
        name: {type: String, required: true},
        img: [{type: String, required: true}],
        reviews: [ReviewSchema],
        color: [{type: String, required: true}],
        sizes: [{type: String, required: true}],
        price: {
            current: {type: Number, required: true},
            discount: {type: Number}
        },
        category: {
            type: moongose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        description: {type: String, required: true},
    },
    {timestamps: true}
);

const Product = moongose.model("product", productSchema);

module.exports = Product;