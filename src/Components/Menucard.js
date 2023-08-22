import { ChevronRightRounded } from "@mui/icons-material";
import React from "react";

function Menucard({ imgSrc, name, isActive }) {
  return (
    <div className={`rowMenucard ${isActive ? `active` : ``}`}>
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <h3>{name}</h3>
      <i className="loadMenu">
        <ChevronRightRounded />
      </i>
    </div>
  );
}

export default Menucard;
