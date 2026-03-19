import { MotionDiv } from "@/components/FramerWrapper";
import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import { GALERIA_DETALLE_QUERY } from "@/sanity/lib/queries";
import NavbarNota from '@/components/NavbarNota';
import ShareButton from "@/components/ShareButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const galeria = await client.fetch(GALERIA_DETALLE_QUERY, { slug });

  if (!galeria) return { title: "Alerta Flequillo" };

  const siteUrl = "https://www.alertaflequillo.com.ar";
  
  // 1. Buscamos la imagen. WhatsApp a veces falla si la URL tiene demasiados parámetros de Sanity
  // Intentamos que sea una URL limpia.
  let fotoUrl = galeria.imagen || (galeria.fotos && galeria.fotos.length > 0 ? galeria.fotos[0] : null);
  
  // Si la URL existe, nos aseguramos de que sea absoluta
  if (fotoUrl && !fotoUrl.startsWith('http')) {
    fotoUrl = `${siteUrl}${fotoUrl}`;
  }

  return {
    title: `Alerta Flequillo - ${galeria.titulo}`,
    description: galeria.bajada || `Registro fotográfico por ${galeria.autor}.`,
    metadataBase: new URL(siteUrl), // Esto ayuda a resolver URLs relativas
    openGraph: {
      title: galeria.titulo,
      description: galeria.bajada || `Cobertura fotográfica de ${galeria.autor} para Alerta Flequillo.`,
      url: `${siteUrl}/fotoperiodismo/${slug}`,
      siteName: 'Alerta Flequillo',
      images: [
        {
          url: fotoUrl || "/og-image.png",
          width: 1200,
          height: 630,
          alt: galeria.titulo,
        },
      ],
      locale: 'es_AR',
      type: 'article', // WhatsApp prefiere 'article' o 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: galeria.titulo,
      description: `Fotos por ${galeria.autor}`,
      images: [fotoUrl || "/og-image.png"],
    },
  };
}
// Revalidar cada 1 minuto para ver cambios nuevos
export const revalidate = 60;

// Agregamos Promise a la definición de params
export default async function GaleriaDetalle({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ESPERAMOS a que los params lleguen
  const { slug } = await params; 

  // Ahora usamos el slug que ya extrajimos
  const galeria = await client.fetch(GALERIA_DETALLE_QUERY, { slug });

  // Si no encuentra la galería, mostramos un aviso
  if (!galeria) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sansita text-2xl">
        Galería no encontrada...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] text-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <NavbarNota />

      {/* HEADER DE LA NOTA FOTOGRÁFICA */}
      <header className="pt-32 pb-12 px-6 max-w-5xl mx-auto text-center md:text-left">
        <Link href="/fotoperiodismo" className="font-mono text-[10px] uppercase tracking-widest text-[#1C8394] hover:underline mb-8 block">
          ← Volver a fotoperiodismo
        </Link>
        
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sansita text-5xl md:text-8xl leading-[0.9] italic mb-6"
        >
          {galeria.titulo}
        </MotionDiv>

        <div className="flex flex-col md:flex-row md:items-center gap-4 border-t border-black/10 pt-6">
          <p className="font-montserrat font-bold text-sm uppercase tracking-tighter">
            Fotos por <span className="text-[#1C8394]">{galeria.autor}</span>
          </p>
          <span className="hidden md:block text-black/20">|</span>
          <p className="font-mono text-[11px] text-black/50 uppercase">{galeria.fecha}</p>
        </div>
      </header>

      {/* BAJADA / INTRODUCCIÓN */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <p className="font-montserrat text-lg md:text-xl leading-relaxed text-gray-700 border-l-4 border-[#1C8394] pl-6">
          {galeria.bajada}
        </p>
      </section>

      {/* FLUJO DE IMÁGENES DINÁMICO */}
      <section className="max-w-6xl mx-auto px-4 space-y-4 md:space-y-12 pb-32">
        {galeria.fotos?.map((foto: string, index: number) => (
          <MotionDiv 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full group"
          >
            <div className="bg-gray-200 overflow-hidden">
              <img 
                src={foto} // URL directa desde Sanity
                alt={`Registro ${index + 1}`} 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />
            </div>
            
            <div className="mt-2 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] uppercase">Registro #{index + 1}</span>
              <span className="font-mono text-[9px] uppercase">Alerta Flequillo © 2026</span>
            </div>
          </MotionDiv>
        ))}
      </section>

      <footer className="bg-negro text-white py-24 px-6 text-center">
        <h2 className="font-sansita text-3xl md:text-5xl mb-8 italic">
          ¿Te interesó esta cobertura?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            <ShareButton 
              titulo={galeria.titulo} 
              bajada={galeria.bajada} 
              texto="Compartir registro" 
              color="#1C8394" 
            />
          </div>
          
          <Link href="/fotoperiodismo" className="border border-white/20 px-8 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
            Ver más galerías
          </Link>
        </div>
      </footer>
    </main>
  );
}