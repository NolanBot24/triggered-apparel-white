import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRIGGERED APPAREL — Built Different. Worn With Intent.",
  description:
    "Unapologetically American streetwear. Bold patriot apparel for those who stand their ground. EST. 2026.",
  keywords: [
    "patriot apparel",
    "conservative clothing",
    "American streetwear",
    "triggered apparel",
    "bold fashion",
  ],
  openGraph: {
    title: "TRIGGERED APPAREL",
    description: "Built Different. Worn With Intent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-cream">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
