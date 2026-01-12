import type { Metadata } from "next";
import { Playfair_Display, Inter, Special_Elite } from "next/font/google";
import "./globals.css";

// Cargamos las fuentes de Google
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const specialElite = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Alerta Flequillo | Revista Online",
  description: "Cultura, política y pensamiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} ${specialElite.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}