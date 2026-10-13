"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { type CartItem, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

// ── Inline mock cart data ──────────────────────────────────────────────────
const INITIAL_CART: CartItem[] = [
  {
    id: "1",
    slug: "rainbow-beaded",
    name: "Rainbow Beaded Bracelet",
    price: 4.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=green%20leaf%20bracelet",
    shortDescription: "Bright rainbow beads on stretchy cord",
    badge: "Bestseller",
    quantity: 2,
  },
  {
    id: "2",
    slug: "flower-charm",
    name: "Flower Charm Bracelet",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=flower%20garden%20bracelet",
    shortDescription: "Tiny flower charms with pink beads",
    badge: "New",
    quantity: 1,
  },
  {
    id: "3",
    slug: "friendship-knot",
    name: "Friendship Knot Bracelet",
    price: 3.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=friendship%20bracelet",
    shortDescription: "Knotted thread in your favourite colours",
    quantity: 1,
  },
];

const SHIPPING_THRESHOLD = 15;
const SHIPPING_COST = 1.5;

// ── Variants ───────────────────────────────────────────────────────────────
const rowExit: Variants = {
  hidden: { opacity: 0, x: -40, height: 0, marginBottom: 0 },
  visible: { opacity: 1, x: 0, height: "auto", marginBottom: 16 },
};

// ── Sub-components (inline) ────────────────────────────────────────────────

function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const t = useTranslations();
  return (
    <motion.div
      layout
      key={item.id}
      variants={rowExit}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--border)]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=green%20leaf%20bracelet";
          }}
        />
        {item.badge && (
          <span className="absolute left-1 top-1 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="font-bold text-[var(--primary)] leading-tight">{item.name}</p>
          <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{item.shortDescription}</p>
        </div>
        <div className="flex items-center justify-between">
          {/* Quantity adjuster */}
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => onDecrease(item.id)}
              aria-label={t("cart.decrease")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--primary)] transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Minus className="h-3.5 w-3.5" />
            </motion.button>
            <span className="w-5 text-center text-sm font-bold text-[var(--primary)]">
              {item.quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => onIncrease(item.id)}
              aria-label={t("cart.increase")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--primary)] transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Plus className="h-3.5 w-3.5" />
            </motion.button>
          </div>
          {/* Line price */}
          <p className="font-bold text-[var(--primary)]">
            {BRAND.currency}{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Remove */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(item.id)}
        aria-label={t("cart.remove")}
        className="self-start rounded-full p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}

function CartSummary({
  subtotal,
  shipping,
  total,
  freeShippingLeft,
}: {
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingLeft: number;
}) {
  const t = useTranslations();
  const progress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="sticky top-24 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]"
    >
      <h2 className="mb-5 text-xl font-bold text-[var(--primary)]">{t("cart.summary.title")}</h2>

      {/* Free shipping progress */}
      <div className="mb-5 rounded-2xl bg-[var(--card)] p-3">
        {freeShippingLeft > 0 ? (
          <p className="mb-2 text-sm text-[var(--muted-foreground)]">
            {t("cart.summary.freeShippingProgress", { amount: `${BRAND.currency}${freeShippingLeft.toFixed(2)}` })}
          </p>
        ) : (
          <p className="mb-2 text-sm font-semibold text-green-600">{t("cart.summary.freeShippingUnlocked")}</p>
        )}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-3 border-b border-[var(--border)] pb-4">
        <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
          <span>{t("cart.summary.subtotal")}</span>
          <span className="font-semibold text-[var(--primary)]">{BRAND.currency}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
          <span>{t("cart.summary.shipping")}</span>
          <span className={cn("font-semibold", shipping === 0 ? "text-green-600" : "text-[var(--primary)]")}
          >
            {shipping === 0 ? t("cart.summary.free") : `${BRAND.currency}${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between">
        <span className="text-lg font-bold text-[var(--primary)]">{t("cart.summary.total")}</span>
        <span className="text-lg font-bold text-[var(--accent)]">{BRAND.currency}{total.toFixed(2)}</span>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white shadow-[0_4px_18px_-4px_var(--accent)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {t("cart.summary.checkout")}
        <ArrowRight className="h-4 w-4" />
      </motion.button>

      <Link
        href="/"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--accent)] bg-white px-6 py-3 text-sm font-bold text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {t("cart.summary.continueShopping")}
      </Link>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const increase = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  }, []);

  const decrease = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const freeShippingLeft = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 pt-10">
          <div className="mb-8 flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-[var(--accent)]" />
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--primary)] sm:text-4xl">
              {t("cart.title")}
            </h1>
            <span className="ml-1 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-sm font-bold text-white">
              {items.length}
            </span>
          </div>

          {items.length === 0 ? (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-[var(--border)] bg-white py-20 text-center shadow-sm"
            >
              <span className="text-6xl">🛒</span>
              <div>
                <p className="text-xl font-bold text-[var(--primary)]">{t("cart.empty.title")}</p>
                <p className="mt-1 text-[var(--muted-foreground)]">{t("cart.empty.subtitle")}</p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-base font-bold text-white shadow-[0_4px_18px_-4px_var(--accent)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Sparkles className="h-4 w-4" />
                {t("cart.empty.cta")}
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onIncrease={increase}
                      onDecrease={decrease}
                      onRemove={remove}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div>
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  freeShippingLeft={freeShippingLeft}
                />
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </main>
  );
}
