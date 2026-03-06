"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link"; 
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import notas from '@/app/notas.json';

export default function Home() {
  const router = useRouter();
  // 1. Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  
  // Cursor Custom
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Lógica de Filtrado ÚNICA (Corregido: eliminada la duplicación que rompía todo)
  const notasFiltradas = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return notas;
    return notas.filter((nota) => {
      const target = `${nota.titulo} ${nota.autor} ${nota.volanta} ${nota.bajada} ${nota.fecha}`.toLowerCase();
      return target.includes(term);
    });
  }, [searchTerm]);

  // 3. Distribución de notas
  const notasBanner = notas.slice(0, 3); 
  const notasGrilla = notasFiltradas;    

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  //Función de las flechitas 
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const ejecutarBusqueda = (termino: string) => {
    setSearchTerm(termino);
    const section = document.getElementById('archivo-notas');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const coloresCategorias: { [key: string]: string } = {
    "Comunicación": "#390D02",
    "Feminismo": "#4F136C",
    "Cultura": "#154B52",
    "Streaming": "#A52502",
    "Política": "#1C8394",
    "Arte y Cultura": "#154B52", 
    "default": "#FB9160"
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[150] transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'bg-negro/95 backdrop-blur-md py-2 shadow-2xl' 
            : 'bg-transparent' 
        }`}>
        
        <div className="flex flex-col items-center w-full">
          
          {/* 1. BLOQUE DEL LOGO */}
          <div className={`w-full flex justify-center items-center transition-all duration-700 overflow-hidden ${
            isScrolled 
              ? 'h-0 opacity-0'
              : 'bg-[#f8f7f2] py-10 md:py-14 opacity-100'
          }`}>
            <Link href="/" className="group shrink-0 px-6">
              <motion.img 
                src="/logo_sinfondo.png" 
                alt="Logo" 
                className="h-28 md:h-44 object-contain transition-transform duration-500 group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* 2. BARRA DE NAVEGACIÓN */}
          <div className={`w-full bg-negro transition-all duration-500 border-b border-white/5 ${
            isScrolled ? 'py-1' : 'py-0'
          }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14 md:h-13">
              
              {/* LOGO IZQUIERDA (SCROLL) */}
              <div className="flex items-center flex-1"> 
                <AnimatePresence>
                  {isScrolled && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="mr-4 flex items-center cursor-pointer" 
                      onClick={() => {
                        setSearchTerm(''); 
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 
                        router.push('/'); 
                      }}
                    >
                      <img src="/logo_sinfondo.png" alt="Logo" className="h-10 md:h-13 w-auto object-contain" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* MENÚ DESKTOP */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                {['Arte y Cultura', 'Feminismo y Politica', 'Streaming', 'Nosotras', 'Contacto'].map((item) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                    className="relative group block font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap"
                  >
                    <div className="relative overflow-hidden h-[20px] flex flex-col justify-start"> 
                      <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                      <span className="absolute top-full left-0 text-bordo transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
                    </div>
                  </Link>
                ))}

                {/* LUPITA BUSCADOR DESKTOP */}
                <div className="flex items-center gap-2 ml-2">
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }} animate={{ width: 120, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                        autoFocus type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && ejecutarBusqueda(searchTerm)}
                        placeholder="BUSCAR..."
                        className="bg-transparent border-b border-white text-white font-mono text-[10px] outline-none placeholder:text-white/30"
                      />
                    )}
                  </AnimatePresence>
                  <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white hover:text-naranja transition-colors p-2 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </button>
                </div>

                <Link href="/comunidad" className="bg-white text-negro font-black uppercase tracking-[0.2em] transition-all hover:bg-bordo hover:text-white px-5 py-2 text-[10px] rotate-1 hover:rotate-0 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] ml-2 whitespace-nowrap">
                  Sumate a la comunidad
                </Link>
              </div>

              {/* BOTONES MOBILE */}
              <div className="flex lg:hidden items-center gap-4">
                <button 
                  onClick={() => setIsMenuOpen(true)} 
                  className="text-white p-2"
                >
                  <div className="flex flex-col gap-1.5 items-end">
                    <div className="w-8 h-1 bg-white"></div>
                    <div className="w-5 h-1 bg-white"></div>
                    <div className="w-8 h-1 bg-white"></div>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY DEL MENÚ MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-blanco z-[200] flex flex-col items-center justify-center"
          >
            {/* CERRAR */}
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="absolute top-8 right-8 text-negro p-4"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-6 px-10 text-center">
              {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras', 'Contacto'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link 
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="text-1xl text-negro uppercase hover:text-bordo transition-colors block"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              
              <Link 
                href="/comunidad" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 bg-negro text-white px-4 py-2 uppercase tracking-widest shadow-[8px_8px_0px_#A52502] rotate-2 active:rotate-0 transition-all text-sm"
              >
                Súmate a la comunidad
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESPACIADOR DINÁMICO */}
      <div className={`transition-all duration-700 ${
          isScrolled 
            ? 'h-[64px] md:h-[70px]' 
            : 'h-[250px] md:h-[250px]'
        }`} 
      />
      
      {/* --- SECCIÓN PRINCIPAL --- */}
      <section className="relative w-full h-[80vh] md:h-[120vh] bg-negro overflow-hidden">
        
        <div 
          ref={scrollRef} 
          className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {notasBanner.map((nota) => {
            const colorCategoria = coloresCategorias[nota.volanta] || coloresCategorias["default"];

            return (
              <div key={nota.id} className="min-w-full h-full snap-center relative flex-shrink-0 group">
                
                {/* IMAGEN */}
                <img 
                  src={nota.imagen} 
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.7] md:brightness-[0.9]" 
                  alt={nota.titulo} 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-negro/90 via-negro/20 to-transparent z-10" />
                
                {/* CONTENEDOR DE TEXTO */}
                <div className="relative h-full w-full flex flex-col justify-center items-center text-center z-20 px-4">
                  
                  <div className="max-w-[90vw] md:max-w-5xl flex flex-col items-center">
                    
                    {/* CATEGORÍA*/}
                    <span 
                      className="mb-6 inline-block bg-white text-negro font-montserrat text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-black px-4 py-1.5  transition-all duration-300 hover:rotate-0 hover:text-white"
                      style={{ 
                        ['--hover-color' as any]: colorCategoria 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colorCategoria}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      {nota.volanta || "CULTURA"}
                    </span>

                    {/* Título */}
                    <Link href={`/notas/${nota.slug}`}>
                      <h2 className="font-sansita font-bold text-4xl md:text-5xl text-blanco leading-[0.9] tracking-tighter hover:text-bordo transition-all duration-500 drop-shadow-2xl">
                        {nota.titulo}
                      </h2>
                    </Link>

                    {/* Bajada */}
                    <p className="mt-4 font-montserrat text-blanco/90 text-sm md:text-lg lg:text-xl max-w-[85vw] md:max-w-3xl leading-relaxed">
                      "{nota.bajada}"
                    </p>

                    {/* SECCIÓN AUTOR */}
                    <div className="mt-6 flex items-center gap-3 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.5em]">
                      <span className="text-white/40">POR</span>
                      <span className="text-white font-black">
                        {nota.autor || "VALENTINA TERRAGNO"}
                      </span>
                    </div>

                    {/* Botón */}
                    <Link href={`/notas/${nota.slug}`} className="mt-10 group/btn flex items-center gap-3 text-white/60 hover:text-white transition-colors font-bold uppercase text-[9px] tracking-[0.3em]">
                      <span className="border-b border-white/20 pb-1 group-hover/btn:border-naranja transition-all">Seguir leyendo</span>
                      <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* FLECHAS */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between px-1 md:px-10 z-50">
          <button 
            onClick={() => scroll("left")} 
            className="pointer-events-auto text-blanco/40 hover:text-naranja transition-all p-1"
          >
            <svg className="w-8 h-8 md:w-14 md:h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={() => scroll("right")} 
            className="pointer-events-auto text-blanco/40 hover:text-naranja transition-all p-1"
          >
            <svg className="w-8 h-8 md:w-14 md:h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>

      {/* --- SECCIÓN DIVISORA  ---*/}
      <section className="relative w-full py-8 md:py-12 bg-[#f8f7f2] overflow-hidden border-y border-negro/5 m-0">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-20">
            
            {/* IZQUIERDA */}
            <motion.div 
              whileHover={{ rotate: -2, scale: 1.05 }}
              className="relative shrink-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-naranja/5 rounded-full blur-2xl"></div>
              <Link href="/apoyanos" className="relative block">
                <img 
                  src="/banner_librito.png" 
                  alt="Sumate" 
                  className="w-24 md:w-52 h-auto drop-shadow-[6px_6px_0px_rgba(0,0,0,0.03)]"
                />
                {/* Sticker más chiquito */}
                <div className="absolute -top-1 -right-1 bg-bordo text-blanco px-1.5 py-0.5 font-mono text-[5px] md:text-[8px] font-black rotate-12 border border-negro shadow-[2px_2px_0px_#000]">
                  ¡NUEVO LIBRO!
                </div>
              </Link>
            </motion.div>

            {/* DERECHA */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4 md:mb-6">
                <h2 className="font-sansita font-bold text-2xl md:text-5xl text-negro leading-[1.1]">
                  Hacé que este <span className="text-bordo">grito</span> <br className="md:hidden" /> siga sonando.
                </h2>
              </div>

              {/* Contenedor de párrafo y botón */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <p className="font-montserrat font-medium text-negro/60 text-xs md:text-base max-w-sm md:max-w-md leading-relaxed">
                  Si te gusta lo que hacemos, sumate y llevate el nuevo libro. Tu apoyo nos permite seguir gritando.
                </p>

                {/* BOTÓN */}
                <Link 
                  href="/comunidad" 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative inline-flex items-center gap-3 bg-negro text-blanco px-6 py-3 md:px-8 md:py-3.5 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] transition-all 
                              shadow-[4px_4px_0px_#A52502] 
                              hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] shrink-0"
                >
                  Sumate ahora
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


     {/* --- SECCIÓN: ARCHIVO DE NOTAS --- */}
      <section id="archivo-notas" className="bg-[#f8f7f2] pb-24 px-4 -mt-1 pt-16 md:pt-20">
        <div className="max-w-[80%] mx-auto"> 

          {/* Grilla */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-0">
            {(notasGrilla.length > 0 ? notasGrilla : notas.slice(0, 4)).map((nota, i) => {
              const colorDeNota = coloresCategorias[nota.volanta] || coloresCategorias.default;
              
              return (
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  key={nota.id || i} 
                  className="group flex flex-col h-full max-w-[320px] mx-auto lg:mx-0" 
                >

                  {/* 1. IMAGEN */}
                  <Link href={`/notas/${nota.slug}`} className="relative block mb-4 overflow-visible">
                    <div className="relative aspect-[4/4] overflow-hidden border border-blanco z-10 bg-[#f8f7f2] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                      <img 
                        src={nota.imagen} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0" 
                        alt={nota.titulo} 
                      />
                    </div>
                    <div 
                      style={{ backgroundColor: colorDeNota }}
                      className="absolute inset-0 translate-x-1.5 translate-y-1.5 opacity-10 -z-10"
                    ></div>
                  </Link>

                  {/* 2. CATEGORÍA */}
                  <span 
                    style={{ color: colorDeNota }}
                    className="font-montserrat text-[9px] font-black uppercase tracking-[0.3em] mb-1"
                  >
                    {nota.volanta}
                  </span>

                  {/* 3. TEXTO */}
                  <div className="flex flex-col flex-grow">
                    <Link href={`/notas/${nota.slug}`}>
                      <h4 className="font-sansita font-bold text-[18px] leading-tight text-negro group-hover:text-bordo transition-colors  mb-1">
                        {nota.titulo}
                      </h4>
                    </Link>

                    <p className="font-montserrat text-negro/70 text-[11px] leading-snug line-clamp-2 mb-4">
                      {nota.bajada}
                    </p>

                    {/* 4. PIE DE CARD */}
                    <div className="mt-auto pt-1 border-t border-negro/10 flex justify-between items-end">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[8px] uppercase text-negro/40 font-black tracking-[0.2em]">
                          Escrito por
                        </span>
                        <p className="font-mono text-[9px] uppercase font-black text-negro group-hover:underline decoration-1 underline-offset-2"
                          style={{ textDecorationColor: colorDeNota }}>
                          {nota.autor}
                        </p>
                      </div>
                      
                      {/* Botón */}
                      <Link 
                        href={`/notas/${nota.slug}`}
                        style={{ borderColor: colorDeNota, color: colorDeNota }}
                        className="relative w-6 h-6 border flex items-center justify-center transition-all duration-300 hover:text-white overflow-hidden"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colorDeNota;
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = colorDeNota;
                        }}
                      >
                        <span className="text-lg font-bold">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DIVISORA: FOTOPERIODISMO --- */}
      <section className="relative w-full py-28 md:py-36 bg-[#f8f5f0] overflow-hidden border-y border-negro/5">
        
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {notasBanner && notasBanner[0] ? (
            <img 
              src={notasBanner[0].imagen} 
              alt="Background Illustration"
              className="w-full h-full object-cover 
                         grayscale brightness-[1.1] contrast-[1.4] opacity-30 
                         mix-blend-multiply transition-all duration-1000" 
            />
          ) : (
            <div className="w-full h-full bg-[#f8f5f0]" /> 
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5f0] via-transparent to-[#f8f5f0] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5f0] via-transparent to-[#f8f5f0] opacity-80" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-10"
          >

            {/* Título */}
            <h2 className="font-sansita font-bold text-2xl md:text-[4rem] text-negro leading-[0.8] tracking-tighter drop-shadow-sm">
              Fotoperiodismo<span className="text-celeste">.</span>
            </h2>

            <Link 
              href="/galeria-fotoperiodismo" 
              className="group relative inline-flex items-center gap-3 md:gap-4 bg-blanco text-negro 
                        px-3 py-2 md:px-6 md:py-3 
                        font-black uppercase 
                        text-[7px] md:text-[10px] 
                        tracking-[0.2em] md:tracking-[0.4em] 
                        transition-all 
                        shadow-[5px_5px_0px_#1C8394] md:shadow-[8px_8px_0px_#1C8394] 
                        border-2 border-negro
                        hover:shadow-none hover:translate-x-[5px] md:hover:translate-x-[8px] hover:translate-y-[5px] md:hover:translate-y-[8px] shrink-0"
            >
              Ver Galería
              <span className="text-sm md:text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    
     {/* --- SECCIÓN CATEGORÍAS --- */}
      <section className="w-full bg-[#f8f7f2]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative overflow-hidden">
          
          {/* Título de sección */}
          <div className="mb-10 md:mb-16 relative">
            <h3 className="text-2xl md:text-5xl font-sansita relative z-10 border-l-[8px] md:border-l-[12px] border-bordo pl-4 md:pl-6 tracking-tighter">
              Alerta Flequillo <span className="text-bordo font-mono text-sm md:text-2xl align-middle ml-1 md:ml-2">- hecho con amor</span>
            </h3>
          </div>

          {/* Grid: Gap más chico en mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            
            {/* CARD 1: Feminismo y Política */}
            <div className="bg-bordo rounded-[30px] md:rounded-[40px] p-6 md:p-8 h-[200px] md:h-[280px] relative overflow-hidden group cursor-pointer shadow-[0_15px_30px_rgba(165,37,2,0.2)] transition-all duration-500 hover:-translate-y-2 flex items-center justify-center text-center border-2 border-transparent hover:border-white/20">
              <div className="absolute top-6 right-6 w-14 h-14 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
              
              <h4 className="text-3xl md:text-5xl font-sansita text-white leading-[0.85] tracking-tighter relative z-10">
                Feminismo <br/>
                <span className="text-negro/90 group-hover:text-white transition-colors duration-500">& política</span>
              </h4>
            </div>

            {/* CARD 2: Arte y Cultura */}
            <div className="bg-white rounded-[30px] md:rounded-[40px] border-[2px] md:border-[3px] border-negro p-2 h-[200px] md:h-[280px] relative overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-[6px_6px_0px_rgba(0,0,0,0.05)] md:shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
              <div className="w-full h-full rounded-[22px] md:rounded-[30px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src="/stikers/fondo.jpg" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Cultura" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white border-[2px] md:border-[3px] border-negro px-4 py-1.5 md:px-6 md:py-2 -rotate-6 shadow-[5px_5px_0px_#000] md:shadow-[8px_8px_0px_#000] group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-negro font-mono font-black text-lg md:text-2xl uppercase tracking-tighter">Arte y Cultura</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Comunidad */}
            <div className="bg-negro rounded-[30px] md:rounded-[40px] p-6 md:p-8 h-[200px] md:h-[280px] group cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_15px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-center border-2 border-white/5 hover:border-naranja/30">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-naranja/10 rounded-full blur-3xl group-hover:bg-naranja/20 transition-colors" />
              
              <h4 className="text-3xl md:text-5xl font-sansita text-naranja leading-[0.85] tracking-tighter relative z-10">
                Súmate a la <br/> 
                <span className="text-white group-hover:text-naranja transition-colors duration-500">comunidad</span>
              </h4>
            </div>

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
              <a href="/feminismo-politica" className="hover:text-celeste transition-colors hover:scale-105 duration-300">Feminismo y política</a>
              <a href="/arte-cultura" className="hover:text-naranja transition-colors hover:scale-105 duration-300">Arte y cultura</a>
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
      {/* CURSOR CUSTOM */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 bg-naranja/30 rounded-full pointer-events-none z-[999] mix-blend-multiply hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovered ? 2.5 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      />
    </main>
  );
}