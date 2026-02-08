export type ProductCategory = "Kurtis" | "Shirts" | "Dupattas" | "Jeans" | "Accessories" | "Custom Pieces";
export type ProductSection = "best-sellers" | "trending" | "new-launches" | "on-sale";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: ProductCategory;
  sections: ProductSection[];
  image: string;
  embroideryDetails: string;
  fabric: string;
  care: string;
  color?: string;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  text: string;
  author: string;
  country: string;
  date: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ivory Heirloom Kurti",
    description: "Hand-embroidered ivory kurti with traditional peacock motifs",
    price: 3500,
    originalPrice: 4200,
    rating: 4.8,
    reviewCount: 45,
    category: "Kurtis",
    sections: ["best-sellers", "trending"],
    image: "product-kurti-1",
    embroideryDetails: "Peacock motif embroidery with gold thread and bead work",
    fabric: "Premium cotton with silk blend",
    care: "Dry clean recommended",
  },
  {
    id: 2,
    name: "Maroon Wine Shirt",
    description: "Luxurious shirt with wine-red embroidered collar and cuffs",
    price: 2800,
    rating: 4.6,
    reviewCount: 38,
    category: "Shirts",
    sections: ["best-sellers", "new-launches"],
    image: "product-shirt-1",
    embroideryDetails: "Collar and cuff embroidery with traditional motifs",
    fabric: "Premium cotton",
    care: "Machine wash on delicate",
  },
  {
    id: 3,
    name: "Golden Dupatta",
    description: "Elegant dupatta with muted gold embroidered borders",
    price: 1800,
    rating: 4.7,
    reviewCount: 62,
    category: "Dupattas",
    sections: ["trending", "best-sellers"],
    image: "product-dupatta-1",
    embroideryDetails: "Full border embroidery with floral patterns",
    fabric: "Pure cotton",
    care: "Hand wash recommended",
  },
  {
    id: 4,
    name: "Embroidered Jeans",
    description: "Casual jeans with subtle ankle embroidery detailing",
    price: 2200,
    originalPrice: 2600,
    rating: 4.5,
    reviewCount: 28,
    category: "Jeans",
    sections: ["new-launches", "on-sale"],
    image: "product-jeans-1",
    embroideryDetails: "Ankle cuff embroidery with modern geometric patterns",
    fabric: "Premium denim with cotton blend",
    care: "Machine wash in cold water",
  },
  {
    id: 5,
    name: "Hand-embroidered Handkerchiefs",
    description: "Set of 3 beautifully embroidered cotton handkerchiefs",
    price: 1200,
    rating: 4.9,
    reviewCount: 89,
    category: "Accessories",
    sections: ["best-sellers", "trending"],
    image: "product-handkerchief-1",
    embroideryDetails: "Corner embroidery with intricate thread work",
    fabric: "Pure cotton",
    care: "Hand wash and dry flat",
  },
  {
    id: 6,
    name: "Sage Green Kurti",
    description: "Soft sage green kurti with delicate floral embroidery",
    price: 3200,
    rating: 4.7,
    reviewCount: 52,
    category: "Kurtis",
    sections: ["trending", "new-launches"],
    image: "product-kurti-2",
    embroideryDetails: "All-over floral embroidery with French knots",
    fabric: "Organic cotton",
    care: "Dry clean for best results",
  },
  {
    id: 7,
    name: "Cream Heritage Shirt",
    description: "Classic cream shirt with heritage embroidery on front panel",
    price: 3000,
    originalPrice: 3500,
    rating: 4.6,
    reviewCount: 34,
    category: "Shirts",
    sections: ["on-sale"],
    image: "product-shirt-2",
    embroideryDetails: "Front panel heritage motif embroidery",
    fabric: "Premium cotton",
    care: "Machine wash on gentle cycle",
  },
  {
    id: 8,
    name: "Beige Embroidered Dupatta",
    description: "Lightweight dupatta with traditional paisley embroidery",
    price: 1600,
    rating: 4.8,
    reviewCount: 71,
    category: "Dupattas",
    sections: ["best-sellers"],
    image: "product-dupatta-2",
    embroideryDetails: "Paisley motif all-over embroidery",
    fabric: "Pure cotton voile",
    care: "Hand wash in lukewarm water",
  },
  {
    id: 9,
    name: "Custom Embroidered Sleeve",
    description: "Bespoke embroidered sleeve piece for personalized styling",
    price: 1400,
    rating: 4.9,
    reviewCount: 19,
    category: "Custom Pieces",
    sections: ["new-launches"],
    image: "product-custom-1",
    embroideryDetails: "Customizable embroidery design per client request",
    fabric: "Cotton blend",
    care: "As per design recommendations",
  },
  {
    id: 10,
    name: "Indigo Embroidered Jeans",
    description: "Deep indigo jeans with traditional embroidered pockets",
    price: 2400,
    rating: 4.7,
    reviewCount: 41,
    category: "Jeans",
    sections: ["trending"],
    image: "product-jeans-2",
    embroideryDetails: "Pocket and hem embroidery with tribal patterns",
    fabric: "Premium indigo denim",
    care: "Wash separately first time",
  },
  {
    id: 11,
    name: "Silk Scarf - Maroon",
    description: "Luxury silk scarf with embroidered border",
    price: 2000,
    originalPrice: 2500,
    rating: 4.9,
    reviewCount: 55,
    category: "Accessories",
    sections: ["best-sellers", "on-sale"],
    image: "product-scarf-1",
    embroideryDetails: "Silk embroidery on block-printed border",
    fabric: "Pure silk",
    care: "Dry clean only",
  },
  {
    id: 12,
    name: "Burgundy Kurti with Dupatta",
    description: "Complete set - burgundy kurti with matching embroidered dupatta",
    price: 4500,
    originalPrice: 5200,
    rating: 4.8,
    reviewCount: 38,
    category: "Kurtis",
    sections: ["new-launches", "on-sale"],
    image: "product-kurti-set-1",
    embroideryDetails: "Coordinated embroidery on kurti and dupatta",
    fabric: "Premium cotton with silk trim",
    care: "Professional dry clean recommended",
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    rating: 5,
    text: "Absolutely exquisite! The hand embroidery is impeccable. Every thread is placed with such care. Worth every rupee.",
    author: "Priya Sharma",
    country: "India",
    date: "2026-01-28",
  },
  {
    id: 2,
    productId: 1,
    rating: 4,
    text: "Beautiful kurti, exactly as described. The fabric is soft and the embroidery is detailed. Highly recommend!",
    author: "Sarah Mitchell",
    country: "USA",
    date: "2026-01-20",
  },
  {
    id: 3,
    productId: 2,
    rating: 5,
    text: "The craftsmanship is outstanding. This shirt is a statement piece. Perfect for celebrations.",
    author: "Anjali Verma",
    country: "India",
    date: "2026-01-15",
  },
  {
    id: 4,
    productId: 3,
    rating: 5,
    text: "Stunning dupatta! The embroidery is so intricate and the colors are vibrant. My favorite purchase!",
    author: "Emma Johnson",
    country: "UK",
    date: "2026-01-10",
  },
  {
    id: 5,
    productId: 5,
    rating: 5,
    text: "Perfect quality handkerchiefs. Each one is a work of art. Great gift too!",
    author: "Meera Gupta",
    country: "India",
    date: "2026-01-05",
  },
  {
    id: 6,
    productId: 11,
    rating: 5,
    text: "The silk quality is premium and the embroidery is divine. Absolutely love it!",
    author: "Elena Romano",
    country: "Italy",
    date: "2025-12-28",
  },
];

export const categories: ProductCategory[] = ["Kurtis", "Shirts", "Dupattas", "Jeans", "Accessories", "Custom Pieces"];

export const sections: { id: ProductSection; label: string; description: string }[] = [
  { id: "best-sellers", label: "Best Sellers", description: "Customer favorites and most loved pieces" },
  { id: "trending", label: "Trending Now", description: "Most popular this season" },
  { id: "new-launches", label: "Newly Launched", description: "Fresh designs and latest arrivals" },
  { id: "on-sale", label: "On Sale", description: "Limited time offers and discounts" },
];

export function getProductsByCategory(category: ProductCategory | "All"): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function getProductsBySection(section: ProductSection): Product[] {
  return products.filter((p) => p.sections.includes(section));
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
