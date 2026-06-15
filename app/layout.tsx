import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteFocus from "@/components/RouteFocus";
import RouteTransition from "@/components/RouteTransition";
import AIConsultant from "@/components/AIConsultant";
import { site } from "@/lib/site";

// Body / UI — a refined grotesque with more character than Inter.
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display — Fraunces: an expressive old-style serif (variable weight + optical
// sizing) with a distinctive italic. Replaces the over-used Instrument Serif.
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Monkhub — AI-Native Product Engineering Studio | Ship Fast, Built to Last",
    template: "%s | Monkhub",
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    title: "Monkhub — AI-Native Product Engineering Studio",
    description: site.description,
    siteName: "Monkhub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monkhub — AI-Native Product Engineering Studio",
    description: site.description,
  },
  alternates: { canonical: site.url },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Monkhub",
  url: site.url,
  description: site.description,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Spaze iTech Park, Sector 49",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122018",
    addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: site.phoneUS, contactType: "sales", areaServed: "US" },
    { "@type": "ContactPoint", telephone: site.phoneIN, contactType: "sales", areaServed: "IN" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <RouteFocus />
        <RouteTransition />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <AIConsultant />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
