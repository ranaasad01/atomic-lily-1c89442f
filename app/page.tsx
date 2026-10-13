"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, Star, ShoppingBag, Truck, RefreshCw } from 'lucide-react';
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
    category: "Rainbow",
    badge: "Bestseller",
    description: "Bright rainbow beads that make every day sunny!",
  },
  {
    id: "2",
    slug: "ocean-waves",
    name: "Ocean Waves",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=blue%20ocean%20bracelet",
    category: "Ocean",
    badge: "New",
    description: "Cool blue and turquoise beads, just like the sea.",
  },
  {
    id: "3",
    slug: "strawberry-dream",
    name: "Strawberry Dream",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=pink%20heart%20bracelet",
    category: "Fruity",
    description: "Sweet pink and red beads that smell like summer.",
  },
  {
    id: "4",
    slug: "galaxy-glitter",
    name: "Galaxy Glitter",
    price: 5.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=purple%20galaxy%20bracelet",
    category: "Galaxy",
    badge: "Sparkly",
    description: "Purple and silver glitter beads from outer space!",
  },
  {
    id: "5",
    slug: "sunshine-lemon",
    name: "Sunshine Lemon",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=galaxy%20glitter%20bracelet",
    category: "Fruity",
    description: "Cheerful yellow beads that brighten up your wrist.",
  },
  {
    id: "6",
    slug: "forest-friends",
    name: "Forest Friends",
    price: 4.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=yellow%20lemon%20bracelet",
    category: "Nature",
    description: "Earthy greens and tiny leaf beads from the woods.",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export default function HomePage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const valueProps = (
    Array.isArray(t.raw("valueProps.items")) ? t.raw("valueProps.items") : []
  ) as { icon: string; title: string; desc: string }[];

  const reviews = (
    Array.isArray(t.raw("reviews.items")) ? t.raw("reviews.items") : []
  ) as { name: string; text: string; stars: number }[];

  const iconMap: Record<string, React.ReactNode> = {
    heart: <Heart className="h-7 w-7" aria-hidden="true" />,
    sparkles: <Sparkles className="h-7 w-7" aria-hidden="true" />,
    truck: <Truck className="h-7 w-7" aria-hidden="true" />,
    refresh: <RefreshCw className="h-7 w-7" aria-hidden="true" />,
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* ── Hero ── */}
      <Reveal>
        <section
          id="hero"
          className="relative overflow-hidden px-4 pb-16 pt-12 text-center sm:pb-24 sm:pt-20"
        >
          {/* Decorative blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)] opacity-40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-[var(--accent)] opacity-40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-30 blur-3xl"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-[var(--background)] px-4 py-1.5 text-sm font-semibold text-[var(--foreground)]">
              {t("hero.badge")}
            </span>
            <h1 className="text-balance text-5xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--foreground)]">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="#shop"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-bold text-white shadow-[0_4px_18px_-4px_var(--accent)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                {t("hero.cta")}
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent)] bg-white/70 px-7 py-3.5 text-base font-bold text-[var(--accent)] backdrop-blur-sm transition-all duration-300 hover:bg-[var(--accent)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                {t("hero.secondary")}
              </motion.a>
            </div>

            {/* Floating bracelet emojis */}
            <div aria-hidden="true" className="mt-10 flex justify-center gap-4 text-3xl">
              {["💜", "🌈", "💛", "🩷", "💚", "✨"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                  className="select-none"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>
      </Reveal>

      {/* ── Shop Grid ── */}
      <Reveal>
        <section id="shop" className="px-4 pb-20 pt-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("shop.title")}
              </h2>
              <p className="mt-2 text-[var(--foreground)]">{t("shop.subtitle")}</p>
            </div>

            {/* Category filters */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                    activeCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md"
                      : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
                  )}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Product grid */}
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
                    href={`/product/${product.slug}`}
                    className="group block rounded-3xl border-2 border-[var(--border)] bg-white p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_8px_28px_-8px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-[var(--background)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://api.dicebear.com/7.x/shapes/svg?seed=green%20leaf%20bracelet";
                        }}
                      />
                      {product.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white shadow">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 px-1">
                      <h3 className="text-lg font-extrabold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]">
                        {product.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xl font-extrabold text-[var(--accent)]">
                          {BRAND.currency}{product.price.toFixed(2)}
                        </span>
                        <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold text-[var(--accent)]">
                          {t("shop.viewBtn")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Value Props ── */}
      <Reveal>
        <section
          id="about"
          className="bg-[var(--background)] px-4 py-20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("valueProps.title")}
              </h2>
              <p className="mt-2 text-[var(--foreground)]">{t("valueProps.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {valueProps.map((vp, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-4 rounded-3xl border-2 border-[var(--border)] bg-white p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]">
                      {iconMap[vp.icon] ?? <Sparkles className="h-7 w-7" aria-hidden="true" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[var(--foreground)]">{vp.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]">{vp.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Reviews ── */}
      <Reveal>
        <section id="reviews" className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("reviews.title")}
              </h2>
              <p className="mt-2 text-[var(--foreground)]">{t("reviews.subtitle")}</p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-3"
            >
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="rounded-3xl border-2 border-[var(--border)] bg-white p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)]"
                >
                  <div className="flex gap-0.5 text-[var(--accent)]">
                    {Array.from({ length: review.stars }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-extrabold text-[var(--foreground)]">
                    {review.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA Banner ── */}
      <Reveal>
        <section className="px-4 pb-24 pt-4">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-[var(--primary)] p-10 text-center shadow-[0_8px_40px_-12px_var(--accent)]">
            <div aria-hidden="true" className="mb-4 text-5xl">🌸</div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              {t("cta.subtitle")}
            </p>
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-[var(--accent)] shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {t("cta.btn")}
            </motion.a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}