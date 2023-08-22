import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
    toast("Successfully Logged Out!");
    navigate("/app");
  };

  const navigatetotracking = () => {
    navigate("/ordertracking");
  };

  return (
    <div className="confirmation">
      <div className="confirmbox">
        <h1 className="thankyou">Thank you!</h1>
        <h4 className="h4">Order placed successfully!</h4>
        <p>Your order has been placed successfully!</p>
        <button className="logout" onClick={handleLogout}>
          Go to Dashboard
        </button>
        <p className="ordertracking" onClick={navigatetotracking}>
          Track your order
        </p>
      </div>
    </div>
  );
}

export default Confirmation;
