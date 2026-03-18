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
  metadataBase: new URL('https://www.alertaflequillo.com.ar'),
  title: "Alerta Flequillo | Revista Online",
  description: "Feminismo, Cultura y Política.",
  icons: {
    icon: "/logo_pestania.png",
    shortcut: "/logo_pestania.png",
    apple: "/logo_pestania.png", 
  },
  openGraph: {
    title: "Alerta Flequillo | Revista Online",
    description: "Feminismo, Cultura y Política.",
    url: "https://www.alertaflequillo.com.ar",
    siteName: "Alerta Flequillo",
    images: [
      {
        url: "/logo_pestania.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
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