import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/authService";
import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const getPasswordStrength = () => {
    if (password.length < 6)
      return "Weak";

    if (password.length < 10)
      return "Medium";

    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password) {
      setError(
        "Please enter a password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    const { error } =
      await updatePassword(
        password
      );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(
      "Password updated successfully. Redirecting to login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="reset-container">

      <div className="reset-card">

        <div className="reset-logo">
          FounderOS
        </div>

        <h1>
          Reset Password
        </h1>

        <p>
          Create a new secure password
          for your account.
        </p>

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

          <label>
            New Password
          </label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {password && (
            <div
              className={`strength ${getPasswordStrength().toLowerCase()}`}
            >
              Strength:
              {" "}
              {getPasswordStrength()}
            </div>
          )}

          <label>
            Confirm Password
          </label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <div className="show-password">

            <input
              type="checkbox"
              checked={
                showPassword
              }
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />

            <span>
              Show Password
            </span>

          </div>

          <button
            type="submit"
            className="reset-btn"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;

