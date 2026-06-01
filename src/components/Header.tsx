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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-header py-4" : "bg-cream/0 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" id="logo-link" className="group flex items-center gap-3">
          <span className="font-author-bold text-charcoal text-4xl leading-none tracking-tighter">
            TRG
          </span>
          <div className="flex flex-col justify-center">
            <span className="font-author text-charcoal text-sm tracking-[0.3em] leading-none">
              TRIGGERED
            </span>
            <span className="font-author text-warm-gray text-[10px] tracking-[0.3em] leading-none">
              APPAREL
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link font-body text-warm-gray text-[11px] tracking-[0.25em] uppercase hover:text-charcoal transition-colors duration-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            id="nav-cta"
            className="ml-6 px-7 py-2.5 bg-charcoal text-cream font-heading text-[10px] tracking-[0.25em] uppercase hover:bg-flag-red transition-colors duration-400"
          >
            Shop Now
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-5 h-[1.5px] bg-charcoal transition-all duration-400 ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-charcoal transition-all duration-400 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-charcoal transition-all duration-400 ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-cream px-6 py-10 flex flex-col items-center gap-7 border-t border-light-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-charcoal text-xl tracking-[0.3em] uppercase hover:text-flag-red transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setIsOpen(false)}
            className="mt-2 px-10 py-3 bg-charcoal text-cream font-heading text-xs tracking-[0.25em] uppercase hover:bg-flag-red transition-colors duration-300"
          >
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
