import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-[var(--text-muted)] bg-gray-900 text-center pt-12 pb-12 mt-10">
      <p className="text-md">
        Built by{" "}
        <a
          href="https://www.linkedin.com/in/michael-palermo-qc"
          target="_blank"
          rel="noopener noreferrer"
          className="!text-blue-500 hover:text-blue-400 hover:underline"
        >
          Michael Palermo
        </a>{" "}
        using: React, Node.js, TypeScript, TailwindCSS, Express.js
      </p>
    </footer>
  );
};

export default Footer;
