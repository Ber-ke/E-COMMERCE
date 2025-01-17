const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

router.post("/", async (req, res) => {
    try {
        const {code} = req.body;
        const existingCoupon = await Coupon.findOne({code});

        if (existingCoupon) {
            return res.status(400).json({error: "This coupon is alread exists."});
        }

        const newCoupon = new Coupon(req.body);
        await newCoupon.save();

        res.status(201).json(newCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.get("/", async (req, res) => {
    try {
        const coupons = await Coupon.find();

        if (!coupons) {
            return res.status(404).json({error: "Coupon not found."});
        }

        res.status(200).json(coupons);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.get("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId;

        const existingCoupon = await Coupon.findById(couponId);

        if (!existingCoupon) {
            return res.status(404).json({error: "Coupon not found"});
        }

        res.status(200).json(existingCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Service error."});
    }
});

router.get("/code/:couponCode", async (req, res) => {
    try {
        const couponCode = req.params.couponCode;
        const coupon = await Coupon.findOne({code: couponCode});

        if (!coupon) {
            return res.status(404).json({error: "Coupon not found."});
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Service error."});
    }
});

router.put("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId;
        const updates = req.body;

        const existingCoupon = await Coupon.findById(couponId);

        if (!existingCoupon) {
            return res.status(404).json({error: "Coupon Not Found."});
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {new: true});
        res.status(200).json(updatedCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.delete("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId;
        const deleteCoupon = await Coupon.findById(couponId);

        if (!deleteCoupon) {
            return res.status(404).json({error: "Coupon Not Found."});

        }
        const existingCoupon = await Coupon.findByIdAndDelete(couponId, {new: true});
        res.status(200).json(existingCoupon);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

module.exports = router;