import Link from "next/link";

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-blackout border-t border-steel-gray/10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="font-heading text-aged-white text-2xl tracking-[0.2em] font-bold mb-2">
              TRIGGERED
            </h2>
            <p className="font-heading text-steel-gray text-xs tracking-[0.4em] mb-6">
              APPAREL
            </p>
            <p className="text-steel-gray/70 text-sm leading-relaxed max-w-xs">
              Built Different. Worn With Intent. Unapologetically American
              streetwear for those who refuse to back down.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="font-heading text-flag-red text-xs tracking-[0.3em] uppercase mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-steel-gray hover:text-aged-white text-sm tracking-wider transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h3 className="font-heading text-flag-red text-xs tracking-[0.3em] uppercase mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-steel-gray hover:text-aged-white text-sm tracking-wider transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-steel-gray hover:text-aged-white text-sm tracking-wider transition-colors duration-300"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@triggeredapparel.com"
                  className="text-steel-gray hover:text-aged-white text-sm tracking-wider transition-colors duration-300"
                >
                  hello@triggeredapparel.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-steel-gray/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-steel-gray/50 text-xs tracking-[0.3em]">
            TRIGGERED APPAREL — EST. 2026
          </p>
          <p className="text-steel-gray/30 text-xs">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
