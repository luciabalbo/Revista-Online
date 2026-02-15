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
            {['Arte y Cultura', 'Feminismo', 'Streaming', 'Nosotras'].map((item) => (
              <Link key={item} href="#" className="relative group overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                <span className="absolute top-full left-0 text-[#FB9160] transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
              </Link>
            ))}
            <Link href="/apoyanos" className="bg-black text-white px-6 py-2 shadow-[4px_4px_0px_#FB9160] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[9px]">
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
      <header className="pt-52 pb-32 px-6 max-w-6xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block text-[#FB9160] font-bold text-xs uppercase tracking-[0.8em] mb-10"
        >
          {nota.categoria}
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-montserrat font-light text-xl md:text-3xl leading-relaxed text-gray-500 mb-12 italic max-w-4xl mx-auto"
        >
          {nota.bajada}
        </motion.h2>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sansita font-bold text-7xl md:text-[13vw] leading-[0.75] tracking-tighter italic lowercase mb-16"
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
          <div className="font-montserrat text-xl md:text-[26px] leading-[1.8] text-gray-900 space-y-16 first-letter:text-8xl first-letter:font-sansita first-letter:mr-4 first-letter:float-left first-letter:text-[#FB9160]">
            {nota.cuerpo || "Escribiendo la historia..."}
            
            <motion.div 
              whileInView={{ scaleX: [0, 1] }}
              className="py-24 border-y border-black/5 text-center relative"
            >
               <p className="font-sansita font-bold text-4xl md:text-7xl italic leading-none lowercase text-black/20 absolute inset-0 flex items-center justify-center select-none">
                 resistencia
               </p>
               <p className="font-sansita font-bold text-3xl md:text-5xl italic leading-tight lowercase relative z-10">
                 la comunicación es un acto de rebeldía constante.
               </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* 4. RELACIONADOS: Grid Dinámico */}
      <section className="bg-black py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sansita text-white text-5xl md:text-8xl italic mb-20 lowercase tracking-tighter">
            seguí explorando <span className="text-[#FB9160]">.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10">
            {notas.slice(0, 3).map((rel, i) => (
              <Link key={rel.slug} href={`/notas/${rel.slug}`} className="group relative bg-black p-10 overflow-hidden transition-colors hover:bg-[#FB9160]">
                <span className="font-mono text-[9px] text-white/40 group-hover:text-black uppercase mb-8 block">0{i+1} / {rel.categoria}</span>
                <h3 className="font-sansita text-3xl text-white group-hover:text-black leading-none italic lowercase mb-20">{rel.titulo}</h3>
                <div className="absolute bottom-10 right-10 text-white group-hover:text-black text-4xl transition-transform group-hover:translate-x-2">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER: Wes Anderson Brutalism */}
      <footer className="bg-[#FB9160] py-40 px-6 text-center relative">
        <motion.h2 
          animate={{ x: [-20, 20] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
          className="font-sansita font-black text-[20vw] leading-none text-white/20 absolute top-10 left-0 whitespace-nowrap select-none"
        >
          ALERTA FLEQUILLO ALERTA FLEQUILLO
        </motion.h2>
        
        <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white mb-8">¿te gustó esta nota?</p>
          <h3 className="font-sansita text-6xl md:text-9xl text-white italic lowercase mb-16 leading-none">unite a la <br/> revolución.</h3>
          <Link href="/" className="inline-block bg-black text-white px-16 py-6 rounded-full font-sansita font-bold text-xl hover:bg-white hover:text-black transition-all">
            Ir a la portada
          </Link>
        </div>
      </footer>
    </article>
  );
}