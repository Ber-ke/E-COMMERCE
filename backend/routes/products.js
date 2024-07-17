const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.get("/", async (req, res) => {
    try {
        const product = await Product.find();
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({error: "Product not found."});
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.put("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const updated = req.body;

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({error: "Product not found."});
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, updated, {new: true});

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.delete("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(deletedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

router.get("/search/:productName", async (req,res) => {
    try {

        const productName = req.params.productName;

        const products = await Product.find({
            name: {$regex: productName, $options: "i"}
        });

        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Server error!"});
    }
});

module.exports = router;