import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import configPath from "../Paths/configPaths";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../components/Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        configPath.ENDPOINTS.LOGIN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed", error);
      setError("Invalid Email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-4 login-box">
          <h2 className="text-center login-title mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="custom-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="custom-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn login-btn w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/register" className="custom-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
