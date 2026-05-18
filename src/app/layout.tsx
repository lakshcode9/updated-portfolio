import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const disketMono = localFont({
  src: "./fonts/Disket-Mono-Bold.ttf",
  variable: "--font-disket-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TouchEffectWrapper as TouchEffect } from "@/components/ui/touch-effect-wrapper";

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lakshpujary.tech"),
  title: "Laksh | AI Strategy & Engineering",
  description: "Building intelligent systems that drive business value. From technical depth to strategic execution.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Laksh | AI Strategy & Engineering",
    description: "Building intelligent systems that drive business value. From technical depth to strategic execution.",
    url: "https://lakshpujary.tech",
    siteName: "Laksh | AI Strategy & Engineering",
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
    title: "Laksh | AI Strategy & Engineering",
    description: "Building intelligent systems that drive business value. From technical depth to strategic execution.",
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
