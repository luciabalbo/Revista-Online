"use client";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link"; 
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import notas from '@/app/notas.json';

export default function Home() {
  // 1. Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bgHover, setBgHover] = useState('#000B0D');
  
  // NUEVOS ESTADOS PARA EL CURSOR
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 2. Referencias y Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // 3. Efectos
  useEffect(() => {
    // Manejo de Scroll para el Navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Manejo de Mouse para el Cursor Custom
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 4. Lógica de Datos 
  const notasBanner = notas.slice(0, 3);
  const notasGrilla = notas.slice(3, 6);

  // 5. Funciones de Navegación del Slider
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
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

                  <Link 
                    href="/apoyanos" 
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
                href="/apoyanos" 
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
          {notasBanner.map((nota) => (
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
              <div className="relative h-full w-full flex flex-col justify-end items-center text-center z-20 px-4 pb-20 md:pb-32">
                
                <div className="max-w-[90vw] md:max-w-5xl flex flex-col items-center">
                  
                  {/* Título: Tamaño reducido para estilo editorial */}
                  <Link href={`/notas/${nota.slug}`}>
                    <h2 className="font-sansita font-bold text-4xl md:text-5xl text-blanco leading-[0.9] tracking-tighter hover:text-bordo transition-all duration-500 drop-shadow-2xl">
                      {nota.titulo}
                    </h2>
                  </Link>

                  {/* Bajada*/}
                  <p className="mt-4 font-montserrat text-blanco/90 text-sm md:text-lg lg:text-xl max-w-[85vw] md:max-w-3xl leading-relaxed">
                    "{nota.bajada}"
                  </p>

                  {/* SECCIÓN AUTOR*/}
                  <div className="mt-6 flex items-center gap-3 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.5em]">
                    <span className="text-white/40">POR</span>
                    <span className="text-naranja font-black">
                      {nota.autor || "VALENTINA TERRAGNO"}
                    </span>
                  </div>

                  {/* Botón*/}
                  <Link href={`/notas/${nota.slug}`} className="mt-10 group/btn flex items-center gap-3 text-white/60 hover:text-white transition-colors font-bold uppercase text-[9px] tracking-[0.3em]">
                    <span className="border-b border-white/20 pb-1 group-hover/btn:border-naranja transition-all">Seguir leyendo</span>
                    <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
                  hacé que este <span className="text-bordo">grito</span> siga sonando.
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <p className="font-montserrat font-medium text-negro/50 text-sm md:text-base max-w-md leading-relaxed">
                  Si te gusta lo que hacemos, sumate y llevate el nuevo libro. Tu apoyo es lo que nos permite seguir gritando.
                </p>

                {/* BOTÓN */}
                <Link 
                  href="/apoyanos" 
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
      <section className="bg-[#f8f7f2] pb-24 px-4 -mt-1 pt-16 md:pt-20">
        {/* Este div controla el ancho y lo centra */}
        <div className="max-w-[80%] mx-auto"> 

          {/* Grilla */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-0">
            {(notasGrilla.length > 0 ? notasGrilla : notas.slice(0, 4)).map((nota, i) => {
              const colorDeNota = coloresCategorias[nota.categoria] || coloresCategorias.default;
              
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
                    {nota.categoria}
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

     {/* --- SECCIÓN DIVISORA: FOTOPERIODISMO (ESTILO HERO) --- */}
      <section className="relative w-full py-20 md:py-24 bg-negro overflow-hidden border-y border-white/5">
        
        {/* IMAGEN DE FONDO (Traída del banner) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {notasBanner && notasBanner[0] ? (
            <img 
              src={notasBanner[0].imagen} 
              alt="Background"
              className="w-full h-full object-cover opacity-70 grayscale" 
            />
          ) : (
            // Imagen de respaldo por si el array está vacío
            <div className="w-full h-full bg-[#0a0a0a]" /> 
          )}
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >

            {/* Título Centrado y Gigante */}
            <h2 className="font-sansita font-bold text-5xl md:text-8xl text-blanco leading-none lowercase tracking-tighter">
              fotoperiodismo<span className="text-celeste">.</span>
            </h2>

            {/* BOTÓN CENTRADO */}
            <Link 
              href="/galeria-fotoperiodismo" 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative inline-flex items-center gap-4 bg-blanco text-negro px-10 py-4 font-bold uppercase text-[11px] tracking-[0.3em] transition-all 
                        shadow-[6px_6px_0px_#1C8394] 
                        hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] shrink-0"
            >
              Ver Galería
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/*<section className="max-w-7xl mx-auto px-6 py-20">
        {/* --- SECCIÓN CATEGORÍAS: EXPLORÁ EL CAOS --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        
        <div className="mb-16 relative">
          <h3 className="text-[15vw] font-montserrat font-[900] leading-none text-negro/5 absolute -top-12 left-0 select-none">
            CATEGORIAS
          </h3>
          <h3 className="text-3xl md:text-4xl font-sansita font-[700] relative z-10 border-l-8 border-bordo pl-4 tracking-tighter">
            Explorá el <span className="text-bordo">caos</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: ARTE */}
          <div className="bg-bordo rounded-[30px] p-6 h-[260px] relative overflow-hidden group cursor-pointer shadow-xl transition-transform hover:-translate-y-2">
            <img src="/stikers/estrella.png" className="absolute top-4 right-4 w-12 h-12 opacity-80 group-hover:rotate-12 transition-transform" alt="sticker" />
            
            <h4 className="text-6xl font-montserrat font-[900] text-white leading-none tracking-tighter mt-4">
              ARTE
            </h4>
          </div>

          {/* CARD 2: CULTURA */}
          <div className="bg-white rounded-[30px] border-2 border-negro p-2 h-[260px] relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-2 shadow-xl">
            <div className="w-full h-full rounded-[22px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src="/stikers/fondo.jpg" className="w-full h-full object-cover" alt="Cultura" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 border-2 border-negro px-4 py-1 -rotate-6 shadow-md">
                  <span className="text-negro font-mono font-bold text-2xl uppercase">Cultura</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: POLÍTICA */}
          <div className="bg-negro rounded-[30px] p-6 h-[260px] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-transform hover:-translate-y-2 shadow-xl">
            <img src="/stikers/rayo.png" className="absolute top-6 right-8 w-10 h-10 group-hover:scale-125 transition-transform" alt="sticker" />
            
            <h4 className="text-4xl font-montserrat font-[900] text-naranja uppercase leading-tight">
              Feminismo <br/> <span className="text-white">Radical</span>
            </h4>

            <div className="absolute -left-4 bottom-20 font-sansita font-black text-white/5 text-8xl -rotate-12 pointer-events-none uppercase">
              Power
            </div>
          </div>

        </div>
      </section>
      {/*<section className="max-w-7xl mx-auto px-6 py-20">
        {/* SECCIÓN DE "MOODBOARD" (Inspirado en imagen 1) 
        <div className="mt-20 border-t-2 border-black pt-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h5 className="font-mono text-sm mb-4">MOODBOARD / REFERENCIAS</h5>
              <p className="text-3xl font-serif italic leading-tight">
                "Buscamos referencias visuales para hackear la normalización del sistema."
              </p>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              {/* Mini collage de tus imágenes 
              <img src="/descarga.jfif" className="w-full aspect-square object-cover rounded-lg rotate-3" />
              <img src="/descarga (2).jpg" className="w-full aspect-square object-cover rounded-lg -rotate-6" />
              <img src="/descarga (1).jfif" className="w-full aspect-square object-cover rounded-lg rotate-12" />
              <img src="/logo_sinfondo.png" className="w-full aspect-square object-contain bg-white rounded-lg" />
            </div>
          </div>
        </div>
      </section>*/}

      {/* BLOQUE CENTRAL (Manifiesto y Buscador) con Imagen de Fondo */}
      <section className="relative py-32 my-12 overflow-hidden min-h-[500px] flex items-center justify-center">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="/banner_buscar.png" 
            alt="Fondo Manifiesto"
            className="w-full h-full object-cover grayscale" 
          />
          <div className="absolute inset-0 bg-negro/70 mix-blend-multiply"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10 px-6">
          <p className="font-montserrat text-2xl md:text-4xl text-white leading-[1.1] max-w-2xl mb-12 text-pretty drop-shadow-xl">
            "No somos una revista, somos un <span className="bg-white text-negro px-2 not-italic font-black mx-1">grito digital</span>. Arte, política y feminismo desde el borde del abismo."
          </p>
          
          <div className="relative w-full max-w-lg group">
            <input 
              type="text" 
              placeholder="BUSCAR EN EL CAOS..." 
              className="w-full bg-white/10 backdrop-blur-sm border-2 border-white p-5 font-mono text-sm focus:outline-none focus:bg-white focus:text-negro transition-all placeholder:text-white/50 text-center uppercase tracking-widest text-white"
            />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-celeste text-negro px-4 py-1 text-xs font-black -rotate-2 border border-negro shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-2 transition-transform">
              BUSCAR
            </div>
          </div>
        </div>
      </section>
      {/* --- FOOTER --- */}
      <footer className="bg-negro text-white pt-20 pb-10 px-6 border-t-4 border-bordo relative overflow-hidden">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          
          {/* COLUMNA 1 */}
          <div className="md:col-span-2 flex flex-col items-start">
            
            <div className="relative w-60 h-60 md:w-50 md:h-50 mb-8 group">
              <div className="absolute inset-0 bg-bordo rounded-full rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]"></div>
              
              <div className="absolute inset-0 rounded-full overflow-hidden -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover scale-110"
                >
                  <source src="/videologo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-4 font-mono uppercase text-sm">
            <span className="text-bordo font-black mb-2 tracking-widest">— SECCIONES</span>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-naranja">Feminismo y Política</a>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-celeste">Arte y Cultura</a>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-lila">Nosotras</a>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-verde">Contacto</a>
          </div>

        {/* Columna 3: */}
        <div className="flex flex-col gap-4 font-mono uppercase text-sm">
          <span className="text-celeste font-black mb-2 tracking-widest">— CONTACTO</span>
          <a href="mailto:alertaflequillo@gmail.com" className="hover:text-white/60 underline decoration-bordo underline-offset-4 text-xs">
            alertaflequillo@gmail.com
          </a>
          
          <div className="flex gap-4 mt-4">
            {/* Instagram */}
            <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-lila hover:rotate-12 transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* TikTok */}
            <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-naranja hover:-rotate-12 transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-verde hover:rotate-6 transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/>
              </svg>
            </a>
          </div>
        </div>
        </div>

        {/* Línea final de créditos */}
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
          <p>© 2026 ALERTA FLEQUILLO - HECHO CON AMOR </p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-help">Privacidad (¿Qué es eso?)</span>
            <span className="text-white">Córdoba, Argentina</span>
          </div>
        </div>

        {/* El sticker final de "Hecho por..." */}
        <div className="absolute bottom-4 right-4 bg-white text-negro p-2 font-black text-[10px] rotate-3 shadow-[4px_4px_0px_0px_rgba(165,37,2)]">
          DESIGN BY LULA
        </div>
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
      </footer>
    </main>
  );
}