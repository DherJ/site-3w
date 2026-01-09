import "./globals.css";
import type { Metadata } from "next";
import { cabin } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://wellwithwaves.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={cabin.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
