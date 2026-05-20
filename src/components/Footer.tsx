import Link from "next/link";

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-cream border-t border-light-border">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h2 className="font-heading text-charcoal text-xl tracking-[0.3em] font-bold mb-1">
              TRIGGERED
            </h2>
            <p className="font-heading text-warm-gray text-[10px] tracking-[0.5em] mb-8">
              APPAREL
            </p>
            <div className="red-accent mb-8" />
            <p className="text-warm-gray text-sm leading-[1.8] max-w-sm">
              Built Different. Worn With Intent. Premium American
              streetwear for those who refuse to stand down.
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-heading text-charcoal text-[10px] tracking-[0.4em] uppercase mb-8 font-bold">
              Navigate
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-charcoal text-sm tracking-wider transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h3 className="font-heading text-charcoal text-[10px] tracking-[0.4em] uppercase mb-8 font-bold">
              Connect
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-warm-gray hover:text-charcoal text-sm tracking-wider transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-warm-gray hover:text-charcoal text-sm tracking-wider transition-colors duration-300"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@triggeredapparel.com"
                  className="text-warm-gray hover:text-charcoal text-sm tracking-wider transition-colors duration-300"
                >
                  hello@triggeredapparel.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-warm-gray/60 text-[10px] tracking-[0.4em]">
            TRIGGERED APPAREL — EST. 2026
          </p>
          <p className="text-warm-gray/40 text-[11px]">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
