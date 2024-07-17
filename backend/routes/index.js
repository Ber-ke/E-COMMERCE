const express = require("express");
const router = express.Router();

// Diğer Rota Dosyalarını İçe Aktarıyoruz.

const categoryRoute = require("./categories.js");
const productRoute = require("./products.js");
const authRoute = require("./auth.js");
const couponRoute = require("./coupon.js");
const UserRoute = require("./users.js");
const paymentRoute = require("./payment.js");

// Her Rotayı İlgili Yol Altında Kullanıyoruz

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);
router.use("/user", UserRoute);
router.use("/payment", paymentRoute);

module.exports = router;