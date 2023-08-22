import React, { useState, useEffect } from "react";

function UserdistanceCard() {
  const [distance, setDistance] = useState("");
  const [showDistance, setShowDistance] = useState(false);
  const [latitude1, setLatitude1] = useState(53.76344097144773);
  const [longitude1, setLongitude1] = useState(-2.706971799660959);
  const [latitude2, setLatitude2] = useState(null);
  const [longitude2, setLongitude2] = useState(null);
  const [travelTime, setTravelTime] = useState("");
 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude2(position.coords.latitude);
        setLongitude2(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (latitude1 && longitude1 && latitude2 && longitude2) {
      getDistance(latitude1, longitude1, latitude2, longitude2);
    }
  }, [latitude1, longitude1, latitude2, longitude2]);

  function getDistance(lat1, lon1, lat2, lon2) {
    setShowDistance(true);
    const R = 3958.8;
    const dLatitude = deg2rad(lat2 - lat1);
    const dLongitude = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLongitude / 2) *
        Math.sin(dLongitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    const roundedNumber = round(d);
    setDistance(roundedNumber);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function round(num) {
    const m = Number((Math.abs(num) * 100).toPrecision(2));
    const result = (Math.round(m) / 100) * Math.sign(num);
    return result;
  }
  useEffect(() => {
    if (distance !== "") {
      calculateTravelTime(distance);
    }
  }, [distance]);

  function calculateTravelTime(distance) {
    let timeInMinutes = 0;

    if (distance > 100) {
      timeInMinutes = 60;
    } else if (distance > 50) {
      timeInMinutes = 30;
    } else if (distance > 30) {
      timeInMinutes = 25;
    } else if (distance > 20) {
      timeInMinutes = 15;
    } else {
      timeInMinutes = 10;
    }

    setTravelTime(timeInMinutes);
  }

  return (
    <div className="distance">
      {showDistance && (
        <p>
          {distance} miles
          <span>
            <h5> away,</h5>
          </span>
          <span>
            <h5> Estimated time for delivery is</h5>
          </span>{" "}
          {travelTime} minutes
        </p>
      )}
    </div>
  );
}

export default UserdistanceCard;
