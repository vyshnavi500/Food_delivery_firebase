import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";

function Cartitem({ itemId, name, imgSrc, price, addTotal }) {
  const [qnty, setQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(parseFloat(price));
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    setItemPrice(parseFloat(price) * qnty);
    updateCartitemQuantity(itemId, qnty);
  }, [itemId, price, qnty]);

  const updateQty = (action, id) => {
    let newQty;
    if (action === "add") {
      newQty = qnty + 1;
    } else {
      if (qnty === 1) {
        removeCartitem(id);
        return;
      }
      newQty = qnty - 1;
    }

    if (newQty <=5){
      setQty(newQty);
      updateCartitemQuantity(id, newQty);
    }
    else{
      alert("Items out of stock");
    }
   
  };

  const updateCartitemQuantity = (id, newQty) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qnty: newQty } : item
    );
    dispatch({
      type: actionType.SET_CART,
      cart: updatedCart,
    });
    addTotal();
  };

  const removeCartitem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    dispatch({
      type: actionType.SET_CART,
      cart: updatedCart,
    });
    addTotal();
  };

  return (
    <div className="Cartitem" id={itemId}>
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <div className="itemSection">
        <h2 className="itemName">{name}</h2>
        <div className="itemQuantity">
          <span>x {qnty}</span>
          <div className="quantity">
            <RemoveRounded
              className="itemRemove"
              onClick={() => updateQty("remove", itemId)}
            />
            <AddRounded
              className="itemAdd"
              onClick={() => updateQty("add", itemId)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="poundSign">£</span>{" "}
        <span className="itemPriceValue">{itemPrice.toFixed(2)}</span>
      </p>
    </div>
  );
}

export default Cartitem;