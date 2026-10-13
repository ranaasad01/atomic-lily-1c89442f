"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Heart, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, Package, RefreshCw, Shield } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/data";

const PRODUCT = {
  id: "rainbow-dream",
  name: "Rainbow Dream Bracelet",
  price: 6.50,
  badge: "Best Seller",
  shortDescription: "A cheerful rainbow bracelet made with bright glass beads and a stretchy cord. Perfect for everyday wear!",
  longDescription: "This bracelet is made by hand, one bead at a time, with lots of love. Each Rainbow Dream bracelet uses 28 tiny glass beads in all the colours of the rainbow. The stretchy cord means it fits most wrists and is super comfy to wear all day. No two bracelets are exactly the same, which makes yours extra special!",
  images: [
    "https://api.dicebear.com/7.x/shapes/svg?seed=beaded%20bracelet",
    "/images/beaded-bracelet.jpg",
    "/images/colorful-bracelet.jpg",
  ],
  colors: ["Rainbow", "Pastel", "Ocean Blue", "Sunset Pink"],
  sizes: ["Kids (14cm)", "Teen (16cm)", "Adult (18cm)"],
  rating: 4.9,
  reviewCount: 47,
  materials: "Glass beads, elastic cord",
  handmade: true,
};

const REVIEWS = [
  { id: "1", name: "Sophie", rating: 5, comment: "So pretty and arrived really fast! I wear it every single day.", avatar: "🌸" },
  { id: "2", name: "Mia", rating: 5, comment: "My favourite bracelet ever. The colours are so bright and happy!", avatar: "🌈" },
  { id: "3", name: "Ella", rating: 5, comment: "Got one for me and one for my best friend. We love them!", avatar: "💖" },
  { id: "4", name: "Zara", rating: 4, comment: "Really lovely quality for the price. Will definitely buy again!", avatar: "⭐" },
];

const PERKS = [
  { icon: Package, labelKey: "perks.items.0.label", descKey: "perks.items.0.desc" },
  { icon: RefreshCw, labelKey: "perks.items.1.label", descKey: "perks.items.1.desc" },
  { icon: Shield, labelKey: "perks.items.2.label", descKey: "perks.items.2.desc" },
  { icon: Sparkles, labelKey: "perks.items.3.label", descKey: "perks.items.3.desc" },
];

const PERK_DATA = [
  { label: "Free UK Delivery", desc: "On all orders over £10" },
  { label: "Easy Returns", desc: "7-day no-fuss returns" },
  { label: "Safe & Secure", desc: "Handmade with care" },
  { label: "Unique & Special", desc: "No two are the same!" },
];

const RELATED = [
  { id: "star-power", name: "Star Power Bracelet", price: 5.50, image: "https://api.dicebear.com/7.x/shapes/svg?seed=glitter%20disco%20bracelet", badge: "New" },
  { id: "ocean-waves", name: "Ocean Waves Bracelet", price: 6.00, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a56cccef7ac246aba81502d15ef01f8f.jpg", badge: undefined },
  { id: "flower-garden", name: "Flower Garden Bracelet", price: 7.00, image: "https://api.dicebear.com/7.x/shapes/svg?seed=flower%20garden%20bracelet", badge: "Popular" },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "fill-current",
            size === "lg" ? "h-6 w-6" : "h-4 w-4",
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState(PRODUCT.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function prevImage() {
    setSelectedImage((i) => (i === 0 ? PRODUCT.images.length - 1 : i - 1));
  }

  function nextImage() {
    setSelectedImage((i) => (i === PRODUCT.images.length - 1 ? 0 : i + 1));
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24">
      {/* Breadcrumb */}
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors font-medium">
              {t("breadcrumb.shop")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)] font-semibold">{PRODUCT.name}</span>
          </nav>
        </div>
      </Reveal>

      {/* Main Product Section */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-3xl bg-[var(--card)] border-2 border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.08)] aspect-square">
                {PRODUCT.badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white shadow-md">
                    {PRODUCT.badge}
                  </span>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWishlisted((w) => !w)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-md border border-white/60"
                  aria-label={t("product.wishlist")}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      wishlisted ? "fill-red-400 text-red-400" : "text-gray-400"
                    )}
                  />
                </motion.button>

                <img
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=beaded%20bracelet";
                  }}
                />

                {/* Prev/Next */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-md border border-white/60 hover:bg-white transition-colors"
                  aria-label={t("product.prevImage")}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-md border border-white/60 hover:bg-white transition-colors"
                  aria-label={t("product.nextImage")}
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {PRODUCT.images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all",
                      selectedImage === i
                        ? "border-[var(--accent)] shadow-[0_0_0_3px_var(--accent)]"
                        : "border-[var(--border)] opacity-60 hover:opacity-100"
                    )}
                    aria-label={`${t("product.imageThumb")} ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${PRODUCT.name} view ${i + 1}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=beaded%20bracelet";
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-[var(--accent)] text-[var(--accent)] px-3 py-0.5 text-xs font-bold uppercase tracking-wide">
                    {t("product.handmadeLabel")}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-[var(--foreground)] leading-tight tracking-tight md:text-4xl">
                  {PRODUCT.name}
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <StarRating rating={PRODUCT.rating} size="sm" />
                  <span className="text-sm font-semibold text-[var(--foreground)]">{PRODUCT.rating}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    ({PRODUCT.reviewCount} {t("product.reviews")})
                  </span>
                </div>
              </div>

              <div className="text-4xl font-extrabold text-[var(--accent)]">
                {BRAND.currency}{PRODUCT.price.toFixed(2)}
              </div>

              <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
                {PRODUCT.longDescription}
              </p>

              {/* Color Picker */}
              <div>
                <p className="mb-2 text-sm font-bold text-[var(--foreground)]">
                  {t("product.colorLabel")}: <span className="text-[var(--accent)]">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-all",
                        selectedColor === color
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)]"
                      )}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Picker */}
              <div>
                <p className="mb-2 text-sm font-bold text-[var(--foreground)]">
                  {t("product.sizeLabel")}: <span className="text-[var(--accent)]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all",
                        selectedSize === size
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent)]"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--accent)]"
                      )}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-0 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-xl font-bold text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
                    aria-label={t("product.decreaseQty")}
                  >
                    −
                  </button>
                  <span className="px-5 py-3 text-lg font-extrabold text-[var(--foreground)] min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 text-xl font-bold text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
                    aria-label={t("product.increaseQty")}
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-extrabold shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all",
                    addedToCart
                      ? "bg-green-400 text-white"
                      : "bg-[var(--accent)] text-white hover:brightness-105"
                  )}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {addedToCart ? t("product.added") : t("product.addToCart")}
                </motion.button>
              </div>

              {/* Materials */}
              <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] px-5 py-4 text-sm text-[var(--muted-foreground)]">
                <span className="font-bold text-[var(--foreground)]">{t("product.materialsLabel")}: </span>
                {PRODUCT.materials}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Perks Strip */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {PERK_DATA.map((perk, i) => {
              const Icon = PERKS[i].icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--card)] border border-[var(--border)] p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
                >
                  <div className="rounded-full bg-[var(--accent)] p-3">
                    <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-bold text-[var(--foreground)]">{perk.label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{perk.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </Reveal>

      {/* Reviews */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                {t("reviews.heading")}
              </h2>
              <div className="mt-2 flex items-center gap-3">
                <StarRating rating={PRODUCT.rating} size="lg" />
                <span className="text-2xl font-extrabold text-[var(--foreground)]">{PRODUCT.rating}</span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {t("reviews.basedOn")} {PRODUCT.reviewCount} {t("reviews.reviews")}
                </span>
              </div>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {REVIEWS.map((review) => (
              <motion.div
                key={review.id}
                variants={scaleIn}
                className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" role="img" aria-label="reviewer avatar">{review.avatar}</span>
                  <div>
                    <p className="font-bold text-[var(--foreground)]">{review.name}</p>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{review.comment}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Reveal>

      {/* Related Products */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="mb-8 text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
            {t("related.heading")}
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {RELATED.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-3xl bg-[var(--card)] border-2 border-[var(--border)] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              >
                <Link href="/product-detail" className="block">
                  <div className="relative aspect-square overflow-hidden bg-[var(--muted-foreground)]">
                    {item.badge && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=beaded%20bracelet";
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-bold text-[var(--foreground)] text-base leading-snug">{item.name}</p>
                    <p className="mt-1 text-lg font-extrabold text-[var(--accent)]">
                      {BRAND.currency}{item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Reveal>

      {/* Back to Shop CTA */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="rounded-3xl bg-[var(--accent)] border-2 border-[var(--accent)]/20 p-10 text-center">
            <p className="text-2xl font-extrabold text-[var(--foreground)] mb-2">
              {t("cta.heading")}
            </p>
            <p className="text-[var(--muted-foreground)] mb-6 text-base">
              {t("cta.sub")}
            </p>
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-8 py-4 text-base font-extrabold text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all hover:brightness-105"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                {t("cta.button")}
              </motion.span>
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}