"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link"; 
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import notas from '@/app/notas.json';

export default function Home() {
  // 1. Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Inicializado vacío para evitar error de consola
  
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

  // 3. Distribución de notas (Separadas para que el banner no desaparezca al buscar)
  const notasBanner = notas.slice(0, 3); // EL BANNER QUEDA FIJO (No se rompe)
  const notasGrilla = notasFiltradas;    // LA GRILLA REACCIONA A LA BÚSQUEDA

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

  // RECUPERADO: Función de las flechitas (No se borra más)
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
    "Streaming": "#1C8394",
    "Política": "#000000",
    "Arte y Cultura": "#059669", 
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
              
              <div className={`transition-all duration-500 flex items-center ${
                isScrolled ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'
              }`}>
                <Link href="/">
                  <img 
                      src="/logo.png" 
                      alt="Alerta Flequillo" 
                      className="h-8 md:h-10 brightness-0 object-contain transition-transform hover:scale-110" 
                    />
                </Link>
              </div>

              {/* MENÚ DESKTOP */}
              <div className="hidden lg:flex items-center gap-10">
                {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras', 'Contacto'].map((item) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                    className="relative group overflow-hidden h-4 font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-white"
                  >
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                      {item}
                    </span>
                    <span className="absolute top-full left-0 text-bordo transition-transform duration-500 group-hover:-translate-y-full tracking-normal text-sm">
                      {item}
                    </span>
                  </Link>
                ))}
                {/* LUPITA BUSCADOR */}
                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 150, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        autoFocus
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        // TAMBIÉN ACÁ PARA LA LUPITA:
                        onKeyDown={(e) => e.key === 'Enter' && ejecutarBusqueda(searchTerm)}
                        placeholder="BUSCAR..."
                        className="bg-transparent border-b border-white text-white font-mono text-[10px] outline-none"
                      />
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="text-white hover:text-naranja transition-colors p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </button>
                </div>
                  <Link 
                    href="/comunidad" 
                    className="bg-white text-negro font-black uppercase tracking-[0.2em] transition-all hover:bg-bordo hover:text-white px-5 py-2 text-[10px] rotate-1 hover:rotate-0 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] ml-4"
                  >
                    Sumate a la comunidad
                  </Link>
              </div>

              {/* BOTÓN SUMATE*/}
              <div className="flex items-center">

                {/* Hamburguesa Mobile */}
                <button 
                  onClick={() => setIsMenuOpen(true)} 
                  className="lg:hidden ml-6 text-white text-2xl"
                >
                  ☰
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-naranja z-[200] flex flex-col items-center justify-center gap-8"
          >
            {/* BOTÓN CERRAR EXPLÍCITO (LA X) */}
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="absolute top-10 right-10 text-blanco p-2 group"
            >
              <div className="relative w-10 h-10">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-blanco rotate-45 transition-transform group-hover:scale-110"></div>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-blanco -rotate-45 transition-transform group-hover:scale-110"></div>
              </div>
            </button>

            {/* Links del Menú */}
            <div className="flex flex-col items-center gap-8">
              {['Arte y Cultura', 'Feminismo', 'Streaming', 'Nosotras'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="font-sansita text-5xl text-blanco hover:text-negro transition-colors"
                >
                  {item}
                </Link>
              ))}
              
              <Link 
                href="/comunidad" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-blanco text-naranja px-8 py-3 font-bold uppercase tracking-widest shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
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
                
                {/* CONTENEDOR DE TEXTO: Centrado vertical y horizontal */}
                <div className="relative h-full w-full flex flex-col justify-center items-center text-center z-20 px-4">
                  
                  <div className="max-w-[90vw] md:max-w-5xl flex flex-col items-center">
                    
                    {/* CATEGORÍA: Color dinámico aplicado aquí */}
                    <span 
                      className="mb-4 font-montserrat text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-black"
                      style={{ color: colorCategoria }}
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
                      <span className="text-naranja font-black">
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

      {/* --- SECCIÓN DIVISORA: COMUNIDAD (SLIM & EDITORIAL) --- */}
      <section className="relative w-full py-10 md:py-12 bg-[#f8f7f2] overflow-hidden border-y border-negro/5 m-0">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
            
            {/* IZQUIERDA: El Gatito versión Sticker Small */}
            <motion.div 
              whileHover={{ rotate: -2, scale: 1.05 }}
              className="relative shrink-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-naranja/5 rounded-full blur-3xl"></div>
              <Link href="/apoyanos" className="relative block">
                <img 
                  src="/banner_librito.png" 
                  alt="Sumate" 
                  className="w-40 md:w-52 h-auto drop-shadow-[10px_10px_0px_rgba(0,0,0,0.03)]"
                />
                <div className="absolute -top-2 -right-2 bg-bordo text-blanco px-2 py-1 font-mono text-[8px] font-black rotate-12 border border-negro shadow-[3px_3px_0px_#000]">
                  ¡NUEVO LIBRO!
                </div>
              </Link>
            </motion.div>

            {/* DERECHA: Contenido Compacto */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <h2 className="font-sansita font-bold text-4xl md:text-5xl text-negro leading-none">
                  Hacé que este <span className="text-bordo">grito</span> siga sonando.
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <p className="font-montserrat font-medium text-negro/50 text-sm md:text-base max-w-md leading-relaxed">
                  Si te gusta lo que hacemos, sumate y llevate el nuevo libro. Tu apoyo es lo que nos permite seguir gritando.
                </p>

                {/* BOTÓN */}
                <Link 
                  href="/comunidad" 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative inline-flex items-center gap-4 bg-negro text-blanco px-8 py-3.5 font-bold uppercase text-[10px] tracking-[0.2em] transition-all 
                             shadow-[5px_5px_0px_#A52502] 
                             hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] shrink-0"
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
        {/* Este div controla el ancho y lo centra */}
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
        
        {/* IMAGEN DE FONDO CORREGIDA */}
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
          {/* Overlay de desvanecimiento para que no se corte en los bordes */}
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

            {/* Título: Gigante y con tracking apretado */}
            <h2 className="font-sansita font-bold text-2xl md:text-[4rem] text-negro leading-[0.8] lowercase tracking-tighter drop-shadow-sm">
              fotoperiodismo<span className="text-celeste">.</span>
            </h2>

            {/* BOTÓN CON ESTILO BRUTALISTA */}
            <Link 
              href="/galeria-fotoperiodismo" 
              className="group relative inline-flex items-center gap-4 bg-blanco text-negro px-6 py-3 font-black uppercase text-[10px] tracking-[0.4em] transition-all 
                        shadow-[8px_8px_0px_#1C8394] 
                        border-2 border-negro
                        hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] shrink-0"
            >
              Ver Galería
              <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    
      {/* --- SECCIÓN CATEGORÍAS --- */}
      <section className="w-full bg-[#f8f7f2]">
        <div className="max-w-6xl mx-auto px-6 py-24 relative overflow-hidden">
          
          <div className="mb-16 relative">
            <h3 className="text-3xl md:text-5xl font-sansita relative z-10 border-l-[12px] border-bordo pl-6 tracking-tighter lowercase">
              alerta flequillo <span className="text-bordo font-mono text-xl md:text-2xl align-middle ml-2">- hecho con amor</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* CARD 1: Feminismo y Política */}
            <div className="bg-bordo rounded-[40px] p-8 h-[280px] relative overflow-hidden group cursor-pointer shadow-[0_20px_40px_rgba(165,37,2,0.2)] transition-all duration-500 hover:-translate-y-3 flex items-center justify-center text-center border-2 border-transparent hover:border-white/20">
              <div className="absolute top-6 right-6 w-14 h-14 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
              
              <h4 className="text-4xl md:text-5xl font-sansita text-white leading-[0.85] tracking-tighter relative z-10 lowercase">
                feminismo <br/>
                <span className="text-negro/90 group-hover:text-white transition-colors duration-500">& política</span>
              </h4>
            </div>

            {/* CARD 2: Arte y Cultura (Diseño Sticker con mejoras de borde) */}
            <div className="bg-white rounded-[40px] border-[3px] border-negro p-2.5 h-[280px] relative overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-3 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
              <div className="w-full h-full rounded-[30px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src="/stikers/fondo.jpg" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Cultura" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white border-[3px] border-negro px-6 py-2 -rotate-6 shadow-[8px_8px_0px_#000] group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-negro font-mono font-black text-2xl uppercase tracking-tighter">Arte y Cultura</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Comunidad */}
            <div className="bg-negro rounded-[40px] p-8 h-[280px] group cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center text-center border-2 border-white/5 hover:border-naranja/30">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-naranja/10 rounded-full blur-3xl group-hover:bg-naranja/20 transition-colors" />
              
              <h4 className="text-4xl md:text-5xl font-sansita text-naranja leading-[0.85] tracking-tighter relative z-10 lowercase">
                súmate a la <br/> 
                <span className="text-white group-hover:text-naranja transition-colors duration-500">comunidad</span>
              </h4>
            </div>

          </div>
        </div>
      </section>

    {/* --- SECCIÓN: BUSCADOR EN EL CAOS --- */}
    <section className="relative w-full py-32 bg-blanco overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 grayscale grayscale-100">
        <img src="/banner_buscar.png" className="w-full h-full object-cover" alt="Fondo Buscador" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-sansita text-4xl md:text-6xl text-negro mb-8 leading-[1]">
          Un espacio de encuentro y comuinidad, de historias cercanas que podemos caminar.
        </h2>
        
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute -top-4 left-4 bg-celeste text-negro font-bold text-[10px] px-3 py-1 uppercase tracking-widest border border-negro z-20 shadow-[2px_2px_0px_#000]">
            Buscar
          </div>
          
          <div className="flex flex-col md:flex-row gap-0 shadow-[10px_10px_0px_#000] border-2 border-negro transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
            <input 
              type="text" 
              placeholder="..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // ESTO HACE QUE AL APRETAR ENTER TE LLEVE ABAJO:
              onKeyDown={(e) => e.key === 'Enter' && ejecutarBusqueda(searchTerm)}
              className="w-full bg-white/80 backdrop-blur-sm p-6 font-mono text-sm uppercase tracking-widest outline-none placeholder:text-negro/30"
            />
            <button 
              onClick={() => ejecutarBusqueda(searchTerm)}
              className="bg-negro text-white px-10 py-6 font-black uppercase text-xs tracking-widest hover:bg-naranja transition-colors"
            >
              Ir →
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <span className="font-mono text-[12px] text-negro/40 uppercase">Tendencias:</span>
          {['Cultura', 'Aborto', 'Streaming', 'IA'].map((tag) => (
            <button 
              key={tag} 
              onClick={() => ejecutarBusqueda(tag)}
              className="font-mono text-[12px] font-bold uppercase underline decoration-naranja hover:text-bordo transition-colors"
            >
              #{tag}
            </button>
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
              <a href="feminismo-politica" className="hover:text-celeste transition-colors hover:pl-2 duration-300">feminismo y política</a>
              <a href="/arte-cultura" className="hover:text-naranja transition-colors hover:pl-2 duration-300">arte y cultura</a>
              <a href="/streaming" className="hover:text-lila transition-colors hover:pl-2 duration-300">streaming</a>
              <a href="/nosotras" className="hover:text-verde transition-colors hover:pl-2 duration-300">nosotras</a>
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