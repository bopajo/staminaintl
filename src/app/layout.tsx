import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STAMINA PENGJU INTL CORP - International Trade & Industrial Brokerage",
  description: "Your strategic bridge between Asia and the Americas. Comprehensive international trade, sourcing, and industrial brokerage solutions for B2B clients.",
  keywords: ["STAMINA PENGJU", "International Trade", "Import Export Brokerage", "Industrial Sourcing", "B2B", "Cross-border Operations", "China Trade", "US Latin America Trade"],
  authors: [{ name: "STAMINA PENGJU INTL CORP" }],
  openGraph: {
    title: "STAMINA PENGJU INTL CORP - International Trade Solutions",
    description: "Strategic bridge between Asia and the Americas for international trade and industrial brokerage.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STAMINA PENGJU INTL CORP",
    description: "International trade and industrial brokerage solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning on <body> prevents hydration mismatch warnings from browser extensions
          that inject data-* attributes (e.g., data-cjcrx="addYes") into the DOM.
          Test app in Incognito mode or with extensions disabled to verify the root cause.
      */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
