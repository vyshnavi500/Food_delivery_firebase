import React from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";
import landingimg from "../assets/landing.png";

const Main = () => {
  const navigate = useNavigate();

  const navigatetologin = () => {
    navigate("/Login");
  };
  const navigatetosignup = () => {
    navigate("/signup");
  };

  return (
    <div className="Mainpage">
      <div className="mainbg">
        <img src={landingimg} className="bgimg" alt="Background" />
      </div>
      <div className="registrationbtn">
        <button className="loginbtn" onClick={navigatetologin}>
          Login
        </button>
        <button className="loginbtn" onClick={navigatetosignup}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Main;
