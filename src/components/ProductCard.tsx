import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  tag?: string;
  colorway: string;
  index?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  tag,
  colorway,
  index = 0,
}: ProductCardProps) {
  return (
    <Link
      href="#"
      id={`product-card-${id}`}
      className={`product-card group block bg-gradient-to-b from-blackout to-[#111] border border-steel-gray/10 overflow-hidden opacity-0 animate-fade-in-up stagger-${(index % 6) + 1}`}
    >
      {/* Product Image Placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#222] to-[#111]">
        {/* Colorway Accent */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at center, ${colorway} 0%, transparent 70%)`,
          }}
        />

        {/* Center Logo Mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span className="font-heading text-6xl md:text-7xl font-bold text-steel-gray/10 group-hover:text-steel-gray/20 transition-colors duration-500 select-none">
              T
            </span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-flag-red/40 group-hover:w-12 transition-all duration-500" />
          </div>
        </div>

        {/* Tag Badge */}
        {tag && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-flag-red text-aged-white font-heading text-[10px] tracking-[0.2em] uppercase">
            {tag}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-flag-red/0 group-hover:bg-flag-red/5 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <span className="font-heading text-aged-white text-xs tracking-[0.3em] uppercase bg-blackout/80 px-6 py-2 backdrop-blur-sm border border-steel-gray/20">
            View Product
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 border-t border-steel-gray/10">
        <h3 className="font-heading text-aged-white text-sm tracking-[0.15em] uppercase mb-2 group-hover:text-flag-red transition-colors duration-300">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-steel-gray text-sm font-medium">{price}</span>
          <div className="w-2 h-2 rounded-full bg-flag-red/50 group-hover:bg-flag-red transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
