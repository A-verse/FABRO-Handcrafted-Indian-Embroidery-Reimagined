import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FABRO - Premium Indian Embroidered Clothing",
  description:
    "Handcrafted embroidered clothing and textiles with custom embroidery services. Blending modern luxury with traditional Indian heritage.",
  keywords: [
    "Indian embroidery",
    "handcrafted clothing",
    "ethnic wear",
    "luxury embroidered textiles",
    "custom embroidery",
  ],
  authors: [{ name: "FABRO" }],
  openGraph: {
    title: "FABRO - Premium Indian Embroidered Clothing",
    description: "Handcrafted embroidered clothing and textiles with custom embroidery services.",
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-charcoal font-sans antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
