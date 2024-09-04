import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { FaUser, FaLock } from "react-icons/fa"; // Optional: for icons

function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-4 rounded shadow-lg w-100 w-md-75 w-lg-50">
                <h2 className="text-center mb-4">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            <strong>Username</strong>
                        </label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter Username"
                                autoComplete="off"
                                name="username"
                                className="form-control rounded-0"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                name="password"
                                className="form-control rounded-0"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-160 rounded-0 mb-2">
                        Login
                    </button>
                    <p className="text-center mb-3">Don't have an account?</p>
                    <button type="button" className="btn btn-outline-success w-180 rounded-0">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
