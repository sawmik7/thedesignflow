import type { Metadata } from "next";
import { Inter, Syne, Caveat } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "The Design Flow | Elite UI/UX Design, Next.js & AI Automation Agency",
  description: "Rank #1 with The Design Flow. We build premium, high-converting SaaS UI/UX, cinematic GSAP & Framer Motion web experiences, and powerful AI Automation solutions. Scale your revenue today.",
  keywords: ["UI/UX Design Agency", "AI Automation Agency", "Next.js Web Development", "GSAP Animations", "Framer Motion", "SaaS Dashboard Design", "Brand Identity", "Vibe Coding", "High-Performance Websites", "SEO Optimized Web Design"],
  openGraph: {
    title: "The Design Flow | Elite UI/UX & AI Automation Agency",
    description: "Premium SaaS UI/UX, cinematic Next.js web experiences, and AI Automation to scale your revenue. Work with a top 1% design agency.",
    url: "https://thedesignflow.com",
    siteName: "The Design Flow",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Design Flow - UI/UX & AI Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Design Flow | Elite UI/UX & AI Automation",
    description: "Premium SaaS UI/UX, cinematic Next.js web experiences, and AI Automation to scale your revenue.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col lg:cursor-none">
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
