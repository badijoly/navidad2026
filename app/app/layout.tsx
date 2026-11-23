import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "800"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Navidad donde los Tapia Rivera 2026",
  description: "Intercambio de regalos secreto de la familia — Navidad",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
