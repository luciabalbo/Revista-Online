"use client";
import { useState, use } from 'react';
import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const resolvedParams = use(params);
  const nota = notas.find((n) => n.slug === resolvedParams.slug);
  
  if (!nota) return notFound();

  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#FB9160] selection:text-white overflow-x-hidden">
      {/* TEXTURA DE GRANO (Overlay sutil para look analógico) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* NAVBAR CON BLUR Y ANIMACIÓN */}
      <nav className="fixed top-0 w-full z-[150] bg-white/80 backdrop-blur-xl border-b border-black/5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-24">
          <Link href="/" className="h-full flex items-center group">
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -2 }}
              src="/AlertaFlequillo.png" 
              alt="Logo" 
              className="h-[70%] md:h-[90%] w-auto object-contain transition-all" 
            />
          </Link>

          <div className="hidden lg:flex items-center gap-10 font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold">
            {['Arte y Cultura', 'Feminismo y poítica', 'Streaming', 'Nosotras'].map((item) => (
              <Link key={item} href="/" className="relative group overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                <span className="absolute top-full left-0 text-[#FB9160] transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
              </Link>
            ))}
            <Link href="/comunidad" className="bg-black text-white px-6 py-2 shadow-[4px_4px_0px_#FB9160] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[9px]">
              Comunidad
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 z-[160]">
            <div className={`h-0.5 w-8 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`h-0.5 w-8 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`h-0.5 w-8 bg-black mt-1.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#FB9160] z-[140] flex flex-col items-center justify-center gap-6"
          >
            {['Inicio', 'Arte', 'Feminismo', 'Nosotras'].map((l) => (
              <Link key={l} href="#" className="font-sansita text-6xl text-white italic hover:tracking-widest transition-all">{l}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER: Entrada Cinematográfica */}
      <header className="pt-44 pb-33 px-6 max-w-6xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block text-[#FB9160] font-bold text-xs uppercase tracking-[0.8em] mb-4"
        >
          {nota.volanta}
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-montserrat font-light text-xl md:text-2xl leading-relaxed text-gray-500 mb-6 italic max-w-4xl mx-auto"
        >
          {nota.bajada}
        </motion.h2>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sansita font-bold text-3xl md:text-[5vw] leading-[0.85] tracking-tighter italic  mb-10"
        >
          {nota.titulo}
        </motion.h1>

        <div className="flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-widest text-black/40">
          <span>{nota.autor}</span>
          <div className="w-12 h-[1px] bg-black/10"></div>
          <span>{nota.fecha || '2026'}</span>
        </div>
      </header>

      {/* 2. IMAGEN PARALLAX CON ZOOM */}
      <section className="relative w-full h-[70vh] md:h-[110vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${nota.imagen})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f2] via-transparent to-transparent h-40"></div>
      </section>

      {/* 3. CONTENIDO: Tipografía de lujo y espaciado */}
      <main className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 lg:col-start-3"
        >
          {/* CUERPO DE LA NOTA (Justificado para look editorial) */}
          <div className="font-montserrat text-xl md:text-[26px] leading-[1.8] text-gray-900 text-justify first-letter:text-8xl first-letter:font-sansita first-letter:mr-4 first-letter:float-left first-letter:text-[#FB9160] mb-24">
            {nota.cuerpo || "Escribiendo la historia..."}
          </div>

          {/* CTA SECCIÓN COMUNIDAD (Fuera del div del cuerpo) */}
          <Link href="/apoyanos" className="block group">
            <motion.div 
              whileInView={{ scaleX: [0.9, 1], opacity: [0, 1] }}
              className="py-24 border-y border-black/5 text-center relative cursor-pointer"
            >
               <div className="relative z-10 flex flex-col items-center gap-4">
                 <p className="font-sansita font-bold text-3xl md:text-5xl leading-tight group-hover:text-[#390D02] transition-colors">
                   Sumate a la comunidad
                 </p>
                 <span className="font-mono text-[15px] tracking-[0.4em] text-[#A52502] opacity-0 group-hover:opacity-100 transition-opacity">
                   Bancá el periodismo feminista  →
                 </span>
               </div>
            </motion.div>
          </Link>
        </motion.div>
      </main>

      {/* 4. RELACIONADOS: Grid Dinámico */}
      <section className="bg-black py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sansita text-white text-5xl md:text-8xl mb-20 tracking-tighter">
            Seguí explorando <span className="text-[#FB9160]">.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10">
            {notas.slice(0, 3).map((rel, i) => (
              <Link key={rel.slug} href={`/notas/${rel.slug}`} className="group relative bg-black p-10 overflow-hidden transition-colors hover:bg-[#FB9160]">
                <span className="font-mono text-[9px] text-white/40 group-hover:text-black uppercase mb-8 block">0{i+1} / {rel.volanta}</span>
                <h3 className="font-sansita text-3xl text-white group-hover:text-black leading-none italic lowercase mb-20">{rel.titulo}</h3>
                <div className="absolute bottom-10 right-10 text-white group-hover:text-black text-4xl transition-transform group-hover:translate-x-2">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-negro text-white pt-28 pb-12 px-6 border-t-[12px] border-bordo relative overflow-hidden">

        {/* CONTENEDOR PRINCIPAL: Ahora con grid de 3 columnas para alineación simétrica */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 items-start">
          
          {/* COLUMNA 1: LOGO (Alineado a la izquierda) */}
          <div className="flex justify-start">
            <div className="relative w-56 h-56 md:w-64 md:h-64 group">
              <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-bordo/50"></div>
              <div className="absolute inset-2 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
              
              <div className="absolute inset-2 rounded-full overflow-hidden bg-negro shadow-2xl z-20 border-[4px] border-white/10">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full object-cover"
                >
                  <source src="/videologo.mp4" type="video/mp4" />
                  <div className="w-full h-full bg-bordo flex items-center justify-center text-white font-bold text-4xl font-sansita">af</div>
                </video>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN (Centro) */}
          <div className="flex flex-col gap-6 md:pl-8">
            <span className="text-bordo font-mono font-black text-xs tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-bordo"></span> SECCIONES
            </span>
            <div className="flex flex-col gap-4 font-sansita text-2xl">
              <a href="#" className="hover:text-celeste transition-colors hover:pl-2 duration-300">feminismo y política</a>
              <a href="#" className="hover:text-naranja transition-colors hover:pl-2 duration-300">arte y cultura</a>
              <a href="#" className="hover:text-lila transition-colors hover:pl-2 duration-300">streaming</a>
              <a href="#" className="hover:text-verde transition-colors hover:pl-2 duration-300">nosotras</a>
            </div>
          </div>

          {/* COLUMNA 3: CONTACTO (Derecha) */}
          <div className="flex flex-col gap-6 md:pl-8">
            <span className="text-celeste font-mono font-black text-xs tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-celeste"></span> CONTACTO
            </span>
            
            <a href="mailto:alertaflequillo@gmail.com" className="font-sansita text-2xl hover:text-bordo transition-colors break-all underline underline-offset-8 decoration-white/20">
              alertaflequillo@gmail.com
            </a>

            <div className="flex gap-3 mt-4">
              {['IG', 'TK', 'YT'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 bg-negro border-2 border-white flex items-center justify-center font-mono font-black text-xs relative group overflow-hidden shadow-[3px_3px_0px_#fff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{social}</span>
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 ${
                    social === 'IG' ? 'bg-lila' : social === 'TK' ? 'bg-naranja' : 'bg-verde'
                  }`}></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE CRÉDITOS: Sticker integrado al medio */}
        <div className="w-[80vw] mx-auto mt-24 pt-12 border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            
            {/* Lado Izquierdo */}
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 text-center md:text-left">
              © 2026 ALERTA FLEQUILLO — <span className="text-white/60">HECHO CON AMOR</span>
            </p>

            {/* STICKER CENTRAL: Ahora ubicado entre los dos textos de créditos */}
            <div className="group relative">
              <div className="bg-white text-negro px-4 py-2 font-mono font-black text-[10px] -rotate-2 shadow-[5px_5px_0px_#A52502] group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 cursor-pointer uppercase whitespace-nowrap">
                Design by Lula
              </div>
            </div>

            {/* Lado Derecho */}
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.5em] text-white/30">
              <span className="hover:text-white cursor-help transition-colors italic">privacidad?</span>
              <span className="text-white/60">Córdoba, Argentina</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}