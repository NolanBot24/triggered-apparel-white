"use client";

export default function MarqueeBanner() {
  const phrases = [
    "UNAPOLOGETICALLY AMERICAN",
    "★",
    "BUILT DIFFERENT",
    "★",
    "WORN WITH INTENT",
    "★",
    "NO APOLOGIES",
    "★",
    "STAND YOUR GROUND",
    "★",
  ];

  const repeatedPhrases = [...phrases, ...phrases];

  return (
    <section
      id="marquee-banner"
      className="relative overflow-hidden bg-flag-red py-4 select-none"
    >
      {/* Diagonal stripe overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.15) 5px, rgba(0,0,0,0.15) 10px)",
          }}
        />
      </div>

      {/* Marquee Track */}
      <div className="animate-marquee marquee-track">
        {repeatedPhrases.map((phrase, index) => (
          <span
            key={index}
            className="font-heading text-aged-white text-sm md:text-base tracking-[0.3em] uppercase whitespace-nowrap mx-8 font-bold"
          >
            {phrase}
          </span>
        ))}
      </div>
    </section>
  );
}
