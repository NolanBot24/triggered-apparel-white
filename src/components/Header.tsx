"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-header py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" id="logo-link" className="group flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 border-2 border-flag-red flex items-center justify-center group-hover:bg-flag-red transition-all duration-300">
              <span className="font-heading text-flag-red font-bold text-lg group-hover:text-aged-white transition-colors duration-300">
                T
              </span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-heading text-aged-white text-lg tracking-[0.25em] font-bold leading-none">
              TRIGGERED
            </span>
            <span className="block font-heading text-steel-gray text-[10px] tracking-[0.5em] font-medium">
              APPAREL
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link font-heading text-aged-white/80 text-sm tracking-[0.2em] uppercase hover:text-aged-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            id="nav-cta"
            className="cta-button ml-4 px-6 py-2.5 bg-flag-red text-aged-white font-heading text-xs tracking-[0.2em] uppercase hover:bg-red-700 transition-all duration-300"
          >
            Shop Now
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-6 h-0.5 bg-aged-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-aged-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-aged-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="glass-header px-6 py-8 flex flex-col items-center gap-6 border-t border-steel-gray/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-aged-white text-xl tracking-[0.3em] uppercase hover:text-flag-red transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setIsOpen(false)}
            className="cta-button mt-2 px-10 py-3 bg-flag-red text-aged-white font-heading text-sm tracking-[0.2em] uppercase"
          >
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
