"use client";

export default function MarqueeBanner() {
  const phrases = [
    "UNAPOLOGETICALLY AMERICAN",
    "•",
    "BUILT DIFFERENT",
    "•",
    "WORN WITH INTENT",
    "•",
    "NO APOLOGIES",
    "•",
    "STAND YOUR GROUND",
    "•",
  ];

  const repeatedPhrases = [...phrases, ...phrases];

  return (
    <section
      id="marquee-banner"
      className="relative overflow-hidden border-y border-light-border py-5 select-none bg-cream-dark/50"
    >
      {/* Marquee Track */}
      <div className="animate-marquee marquee-track">
        {repeatedPhrases.map((phrase, index) => (
          <span
            key={index}
            className={`font-body text-[11px] tracking-[0.35em] uppercase whitespace-nowrap mx-6 ${
              phrase === "•"
                ? "text-flag-red"
                : "text-warm-gray font-medium"
            }`}
          >
            {phrase}
          </span>
        ))}
      </div>
    </section>
  );
}
