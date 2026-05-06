const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

exports.register = async(req, res) => {
    const { email, password } = req.body;

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    res.json({ message: "User created", user });
};


// 🔹 Forgot Password

exports.forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;

        console.log("Request body:", req.body);

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            "Password Reset",
            `Click here to reset your password: ${resetURL}`
        );

        res.json({ message: "Reset link sent to email" });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// 🔹 Reset Password
exports.resetPassword = async(req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};