import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [Emailerror, setEmailError] = useState("");

  const navigate = useNavigate();

  const navigatetomain = () => {
    navigate("/app");
    toast.info("Successfully Registered!");
  };

  const navigatetologin = () => {
    navigate("/login");
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setError("Please enter your name");
      isValid = false;
    } else {
      setError("");
    }

    if (!email) {
      setEmailError("Please enter your email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setError("Please enter your password");
      isValid = false;
    } else {
      setError("");
    }

    if (!phone) {
      setError("Please enter your phone number");
      isValid = false;
    } else {
      setError("");
    }

    return isValid;
  };

  const signup = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password,name,phone)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem("userDetails", JSON.stringify({ name, email, phone }));
         navigatetomain();
      })
      .catch((error) => {
        setError(error.message);
      });
    }

  return (
    <div className="signup-form-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={signup}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error && <p className="input-error">{error}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {Emailerror && <p className="input-error">{Emailerror}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="input-error">{error}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
           {error && <p className="input-error">{error}</p>}
        </div>
        <button type="submit">Signup</button>
        <p className="loginuser">
          Already registered? <span onClick={navigatetologin}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;