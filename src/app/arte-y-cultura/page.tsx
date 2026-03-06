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
							{['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => {
									// Función para limpiar el texto: quita tildes y pone guiones
									const slug = item
									.toLowerCase()
									.normalize("NFD") // Separa la tilde de la letra
									.replace(/[\u0300-\u036f]/g, "") // Borra la tilde
									.replace(/\s+/g, '-') // Cambia espacios por guiones
									.replace(/[^\w\-]+/g, ''); // Borra cualquier cosa que no sea letra o guion

									return (
									<Link 
											key={item} 
											href={`/${slug}`} 
											className="font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-verde transition-colors"
									>
											{item}
									</Link>
									);
							})}
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
              {['IG', 'TK', 'YT'].map((social) => (
                <a key={social} href="#" className="w-7 h-7 md:w-10 md:h-10 bg-negro border-2 border-white flex items-center justify-center font-mono font-black text-[10px] md:text-xs shadow-[3px_3px_0px_#fff] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all">
                  {social}
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