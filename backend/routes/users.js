const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.get("/", async (req, res) => {
    try {
        const Users = await User.find();

        res.status(200).json(Users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
});

router.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;

        const deleteUser = await User.findOneAndDelete({email});

        if (!deleteUser) {
            return res.status(404).json({error: "User Not Found."});
        }

        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(errror);
        res.status(500).json({error: "Server error."});
    }
});

module.exports = router;