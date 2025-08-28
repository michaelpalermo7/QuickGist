import React, { FC } from "react";
import { Logo } from "./Logo";

export const Navbar: FC = () => {
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="shrink-0">
          <Logo />
        </div>
      </div>
    </nav>
  );
};
