import type { Metadata } from "next";
import { Bebas_Neue, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const headline = Bebas_Neue({
  variable: "--font-headline",
  weight: "400",
  subsets: ["latin"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mammoth Coatings | Epoxy Flooring and Concrete Coatings",
    template: "%s | Mammoth Coatings",
  },
  description:
    "Mammoth Coatings provides high-performance epoxy flooring and concrete coatings in Raleigh, Apex, and Durham.",
  metadataBase: new URL("https://mammothcoat.com"),
  icons: {
    icon: "/images/Logo/Mammoth_Coatings.png",
    shortcut: "/images/Logo/Mammoth_Coatings.png",
    apple: "/images/Logo/Mammoth_Coatings.png",
  },
  openGraph: {
    title: "Mammoth Coatings",
    description:
      "Premium epoxy flooring and concrete coating systems for homes and businesses.",
    images: ["/images/Logo/link_preview.png"],
    url: "https://mammothcoat.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mammoth Coatings",
    description:
      "Premium epoxy flooring and concrete coating systems for homes and businesses.",
    images: ["/images/Logo/link_preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headline.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
