"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link"; 
import { motion, AnimatePresence } from 'framer-motion';
import notas from '@/app/notas.json';

export default function FeminismoYPolitica() {
  const router = useRouter();
  
  // 1. Estados de UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // El color estrella de esta sección
  const colorSeccion = "#4F136C"; 

  // 2. FILTRADO: Solo notas de "Feminismo" o "Política" (según como las tengas en el JSON)
  const notasCategoria = useMemo(() => {
    return notas.filter(nota => 
      nota.volanta === "Feminismo" || 
      nota.volanta === "Política" || 
      nota.volanta === "Feminismo y Política"
    );
  }, []);

  // 3. Lógica de búsqueda
  const notasFiltradas = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return notasCategoria;
    return notasCategoria.filter((nota) => {
      const target = `${nota.titulo} ${nota.autor} ${nota.bajada}`.toLowerCase();
      return target.includes(term);
    });
  }, [searchTerm, notasCategoria]);

  const notasBanner = notasCategoria.slice(0, 3); 
  const notasGrilla = notasFiltradas;    

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f2] overflow-x-hidden">
      
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
            {['Arte y Cultura', 'Feminismo y politica', 'Streaming', 'Nosotras'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
              className="relative group block font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-negro whitespace-nowrap"
            >
              <div className="relative overflow-hidden h-[20px] flex flex-col justify-start"> 
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                <span className="absolute top-full left-0 text-lila transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
              </div>
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

      {/* --- BANNER --- */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-negro overflow-hidden">
        <div ref={scrollRef} className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {notasBanner.map((nota) => (
            <div key={nota.id} className="min-w-full h-full snap-center relative flex-shrink-0 group">
              <img src={nota.imagen} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" alt={nota.titulo} />
              <div className="relative h-full flex flex-col justify-center items-center text-center z-20 px-6">
                <span className="bg-bordo text-white px-4 py-1 text-[10px] uppercase font-black tracking-widest mb-4">Lo más leído</span>
                <h2 className="font-sansita font-bold text-5xl md:text-7xl text-white leading-tight max-w-4xl tracking-tighter italic">
                  {nota.titulo}
                </h2>
                <p className="mt-4 font-montserrat text-white/80 text-lg max-w-2xl">"{nota.bajada}"</p>
                <Link href={`/notas/${nota.slug}`} className="mt-8 border-b-2 border-bordo text-white uppercase text-[10px] tracking-[0.4em] font-black pb-1 hover:bg-bordo transition-all">Leer artículo →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TÍTULO DE SECCIÓN --- */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-negro pb-6">
          <h1 className="font-sansita text-6xl md:text-8xl text-negro leading-none tracking-tighter">
            feminismo <span className="text-lila">& política</span>
          </h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <div className="w-12 h-12 rounded-full border-2 border-dashed border-lila animate-spin-slow flex items-center justify-center">
             </div>
             <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-negro/40">Periodismo con flequillo</p>
          </div>
        </div>
      </section>

      {/* --- GRILLA --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {notasGrilla.map((nota, i) => (
            <motion.article 
              key={nota.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group"
            >
              <Link href={`/notas/${nota.slug}`}>
                <div className="relative aspect-square mb-6 overflow-hidden border-2 border-negro shadow-[8px_8px_0px_#000] group-hover:shadow-none group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300">
                  <img src={nota.imagen} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={nota.titulo} />
                </div>
                
                <span className="inline-block bg-negro text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest mb-3">
                  {nota.volanta}
                </span>
                <h3 className="font-sansita text-3xl text-negro leading-none group-hover:text-bordo transition-colors italic">
                  {nota.titulo}
                </h3>
                <p className="font-montserrat text-sm text-negro/60 mt-4 line-clamp-2">
                  {nota.bajada}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-negro/10 pt-4">
                   <span className="font-mono text-[9px] font-black uppercase">Por {nota.autor}</span>
                   <div className="w-8 h-8 bg-bordo rounded-full flex items-center justify-center text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* FOOTER IMPORTADO DE TU HOME (Manteniendo tu estilo centrado) */}
      <footer className="bg-negro text-white pt-16 md:pt-28 pb-10 px-6 border-t-[8px] md:border-t-[12px] border-bordo relative overflow-hidden text-center md:text-left">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10 items-start">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/videologo.mp4" type="video/mp4" />
               </video>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-bordo font-mono font-black text-xs tracking-widest uppercase">Secciones</span>
            <div className="flex flex-col gap-2 font-sansita text-xl">
               <Link href="/feminismo-y-politica" className="hover:text-bordo transition-colors">Feminismo y Política</Link>
               <Link href="/arte-y-cultura" className="hover:text-verde transition-colors">Arte y Cultura</Link>
               <Link href="/streaming" className="hover:text-lila transition-colors">Streaming</Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-celeste font-mono font-black text-xs tracking-widest uppercase">Contacto</span>
            <a href="mailto:alertaflequillo@gmail.com" className="font-sansita text-lg underline">alertaflequillo@gmail.com</a>
          </div>
        </div>
      </footer>

      {/* MENU MOBILE OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-bordo z-[300] flex flex-col items-center justify-center p-10">
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white text-2xl font-black">CERRAR</button>
             {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-sansita text-white mb-8 hover:italic">
                  {item}
                </Link>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}