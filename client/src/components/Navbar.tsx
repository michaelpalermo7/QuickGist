import React from "react";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Links */}
        <ul className="flex space-x-8 list-none">
          <li>
            <a
              className="text-lg font-medium hover:text-[var(--accent)] transition-colors"
              href="/contact"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className="text-lg font-medium hover:text-[var(--accent)] transition-colors"
              href="/about"
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
