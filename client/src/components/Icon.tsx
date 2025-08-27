import React from "react";
import icon from "../assets/icon.png";

export const Icon = () => {
  return (
    <div className="pt-2 -m-20">
      <a href="/home">
        <img src={icon} alt="Logo" className="w-50 mx-auto" />
      </a>
    </div>
  );
};
