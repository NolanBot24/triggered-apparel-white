import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop — TRIGGERED APPAREL",
  description:
    "Browse the full collection. Premium patriot apparel built for those who stand their ground.",
};

const allProducts = [
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
  {
    id: "no-apology-crewneck",
    name: "No Apology Crewneck",
    price: "$64.99",
  },
  {
    id: "defend-flag-tank",
    name: "Defend The Flag Tank",
    price: "$38.99",
    tag: "Summer Drop",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SHOP HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="red-accent mb-6" />
          <h1 className="font-heading text-charcoal text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.85]">
            SHOP<span className="text-flag-red">.</span>
          </h1>
          <p className="mt-8 text-warm-gray text-base md:text-lg max-w-lg leading-relaxed font-body">
            Every piece built with purpose. No fillers. No compromises. Just
            gear that says what you mean.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FILTER BAR
          ═══════════════════════════════════════════ */}
      <section id="shop-filters" className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 bg-cream">
        <div className="flex flex-wrap items-center gap-3 border-b border-light-border pb-6">
          {["All", "Tees", "Hoodies", "Hats", "Accessories"].map(
            (filter, i) => (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                className={`px-5 py-2.5 font-body text-[10px] tracking-[0.25em] uppercase transition-all duration-400 ${
                  i === 0
                    ? "bg-charcoal text-cream"
                    : "border border-light-border text-warm-gray hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCT GRID
          ═══════════════════════════════════════════ */}
      <section id="product-grid" className="max-w-7xl mx-auto px-6 lg:px-10 pb-28 md:pb-36 bg-cream">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-20">
          <button
            id="load-more"
            className="px-14 py-4 border border-charcoal/15 text-warm-gray font-heading text-[10px] tracking-[0.3em] uppercase hover:border-charcoal hover:text-charcoal transition-all duration-400"
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
}
