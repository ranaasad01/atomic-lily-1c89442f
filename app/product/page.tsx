"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Minus, Plus, Sparkles, Shield, Truck } from 'lucide-react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { BRAND, type Product } from "@/lib/data";
import { staggerContainer, scaleIn, fadeInUp } from "@/lib/motion";

// ── Inline product data ──────────────────────────────────────────────────────

const PRODUCTS: (Product & {
  longDescription: string;
  materials: string[];
  careInstructions: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
})[] = [
  {
    id: "1",
    slug: "rainbow-sunshine",
    name: "Rainbow Sunshine Bracelet",
    price: 4.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=green%20leaf%20bracelet",
    shortDescription: "Bright rainbow beads that make you smile every day!",
    badge: "Best Seller",
    longDescription:
      "This cheerful bracelet is packed with every colour of the rainbow! Each bead is carefully chosen and strung on stretchy elastic so it fits most wrists. Perfect for school, parties or just brightening up your day. Made with love and lots of glitter energy!",
    materials: ["Glass seed beads", "Stretchy elastic cord", "Gold-tone spacer beads"],
    careInstructions: [
      "Keep away from water and swimming pools",
      "Store in a cool dry place",
      "Put on last, take off first",
    ],
    images: [
      "https://api.dicebear.com/7.x/shapes/svg?seed=green%20leaf%20bracelet",
      "/images/beads.jpg",
      "/images/rainbow-beads.jpg",
      "/images/bracelet-close.jpg",
    ],
    rating: 5,
    reviewCount: 24,
    category: "Rainbow",
  },
  {
    id: "2",
    slug: "ocean-waves",
    name: "Ocean Waves Bracelet",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=blue%20ocean%20bracelet",
    shortDescription: "Cool blue and teal beads like the sea!",
    badge: "New",
    longDescription:
      "Dive into ocean vibes with this gorgeous blue and teal bracelet. Shell-shaped beads and sparkly sea-glass colours make it feel like a day at the beach. Stretchy and comfy to wear all day long.",
    materials: ["Acrylic shell beads", "Glass seed beads", "Stretchy elastic cord"],
    careInstructions: [
      "Keep away from water and swimming pools",
      "Store in a cool dry place",
      "Put on last, take off first",
    ],
    images: [
      "https://api.dicebear.com/7.x/shapes/svg?seed=blue%20ocean%20bracelet",
      "/images/ocean-beads.jpg",
      "/images/teal-beads.jpg",
      "/images/bracelet-close.jpg",
    ],
    rating: 5,
    reviewCount: 18,
    category: "Ocean",
  },
  {
    id: "3",
    slug: "strawberry-dreams",
    name: "Strawberry Dreams Bracelet",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=pink%20heart%20bracelet",
    shortDescription: "Sweet pink and red beads with tiny strawberry charms!",
    longDescription:
      "So sweet and so cute! This bracelet has the prettiest pink and red beads with adorable little strawberry charms dotted all the way around. It smells like fun and looks like summer!",
    materials: ["Plastic strawberry charms", "Glass seed beads", "Stretchy elastic cord"],
    careInstructions: [
      "Keep away from water and swimming pools",
      "Store in a cool dry place",
      "Put on last, take off first",
    ],
    images: [
      "https://api.dicebear.com/7.x/shapes/svg?seed=pink%20heart%20bracelet",
      "/images/strawberry-charm.jpg",
      "/images/pink-beads.jpg",
      "/images/bracelet-close.jpg",
    ],
    rating: 4,
    reviewCount: 11,
    category: "Fruity",
  },
];

const RELATED_PRODUCTS: Product[] = [
  {
    id: "2",
    slug: "ocean-waves",
    name: "Ocean Waves Bracelet",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=blue%20ocean%20bracelet",
    shortDescription: "Cool blue and teal beads like the sea!",
    badge: "New",
  },
  {
    id: "3",
    slug: "strawberry-dreams",
    name: "Strawberry Dreams Bracelet",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=pink%20heart%20bracelet",
    shortDescription: "Sweet pink and red beads with tiny strawberry charms!",
  },
  {
    id: "4",
    slug: "golden-star",
    name: "Golden Star Bracelet",
    price: 5.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold%20star%20bracelet",
    shortDescription: "Shiny gold stars and sparkly beads for a magical look!",
    badge: "Limited",
  },
];

// ── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-5 w-5",
              star <= rating
                ? "fill-[var(--accent)] text-[var(--accent)]"
                : "fill-transparent text-[var(--accent)]"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-[var(--muted-foreground)]">
        {t("product.reviewCount", { count })}
      </span>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const t = useTranslations();

  // Use the first product as the "featured" detail view
  const product = PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handlePrevImage = () =>
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  const handleNextImage = () =>
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));

  const materials = (Array.isArray(t.raw("product.materials")) ? t.raw("product.materials") : []) as string[];
  const careInstructions = (Array.isArray(t.raw("product.care")) ? t.raw("product.care") : []) as string[];
  const perks = (Array.isArray(t.raw("product.perks")) ? t.raw("product.perks") : []) as { icon: string; label: string }[];

  return (
    <main className="min-h-screen bg-[var(--primary)] pb-24">
      {/* ── Breadcrumb ── */}
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors font-medium">
              {t("product.breadcrumbShop")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[var(--foreground)] font-semibold">{product.name}</span>
          </nav>
        </div>
      </Reveal>

      {/* ── Product Hero ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl bg-[var(--card)] border-2 border-[var(--border)] shadow-[0_4px_32px_rgba(255,182,193,0.25)] aspect-square">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {product.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white shadow">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-md border border-white/60 hover:bg-white transition-colors"
                  aria-label={t("product.prevImage")}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-md border border-white/60 hover:bg-white transition-colors"
                  aria-label={t("product.nextImage")}
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWishlisted((w) => !w)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-md border border-white/60"
                  aria-label={t("product.wishlist")}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      wishlisted ? "fill-red-400 text-red-400" : "text-gray-400"
                    )}
                  />
                </motion.button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImage === i
                        ? "border-[var(--accent)] shadow-md"
                        : "border-[var(--border)] opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeInUp}>
                <StarRating rating={product.rating} count={product.reviewCount} />
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-2 text-lg font-bold text-[var(--accent)]">
                  {BRAND.currency}{product.price.toFixed(2)}
                </p>
                <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
                  {product.shortDescription}
                </p>
              </motion.div>

              {/* Quantity */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-[var(--foreground)]">{t("product.quantity")}</span>
                <div className="flex items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--card)] px-2 py-1">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                    aria-label={t("product.decrease")}
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <span className="w-8 text-center font-bold text-[var(--foreground)]">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                    aria-label={t("product.increase")}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Add to Cart */}
              <motion.div variants={fadeInUp}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_4px_18px_-4px_var(--accent)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    addedToCart ? "bg-green-500" : "bg-[var(--accent)] hover:brightness-110"
                  )}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {addedToCart ? t("product.added") : t("product.addToCart")}
                </motion.button>
              </motion.div>

              {/* Perks */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3">
                {perks.map((perk, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 rounded-2xl bg-[var(--card)] p-3 text-center border border-[var(--border)]"
                  >
                    <span className="text-xl">{perk.icon}</span>
                    <span className="text-xs font-semibold text-[var(--foreground)]">{perk.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Long description */}
              <motion.div variants={fadeInUp} className="rounded-2xl bg-[var(--card)] p-4 border border-[var(--border)]">
                <h3 className="mb-2 font-bold text-[var(--foreground)]">{t("product.aboutTitle")}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{product.longDescription}</p>
              </motion.div>

              {/* Materials */}
              <motion.div variants={fadeInUp}>
                <h3 className="mb-2 font-bold text-[var(--foreground)]">{t("product.materialsTitle")}</h3>
                <ul className="space-y-1">
                  {product.materials.map((m: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Related Products ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
            {t("product.relatedTitle")}
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {RELATED_PRODUCTS.map((related) => (
              <motion.div
                key={related.id}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-3xl border-2 border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {related.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-bold text-white">
                      {related.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-[var(--foreground)]">{related.name}</p>
                  <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{related.shortDescription}</p>
                  <p className="mt-2 font-bold text-[var(--accent)]">{BRAND.currency}{related.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Reveal>
    </main>
  );
}
