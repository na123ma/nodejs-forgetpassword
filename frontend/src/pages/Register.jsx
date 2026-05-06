import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const res = await API.post("/auth/register", formData);
            setMessage(res.data.message);

            setTimeout(() => {
                navigate("/forgot-password");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                    />

                    <button type="submit" className="btn full">
                        Register
                    </button>
                </form>

                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}

                <p className="link-text">
                    Already have an account? <Link to="/">Go Home</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;