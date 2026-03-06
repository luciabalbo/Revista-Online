"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link"; 
import { motion, AnimatePresence } from 'framer-motion';
import notas from '@/app/notas.json';

export default function ArteYCultura() {
  const router = useRouter();
  
  // 1. Estados de UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. FILTRADO ESPECÍFICO: Solo notas de "Arte y Cultura"
  const notasCategoria = useMemo(() => {
    return notas.filter(nota => nota.volanta === "Arte y Cultura");
  }, []);

  // 3. Lógica de búsqueda dentro de la categoría
  const notasFiltradas = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return notasCategoria;
    return notasCategoria.filter((nota) => {
      const target = `${nota.titulo} ${nota.autor} ${nota.bajada}`.toLowerCase();
      return target.includes(term);
    });
  }, [searchTerm, notasCategoria]);

  // Distribución: Los primeros 3 para el banner, el resto para la grilla
  const notasBanner = notasCategoria.slice(0, 3); 
  const notasGrilla = notasFiltradas;    

  // Efectos de Scroll y Mouse
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const coloresCategorias: { [key: string]: string } = {
    "Arte y Cultura": "#059669", 
    "default": "#FB9160"
  };

  return (
    <main className="min-h-screen bg-[#f8f7f2] overflow-x-hidden">
      
      {/* NAVBAR (Copiada de la Home para mantener consistencia) */}
      <nav className={`fixed top-0 w-full z-[150] transition-all duration-700 ${
          isScrolled ? 'bg-negro/95 backdrop-blur-md py-2 shadow-2xl' : 'bg-transparent' 
        }`}>
        <div className="flex flex-col items-center w-full">
          <div className={`w-full flex justify-center items-center transition-all duration-700 overflow-hidden ${
            isScrolled ? 'h-0 opacity-0' : 'bg-[#f8f7f2] py-10 md:py-14 opacity-100'
          }`}>
            <Link href="/" className="px-6">
              <img src="/logo_sinfondo.png" alt="Logo" className="h-28 md:h-44 object-contain" />
            </Link>
          </div>
          <div className="w-full bg-negro py-2">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
              <Link href="/" className="flex items-center">
                 <img src="/logo_sinfondo.png" alt="Logo" className={`h-10 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
              </Link>
              
              <div className="hidden lg:flex items-center gap-10">
                {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-verde transition-colors">
                    {item}
                  </Link>
                ))}
              </div>

              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-white">
                <div className="flex flex-col gap-1 items-end"><div className="w-6 h-0.5 bg-white"></div><div className="w-4 h-0.5 bg-white"></div></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ESPACIADOR */}
      <div className={isScrolled ? 'h-[64px]' : 'h-[250px] md:h-[280px]'} />

      {/* --- BANNER DE CATEGORÍA --- */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-negro overflow-hidden">
        <div ref={scrollRef} className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {notasBanner.map((nota) => (
            <div key={nota.id} className="min-w-full h-full snap-center relative flex-shrink-0 group">
              <img src={nota.imagen} className="absolute inset-0 w-full h-full object-cover brightness-50" alt={nota.titulo} />
              <div className="relative h-full flex flex-col justify-center items-center text-center z-20 px-6">
                <span className="bg-verde text-white px-4 py-1 text-[10px] uppercase font-black tracking-widest mb-4">Destacado de hoy</span>
                <h2 className="font-sansita font-bold text-5xl md:text-7xl text-white leading-tight max-w-4xl tracking-tighter italic">
                  {nota.titulo}
                </h2>
                <p className="mt-4 font-montserrat text-white/80 text-lg max-w-2xl">{nota.bajada}</p>
                <Link href={`/notas/${nota.slug}`} className="mt-8 border-b-2 border-verde text-white uppercase text-[10px] tracking-[0.4em] font-black pb-1 hover:text-verde transition-all">Leer Nota →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TÍTULO DE SECCIÓN --- */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-negro pb-6">
          <h1 className="font-sansita text-6xl md:text-8xl text-negro leading-none tracking-tighter">
            arte y <span className="text-verde">cultura</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-negro/40 mt-4 md:mt-0">
            {notasCategoria.length} notas publicadas
          </p>
        </div>
      </section>

      {/* --- GRILLA DE TODAS LAS NOTAS (3 COLUMNAS) --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {notasGrilla.map((nota, i) => (
            <motion.article 
              key={nota.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/notas/${nota.slug}`}>
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-200">
                  <img 
                    src={nota.imagen} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    alt={nota.titulo} 
                  />
                  <div className="absolute inset-0 bg-verde/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <span className="font-mono text-[10px] text-verde font-bold uppercase tracking-[0.3em]">
                  {nota.fecha || '2026'}
                </span>
                <h3 className="font-sansita text-3xl text-negro mt-2 leading-none group-hover:text-verde transition-colors italic">
                  {nota.titulo}
                </h3>
                <p className="font-montserrat text-sm text-negro/60 mt-4 line-clamp-3 leading-relaxed">
                  {nota.bajada}
                </p>
                <div className="mt-6 flex items-center justify-between">
                   <span className="font-mono text-[9px] font-black uppercase text-negro/40">Por {nota.autor}</span>
                   <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* --- FOOTER (Simplificado para categorías) --- */}
      <footer className="bg-negro text-white py-20 px-6 text-center">
        <h2 className="font-sansita text-4xl mb-8 italic">¿Te gusta lo que leés?</h2>
        <Link href="/comunidad" className="bg-verde text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-negro transition-all inline-block">
          Sumate a la comunidad
        </Link>
      </footer>

      {/* MENÚ MOBILE (Reusado de la home) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-verde z-[200] flex flex-col items-center justify-center text-white">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-4xl">×</button>
            {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-sansita mb-6 italic hover:text-negro transition-colors">
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}