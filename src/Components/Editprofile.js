import React, { useEffect, useRef, useState } from "react";
import camera from "../assets/edit.png";
import defaultUser from "../assets/defaultuser.jpg";
import { useNavigate } from "react-router-dom";


const HandleImageUpload = () => {
  const imageRef = useRef();
  const [defaultUserImage, setDefaultUserImage] = useState(defaultUser);
  const [selectedFile, setSelectedFile] = useState();

  const showOpenFileDialog = () => {
    imageRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setDefaultUserImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  return {
    imageRef,
    defaultUserImage,
    showOpenFileDialog,
    handleChange,
  };
};
export const ItemImage = (props) => {
  const { itemImage, itemImageAlt } = props;
  return (
    <>
      <img src={itemImage} alt={itemImageAlt} className="item-image" />
    </>
  );
};

export const CommonClickButtonIcon = (props) => {
  const { onHandleSubmitForm, iconImageValue, altImg } = props;
  return (
    <div className="common-button">
      <button
        type="button"
        onClick={onHandleSubmitForm}
        className="button-image"
      >
        <img src={iconImageValue} alt={altImg} className="image-button-img" />
      </button>
    </div>
  );
};

export const MainProfileForm = () => {
  const { defaultUserImage, handleChange, imageRef, showOpenFileDialog } =
    HandleImageUpload();
    const navigate = useNavigate();
 
    const naviagtetohome = () =>{
      navigate("/app")
    }


  return (
    <div className="edit-profile-container">
      <div className="edit-profile-image">
        <ItemImage
          itemImage={defaultUserImage}
          itemImageAlt="user profile picture"
        />
        <CommonClickButtonIcon
          onHandleSubmitForm={showOpenFileDialog}
          iconImageValue={camera}
          altImg="Upload image icon"
        />
        <input
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <form className="editprofileform">
        <div className="form-group">
          <label>Name : </label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Email : </label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Mobile : </label>
          <input type="phone" required />
        </div>
        <button type="submit" className="formsave" onClick={naviagtetohome}>
          Save
        </button>
      </form>
    </div>
  );
};
