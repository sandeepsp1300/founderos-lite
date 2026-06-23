import { useState } from "react";
import { resetPassword } from "../../services/authService";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const { error } =
      await resetPassword(email);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      "Password reset email sent successfully."
    );
  };

  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {message && (
          <div className="success-box">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;