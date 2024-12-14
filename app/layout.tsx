import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antrian Pasien",
  description: "Aplikasi antrian pasien",
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
