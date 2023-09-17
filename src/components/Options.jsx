import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Options() {
  return (
    <div className="row">
        
      <Nav className="flex-column col box">
        <Link to="/srt" className="lnk btn ">
          SRT
        </Link>
        <Link to="/sjf" className="lnk btn">
          SJF
        </Link>
        <Link to="/hrrn" className="lnk btn">
          HRRR
        </Link>
      </Nav>
    </div>
  );
}
