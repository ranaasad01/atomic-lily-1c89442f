"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks } from "@/lib/data";
import { BRAND } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "var(--background)",
        borderBottom: "2px solid var(--border)",
        boxShadow: "0 2px 16px 0 rgba(59,35,20,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-2xl"
            >
              🌸
            </motion.div>
            <span
              className="font-extrabold text-lg leading-tight"
              style={{ color: "var(--primary)", fontFamily: "'Baloo 2', sans-serif" }}
            >
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isSection = link.href.startsWith("#");

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isSection && pathname === "/") {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }
              };

              const resolvedHref = isSection
                ? pathname === "/"
                  ? link.href
                  : "/" + link.href
                : link.href;

              return (
                <Link
                  key={link.key}
                  href={resolvedHref}
                  onClick={handleClick}
                  className="relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    color: isActive ? "var(--card)" : "var(--foreground)",
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-light)";
                      (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                    }
                  }}
                >
                  {navT[link.key] ?? link.label}
                </Link>
              );
            })}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: "var(--accent-light)" }}
              >
                <ShoppingBag
                  className="h-5 w-5"
                  style={{ color: "var(--primary)" }}
                  aria-hidden="true"
                />
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary)", color: "var(--card)" }}
                >
                  0
                </span>
              </motion.div>
            </Link>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "var(--accent-light)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" style={{ color: "var(--primary)" }} />
              ) : (
                <Menu className="h-5 w-5" style={{ color: "var(--primary)" }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--background)" }}
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isSection = link.href.startsWith("#");

                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  setMobileOpen(false);
                  if (isSection && pathname === "/") {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }
                };

                const resolvedHref = isSection
                  ? pathname === "/"
                    ? link.href
                    : "/" + link.href
                  : link.href;

                return (
                  <Link
                    key={link.key}
                    href={resolvedHref}
                    onClick={handleClick}
                    className="px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-200"
                    style={{
                      color: isActive ? "var(--card)" : "var(--foreground)",
                      backgroundColor: isActive ? "var(--primary)" : "transparent",
                    }}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}