import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Main from "./Main/main"
import Signup from "./Signup/signup"
import Login from "./Login/login"
import { StateProvider } from "./Components/StateProvider";
import reducer, { initialState } from "./Components/reducer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Confirmation from "./Components/Confirmation";
import Customdetails from "./Components/Customdetails";
import  Payment  from "./Payment/Payment";
import Profile from "./Components/Profile";
import OrderTracking from "./Components/OrderTracking";
import { MainProfileForm } from "./Components/Editprofile";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/editprofile" element={<MainProfileForm/>}/>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/ordertracking" element={<OrderTracking/>} />
        <Route path="/customdetails" element={<Customdetails/>} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
<StateProvider initialState={initialState} reducer={reducer}>
  <Root />
</StateProvider>,
document.getElementById('root')
);

