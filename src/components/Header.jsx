import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // <div >
      <div className="fixed hdr">
        <div>
          <h3>Operating System</h3>
        </div>
        <div>
          <Link to="/" className="lnk btn">
            Home
          </Link>
        </div>
      </div>
    // </div>
  );
}
