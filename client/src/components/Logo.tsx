import React from "react";
import logo from "../assets/logo333.png";

export const Logo = () => {
  return (
    <div className="pt-2 -m-20">
      <a href="/">
        <img src={logo} alt="Logo" className="w-50 mx-auto" />
      </a>
    </div>
  );
};
