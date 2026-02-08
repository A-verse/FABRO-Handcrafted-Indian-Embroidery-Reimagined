'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-charcoal/10">
      <nav className="container-custom py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="heading-md text-maroon group-hover:text-wine-red transition-colors">
              FABRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="body-sm text-charcoal hover:text-wine-red transition-colors">
              Shop
            </Link>
            <Link href="#collections" className="body-sm text-charcoal hover:text-wine-red transition-colors">
              Collections
            </Link>
            <Link href="/customize" className="body-sm text-charcoal hover:text-wine-red transition-colors">
              Customize
            </Link>
            <Link href="#about" className="body-sm text-charcoal hover:text-wine-red transition-colors">
              Our Story
            </Link>
            <Link href="#contact" className="body-sm text-charcoal hover:text-wine-red transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/products" className="hidden sm:block btn-secondary">
              Shop Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-charcoal/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                className="w-5 h-5 text-charcoal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 border-t border-charcoal/10 pt-4 animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                className="body-sm text-charcoal hover:text-wine-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="#collections"
                className="body-sm text-charcoal hover:text-wine-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/customize"
                className="body-sm text-charcoal hover:text-wine-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Customize
              </Link>
              <Link
                href="#about"
                className="body-sm text-charcoal hover:text-wine-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link
                href="#contact"
                className="body-sm text-charcoal hover:text-wine-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href="/products" className="btn-secondary w-full mt-4" onClick={() => setIsMenuOpen(false)}>
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
