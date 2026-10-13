"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Sparkles, Heart, Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

const PRODUCTS = [
  {
    id: "1",
    slug: "rainbow-sunshine",
    name: "Rainbow Sunshine",
    price: 4.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=beaded%20bracelet",
    shortDescription: "Bright rainbow beads that make you smile every day!",
    badge: "Best Seller",
    category: "Colourful",
  },
  {
    id: "2",
    slug: "ocean-waves",
    name: "Ocean Waves",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=blue%20ocean%20bracelet",
    shortDescription: "Cool blue and turquoise beads, just like the sea.",
    badge: "New",
    category: "Cool Colours",
  },
  {
    id: "3",
    slug: "strawberry-dream",
    name: "Strawberry Dream",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=pink%20heart%20bracelet",
    shortDescription: "Sweet pink and red beads with a little heart charm.",
    badge: undefined,
    category: "Colourful",
  },
  {
    id: "4",
    slug: "golden-star",
    name: "Golden Star",
    price: 5.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold%20star%20bracelet",
    shortDescription: "Shiny gold beads with a sparkly star in the middle.",
    badge: "Special",
    category: "Sparkly",
  },
  {
    id: "5",
    slug: "lavender-love",
    name: "Lavender Love",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=purple%20galaxy%20bracelet",
    shortDescription: "Pretty purple and lilac beads, soft and lovely.",
    badge: undefined,
    category: "Cool Colours",
  },
  {
    id: "6",
    slug: "disco-party",
    name: "Disco Party",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=lavender%20purple%20bracelet",
    shortDescription: "Glittery beads in every colour — perfect for parties!",
    badge: "Fan Fave",
    category: "Sparkly",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))] as const;

export default function HomeShopPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const howItWorksSteps = (
    Array.isArray(t.raw("howItWorks.steps")) ? t.raw("howItWorks.steps") : []
  ) as { emoji: string; title: string; desc: string }[];

  const reviews = (
    Array.isArray(t.raw("reviews.items")) ? t.raw("reviews.items") : []
  ) as { name: string; text: string; stars: number }[];

  return (
    <main className="min-h-screen bg-[var(--background)] pb-20">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative overflow-hidden px-4 pt-12 pb-16 text-center">
          {/* Soft gradient blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, var(--accent) 0%, transparent 60%)",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--background)] px-4 py-1.5 text-sm font-semibold text-[var(--foreground)]"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("hero.pill")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mx-auto max-w-2xl text-balance text-5xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] sm:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
            className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-[var(--foreground)]"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href="#shop"
              className="rounded-full bg-[var(--accent)] px-7 py-3 text-base font-bold text-white shadow-[0_4px_18px_-4px_var(--accent)] transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {t("hero.cta")}
            </a>
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-full border-2 border-[var(--accent)] bg-white px-7 py-3 text-base font-bold text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {t("hero.cartLink")}
            </Link>
          </motion.div>

          {/* Floating emoji decorations */}
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute left-[8%] top-16 hidden text-4xl sm:block"
          >
            🌸
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[8%] top-20 hidden text-4xl sm:block"
          >
            ✨
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-8 left-[15%] hidden text-3xl sm:block"
          >
            💖
          </motion.span>
        </section>
      </Reveal>

      {/* ── Shop Grid ── */}
      <section id="shop" className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {t("shop.heading")}
            </h2>
            <p className="mt-2 text-[var(--foreground)]">{t("shop.subheading")}</p>
          </div>

          {/* Category filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  activeCategory === cat
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md"
                    : "border-[var(--accent)]/30 bg-white text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product cards */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((product) => (
            <motion.div key={product.id} variants={scaleIn}>
              <Link
                href={`/product`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-[var(--border)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white shadow">
                    {product.badge}
                  </span>
                )}

                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-[var(--background)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://api.dicebear.com/7.x/shapes/svg?seed=beaded%20bracelet";
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-[var(--accent)] shadow backdrop-blur-sm transition-colors hover:bg-white"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold text-[var(--foreground)]">
                    {product.name}
                  </h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-[var(--foreground)]">
                    {product.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-[var(--accent)]">
                      {BRAND.currency}{product.price.toFixed(2)}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white shadow-[0_2px_10px_-2px_var(--accent)] transition-all duration-200 hover:brightness-110"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("shop.addToCart")}
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How It Works ── */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-5xl px-4">
          <div className="rounded-3xl bg-[var(--background)] px-6 py-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {t("howItWorks.heading")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[var(--foreground)]">
              {t("howItWorks.subheading")}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {howItWorksSteps.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
                    <span className="text-5xl">{step.emoji}</span>
                    <h3 className="text-lg font-extrabold text-[var(--foreground)]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--foreground)]">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Reviews ── */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-5xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {t("reviews.heading")}
            </h2>
            <p className="mt-2 text-[var(--foreground)]">{t("reviews.subheading")}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col gap-3 rounded-3xl border-2 border-[var(--border)] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <div className="flex gap-0.5" aria-label={`${review.stars} stars`}>
                    {Array.from({ length: review.stars }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--foreground)]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    {review.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Fun CTA Banner ── */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-4xl px-4">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary) 100%)",
            }}
          >
            <motion.span
              aria-hidden="true"
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute left-6 top-6 text-4xl"
            >
              🌈
            </motion.span>
            <motion.span
              aria-hidden="true"
              animate={{ rotate: [0, -15, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-6 top-6 text-4xl"
            >
              💫
            </motion.span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("cta.heading")}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-white/90">
              {t("cta.body")}
            </p>
            <a
              href="#shop"
              className="mt-7 inline-block rounded-full bg-white px-8 py-3 text-base font-extrabold text-[var(--accent)] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t("cta.button")}
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}