import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Customdetails() {
  const [additionalinfo, setAdditionalInfo] = useState("");
  const [loc, setLoc] = useState("");
  const [errors, setErrors] = useState({ additionalinfo: "", loc: "" });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!additionalinfo) {
      newErrors.additionalinfo = "Please enter additional info";
      isValid = false;
    } else {
      newErrors.additionalinfo = "";
    }

    if (!loc) {
      newErrors.loc = "Please enter location";
      isValid = false;
    } else {
      newErrors.loc = "";
    }

    setErrors(newErrors);

    return isValid;
  };

  const submitDetails = (e) => {
    e.preventDefault();

    if (validateForm()) {
      return;
    }
  };

  const navigatetopayment = () => {
    navigate("/payment");
  };
  const saveDetailsToFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "customers"), {
        loc: loc,
        additionalinfo: additionalinfo,
      });

      console.log("Customer details saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving customer details: ", error);
    }
  };

  return (
    <div className="customdeatils">
      <div className="custom-details-container">
        <h3>Please enter your details</h3>
        <form>
          <div className="form-group">
            <label>Delivery Location</label>
            <input
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              required
            />
            {errors.loc && <span className="error">{errors.loc}</span>}
          </div>
          <div className="form-group">
            <label>Add Instructions</label>
            <input
              type="text"
              value={additionalinfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              required
            />
            {errors.additionalinfo && (
              <span className="error">{errors.additionalinfo}</span>
            )}
          </div>
          <button
            type="submit"
            onClick={() => {
              saveDetailsToFirebase();
              navigatetopayment();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Customdetails;
