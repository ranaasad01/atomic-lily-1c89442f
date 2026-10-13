"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, BRAND } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const footerT = t.raw("footer") as Record<string, string>;

  return (
    <footer
      className="w-full mt-auto"
      style={{
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        borderTop: "3px solid var(--primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span
                className="font-extrabold text-lg"
                style={{ color: "var(--accent)", fontFamily: "'Baloo 2', sans-serif" }}
              >
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--border)" }}>
              {footerT["tagline"] ?? BRAND.tagline}
            </p>
            <div className="flex items-center gap-1 text-sm" style={{ color: "var(--accent)" }}>
              <span>{footerT["madeWith"] ?? "Made with"}</span>
              <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{footerT["byMaker"] ?? "by Lily"}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-bold text-base"
              style={{ color: "var(--accent)", fontFamily: "'Baloo 2', sans-serif" }}
            >
              {footerT["quickLinks"] ?? "Quick Links"}
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
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
                    className="text-sm transition-colors duration-200 w-fit"
                    style={{ color: "var(--border)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--border)";
                    }}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Fun note */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-bold text-base"
              style={{ color: "var(--accent)", fontFamily: "'Baloo 2', sans-serif" }}
            >
              {footerT["funFactTitle"] ?? "Did you know? ✨"}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--border)" }}>
              {footerT["funFact"] ?? "Every bracelet comes with a little thank-you note written by me! I hope it makes you smile. 💌"}
            </p>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-2xl w-fit"
            >
              🌈
            </motion.div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(240,217,200,0.2)", color: "var(--border)" }}
        >
          <span>{footerT["copyright"] ?? `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`}</span>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent)" }} aria-hidden="true" />
            <span>{footerT["handmade"] ?? "100% handmade with love"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}