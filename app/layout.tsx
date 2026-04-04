import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Odoo POS Cafe",
  description: "Point of Sale for Cafe operations inspired by Odoo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased bg-bg text-on-bg">
        {children}
      </body>
    </html>
  );
}
