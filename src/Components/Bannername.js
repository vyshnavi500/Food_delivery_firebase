import React from "react";
import UserdistanceCard from "./UserdistanceCard";

function Bannername({ discount, more, latitude1, longitude1 }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const name = userDetails?.name;
  const currency = "£";

  return (
    <div className="bannerContainer">
      <h3>
        Welcome, <span className='username'>{name}</span>
      </h3>
      <div className="distance">
        <h5>{name} is </h5>
        <span className="distance-span">
          <UserdistanceCard latitude1={latitude1} longitude1={longitude1} />
        </span>
      </div>
      <p>Get free discount for every {`${currency}${discount}`} purchase</p>
      <button className="bannerbtn">Learn more</button>
    </div>
  );
}

export default Bannername;


