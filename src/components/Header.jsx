import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // <div >
    <div className="fixed hdr">
      <div>
        <h3>
          Scheduling Algorithms{" "}
          <small style={{ fontSize: "15px" }}>
            (By: Tooba, Rabia, Jaweria, Khizra)
          </small>
        </h3>
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
