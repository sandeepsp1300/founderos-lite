import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
} from "../../services/authService";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ==========================
  // LOGIN
  // ==========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");
      setSuccess("");

      if (
        !formData.email ||
        !formData.password
      ) {
        setError(
          "Please fill all fields."
        );
        return;
      }

      try {
        setLoading(true);

        const { error } =
          await loginUser(
            formData.email,
            formData.password
          );

        if (error) {
          setError(
            error.message
          );
          return;
        }

        setSuccess(
          "Login successful"
        );

        setTimeout(() => {
          navigate(
            "/home"
          );
        }, 1000);

      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Something went wrong."
        );

      } finally {

        setLoading(false);

      }
    };

  // ==========================
  // DEMO LOGIN
  // ==========================

  const fillDemoAccount =
    () => {

      setFormData({
        email:
          "demo@founderos.com",
        password:
          "Demo@123",
      });

    };

  return (
    <div className="login-page">

      {/* LEFT SECTION */}

      <div className="login-left">

        <div className="brand">

          <h1>
            FounderOS Lite
          </h1>

          <span className="tagline">
            Startup Fundraising CRM
          </span>

          <p>
            Manage investors,
            fundraising,
            meetings,
            documents,
            follow-ups,
            tasks and startup
            operations from one
            place.
          </p>

        </div>

        <div className="features">

          <div className="feature-card">

            <h3>
              Investor CRM
            </h3>

            <p>
              Manage investor
              relationships and
              track communication.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Fundraising Pipeline
            </h3>

            <p>
              Track funding
              opportunities and
              investor progress.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Meeting Management
            </h3>

            <p>
              Schedule and
              manage startup
              meetings.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Document Vault
            </h3>

            <p>
              Securely store
              startup documents
              and reports.
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="login-right">

        <div className="login-card">

          <div className="card-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to your
              FounderOS account
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

          <form
            onSubmit={
              handleSubmit
            }
          >

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* REMEMBER */}

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                  checked={
                    rememberMe
                  }
                  onChange={() =>
                    setRememberMe(
                      !rememberMe
                    )
                  }
                />

                Remember Me

              </label>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

          </form>

          {/* DEMO ACCOUNT */}

          <div className="demo-box">

            <h4>
              Demo Account
            </h4>

            <p>
              Email:
              demo@founderos.com
            </p>

            <p>
              Password:
              Demo@123
            </p>

            <button
              className="demo-btn"
              onClick={
                fillDemoAccount
              }
            >
              Use Demo Account
            </button>

          </div>

          {/* SECURITY */}

          <div className="security-box">

            <p>
              🔒 Secured by
              Supabase
              Authentication
            </p>

          </div>

          {/* FOOTER */}

          <div className="login-footer">

            <Link
              to="/forgot-password"
            >
              Forgot Password?
            </Link>

            <p>

              Don't have an
              account?

              <Link
                to="/register"
              >
                {" "}
                Register
              </Link>

            </p>

          </div>

          <div className="auth-footer">

            <p>
              © 2026 FounderOS
              Lite
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;

