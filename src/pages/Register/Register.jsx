import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    startupName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.fullName ||
      !formData.startupName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { error } = await registerUser(
        formData.email,
        formData.password
      );

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Left Side */}
      <div className="register-left">

        <div className="brand-section">

          <h1>FounderOS Lite</h1>

          <p>
            Startup Fundraising CRM &
            Operations Management Platform
          </p>

          <div className="feature-list">

            <div className="feature-item">
              ✓ Investor Relationship Management
            </div>

            <div className="feature-item">
              ✓ Fundraising Pipeline Tracking
            </div>

            <div className="feature-item">
              ✓ Meeting & Follow-Up Management
            </div>

            <div className="feature-item">
              ✓ Team Task Management
            </div>

            <div className="feature-item">
              ✓ Secure Document Storage
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="register-right">

        <div className="register-card">

          <div className="card-header">

            <h2>Create Account</h2>

            <p>
              Start managing your startup smarter
            </p>

          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {success && (
            <div className="success-box">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Startup Name</label>
              <input
                type="text"
                name="startupName"
                placeholder="Enter startup name"
                value={formData.startupName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="register-btn"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="register-footer">

            <p>
              Already have an account?
              <Link to="/login">
                {" "}Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;