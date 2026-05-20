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
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="red-accent mb-6" />
          <h1 className="font-heading text-charcoal text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.85] mb-10">
            WE DON&apos;T
            <br />
            <span className="relative inline-block">
              BACK DOWN
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-flag-red" />
            </span>
            <span className="text-flag-red">.</span>
          </h1>
          <p className="text-warm-gray text-lg md:text-xl leading-[1.8] max-w-2xl font-body">
            Triggered Apparel was born out of frustration with a culture that
            tells you to sit down and shut up. We believe in standing tall,
            speaking loud, and wearing what you believe — without apology.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VALUES SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-y border-light-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
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
                className="group"
              >
                <span className="font-body text-flag-red/40 text-[11px] tracking-[0.4em] group-hover:text-flag-red transition-colors duration-500">
                  {value.number}
                </span>
                <div className="w-8 h-[1px] bg-light-border group-hover:bg-flag-red group-hover:w-12 mt-4 mb-5 transition-all duration-500" />
                <h3 className="font-heading text-charcoal text-lg md:text-xl tracking-[0.1em] mb-4">
                  {value.title}
                </h3>
                <p className="text-warm-gray text-sm leading-[1.8] font-body">
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
      <section className="py-28 md:py-36 bg-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-heading text-flag-red text-5xl mb-8">&ldquo;</div>
          <blockquote className="font-heading text-charcoal text-2xl md:text-3xl lg:text-4xl leading-[1.2] tracking-tight mb-10">
            We started this brand because we were tired of being told what we
            can and can&apos;t wear. This is for the triggered — the ones who
            trigger{" "}
            <em className="text-flag-red not-italic font-bold">them</em>.
          </blockquote>
          <div className="w-10 h-[2px] bg-flag-red mx-auto mb-6" />
          <p className="font-body text-warm-gray text-[10px] tracking-[0.5em] uppercase">
            The Founders — EST. 2026
          </p>
        </div>
      </section>
    </>
  );
}
