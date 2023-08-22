import { ChevronRightRounded } from "@mui/icons-material";
import React from "react";

function SubMenucontainer() {
  return (
    <div className="subMenuContianer">
      <h3>Menu Category</h3>
      <div className="viewAll">
        <p>View All</p>
        <i>
          <ChevronRightRounded />
        </i>
      </div>
    </div>
  );
}

export default SubMenucontainer;
