import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Infant, Inter } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const cormorant = Cormorant_Infant({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kit Agenda Cheia — Para Esteticistas",
  description:
    "O kit completo para esteticistas lotarem a agenda em 7 dias usando R$15/dia e o próprio celular.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${greatVibes.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDF2F8] text-[#831843]">
        {children}
      </body>
    </html>
  );
}
