import { AddRounded, Favorite, StarRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";
import { Items } from "./Jsondata";
import { useEffect } from "react";
let cartData = [];

function Itemcard({ itemId, imgSrc, name, price, ratings}) {
  const [isFavourite, setFavourite] = useState(false);
  const [isCart, setCart] = useState(null);

  const [{ cart }, dispatch] = useStateValue();
  const [currentValue, setCurrentValue] = useState(Math.floor(ratings));

  useEffect(() => {
    if (isCart) {
      cartData.push(isCart);
      dispatch({
        type: actionType.SET_CART,
        cart: [...cartData],
      });
      setCart(null); 
    }
  }, [isCart, cartData, dispatch]);
  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const addToCart = () => {
    const newItem = Items.find((n) => n.id === itemId);
    if (newItem) {
      dispatch({
        type: actionType.SET_CART,
        cart: [...cart, newItem],
      });
    }
  };
  return (
    <div className="Itemcard" id={itemId}>
      <div
        className={`isFavourite ${isFavourite ? "active" : ""}`}
        onClick={() => setFavourite(!isFavourite)}
      >
        <Favorite />
      </div>

      <div className="imgBox">
        <img src={imgSrc} alt="" className="itemImg" />
      </div>

      <div className="itemContent">
        <h3 className="itemName">{name}</h3>
        <div className="bottom">
          <div className="ratings">
            {Array.apply(null, { length: 5 }).map((e, i) => (
              <i
                key={i}
                className={`rating ${currentValue > i ? "orange" : "gray"}`}
                onClick={() => handleClick(i + 1)}
              >
                <StarRounded />
              </i>
            ))}
            <h3 className="price">
              <span>£</span>
              {price}
            </h3>
          </div>
          <i className="addToCart" onClick={addToCart}>
            <AddRounded />
          </i>
        </div>
      </div>

    </div>
  );
}

export default Itemcard;