import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <div className="card">
                <h1>Auth System</h1>
                <p>React + Node.js Forgot Password Flow</p>

                <div className="button-group">
                    <Link to="/register">
                        <button className="btn">Register</button>
                    </Link>

                    <Link to="/forgot-password">
                        <button className="btn secondary">Forgot Password</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;