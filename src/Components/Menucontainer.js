import React from "react";

function Menucontainer({ link, icon, isHome }) {
  return (
    <li className={isHome ? `active` : ``}>
      <a href={link}>
        <span className="icon">{icon}</span>
      </a>
    </li>
  );
}

export default Menucontainer;
