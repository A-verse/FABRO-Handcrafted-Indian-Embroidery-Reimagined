FABRO — Handcrafted Indian Embroidery, Reimagined

FABRO is a premium Indian embroidered clothing brand website that celebrates timeless craftsmanship through a modern, image-led digital experience.
The platform combines ready-to-wear embroidered products with an advanced customization flow, enabling customers to co-create meaningful pieces rooted in tradition.

---

## Brand Philosophy

FABRO is built on the belief that embroidery is not decoration — it is storytelling.

Every product, interaction, and visual element is designed to:

* Preserve traditional Indian embroidery techniques
* Highlight artisan craftsmanship
* Present heritage through a modern, minimal lens
* Feel personal, warm, and intentionally crafted

This is not fast fashion.
This is slow, thoughtful design — both in clothing and code.

---

## Visual & Experience Design

### Design Language

* Calm, editorial, image-first layouts
* Large, immersive section visuals
* Generous spacing (layout gutters & vertical rhythm)
* Subtle micro-animations for depth and elegance
* No loud colors, no visual noise

### Color Palette

* Ivory / Off-white backgrounds for softness
* Deep maroon and wine tones for heritage
* Muted gold accents for embroidery highlights
* High contrast, accessibility-friendly text colors

### Typography

* Serif headings for cultural depth (Playfair Display)
* Clean sans-serif body text for modern readability (DM Sans)

---

## Core Features

### Ready-to-Buy Products

* Pre-made embroidered items such as:

  * Kurtis
  * Shirts
  * Dupattas
  * Jeans
  * Accessories
* Product ratings, reviews, and tags
* Best Sellers, Trending, Newly Launched, and On-Sale sections

### Advanced Customization Flow

Customers can commission embroidery in multiple ways:

* Customize FABRO-sourced garments
* Send their own existing or purchased clothing via parcel
* Upload reference embroidery design images
* Select placement, colors, and special notes

The flow is step-by-step, guided, and logistics-aware.

### Cart & Ordering System

* Add multiple products to cart
* Quantity management
* Pay on Delivery (COD) flow
* Order confirmation via WhatsApp and Email
* No forced checkout friction

### Product Discovery

* Category-based filtering
* Tag-based discovery
* Smooth client-side filtering
* Clean empty states and transitions

### WhatsApp-First Commerce

* Pre-filled WhatsApp messages
* Product details auto-included
* Human-assisted order confirmation

### Marketplace Presence

* Trust layer highlighting availability on Meesho
* Non-pushy, credibility-focused integration

---

## Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Images**: next/image with optimization
* **State Management**: Local state (cart, filters)
* **SEO**: Metadata + JSON-LD Product schema
* **Deployment Ready**: Production-optimized build

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout & metadata
│   ├── page.tsx          # Landing page
│   ├── globals.css       # Global styles & animations
│
├── components/
│   ├── navigation/       # Navbar & mobile menu
│   ├── hero/             # Landing hero with imagery
│   ├── products/         # Cards, filters, product views
│   ├── customization/    # Custom embroidery flow
│   ├── cart/             # Cart & COD logic
│   ├── testimonials/     # National & international reviews
│   └── footer/
│
├── data/
│   └── products.json     # CMS-ready product schema
│
├── utils/
│   ├── whatsapp.ts       # Pre-filled WhatsApp logic
│   └── seo.ts            # Structured data helpers
│
public/
├── images/               # Placeholder & product images
```

---

## Accessibility & Performance

* Semantic HTML and proper heading hierarchy
* Keyboard-friendly navigation
* Optimized images and lazy loading
* Consistent spacing across devices
* Mobile-first responsive design

---

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## Roadmap

* CMS integration (Sanity / Strapi)
* Admin order dashboard
* International shipping logic
* Artisan stories & journal section
* SEO expansion for collections

---

## Contact & Orders

* WhatsApp: Primary order and support channel
* Email: [hello@fabro.in](mailto:hello@fabro.in)
* Website: [www.fabro.in](http://www.fabro.in)

---

## License

Private project.
All rights reserved © FABRO.

---

FABRO is designed not just to sell products —
but to **honor the craft behind every stitch**.

