import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Sale Projetos - Carros antigos",
  description: "Carros antigos à venda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
				<Header />
        {children}
				<Analytics />
				<SpeedInsights/>
      </body>
    </html>
  );
}
