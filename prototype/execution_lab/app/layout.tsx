import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open-Source Tax Tooling - AI Engineering Research",
  description: "Synthetic execution lab for open-source tax tooling research.",
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
