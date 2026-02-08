"use client";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link"; // Importante para navegar
import notas from '@/app/notas.json'; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filtramos las notas: las primeras 3 para el Slider, las siguientes 3 para la grilla
  const notasBanner = notas.slice(0, 3);
  const notasGrilla = notas.slice(3, 6);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* HEADER */}
      <header className="flex flex-col items-center overflow-hidden p-0 m-0"> 
        <div className="relative w-full max-w-2xl h-[250px] md:h-[400px] -mt-4 md:-mt-22 -mb-6 md:-mb-20 transition-transform hover:scale-105 duration-500"> 
          <Image 
            src="/AlertaFlequillo.png" 
            alt="Alerta Flequillo Logo" 
            fill 
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </header>
      
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-black text-white py-4 flex flex-wrap justify-center gap-6 text-sm font-black font-montserrat uppercase shadow-xl">
        <Link href="/" className="hover:text-bordo underline decoration-bordo underline-offset-4">Inicio</Link>
        <a href="#" className="hover:text-naranja">Feminismo y Política</a>
        <a href="#" className="hover:text-celeste">Arte y Cultura</a>
        <a href="#" className="hover:text-lila">Nosotras</a>
        <a href="#" className="hover:text-verde">Contacto</a>
        <a href="#" className="bg-white text-black px-2 py-0.5 rotate-2 hover:bg-bordo hover:text-white transition-all">Apoyanos</a>
      </nav>
      
     {/* --- SECCIÓN PRINCIPAL: SLIDER DINÁMICO --- */}
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black group">
        <div 
          ref={scrollRef} 
          className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {notasBanner.map((nota) => (
            <div key={nota.id} className="min-w-full h-full snap-center relative flex-shrink-0">
              <img 
                src={nota.imagen} 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7] transition-all duration-700" 
                alt={nota.titulo}
              />
              {/* CONTENIDO CENTRADO */}
              <div className="relative h-full w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
                
                {/*} <span className="bg-bordo text-white px-4 py-1 font-montserrat text-xs md:text-sm uppercase mb-4 tracking-widest shadow-lg">
                  {nota.categoria}
                </span>*/}

                <Link href={`/notas/${nota.slug}`}>
                  <h2 className="font-sansita font-[900] text-5xl md:text-[60px] text-bordo leading-[0.9] max-w-5xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-transform cursor-pointer">
                    {nota.titulo}
                  </h2>
                </Link>

                <div className="mt-6 max-w-3xl">
                  <p className="font-montserrat italic text-white text-lg md:text-2xl text-pretty drop-shadow-md">
                    "{nota.bajada}"
                  </p>
                  
                  <div className="flex flex-col items-center gap-4 mt-6">
                    <p className="font-mono text-white/90 text-sm uppercase tracking-[0.2em]">
                      Por <span className="text-celeste font-bold">{nota.autor}</span>
                    </p>
                    
                    <Link href={`/notas/${nota.slug}`} className="mt-2 bg-white text-black px-6 py-2 font-black text-sm uppercase hover:bg-bordo hover:text-white transition-all shadow-xl">
                      Leer más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FLECHAS ESTILO MINIMALISTA */}
        <button 
          onClick={() => scroll("left")} 
          className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/20 hover:bg-white text-white hover:text-black border border-white/30 w-12 h-12 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        >
          <span className="text-2xl">←</span>
        </button>
        <button 
          onClick={() => scroll("right")} 
          className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black/20 hover:bg-white text-white hover:text-black border border-white/30 w-12 h-12 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        >
          <span className="text-2xl">→</span>
        </button>
      </section>

      {/* --- SECCIÓN 3 COLUMNAS DINÁMICAS --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-negro pt-12">
        {notasGrilla.map((nota) => (
          <Link href={`/notas/${nota.slug}`} key={nota.id}>
            <article className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 mb-6 overflow-hidden border-2 border-negro transition-transform group-hover:-rotate-2">
                <img src={nota.imagen} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <span className="font-sansita font-bold uppercase text-bordo">{nota.categoria}</span>
              <h3 className="font-sansita font-bold text-2xl mt-2 leading-tight group-hover:underline">
                {nota.titulo}
              </h3>
              <p className="font-montserrat text-sm mt-4 text-gray-700 line-clamp-3">{nota.bajada}</p>
              <p className="font-mono text-[10px] mt-4 uppercase text-gray-400">Por {nota.autor}</p>
            </article>
          </Link>
        ))}
      </section>
      {/* --- SECCIÓN 3 COLUMNAS (Inspo Feminacida) --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-negro pt-12">
        {[
          { cat: 'Política', col: 'text-bordo', desc: 'Hackeando el sistema desde las bases.' },
          { cat: 'Cultura', col: 'text-verde', desc: 'Nuevas narrativas en la era digital.' },
          { cat: 'Tecnología', col: 'text-lila', desc: '¿Quién escribe las reglas de la IA?' }
        ].map((item, i) => (
          <article key={i} className="group cursor-pointer">
            <div className="aspect-square bg-gray-200 mb-6 overflow-hidden border-2 border-negro transition-transform group-hover:-rotate-2">
              <img src={`/columna${i+1}.jpeg`} className="w-full h-full object-cover" />
            </div>
            <span className={`font-sansita font-bold uppercase ${item.col}`}>{item.cat}</span>
            <h3 className="font-sansita font-bold text-2xl mt-2 leading-tight hover:underline">
              Título de la nota que entra en la grilla de tres columnas
            </h3>
            <p className="font-montserrat text-sm mt-4 text-gray-700">{item.desc}</p>
            <p className="font-mono text-[10px] mt-4 uppercase">Por Alerta Flequillo</p>
          </article>
        ))}
      </section>

     {/* --- BANNER INTERMEDIO / FOTOPERIODISMO (ESTILO DIVISOR) --- */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-black my-12 group">
        {/* IMAGEN DE FONDO: Usamos la principal de fotoperiodismo con el mismo tratamiento */}
        {/*<img 
          src="/fotoperiodismo.png" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5] contrast-125 grayscale hover:grayscale-0 transition-all duration-1000" 
          alt="Fotoperiodismo"
        />*/}
        
        {/* OVERLAY: Gradiente para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* CONTENIDO CENTRADO Y COMPACTO */}
        <div className="relative h-full w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
          
          <span className="text-celeste font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-4 drop-shadow-md">
            Fotoperiodismo
          </span>

          <h2 className="font-sansita font-[700] text-4xl md:text-6xl text-white leading-none  max-w-4xl drop-shadow-2xl">
            Miradas que <span className="text-bordo italic">Gritan</span>
          </h2>

          <div className="mt-8">
            <button className="bg-transparent text-white border-2 border-white px-8 py-2 font-black text-xs uppercase hover:bg-white hover:text-black transition-all tracking-widest">
              Ver Galería
            </button>
          </div>
        </div>

        {/* TEXTO GIGANTE DE FONDO (MARCA DE AGUA) */}
        <div className="absolute -bottom-4 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none">
          <p className="font-sansita font-[900] text-[12vw] text-white whitespace-nowrap leading-none uppercase">
            ALERTA FLEQUILLO • ALERTA FLEQUILLO • ALERTA FLEQUILLO
          </p>
        </div>
      </section>

      {/*<section className="max-w-7xl mx-auto px-6 py-20">
        {/* --- SECCIÓN CATEGORÍAS: EXPLORÁ EL CAOS (Versión Refinada) --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        
        {/* Título con letras gigantes de fondo */}
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
            {/* Dibujito/Sticker decorativo */}
            <img src="/stikers/estrella.png" className="absolute top-4 right-4 w-12 h-12 opacity-80 group-hover:rotate-12 transition-transform" alt="sticker" />
            
            <h4 className="text-6xl font-montserrat font-[900] text-white leading-none tracking-tighter mt-4">
              ARTE
            </h4>
          </div>

          {/* CARD 2: CULTURA */}
          <div className="bg-white rounded-[30px] border-2 border-negro p-2 h-[260px] relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-2 shadow-xl">
            <div className="w-full h-full rounded-[22px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src="/stikers/fondo.jpg" className="w-full h-full object-cover" alt="Cultura" />
              
              {/* Sticker central estilo manual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 border-2 border-negro px-4 py-1 -rotate-6 shadow-md">
                  <span className="text-negro font-mono font-bold text-2xl uppercase italic">Cultura</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: POLÍTICA */}
          <div className="bg-negro rounded-[30px] p-6 h-[260px] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-transform hover:-translate-y-2 shadow-xl">
            {/* Dibujito: Flecha o Rayo */}
            <img src="/stikers/rayo.png" className="absolute top-6 right-8 w-10 h-10 group-hover:scale-125 transition-transform" alt="sticker" />
            
            <h4 className="text-4xl font-montserrat font-[900] text-naranja uppercase italic leading-tight">
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
        
        {/* Imagen de Fondo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/banner_buscar.png" // Cambia esto por la ruta de tu imagen
            alt="Fondo Manifiesto"
            className="w-full h-full object-cover grayscale" // Grayscale le da el toque fanzine
          />
          {/* Overlay para que el texto resalte (puedes usar bg-negro/70 o bg-bordo/60) */}
          <div className="absolute inset-0 bg-negro/70 mix-blend-multiply"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10 px-6">
          <p className="font-montserrat text-2xl md:text-4xl italic text-white leading-[1.1] max-w-2xl mb-12 text-pretty drop-shadow-xl">
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
      {/* --- FOOTER: ESTILO FANZINE / DIARIO --- */}
      <footer className="bg-negro text-white pt-20 pb-10 px-6 border-t-4 border-bordo relative overflow-hidden">
        
        {/* Decoración de fondo: Letras gigantes cortadas */}
        <div className="absolute top-0 right-0 text-[20vw] font-black text-white/5 leading-none select-none pointer-events-none -mr-10">
          ALERTA
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          
          {/* --- COLUMNA 1: LOGO VIDEO + APOYO --- */}
          <div className="md:col-span-2 flex flex-col items-start">
            
            {/* Contenedor del Video Logo */}
            <div className="relative w-60 h-60 md:w-50 md:h-50 mb-8 group">
              {/* Círculo decorativo de fondo (Efecto Sticker) */}
              <div className="absolute inset-0 bg-bordo rounded-full rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]"></div>
              
              {/* El Video Logo */}
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

          {/* Columna 2: Navegación Rápida */}
          <div className="flex flex-col gap-4 font-mono uppercase text-sm">
            <span className="text-bordo font-black mb-2 tracking-widest">— SECCIONES</span>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-naranja">Feminismo y Política</a>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-celeste">Arte y Cultura</a>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-lila">Nosotras</a>
            <a href="#" className="hover:translate-x-2 transition-transform hover:text-verde">Contacto</a>
          </div>

        {/* Columna 3: Redes / Contacto */}
        <div className="flex flex-col gap-4 font-mono uppercase text-sm">
          <span className="text-celeste font-black mb-2 tracking-widest">— CONTACTO</span>
          <a href="mailto:alertaflequillo@gmail.com" className="hover:text-white/60 underline decoration-bordo underline-offset-4 text-xs lowercase">
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
      </footer>
    </main>
  );
}