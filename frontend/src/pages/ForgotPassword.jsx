import React, { useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            const res = await API.post("/auth/forgot-password", { email });
            setMessage(res.data.message);
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Forgot Password</h2>
                <p>Enter your email to receive a reset link</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" className="btn full">
                        Send Reset Link
                    </button>
                </form>

                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}

                <p className="link-text">
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;