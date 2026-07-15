import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tax Tooling Prototype",
  description: "Synthetic-only hledger adapter prototype for the AI engineering internship report.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
