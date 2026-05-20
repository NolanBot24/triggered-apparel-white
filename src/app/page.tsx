import Link from "next/link";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: "triggered-og-tee",
    name: "Triggered OG Tee",
    price: "$44.99",
    tag: "Best Seller",
  },
  {
    id: "freedom-hoodie",
    name: "Freedom Hoodie",
    price: "$79.99",
    tag: "New Drop",
  },
  {
    id: "patriot-cap",
    name: "Patriot Snapback",
    price: "$34.99",
  },
  {
    id: "stand-ground-tee",
    name: "Stand Your Ground Tee",
    price: "$44.99",
    tag: "Limited",
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
      >
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Pre-headline tag */}
          <div className="animate-fade-in mb-10">
            <span className="inline-flex items-center gap-3">
              <span className="red-accent" />
              <span className="font-body text-warm-gray text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-medium">
                Unapologetically American
              </span>
              <span className="red-accent" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-charcoal text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-bold tracking-[-0.02em] leading-[0.85] mb-4 animate-fade-in-up">
            BUILT
            <br />
            <span className="relative inline-block">
              DIFFERENT
              <span className="absolute -bottom-2 right-0 w-full h-[3px] bg-flag-red animate-width-expand" />
            </span>
            <span className="text-flag-red">.</span>
          </h1>

          {/* Sub-headline */}
          <p className="font-body text-warm-gray text-sm md:text-base tracking-[0.4em] uppercase mt-8 mb-14 animate-fade-in-up opacity-0 stagger-2">
            Worn With Intent.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-3">
            <Link
              href="/shop"
              id="hero-cta-primary"
              className="px-12 py-4 bg-charcoal text-cream font-heading text-[11px] tracking-[0.3em] uppercase hover:bg-flag-red transition-colors duration-500"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              id="hero-cta-secondary"
              className="px-12 py-4 border border-charcoal/20 text-charcoal font-heading text-[11px] tracking-[0.3em] uppercase hover:border-charcoal transition-all duration-500"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-charcoal/20" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE BANNER
          ═══════════════════════════════════════════ */}
      <MarqueeBanner />

      {/* ═══════════════════════════════════════════
          BRAND STATEMENT SECTION
          ═══════════════════════════════════════════ */}
      <section id="brand-statement" className="relative py-28 md:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-heading text-warm-gray/50 text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            We don&apos;t make clothes for everyone.
          </p>
          <p className="font-heading text-charcoal text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mt-3">
            We make them for{" "}
            <span className="relative inline-block">
              the ones who stand
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-flag-red" />
            </span>
            .
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED PRODUCTS
          ═══════════════════════════════════════════ */}
      <section id="featured-products" className="relative py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <div className="red-accent mb-6" />
              <h2 className="font-heading text-charcoal text-3xl md:text-5xl font-bold tracking-tight">
                FEATURED GEAR
              </h2>
            </div>
            <Link
              href="/shop"
              className="nav-link font-body text-warm-gray text-[11px] tracking-[0.25em] uppercase hover:text-charcoal transition-colors duration-300 self-start md:self-auto"
            >
              View All →
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════ */}
      <section id="cta-banner" className="relative py-28 md:py-36 bg-charcoal overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="w-10 h-[2px] bg-flag-red mx-auto mb-10" />
          <h2 className="font-heading text-cream text-4xl md:text-6xl font-bold tracking-tight mb-6">
            JOIN THE MOVEMENT
          </h2>
          <p className="text-cream/50 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-body">
            Get early access to drops, exclusive designs, and content that
            doesn&apos;t apologize.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              id="email-signup"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-4 bg-transparent border border-cream/15 text-cream placeholder-cream/30 font-body text-sm tracking-wider focus:outline-none focus:border-cream/40 transition-colors duration-300"
            />
            <button
              id="signup-button"
              className="w-full sm:w-auto px-8 py-4 bg-cream text-charcoal font-heading text-[10px] tracking-[0.25em] uppercase hover:bg-flag-red hover:text-cream transition-all duration-400"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
