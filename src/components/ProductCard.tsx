import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  tag?: string;
  index?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  tag,
  index = 0,
}: ProductCardProps) {
  return (
    <Link
      href="#"
      id={`product-card-${id}`}
      className={`product-card group block bg-white border border-light-border overflow-hidden opacity-0 animate-fade-in-up stagger-${(index % 6) + 1}`}
    >
      {/* Product Image Placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
        {/* Minimal Center Mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span className="font-heading text-7xl md:text-8xl font-bold text-charcoal/[0.04] group-hover:text-charcoal/[0.08] transition-colors duration-700 select-none">
              T
            </span>
          </div>
        </div>

        {/* Tag Badge */}
        {tag && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-charcoal text-cream font-body text-[9px] tracking-[0.25em] uppercase font-medium">
            {tag}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/[0.03] transition-colors duration-700 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100">
          <span className="font-heading text-charcoal text-[10px] tracking-[0.3em] uppercase bg-white/90 px-6 py-2.5 backdrop-blur-sm border border-light-border">
            View Product
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 border-t border-light-border">
        <h3 className="font-heading text-charcoal text-xs tracking-[0.2em] uppercase mb-2 group-hover:text-flag-red transition-colors duration-400">
          {name}
        </h3>
        <span className="text-warm-gray text-sm font-body">{price}</span>
      </div>
    </Link>
  );
}
