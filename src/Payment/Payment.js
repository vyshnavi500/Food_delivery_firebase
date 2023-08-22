import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Payment.css";
import { db } from "../firebase";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";

function Payment() {
  const [cardnumber, setCardNumber] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\D/g, "");
    const truncatedInput = formattedInput.slice(0, 16);
    setCardNumber(truncatedInput);
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value;
    setExpiryDate(input);
  };

  const handleCvvChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\D/g, "");
    const truncatedInput = formattedInput.slice(0, 3);
    setCvv(truncatedInput);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cardnumber.length !== 16 || isNaN(cardnumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    const [month, year] = expirydate.split(" ");
    if (!handleExpiryDateChange) {
      alert("Please enter a valid expiry date.");
      return;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }
    navigate("/confirmation");
  };

  const savePaymentDetails = async () => {
    try {
      const lastFourDigits = cardnumber.slice(-4);
      const maskedCVV = "•".repeat(cvv.length);

      const docRef = await addDoc(collection(db, "payment"), {
        cardnumber: "•".repeat(cardnumber.length - 4) + lastFourDigits,
        expirydate: expirydate,
        cvv: maskedCVV,
      });
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const name = userDetails.name;
      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/" 
      + currentdate.getFullYear() + " "
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();

      const orderRef = await setDoc(doc(db, 'orders', name),{
        id: Date.now(),
        cart: name,
        order_time : datetime
    });

    console.log("order details saved with ID: ", orderRef.id);
    console.log("payment details saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving payment details: ", error);
    }
  };

  return (
    <div className="payment">
      <h3>Payment Gateway</h3>
      <div>
        <h5 className="cashpay">Pay with Cash</h5>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCU2mKF0KPsfmRcvrLKRQivMRKSthl_IHNAg&usqp=CAU"
          alt=""
          className="cashimg"
        ></img>
      </div>
      <p className="or">Or</p>
      <h5 className="cashpay">Pay with Card</h5>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Card Number:</label>
          <input
            type="text"
            value={cardnumber}
            onChange={handleCardNumberChange}
          />
        </div>
        <div className="field">
          <label>Expiry Date:</label>
          <input
            type="month"
            value={expirydate}
            onChange={handleExpiryDateChange}
          />
        </div>
        <div className="field">
          <label>CVV:</label>
          <input type="text" value={cvv} onChange={handleCvvChange} />
        </div>
        <button
          className="paymentbtn"
          type="submit"
          onClick={() => {
            savePaymentDetails();
            handleSubmit();
          }}
        >
          Make Payment
        </button>
      </form>
    </div>
  );
}

export default Payment;
