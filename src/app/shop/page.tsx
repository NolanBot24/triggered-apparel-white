import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop — TRIGGERED APPAREL",
  description:
    "Browse the full collection. Bold patriot apparel built for those who stand their ground.",
};

const allProducts = [
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
  {
    id: "no-apology-crewneck",
    name: "No Apology Crewneck",
    price: "$64.99",
    colorway: "#888680",
  },
  {
    id: "defend-flag-tank",
    name: "Defend The Flag Tank",
    price: "$38.99",
    tag: "Summer Drop",
    colorway: "#B31942",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SHOP HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blackout via-blackout to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="font-heading text-flag-red text-xs tracking-[0.4em] uppercase block mb-4">
            The Collection
          </span>
          <h1 className="font-heading text-aged-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
            SHOP
            <span className="text-steel-gray/30">.</span>
          </h1>
          <p className="mt-6 text-steel-gray text-base md:text-lg max-w-lg leading-relaxed">
            Every piece built with purpose. No fillers. No compromises. Just
            gear that says what you mean.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FILTER BAR
          ═══════════════════════════════════════════ */}
      <section id="shop-filters" className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap items-center gap-3 border-b border-steel-gray/10 pb-6">
          {["All", "Tees", "Hoodies", "Hats", "Accessories"].map(
            (filter, i) => (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                className={`px-5 py-2 font-heading text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  i === 0
                    ? "bg-flag-red text-aged-white"
                    : "border border-steel-gray/20 text-steel-gray hover:border-flag-red hover:text-flag-red"
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
      <section id="product-grid" className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button
            id="load-more"
            className="px-12 py-4 border border-steel-gray/20 text-steel-gray font-heading text-xs tracking-[0.25em] uppercase hover:border-flag-red hover:text-flag-red transition-all duration-300"
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
}
