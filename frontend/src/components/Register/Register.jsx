import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import configPath from "../Paths/configPaths";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `${configPath.BACKEND_BASE_URL}/users${configPath.ENDPOINTS.REGISTER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Registration successful");
      navigate("/login"); //navigate to the login page
    } catch (error) {
      console.error("Error creating an account", error);
    }
  };

  return (
    <div className="register-container">
      <div className="row justify-content-center">
        <div className="col-md-6 register-box">
          <h2 className="text-center register-title mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="custom-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className="custom-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your E-mail"
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
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" className="custom-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn register-btn w-100">
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login" className="custom-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
