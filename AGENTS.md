# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
A little shop page for the bracelets I make

## Goal
Build a charming handmade bracelet shop with a warm artisan aesthetic, featuring a homepage, product detail page, and cart page.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #FFF8F2`, `--foreground: #3B2314`, `--card: #FFFFFF`, `--border: #F0D9C8`, `--muted-foreground: #8C5E45`, `--primary: #E8735A`, `--accent: #F2A97E`, `--primary-hover: #D45E45`, `--accent-light: #FDE8D8`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `breadcrumb`, `cart`, `cta`, `footer`, `hero`, `howItWorks`, `nav`, `perks`, `product`, `products`, `related`, `reviews`, `shop`, `valueProps`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
