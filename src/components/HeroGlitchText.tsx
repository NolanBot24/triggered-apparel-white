"use client";

export default function HeroGlitchText() {
  return (
    <div className="hero-glitch-wrapper relative select-none">
      {/* Pre-headline */}
      <p className="font-heading text-charcoal/50 text-[11px] md:text-xs tracking-[0.5em] uppercase mb-6 md:mb-8">
        Built Different
      </p>

      {/* Main Distressed Text */}
      <div className="relative">
        {/* SVG Filter for Distressed Effect */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="distress">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="5"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="roughen">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.05 0.08"
                numOctaves="3"
                seed="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* Text Block */}
        <h1 className="hero-distressed-text font-heading text-charcoal text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[10rem] font-bold leading-[0.88] tracking-[-0.02em] uppercase">
          <span className="block">Unapolo-</span>
          <span className="block">getically</span>
          <span className="block">American</span>
        </h1>

        {/* Red Tactical Crosshair Lines */}
        <div className="absolute left-0 right-0 top-[48%] pointer-events-none">
          {/* Main red line */}
          <div className="relative">
            <div className="h-[2px] bg-flag-red w-full opacity-80" />
            {/* Secondary offset lines */}
            <div className="h-[1px] bg-flag-red/40 w-[85%] mt-[3px] ml-[8%]" />
            <div className="h-[1px] bg-flag-red/25 w-[70%] mt-[2px] ml-[15%]" />
          </div>
          {/* Dashed overlay line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, #B31942 8px, #B31942 20px, transparent 20px, transparent 28px)",
            }}
          />
        </div>

        {/* Horizontal Glitch Scan Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 3px)",
            }}
          />
        </div>

        {/* Noise/Grain Texture Over Text */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Glitch Ghost Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <h1
            className="hero-distressed-text font-heading text-flag-red/[0.06] text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[10rem] font-bold leading-[0.88] tracking-[-0.02em] uppercase"
            style={{ transform: "translate(3px, -1px)" }}
            aria-hidden="true"
          >
            <span className="block">Unapolo-</span>
            <span className="block">getically</span>
            <span className="block">American</span>
          </h1>
        </div>
      </div>

      {/* Sub-headline */}
      <p className="text-warm-gray text-sm md:text-base mt-8 md:mt-10 max-w-sm leading-relaxed font-body">
        Streetwear that speaks before you do.
      </p>
    </div>
  );
}
