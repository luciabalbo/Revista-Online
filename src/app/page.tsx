"use client";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  // Esta es la manguera que conecta el código con el slider
  const scrollRef = useRef<HTMLDivElement>(null);

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
            quality={100}
          />
        </div>
      </header>
      
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-black text-white py-4 flex flex-wrap justify-center gap-6 text-sm font-black font-montserrat uppercase shadow-xl">
        <a href="#" className="hover:text-bordo underline decoration-bordo underline-offset-4">Inicio</a>
        <a href="#" className="hover:text-naranja">Feminismo y Política</a>
        <a href="#" className="hover:text-celeste">Arte y Cultura</a>
        <a href="#" className="hover:text-lila">Nosotras</a>
        <a href="#" className="hover:text-verde">Contacto</a>
        <a href="#" className="bg-white text-black px-2 py-0.5 rotate-2 hover:bg-bordo hover:text-white transition-all">Apoyanos</a>
      </nav>
      
      {/* --- SECCIÓN PRINCIPAL: FULL-SCREEN SLIDER --- */}
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-negro group">
        
        {/* LA CORRECCIÓN ESTÁ ACÁ: Agregamos ref={scrollRef} */}
        <div 
          ref={scrollRef} 
          className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          
          {/* NOTA 1: flex-shrink-0 es clave para que no se achique */}
          <div className="min-w-full h-full snap-center relative flex-shrink-0">
            <img 
              src="/stikers/descarga.jfif" 
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60" 
              alt="Programar"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-negro/80 via-negro/20 to-transparent" />
            
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
              <span className="bg-bordo text-white px-4 py-1 font-montserrat text-sm uppercase mb-6 border-2 border-white rotate-1">
                Destacado
              </span>
              <h2 className="font-sansita font-[900] text-6xl md:text-[120px] text-white leading-[0.85] uppercase max-w-4xl drop-shadow-2xl">
                PROGRAMAR <br />
                <span className="text-naranja">ES NUESTRA</span> <br />
                VENGANZA
              </h2>
              <div className="mt-8 border-l-4 border-celeste pl-6">
                <p className="font-montserrat italic text-white text-xl md:text-2xl max-w-xl text-pretty">
                  "Un manifiesto sobre ocupar los espacios de código y construcción digital."
                </p>
                <p className="font-mono text-celeste mt-4 text-sm uppercase tracking-widest">
                  Por Luciana Gallo
                </p>
              </div>
            </div>
          </div>

          {/* NOTA 2: flex-shrink-0 también acá */}
          <div className="min-w-full h-full snap-center relative flex-shrink-0">
            <img 
              src="/stikers/descarga (1).jfif" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" 
              alt="Algoritmo"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-negro/80 via-transparent to-negro/80" />
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <h2 className="font-sansita font-[900] text-7xl md:text-[100px] text-white uppercase leading-none">
                EL ALGORITMO <br /> <span className="text-lila italic">DEL DESEO</span>
              </h2>
            </div>
          </div>
        </div>

        {/* FLECHAS CON CLIC FUNCIONANDO */}
        <button 
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white text-white hover:text-negro border-2 border-white p-3 md:p-4 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button 
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white text-white hover:text-negro border-2 border-white p-3 md:p-4 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
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
              <img src={`/stikers/descarga (${i+1}).jfif`} className="w-full h-full object-cover" />
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

      {/* --- BANNER INTERMEDIO / FOTOPERIODISMO --- */}
      <section className="bg-negro py-20 my-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 z-10">
            <h4 className="font-sansita font-[900] text-celeste text-sm uppercase tracking-[0.2em] mb-4">Fotoperiodismo</h4>
            <h2 className="font-sansita font-[900] text-5xl md:text-7xl text-white leading-none mb-6">MIRADAS <br/> QUE <span className="text-bordo italic">GRITAN</span></h2>
            <button className="bg-white text-negro px-8 py-3 font-sansita font-bold uppercase border-4 border-celeste hover:bg-celeste hover:text-white transition-all">Ver Galería</button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4 rotate-3">
              <img src="/stikers/descarga.jfif" className="w-full aspect-square object-cover border-4 border-white shadow-xl" />
              <img src="/stikers/blabla.png" className="w-full aspect-square object-cover border-4 border-white shadow-xl -mt-8" />
            </div>
          </div>
        </div>
        {/* Texto de fondo tipo Anfibia */}
        {/*<div className="absolute -bottom-10 right-0 font-sansita font-[900] text-[15vw] text-white/7 whitespace-nowrap select-none">
          ALERTA FLEQUILLO ALERTA FLEQUILLO
        </div>*/}
      </section>

      {/*<section className="max-w-7xl mx-auto px-6 py-20">
        {/* --- SECCIÓN CATEGORÍAS: EXPLORÁ EL CAOS (Versión Refinada) --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        
        {/* Título con letras gigantes de fondo */}
        <div className="mb-16 relative">
          <h3 className="text-[15vw] font-montserrat font-[900] leading-none text-negro/5 absolute -top-12 left-0 select-none">
            CATEGORIAS
          </h3>
          <h3 className="text-3xl md:text-4xl font-montserrat font-[900] relative z-10 border-l-8 border-bordo pl-4 uppercase tracking-tighter">
            EXPLORÁ EL <span className="text-bordo">CAOS</span>
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

      {/* BLOQUE CENTRAL (Manifiesto y Buscador) */}
      <section className="bg-negro py-20 my-12 overflow-hidden relative">
        <div className="max-w-4xl mx-auto mt-24 mb-16 text-center flex flex-col items-center relative z-10">
          <p className="font-montserrat text-2xl md:text-3xl italic text-white leading-tight max-w-2xl mb-12 text-pretty">
            "No somos una revista, somos un <span className="bg-white text-negro px-2 not-italic font-black">grito digital</span>. Arte, política y feminismo desde el borde del abismo."
          </p>
          
          <div className="relative w-full max-w-lg group">
            <input 
              type="text" 
              placeholder="BUSCAR EN EL CAOS..." 
              className="w-full bg-white/5 border-2 border-white p-5 font-mono text-sm focus:outline-none focus:bg-white focus:text-negro transition-all placeholder:text-white/30 text-center uppercase tracking-widest"
            />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-celeste text-negro px-4 py-1 text-xs font-black -rotate-2 border border-negro shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-2 transition-transform">
              SEARCH
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
              <div className="absolute inset-0 rounded-full border-4 border-white overflow-hidden -rotate-3 group-hover:rotate-0 transition-transform duration-500">
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
            <a href="#" className="hover:text-white/60 underline decoration-bordo underline-offset-4 text-xs lowercase">alertaflequillo@gamil.com</a>
            <div className="flex gap-4 mt-4">
              {/* Stickers de Redes */}
              <div className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-lila hover:rotate-12 transition-all cursor-pointer">IG</div>
              <div className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-naranja hover:-rotate-12 transition-all cursor-pointer">TW</div>
              <div className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-verde hover:rotate-6 transition-all cursor-pointer">YT</div>
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