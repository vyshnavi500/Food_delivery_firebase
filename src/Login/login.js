import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainProfileForm } from "../Components/Editprofile";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");


  const navigate = useNavigate();

  const navigatetomain = () => {
    navigate("/app");
    toast("Successfully logged In!");
  };

  const navigatetosignup = () => {
    navigate("/signup");
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setError("Please enter your email");
      isValid = false;
    } else {
      setError("");
    }

    if (!password) {
      setError("Please enter your password");
      isValid = false;
    } else {
      setError("");
    }

    return isValid;
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
  
    if (!forgotPassword) {
      prompt('Please enter your email to reset your password .');
      return;
    }
  };
  const login = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast(`Welcome back, ${user.displayName}!`);
        navigatetomain();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
    <div className="login-form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>

        <p className="loginuser">
          Don't have an account? <span onClick={navigatetosignup}>Signup</span>
        </p>
        <p className="forgotpassword"  onClick={handleForgotPassword}>
          Forgot Password ?
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;

