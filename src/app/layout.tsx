import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Sale Projetos - Carros clássicos",
  description: "Carros clássicos à venda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
				<Header />
        {children}
				<Analytics />
      </body>
    </html>
  );
}
