import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Options from "./components/Options";
import { Routes, Route, Link } from "react-router-dom";
import SRT from "./pages/SRT";
import SJF from "./pages/SJF";
import HRRN from "./pages/HRRN.jsx";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="row ">
      <div className="fixed-top">
        <Header />
      </div>
      {/* <Link to="/" className="lnk btn">
          Home
        </Link> */}
      {/* <div style={{width:"100vw", height:"100vh"}}>
        <Routes>
          <Route path="/" element={<Options />} />
          <Route path="/srt" element={<SRT />} />
          <Route path="/sjf" element={<SJF />} />
        </Routes>
      </div> */}
      <div className="row justify-content-center">
        <div
          className="col"
          style={{ width: "100vw"}}
        >
          <Routes>
            <Route path="/" element={<Options />} />
            <Route path="/srt" element={<SRT />} />
            <Route path="/sjf" element={<SJF />} />
            <Route path="/hrrn" element={<HRRN />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
