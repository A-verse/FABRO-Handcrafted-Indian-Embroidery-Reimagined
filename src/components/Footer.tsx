'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-maroon text-ivory">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h3 className="heading-md text-ivory mb-4">FABRO</h3>
            <p className="body-sm text-ivory/70 mb-6">
              Handcrafted embroidered clothing celebrating Indian heritage with contemporary elegance.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center hover:bg-ivory hover:text-maroon transition-all"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 100-8 4 4 0 000 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center hover:bg-ivory hover:text-maroon transition-all"
              >
                <span className="sr-only">Pinterest</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.937-.2-2.378.042-3.41.232-.994 1.52-6.455 1.52-6.455s-.389-.78-.389-1.933c0-1.81.95-3.165 2.138-3.165 1.006 0 1.497.755 1.497 1.66 0 1.01-.645 2.518-.977 3.916-.276 1.159.581 2.105 1.725 2.105 2.068 0 3.66-2.18 3.66-5.33 0-2.79-2.004-4.74-4.86-4.74-3.308 0-5.246 2.48-5.246 5.05 0 1.002.378 2.08.835 2.66.092.112.103.21.077.312l-.324 1.31c-.046.186-.15.227-.342.137-1.21-.597-1.966-2.475-1.966-3.98 0-3.648 2.66-7.006 7.658-7.006 4.018 0 7.14 2.864 7.14 6.7 0 4.002-2.525 7.224-6.032 7.224-1.178 0-2.286-.612-2.666-1.334l-.727 2.768c-.266 1.008-1.005 2.268-1.494 3.036 1.124.347 2.317.535 3.552.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-1">
            <h4 className="heading-sm text-ivory mb-6">Navigate</h4>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#collections" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="/customize" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  Customize
                </a>
              </li>
              <li>
                <a href="#about" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-1">
            <h4 className="heading-sm text-ivory mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@fabro.in" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  Email Us
                </a>
              </li>
              <li>
                <a href="https://wa.me/8852808522" target="_blank" rel="noopener noreferrer" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="body-sm text-ivory/70 hover:text-ivory transition-colors">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="heading-sm text-ivory mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div>
                <p className="label-text text-ivory/60 mb-1">Email</p>
                <a href="mailto:hello@fabro.in" className="body-sm text-ivory hover:text-ivory/70">
                  hello@fabro.in
                </a>
              </div>
              <div>
                <p className="label-text text-ivory/60 mb-1">Custom Commissions</p>
                <a href="https://wa.me/8852808522" target="_blank" rel="noopener noreferrer" className="body-sm text-ivory hover:text-ivory/70">
                  WhatsApp for quotes
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-ivory/10 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="body-sm text-ivory/60">
            © {currentYear} FABRO. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="body-sm text-ivory/60 hover:text-ivory transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="body-sm text-ivory/60 hover:text-ivory transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
