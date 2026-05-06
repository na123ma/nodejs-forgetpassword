import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!password || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await API.post(`/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Reset Password</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit" className="btn full">
                        Reset Password
                    </button>
                </form>

                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;