"use client";

import { useState } from "react";

const MOCKUP_BASE = (cid: string) =>
  `https://cdn.customcat.com/DynamicImageHandler.ashx?view=1&ndz=1&cid=${cid}&did=194&logo=96B401A7-AB5D-1AEA-A399BF106CDFF723&photo=1&highres=1&designOriginY=top&designScaleMltplr=0&cc=1&pset=99&pw=263.14452&ph=276.51744&px=0&py=168.04393&pbc=&tt=&bt=&tn=&tm=&format=jpg`;

const PRODUCT = {
  id: "triggered-heavyweight-tee",
  customcatProductId: "1460-108905968",
  name: "Triggered Heavyweight Tee",
  description:
    "Built heavier. Garment-dyed for a worn-in feel that gets better over time. This is the shirt you reach for when you mean it.",
  colors: [
    { name: "Black", hex: "#1a1a1a", cid: "15181" },
    { name: "White", hex: "#f5f5f5", cid: "15182", border: true },
    { name: "Grey", hex: "#888888", cid: "18369" },
    { name: "Graphite", hex: "#4a4a4a", cid: "18376" },
  ],
  sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  pricing: {
    S: 34.99, M: 34.99, L: 34.99, XL: 34.99,
    "2XL": 36.99, "3XL": 37.99,
  } as Record<string, number>,
  skus: {
    "Black-S": "1460-15181-108905968-70016",
    "Black-M": "1460-15181-108905968-70017",
    "Black-L": "1460-15181-108905968-70018",
    "Black-XL": "1460-15181-108905968-70019",
    "Black-2XL": "1460-15181-108905968-70020",
    "Black-3XL": "1460-15181-108905968-70021",
    "White-S": "1460-15182-108905968-70023",
    "White-M": "1460-15182-108905968-70024",
    "White-L": "1460-15182-108905968-70025",
    "White-XL": "1460-15182-108905968-70026",
    "White-2XL": "1460-15182-108905968-70027",
    "White-3XL": "1460-15182-108905968-70028",
    "Grey-S": "1460-18369-108905968-84078",
    "Grey-M": "1460-18369-108905968-84087",
    "Grey-L": "1460-18369-108905968-84096",
    "Grey-XL": "1460-18369-108905968-84105",
    "Grey-2XL": "1460-18369-108905968-84114",
    "Grey-3XL": "1460-18369-108905968-84123",
    "Graphite-S": "1460-18376-108905968-84138",
    "Graphite-M": "1460-18376-108905968-84139",
    "Graphite-L": "1460-18376-108905968-84140",
    "Graphite-XL": "1460-18376-108905968-84141",
    "Graphite-2XL": "1460-18376-108905968-84142",
    "Graphite-3XL": "1460-18376-108905968-84143",
  } as Record<string, string>,
};

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const price = selectedSize
    ? PRODUCT.pricing[selectedSize]
    : PRODUCT.pricing["S"];

  const sku =
    selectedSize
      ? PRODUCT.skus[`${selectedColor.name}-${selectedSize}`]
      : null;

  async function handleAddToCart() {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError("");
    setAdding(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* IMAGE — swaps per color */}
          <div className="relative aspect-[3/4] bg-cream-dark border border-light-border overflow-hidden">
            <img
              src={MOCKUP_BASE(selectedColor.cid)}
              alt={`Triggered Heavyweight Tee in ${selectedColor.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-warm-gray mb-4">
              Triggered Apparel
            </p>
            <h1 className="font-heading text-charcoal text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              {PRODUCT.name.toUpperCase()}
            </h1>
            <p className="font-body text-warm-gray text-sm leading-relaxed mb-8">
              {PRODUCT.description}
            </p>

            {/* PRICE */}
            <div className="mb-8">
              <span className="font-heading text-charcoal text-2xl font-bold">
                ${price.toFixed(2)}
              </span>
              {selectedSize && ["2XL", "3XL"].includes(selectedSize) && (
                <span className="ml-3 font-body text-xs text-warm-gray">
                  Extended sizing
                </span>
              )}
            </div>

            {/* COLOR */}
            <div className="mb-8">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-charcoal mb-3">
                Color — <span className="text-warm-gray">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? "ring-2 ring-offset-2 ring-charcoal"
                        : "hover:ring-1 hover:ring-offset-1 hover:ring-charcoal/40"
                    }`}
                    style={{
                      background: color.hex,
                      border: color.border ? "1px solid #d1d1d1" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-8">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-charcoal mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setError(""); }}
                    className={`px-4 py-2.5 font-body text-xs tracking-[0.15em] uppercase border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-charcoal text-cream border-charcoal"
                        : "border-light-border text-warm-gray hover:border-charcoal hover:text-charcoal"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <p className="mt-2 font-body text-xs text-flag-red">{error}</p>
              )}
            </div>

            {/* SKU DEBUG — remove before launch */}
            {sku && (
              <p className="font-mono text-[10px] text-warm-gray/50 mb-4">
                SKU: {sku}
              </p>
            )}

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={adding || added}
              className={`w-full py-4 font-heading text-[11px] tracking-[0.3em] uppercase transition-all duration-400 ${
                added
                  ? "bg-charcoal/70 text-cream cursor-default"
                  : "bg-charcoal text-cream hover:bg-flag-red"
              }`}
            >
              {added ? "Added ✓" : adding ? "Adding..." : "Add to Cart"}
            </button>

            {/* DETAILS */}
            <div className="mt-10 pt-8 border-t border-light-border space-y-3">
              {[
                "Heavyweight garment-dyed cotton",
                "Relaxed fit — sizes true to size",
                "Printed and shipped in the USA via CustomCat",
                "Ships within 3–5 business days",
              ].map((detail) => (
                <p key={detail} className="font-body text-xs text-warm-gray flex items-start gap-2">
                  <span className="text-flag-red mt-0.5">—</span>
                  {detail}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
