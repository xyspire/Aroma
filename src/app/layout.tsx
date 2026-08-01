import type { Metadata } from "next";
import { DM_Sans, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "../components/SmoothScroll";
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PERFUME — Luxury Fragrance",
  description: "A cinematic luxury fragrance experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${josefinSans.variable}`}>
      <body className="bg-white text-black antialiased font-light" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
