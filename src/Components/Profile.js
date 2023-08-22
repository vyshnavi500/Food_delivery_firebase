import React from 'react';
import { useNavigate } from "react-router-dom";

function Profile() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const name = userDetails?.name;
  const email = userDetails?.email;
  const phone = userDetails?.phone;

  const navigate = useNavigate();
 
  const navigatetoeditprofile = () =>{
    navigate("/editprofile")
  }

  return (
    <div className='profilecontainer'>
      <h2 className='myprofile'>My Profile</h2>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg"
            alt="" className='profileimg'
          />
      <p>Name : <span className='profilename'>{name}</span></p>
      <p>Email : <span className='profilename'>{email}</span></p>
      <p>PhoneNumber : <span className='profilename'>{phone}</span></p>
      <button className='editprofile' onClick={navigatetoeditprofile}>Edit Profile</button>
    </div>
  );
}

export default Profile;

