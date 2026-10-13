export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency?: string;
  image: string;
  description?: string;
  shortDescription?: string;
  slug?: string;
  materials?: string | string[];
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const BRAND = {
  name: "Lily's Bracelet Shop",
  tagline: "Handmade with love, one bead at a time 💕",
  makerName: "Lily",
  makerAge: 10,
  currency: "£",
} as const;

export const navLinks: NavLink[] = [
  { label: "Shop", href: "/", key: "shop" },
  { label: "Cart", href: "/cart", key: "cart" },
];
