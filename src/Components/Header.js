import {
  SearchRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useStateValue } from "./StateProvider";
import logo from "../assets/logo.png"

function Header() {
  const [{ cart }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const navigatetoprofile = () => {
    navigate("/profile");
  };


  return (

    <header>
       <img src={logo} className="logo" alt="logo" />

      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input type="text" placeholder="Search" />
      </div>

      <div className="shoppingCart">
        <ShoppingCartRounded className="cart" />
        <div className={`${!cart ? "noCartItem" : "cart_content"}`}>
          <p>{cart ? cart.length : ""}</p>
        </div>
      </div>

      <div className="profileContainer">
        <div className="imgBox">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg"
            alt="" onClick={navigatetoprofile}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
