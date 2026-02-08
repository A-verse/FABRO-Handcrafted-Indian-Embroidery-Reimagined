"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Send via WhatsApp (fallback approach)
    const message = `New Inquiry:\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(`https://wa.me/8852808522?text=${encodeURIComponent(message)}`, "_blank");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleWhatsAppDirect = () => {
    const message = "Hi FABRO team! I'd like to place an order and discuss custom options.";
    window.open(`https://wa.me/8852808522?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleEmailDirect = () => {
    window.location.href = "mailto:hello@fabro.in?subject=FABRO Inquiry&body=Hello%2C%0A%0AI%27m interested in learning more about FABRO products.";
  };

  return (
    <section className="section-spacing-lg bg-ivory relative overflow-hidden">
      {/* Background imagery */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=60"
          alt="Embroidery background texture"
          fill
          className="object-cover"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-muted-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-wine-red/5 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
          <p className="label-text mb-4">CONNECT WITH US</p>
          <h2 className="heading-display-sm text-charcoal mb-6">Get in Touch</h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full"></div>
          </div>
          <p className="body-lg text-charcoal/70">
            Have questions about our products, custom orders, or wholesale opportunities? Reach out now!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* WhatsApp Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-ivory rounded-lg p-8 text-center shadow-card hover:shadow-xl hover:bg-white transition-all duration-300 group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">💬</div>
            <h3 className="heading-sm text-charcoal mb-3">WhatsApp (Fastest)</h3>
            <p className="body-sm text-charcoal/70 mb-8">Quick responses, direct with FABRO team</p>
            <button
              onClick={handleWhatsAppDirect}
              className="w-full btn-primary py-3 transition-all duration-200 font-medium"
            >
              Message on WhatsApp
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-white border border-ivory rounded-lg p-8 text-center shadow-card hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">✉️</div>
            <h3 className="heading-sm text-charcoal mb-3">Email</h3>
            <p className="body-sm text-charcoal/70 mb-4">hello@fabro.in</p>
            <button
              onClick={handleEmailDirect}
              className="w-full btn-secondary py-3 rounded-lg transition-all duration-200 hover:shadow-md font-medium"
            >
              Send Email
            </button>
          </div>

          {/* Contact Info Card */}
          <div className="bg-gradient-to-br from-maroon/5 to-wine-red/5 border border-muted-gold rounded-lg p-8 shadow-card hover:shadow-lg transition-all duration-300">
            <div className="text-5xl mb-6">📍</div>
            <h3 className="heading-sm text-charcoal mb-6">Other Ways to Reach</h3>
            <ul className="space-y-4 body-sm text-charcoal/80">
              <li className="pb-4 border-b border-muted-gold/30">
                <span className="font-medium text-wine-red block">WhatsApp:</span>
                <span className="text-charcoal/60">+91 8852 808 522</span>
              </li>
              <li className="pb-4 border-b border-muted-gold/30">
                <span className="font-medium text-wine-red block">Email:</span>
                <span className="text-charcoal/60">hello@fabro.in</span>
              </li>
              <li>
                <span className="font-medium text-wine-red block">Meesho:</span>
                <span className="text-charcoal/60">@fabro.official</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-gradient-to-br from-white to-ivory/30 rounded-lg p-8 md:p-12 border border-ivory shadow-card mb-16 animate-fade-in">
          <h3 className="heading-lg text-charcoal mb-2">Send us a Message</h3>
          <p className="body-sm text-charcoal/70 mb-10">Fill out the form below and we'll get back to you shortly</p>

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            {/* Name Field */}
            <div>
              <label className="label-text text-charcoal block mb-3">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input-base w-full px-4 py-3 bg-white border border-ivory rounded-lg focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all duration-200"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="label-text text-charcoal block mb-3">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="input-base w-full px-4 py-3 bg-white border border-ivory rounded-lg focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all duration-200"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="label-text text-charcoal block mb-3">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your order, custom design, or inquiry..."
                rows={5}
                className="textarea-base w-full px-4 py-3 bg-white border border-ivory rounded-lg focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20 transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm font-medium">
                ✓ Thank you! Your message has been sent to WhatsApp. Our team will respond shortly!
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm font-medium">
                ⚠️ Please fill in all fields with valid information.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-lg transition-all duration-200 hover:shadow-lg font-medium text-base"
            >
              Send Message
            </button>

            <p className="text-xs text-charcoal/50 text-center italic">
              Your message will be forwarded to our WhatsApp for fastest response.
            </p>
          </form>
        </div>

        {/* Inquiry Types Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-ivory/50 to-ivory/20 border border-ivory shadow-card hover:shadow-lg transition-all">
            <p className="text-3xl mb-4">🛍️</p>
            <p className="body-md font-bold text-charcoal mb-3">Product Orders</p>
            <p className="body-sm text-charcoal/70">
              Browse and order via WhatsApp for instant confirmation
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-ivory/50 to-ivory/20 border border-ivory shadow-card hover:shadow-lg transition-all">
            <p className="text-3xl mb-4">✨</p>
            <p className="body-md font-bold text-charcoal mb-3">Custom Designs</p>
            <p className="body-sm text-charcoal/70">
              Request personalized embroidery pieces tailored to you
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-ivory/50 to-ivory/20 border border-ivory shadow-card hover:shadow-lg transition-all">
            <p className="text-3xl mb-4">🤝</p>
            <p className="body-md font-bold text-charcoal mb-3">Wholesale</p>
            <p className="body-sm text-charcoal/70">
              Inquire about bulk orders and reseller partnerships
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
