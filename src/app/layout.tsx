import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ASCIIText from "@/components/ASCIIText";

export const metadata: Metadata = {
  title: "Text to Media_Generator",
  description:
    "Generate media (images, videos, audio) using multiple AI engines",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <ASCIIText
            text="Text to Media Generator"
            enableWaves={true}
            asciiFontSize={8}
          />
        </div>
        <div className="fixed top-0 left-0 w-full h-full z-10">
          <div className="min-h-screen bg-background/10 relative flex flex-col">
            <Navigation />
            <main className="container mx-auto px-4 py-8 flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
