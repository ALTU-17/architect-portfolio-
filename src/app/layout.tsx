import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const instrumentItalic = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument-italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-vance.example"),
  title: {
    default: "Atelier Vance — Interior Architecture",
    template: "%s — Atelier Vance",
  },
  description:
    "Aurelio Vance is an interior architect working between Milan and Copenhagen. Quiet, tactile interiors for living, hospitality and culture.",
  keywords: [
    "interior architecture",
    "interior designer",
    "Milan",
    "Copenhagen",
    "Atelier Vance",
    "Aurelio Vance",
  ],
  authors: [{ name: "Atelier Vance" }],
  openGraph: {
    title: "Atelier Vance — Interior Architecture",
    description:
      "Quiet, tactile interiors shaped by light, material and ritual. Milan / Copenhagen.",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1800, height: 1200, alt: "Casa Lumen interior" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier Vance — Interior Architecture",
    description: "Quiet, tactile interiors shaped by light, material and ritual.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f1ede5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrument.variable} ${instrumentItalic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
