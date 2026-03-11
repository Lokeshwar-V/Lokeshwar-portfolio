import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-700/40 py-8 text-white">
      <div className="container mx-auto flex flex-col items-start justify-between gap-3 px-5 md:flex-row md:items-center md:px-10">
        <p className="text-sm text-slate-300">© 2026 Lokeshwar V</p>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="https://github.com/Lokeshwar-V"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-secondary-300"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/lokeshwar-v-017a1b142/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-secondary-300"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
