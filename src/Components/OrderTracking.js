import React from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import UserdistanceCard from "./UserdistanceCard";

function OrderTracking({ travelTime }) {
  const [jsonData, setJsonData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const name = userDetails.name;

  useEffect(() => {
    const fetchData = async () => {
      const orderRef = doc(db, "orders", name);

      try {
        const orderDocSnap = await getDoc(orderRef);
        if (orderDocSnap.exists()) {
          const orderData = orderDocSnap.data();
          setJsonData(orderData);

          const cartRef = doc(db, "cart", orderData.cart);
          try {
            const cartDocSnap = await getDoc(cartRef);
            if (cartDocSnap.exists()) {
              const cartData = cartDocSnap.data();
              setCartData(cartData);
            }
          } catch (error) {
            console.log("Error fetching cart data:", error);
          }
        } else {
          console.log("Order document does not exist");
        }
      } catch (error) {
        console.log("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="order">
      {jsonData && cartData ? (
        <div>
          <div className="orderheader">
            <h1>Order Id &nbsp;: {jsonData.id}</h1>
            <div className="row">
              <p>Order date : {jsonData.order_time}</p>
              <hr />
              {/* <p><span><UserdistanceCard travelTime={travelTime}></UserdistanceCard></span></p> */}
              <h5>{name} is</h5>
              <span className="distance-span">
                <UserdistanceCard travelTime={travelTime} />
              </span>
            </div>
          </div>
          <hr />
          <div className="cartitems">
            {cartData.cart.map((item, index) => (
              <div className="row" key={index}>
                <div className="row1">
                  <img
                    className="cartimg"
                    src={item.imgSrc}
                    alt={`Cart Item ${index + 1}`}
                  />
                  <h5>{item.name}</h5>
                </div>
                <div className="column">
                  <h5>price: £ {item.price}</h5>
                  <h5>quantity: {item.qnty}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default OrderTracking;
