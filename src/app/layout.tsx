import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const disketMono = localFont({
  src: "./fonts/Disket-Mono-Bold.ttf",
  variable: "--font-disket-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TouchEffect } from "@/components/ui/touch-effect";

export const metadata: Metadata = {
  title: "Laksh | AI Engineer",
  description: "I build AI systems that turn chaos into working products. 180 days to master the stack.",
  openGraph: {
    title: "Laksh | AI Engineer",
    description: "I build AI systems that turn chaos into working products. 180 days to master the stack.",
    url: "https://lakshpujary.me",
    siteName: "Laksh | AI Engineer",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Laksh Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksh | AI Engineer",
    description: "I build AI systems that turn chaos into working products. 180 days to master the stack.",
    creator: "@laksh_builds",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${disketMono.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body
        className={`font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
        suppressHydrationWarning
      >
        <TouchEffect />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
