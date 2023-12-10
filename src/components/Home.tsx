import React from "react";

import "../index.css";
// import lib from "./../assets/istockphoto-949118068-612x612.jpg";
import lib from "./../assets/hero1-1-basement_stacks_books3.jpg";

export const Home = () => {
  return (
    <div className="box">
      <img src={lib} alt="" style={{ width: "96%", padding: "1rem" }} />
    </div>
  );
};
