import Link from "next/link";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: "triggered-og-tee",
    name: "Triggered OG Tee",
    price: "$44.99",
    tag: "Best Seller",
    colorway: "#B31942",
  },
  {
    id: "freedom-hoodie",
    name: "Freedom Hoodie",
    price: "$79.99",
    tag: "New Drop",
    colorway: "#888680",
  },
  {
    id: "patriot-cap",
    name: "Patriot Snapback",
    price: "$34.99",
    colorway: "#B31942",
  },
  {
    id: "stand-ground-tee",
    name: "Stand Your Ground Tee",
    price: "$44.99",
    tag: "Limited",
    colorway: "#F5F0E8",
  },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blackout via-blackout to-[#0d0d0d]" />

        {/* Radial Glow */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(179,25,66,0.15) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,240,232,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Pre-headline */}
          <div className="animate-fade-in mb-6">
            <span className="inline-block px-4 py-1.5 border border-flag-red/30 text-flag-red font-heading text-[10px] md:text-xs tracking-[0.5em] uppercase">
              Unapologetically American
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-text-shadow font-heading text-aged-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-8 animate-fade-in-up">
            BUILT
            <span className="block text-flag-red">DIFFERENT.</span>
          </h1>

          {/* Sub-headline */}
          <p className="font-heading text-steel-gray text-lg md:text-xl tracking-[0.3em] uppercase mb-12 animate-fade-in-up opacity-0 stagger-2">
            Worn With Intent.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-3">
            <Link
              href="/shop"
              id="hero-cta-primary"
              className="cta-button px-10 py-4 bg-flag-red text-aged-white font-heading text-sm tracking-[0.25em] uppercase hover:bg-red-700 transition-all duration-300 animate-pulse-glow"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              id="hero-cta-secondary"
              className="px-10 py-4 border border-steel-gray/30 text-steel-gray font-heading text-sm tracking-[0.25em] uppercase hover:border-aged-white hover:text-aged-white transition-all duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-steel-gray/30 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1 h-2.5 bg-steel-gray/50 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE BANNER
          ═══════════════════════════════════════════ */}
      <MarqueeBanner />

      {/* ═══════════════════════════════════════════
          BRAND STATEMENT SECTION
          ═══════════════════════════════════════════ */}
      <section id="brand-statement" className="relative py-24 md:py-32 diagonal-stripes">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-0.5 bg-flag-red mx-auto mb-8" />
          <p className="font-heading text-aged-white/90 text-2xl md:text-4xl lg:text-5xl leading-snug tracking-wide">
            We don&apos;t make clothes for{" "}
            <span className="text-steel-gray/40">everyone</span>.
          </p>
          <p className="font-heading text-flag-red text-2xl md:text-4xl lg:text-5xl leading-snug tracking-wide mt-2">
            We make them for the ones who stand.
          </p>
          <div className="w-12 h-0.5 bg-flag-red mx-auto mt-8" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED PRODUCTS
          ═══════════════════════════════════════════ */}
      <section id="featured-products" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <span className="font-heading text-flag-red text-xs tracking-[0.4em] uppercase block mb-3">
                Latest Drops
              </span>
              <h2 className="font-heading text-aged-white text-3xl md:text-5xl font-bold tracking-tight">
                FEATURED GEAR
              </h2>
            </div>
            <Link
              href="/shop"
              className="nav-link font-heading text-steel-gray text-sm tracking-[0.2em] uppercase hover:text-aged-white transition-colors duration-300 self-start md:self-auto"
            >
              View All →
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════ */}
      <section id="cta-banner" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-flag-red via-[#8B1233] to-flag-red" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 80px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-aged-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            JOIN THE MOVEMENT
          </h2>
          <p className="text-aged-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get early access to drops, exclusive designs, and content that
            doesn&apos;t apologize.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              id="email-signup"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-4 bg-blackout/30 border border-aged-white/20 text-aged-white placeholder-aged-white/40 font-body text-sm tracking-wider focus:outline-none focus:border-aged-white/50 transition-colors duration-300 backdrop-blur-sm"
            />
            <button
              id="signup-button"
              className="w-full sm:w-auto px-8 py-4 bg-blackout text-aged-white font-heading text-xs tracking-[0.2em] uppercase hover:bg-[#111] transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
