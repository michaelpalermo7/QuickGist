import React, { FC } from "react";
import { Logo } from "./Logo";
import { LoginButton } from "./LoginButton";

export const Navbar: FC = () => {
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Right side links */}
        <div className="ml-auto flex items-center gap-8">
          <a
            className="text-lg font-medium hover:text-[var(--accent)] transition-colors"
            href="/contact"
          >
            Contact
          </a>

          <LoginButton href="/login">Log in</LoginButton>
        </div>
      </div>
    </nav>
  );
};
