import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'framer-motion/client'; 
import { client } from '@/sanity/lib/client'; 
import { PortableText } from '@portabletext/react';
import NavbarNota from '@/components/NavbarNota'; 

export default async function NotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Definimos los colores 
  const coloresCategorias: { [key: string]: string } = {
    "Comunicación": "#390D02",
    "Feminismo": "#4F136C",
    "Cultura": "#154B52",
    "Streaming": "#A52502",
    "Política": "#1C8394",
    "Arte y Cultura": "#154B52", 
    "Feminismo y Política": "#4F136C", 
    "default": "#FB9160"
  };

  // Query para traer la nota y los relacionados
  const query = `{
    "nota": *[_type == "post" && slug.current == $slug][0]{
      titulo,
      volanta,
      bajada,
      copete,
      autor,
      fecha,
      "imagen": imagen.asset->url,
      cuerpo
    },
    "relacionados": *[_type == "post" && slug.current != $slug] | order(fecha desc) [0...3]{
      titulo,
      volanta,
      "slug": slug.current
    }
  }`;

  const { nota, relacionados } = await client.fetch(query, { slug });

  if (!nota) return notFound();

  // 2. Determinamos el color de esta nota específica
  const colorNota = coloresCategorias[nota.volanta] || coloresCategorias["default"];

  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:text-white overflow-x-hidden" 
             style={{ ['--accent-color' as any]: colorNota }}>
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background-color: ${colorNota}; color: white; }
      `}} />

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <NavbarNota />

      {/* HEADER */}
      <header className="pt-32 md:pt-44 pb-16 px-6 max-w-5xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          className="inline-block font-black text-[10px] md:text-xs uppercase tracking-[0.6em] mb-6"
          style={{ color: colorNota }} // COLOR DINÁMICO
        >
          {nota.volanta || "CULTURA"}
        </motion.span>
        
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-montserrat font-medium text-sm md:text-base leading-relaxed text-gray-400 mb-5 uppercase tracking-widest max-w-3xl mx-auto">
          {nota.bajada}
        </motion.p>

        <motion.h1 initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="font-sansita font-bold text-2xl md:text-[3.3vw] leading-[1.2] tracking-tighter mb-8">
          {nota.titulo}
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="font-montserrat text-lg md:text-1xl text-gray-700 max-w-3xl mx-auto mb-5 font-medium">
          {nota.copete}
        </motion.div>

        <div className="flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-black/60">
          <span className="font-bold">Por {nota.autor}</span>
          <div className="w-12 h-[1px] bg-black/20"></div>
          <span>{nota.fecha}</span>
        </div>
      </header>

      {/* IMAGEN PRINCIPAL */}
      <section className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${nota.imagen})` }}
        />
      </section>

      {/* CUERPO */}
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="lg:col-span-8 lg:col-start-3">
          <div className="font-montserrat text-lg md:text-[20px] leading-[1.7] text-gray-900 text-left 
                          first-letter:text-7xl md:first-letter:text-8xl first-letter:font-sansita 
                          first-letter:mr-4 first-letter:float-left first-letter:text-[#FB9160] 
                          first-letter:leading-none mb-24">
            <PortableText value={nota.cuerpo} />
          </div>
        </motion.div>
      </main>

      {/* RELACIONADOS */}
      <section className="bg-black py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sansita text-white text-5xl md:text-8xl mb-20">Seguí explorando <span className="text-[#FB9160]">.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10">
            {relacionados?.map((rel: any, i: number) => (
              <Link key={rel.slug} href={`/notas/${rel.slug}`} className="group relative bg-black p-10 overflow-hidden hover:bg-[#FB9160] transition-colors">
                <span className="font-mono text-[9px] text-white/40 group-hover:text-black uppercase mb-8 block">0{i+1} / {rel.volanta}</span>
                <h3 className="font-sansita text-3xl text-white group-hover:text-black italic lowercase mb-20">{rel.titulo}</h3>
                <div className="absolute bottom-10 right-10 text-white group-hover:text-black text-4xl">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="bg-negro text-white pt-16 md:pt-28 pb-10 px-6 border-t-[8px] md:border-t-[12px] border-bordo relative overflow-hidden">

        {/* CONTENEDOR PRINCIPAL */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10 items-start">
          
          {/* COLUMNA 1 */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-40 h-40 md:w-64 md:h-64 group">
              <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-bordo/50"></div>
              
              <div className="absolute inset-2 rounded-full overflow-hidden bg-negro shadow-2xl z-20 border-[3px] md:border-[4px] border-white/10">
                <video autoPlay loop muted playsInline disablePictureInPicture className="w-full h-full object-cover">
                  <source src="/videologo.mp4" type="video/mp4" />
                  <div className="w-full h-full bg-bordo flex items-center justify-center text-white font-bold text-2xl md:text-4xl font-sansita">af</div>
                </video>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <span className="text-bordo font-mono font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="hidden md:block w-8 h-[2px] bg-bordo"></span> SECCIONES <span className="md:hidden w-8 h-[2px] bg-bordo"></span>
            </span>
            <div className="flex flex-col gap-3 md:gap-4 font-sansita text-[15px] md:text-2xl">
              <a href="/feminismo-y-politica" className="hover:text-celeste transition-colors hover:scale-105 duration-300">Feminismo y política</a>
              <a href="/arte-y-cultura" className="hover:text-naranja transition-colors hover:scale-105 duration-300">Arte y cultura</a>
              <a href="/streaming" className="hover:text-lila transition-colors hover:scale-105 duration-300">Streaming</a>
              <a href="/nosotras" className="hover:text-verde transition-colors hover:scale-105 duration-300">Nosotras</a>
            </div>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <span className="text-celeste font-mono font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="hidden md:block w-8 h-[2px] bg-celeste"></span> CONTACTO <span className="md:hidden w-8 h-[2px] bg-celeste"></span>
            </span>
            
            <a href="mailto:alertaflequillo@gmail.com" className="font-sansita text-[15px] md:text-2xl hover:text-bordo transition-colors break-all underline underline-offset-4 decoration-white/20">
              alertaflequillo@gmail.com
            </a>

            <div className="flex gap-3 mt-2 md:mt-4">
              {[
                { name: 'IG', url: 'https://www.instagram.com/alerta_flequillo?igsh=MWt0Y2lxczBqMWxyeA==' },
                { name: 'TK', url: 'https://www.tiktok.com/@alerta_flequillo?_r=1&_t=ZS-94X9xQvScia' },
                { name: 'YT', url: 'https://youtube.com/@alertaflequillo-y3p?si=dzuH3SKIKCjRytf3' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 md:w-10 md:h-10 bg-negro border-2 border-white flex items-center justify-center font-mono font-black text-[10px] md:text-xs text-white shadow-[3px_3px_0px_#fff] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all hover:bg-white hover:text-negro"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE CRÉDITOS */}
        <div className="w-[80vw] mx-auto mt-24 pt-12 border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            
            {/* Lado Izquierdo */}
            <p className="text-[8px] font-mono uppercase tracking-[0.5em] text-white/30 text-center md:text-left">
              © 2026 ALERTA FLEQUILLO — <span className="text-white/60">HECHO CON AMOR</span>
            </p>

            {/* STICKER CENTRAL */}
            <div className="group relative">
              <div className="bg-white text-negro px-3 py-1 font-mono font-black text-[8px] -rotate-2 shadow-[5px_5px_0px_#A52502] group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 cursor-pointer uppercase whitespace-nowrap">
                Design by Lula
              </div>
            </div>

            {/* Lado Derecho */}
            <div className="flex gap-8 text-[8px] font-mono text-center uppercase tracking-[0.5em] text-white/30">
              <span className="hover:text-white cursor-help transition-colors">privacidad?</span>
              <span className="text-white/60">Córdoba, Argentina</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}