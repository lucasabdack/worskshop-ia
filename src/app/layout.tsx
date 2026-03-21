import type { Metadata } from "next";
import "./globals.css";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#321CB2",
};

export const metadata: Metadata = {
  title: "Help — Serviços residenciais",
  description:
    "Conectando prestadores de serviços residenciais a jovens adultos em sua primeira moradia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Livvic:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-light">
        {children}
      </body>
    </html>
  );
}
