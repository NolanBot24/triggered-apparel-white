import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — TRIGGERED APPAREL",
  description:
    "The story behind the brand. Built by Americans who refuse to stay quiet. EST. 2026.",
};

export default function AboutPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          ABOUT HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-blackout via-blackout to-[#0d0d0d]" />

        {/* Background Accent */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(circle, rgba(179,25,66,0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="font-heading text-flag-red text-xs tracking-[0.4em] uppercase block mb-4">
            Our Story
          </span>
          <h1 className="font-heading text-aged-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            WE DON&apos;T
            <span className="block text-flag-red">BACK DOWN.</span>
          </h1>
          <div className="w-16 h-0.5 bg-flag-red mb-8" />
          <p className="text-steel-gray text-lg md:text-xl leading-relaxed max-w-2xl">
            Triggered Apparel was born out of frustration with a culture that
            tells you to sit down and shut up. We believe in standing tall,
            speaking loud, and wearing what you believe — without apology.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VALUES SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 diagonal-stripes">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                number: "01",
                title: "MADE IN AMERICA",
                description:
                  "Every thread, every stitch, every design — proudly crafted on American soil. We don't outsource our values.",
              },
              {
                number: "02",
                title: "NO COMPROMISES",
                description:
                  "Premium materials. Bold designs. We'd rather make less and make it right than flood the market with mediocrity.",
              },
              {
                number: "03",
                title: "WEAR YOUR TRUTH",
                description:
                  "Our gear isn't just clothing — it's a statement. Every piece is built for people who refuse to be silenced.",
              },
            ].map((value) => (
              <div
                key={value.number}
                className="group border-l-2 border-steel-gray/10 hover:border-flag-red pl-6 transition-all duration-500"
              >
                <span className="font-heading text-flag-red/40 text-sm tracking-[0.3em] group-hover:text-flag-red transition-colors duration-300">
                  {value.number}
                </span>
                <h3 className="font-heading text-aged-white text-xl md:text-2xl tracking-wider mt-3 mb-4">
                  {value.title}
                </h3>
                <p className="text-steel-gray text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOUNDER QUOTE
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-heading text-flag-red text-6xl mb-6">&ldquo;</div>
          <blockquote className="font-heading text-aged-white/90 text-2xl md:text-3xl lg:text-4xl leading-snug tracking-wide mb-8">
            We started this brand because we were tired of being told what we
            can and can&apos;t wear. This is for the triggered — the ones who
            trigger <em className="text-flag-red not-italic">them</em>.
          </blockquote>
          <div className="w-12 h-0.5 bg-flag-red mx-auto mb-6" />
          <p className="font-heading text-steel-gray text-xs tracking-[0.4em] uppercase">
            — The Founders, EST. 2026
          </p>
        </div>
      </section>
    </>
  );
}
