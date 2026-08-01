import type {Metadata} from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atomic Heart - Polymer',
  description: 'Minimalist hero section',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Electrolize&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmSans.className} bg-black text-white antialiased font-light`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
