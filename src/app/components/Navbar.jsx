"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Experience", path: "#experience" },
  { title: "Projects", path: "#projects" },
  { title: "Achievements", path: "#achievements" },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      if (current < 60) {
        setShow(true);
      } else {
        setShow(current < lastY);
      }
      lastY = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-40 mx-auto border-b border-slate-700/40 bg-slate-950/50 backdrop-blur-md transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-5 py-3 md:px-10">
        <Link href="/" className="text-xl font-black tracking-tight text-white md:text-2xl">
          Lokeshwar<span className="text-secondary-400">.dev</span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-slate-600/80 p-2 text-slate-200 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link
                href={link.path}
                className="text-sm font-medium text-slate-300 transition hover:text-secondary-300"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div className="border-t border-slate-700/40 bg-slate-950/80 px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className="block text-sm font-medium text-slate-300"
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
