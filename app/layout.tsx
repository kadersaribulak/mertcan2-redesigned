import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mertcan Pansiyon — Karabük",
  description: "Karabük merkezinde sessiz, temiz ve sıcak konaklama.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
