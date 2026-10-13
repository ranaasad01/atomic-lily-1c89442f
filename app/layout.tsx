import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Lily's Bracelet Shop",
  description: "Handmade bracelets made with love by Lily, age 10. Colourful beads, shiny charms, and stretchy cord — every bracelet is one of a kind!",
  openGraph: {
    title: "Lily's Bracelet Shop",
    description: "Handmade bracelets made with love by Lily, age 10.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}