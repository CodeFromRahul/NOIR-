import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CursorProvider } from "@/context/CursorContext";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "NOIRÉ · Artisanal High-Cacao Chocolatier",
  description: "Crafted slowly. Savoured completely. Single-origin luxury dark chocolate, artisanal pralinés, and micro-batch cacao masterworks.",
  keywords: ["luxury chocolate", "noiré chocolate", "artisan chocolatier", "single origin cacao", "72% cacao", "dark chocolate"],
  openGraph: {
    title: "NOIRÉ · Artisanal High-Cacao Chocolatier",
    description: "Crafted slowly. Savoured completely.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-espresso text-cream font-sans antialiased min-h-screen selection:bg-caramel selection:text-espresso">
        <CursorProvider>
          <CartProvider>
            <SmoothScroll>
              <PageLoader />
              <CustomCursor />
              {children}
            </SmoothScroll>
          </CartProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
