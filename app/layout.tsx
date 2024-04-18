import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";

const roboto = Roboto({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  metadataBase : new URL("https://selffin.vercel.app"),
  twitter: {
    card: "summary_large_image",
    title: "Selffin",
    description: "A Personal Finance Tracker Application",
    images: "@lib/og.jpg"
  },
  title: "Selffin",
  description: "A Personal Finance Tracker Application",
  verification: {
    google: "6-08d6WQAauV2tQiabEESPoFuPzcml78b7jw0-nZXGk",
  },
  openGraph : {
    images : "@lib/og.jpg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
