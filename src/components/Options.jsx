import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Options() {
  return (
    <div className="row d-flex flex-column">
      <Nav className="flex-column col">
        <Link to="/sjf" className="lnk btn">
          SJF
        </Link>
        <Link to="/srt" className="lnk btn ">
          SRT
        </Link>
        <Link to="/hrrn" className="lnk btn">
          HRRN
        </Link>
      </Nav>

      {/* <h6
        className="col flex-column"
        style={{
          textAlign: "center",
          color: "#acb7dc",
          backgroundColor: "white",
          borderRadius: "15px",
          maxWidth: "50vw",
         
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <u>
          <b>
            By: <ul>Tooba Taqi</ul>
            <ul>Rabia Sardar</ul>
            <ul>Jaweria Naeem</ul>
            <ul>Khizra Saleem</ul>
          </b>
        </u>
      </h6> */}
    </div>
  );
}
