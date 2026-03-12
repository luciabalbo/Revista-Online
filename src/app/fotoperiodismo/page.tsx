import Link from "next/link"; 
import { motion } from 'framer-motion';
import { client } from "@/sanity/lib/client"; 
import { GALERIAS_QUERY } from "@/sanity/lib/queries";
import NavbarNota from '@/components/NavbarNota'; 

export const revalidate = 60; 

export default async function Fotoperiodismo() {
  // Traemos la data de Sanity
  const galerias = await client.fetch(GALERIAS_QUERY);

  return (
    <main className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#00AEEF] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <NavbarNota />

      <div className="h-24" />

      {/* --- HEADER --- */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b-4 border-negro pb-8">
          <h1 className="font-sansita text-5xl md:text-7xl leading-none tracking-tighter">
            foto<span className="text-[#1C8394]">periodismo</span>.
          </h1>
          <p className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.5em] text-negro/40">
            Crónicas visuales / {galerias.length} Coberturas
          </p>
        </div>
      </header>

      {/* --- GRILLA --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {galerias.map((item: any) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-negro"
            >
              <img 
                src={item.imagen} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
                alt={item.titulo}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-[#00AEEF]/10 md:group-hover:bg-transparent transition-all duration-500" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <span className="font-mono text-[9px] text-[#00AEEF] font-black uppercase tracking-widest mb-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                   {item.fecha} — {item.autor}
                </span>
                <h3 className="font-sansita text-2xl md:text-3xl leading-tight md:leading-none">
                  {item.titulo}
                </h3>
                
                <div className="mt-4 overflow-hidden transition-all duration-300 md:h-0 md:group-hover:h-8">
                  <Link href={`/fotoperiodismo/${item.slug}`} className="text-[10px] font-black uppercase tracking-widest border-b border-[#00AEEF] md:border-white">
                    Ver Galería →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-negro text-white py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-sansita text-3xl md:text-5xl mb-10">¿Tenés fotos de alguna lucha?</h2>
          <a href="mailto:alertaflequillo@gmail.com" className="inline-block bg-white text-negro px-10 py-4 font-black uppercase tracking-widest shadow-[6px_6px_0px_#00AEEF] hover:shadow-none transition-all">
            Mandar Material
          </a>
        </div>
      </footer>
    </main>
  );
}