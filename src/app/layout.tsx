import type { Metadata } from "next";
import { Sansita, Montserrat, Special_Elite } from "next/font/google"; // Importamos las nuevas
import "./globals.css";

const sansita = Sansita({ 
  weight: ["400", "700", "900"], 
  subsets: ["latin"], 
  variable: "--font-sansita" 
});

const montserrat = Montserrat({ 
  weight: ["400"], 
  subsets: ["latin"], 
  style: ["normal", "italic"],
  variable: "--font-montserrat" 
});

const specialElite = Special_Elite({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

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
      <body className={`${sansita.variable} ${montserrat.variable} ${specialElite.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}