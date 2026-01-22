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
import { CustomCursor } from "@/components/ui/custom-cursor";
import { TouchEffect } from "@/components/ui/touch-effect";

export const metadata: Metadata = {
  title: "Laksh | AI Engineer",
  description: "I build AI systems that turn chaos into working products.",
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
        <CustomCursor />
        <TouchEffect />
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
