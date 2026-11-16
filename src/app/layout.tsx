import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const isCslabBuild = process.env.NEXT_PUBLIC_CSLAB_BUILD === "true";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Lana Zgonjanin",
    template: "%s — Lana Zgonjanin",
  },
  description:
    "Portfolio of Lana Zgonjanin, exploring mathematics, computer science, AI, computer vision, and robotics.",
  ...(isCslabBuild ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {!isCslabBuild && <Analytics />}
      </body>
    </html>
  );
}
