"use client";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // clientWidth es el ancho exacto de lo que ves en pantalla
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };
  return (
    <main className="min-h-screen bg-white">
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
        
        {/* El video que tenías comentado, si lo querés activar, ya tiene el tamaño grande también */}
        {/* <div className="mt-8 w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-black shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110">
            <source src="/videologo.mp4" type="video/mp4" />
          </video>
        </div> 
        */}
      </header>
      
      {/* NAV */}
      <nav className="sticky top-0 z-10 bg-black text-white mt-0 py-4 flex flex-wrap justify-center gap-6 text-sm font-black font-montserrat uppercase shadow-xl">
        <a href="#" className="hover:text-bordo underline decoration-bordo underline-offset-4">Inicio</a>
        <a href="#" className="hover:text-naranja">Feminismo y Política</a>
        <a href="#" className="hover:text-celeste">Arte y Cultura</a>
        <a href="#" className="hover:text-lila">Nosotras</a>
        <a href="#" className="hover:text-verde">Contacto</a>
        <a href="#" className="bg-white text-black px-2 py-0.5 rotate-2 hover:bg-bordo hover:text-white transition-all">Apoyanos</a>
      </nav>
      
      {/* --- SECCIÓN PRINCIPAL: FULL-SCREEN SLIDER (Inspo Anfibia + Fotoperiodismo) --- */}
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-negro group">
        
        {/* Contenedor del Scroll */}
        <div className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
          
          {/* NOTA 1 */}
          <div className="min-w-full h-full snap-center relative">
            <img 
              src="/stikers/descarga.jfif" 
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60" 
              alt="Programar es nuestra venganza"
            />
            {/* Overlay de degradado para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-negro/80 via-negro/20 to-transparent" />
            
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
              <span className="bg-bordo text-white px-4 py-1 font-mono text-sm uppercase mb-6 border-2 border-white rotate-1">
                Destacado
              </span>
              <h2 className="font-sansita font-[900] text-6xl md:text-[120px] text-white leading-[0.85] uppercase max-w-4xl drop-shadow-2xl">
                PROGRAMAR <br />
                <span className="text-naranja">ES NUESTRA</span> <br />
                VENGANZA
              </h2>
              <div className="mt-8 border-l-4 border-celeste pl-6">
                <p className="font-montserrat italic text-white text-xl md:text-2xl max-w-xl">
                  "Un manifiesto sobre ocupar los espacios de código y construcción digital."
                </p>
                <p className="font-mono text-celeste mt-4 text-sm uppercase tracking-widest">
                  Por Luciana Gallo
                </p>
              </div>
            </div>
          </div>

          {/* NOTA 2 */}
          <div className="min-w-full h-full snap-center relative">
            <img 
              src="/stikers/descarga (1).jfif" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" 
              alt="El algoritmo del deseo"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-negro/80 via-transparent to-negro/80" />
            <div className="relative h-full flex items-center justify-center text-center">
              <h2 className="font-sansita font-[900] text-7xl md:text-[100px] text-white uppercase leading-none">
                EL ALGORITMO <br /> <span className="text-lila italic">DEL DESEO</span>
              </h2>
            </div>
          </div>
        </div>

        {/* FLECHAS DE NAVEGACIÓN (Inspo Anfibia) */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white text-white hover:text-negro border-2 border-white p-4 transition-all opacity-0 group-hover:opacity-100 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white text-white hover:text-negro border-2 border-white p-4 transition-all opacity-0 group-hover:opacity-100 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* INDICADOR DE SCROLL MOUSE */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-12 h-1 bg-white"></div>
          <div className="w-12 h-1 bg-white/30"></div>
          <div className="w-12 h-1 bg-white/30"></div>
        </div>
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
              <img src="/stikers/descarga (2).jpg" className="w-full aspect-square object-cover border-4 border-white shadow-xl -mt-8" />
            </div>
          </div>
        </div>
        {/* Texto de fondo tipo Anfibia */}
        <div className="absolute -bottom-10 right-0 font-sansita font-[900] text-[15vw] text-white/5 whitespace-nowrap select-none">
          ALERTA FLEQUILLO ALERTA FLEQUILLO
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Título de sección inspirado en tu inspo de letras gigantes */}
        <div className="mb-12 relative">
          <h3 className="text-[12vw] font-black leading-none text-black/5 absolute -top-10 left-0 select-none">
            CATEGORIAS
          </h3>
          <h3 className="text-4xl font-bold relative z-10 border-l-8 border-alerta-red pl-4">
            EXPLORÁ EL CAOS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: Estilo "ASK" Rojo (Inspirado en imagen 3) */}
          <div className="bg-alerta-red rounded-[40px] p-8 h-[300px] relative overflow-hidden group cursor-pointer">
            <h4 className="text-8xl font-black text-white leading-none tracking-tighter transition-transform group-hover:scale-110 duration-500">
              ARTE
            </h4>
            <div className="absolute bottom-6 right-8 bg-white text-black p-4 rounded-full rotate-12 group-hover:rotate-0 transition-all">
              <span className="font-bold tracking-widest">VER MÁS</span>
            </div>
          </div>

          {/* CARD 2: Estilo "Filling Pieces" con Sticker (Inspirado en imagen 3 y 1) */}
          <div className="bg-white rounded-[40px] border-2 border-black p-2 h-[300px] relative overflow-hidden group">
            <div className="w-full h-full rounded-[30px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src="/stikers/fondo.jpg" className="w-full h-full object-cover" alt="Cultura" />
              {/* Overlay de texto escrito a mano (Estilo imagen 4) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-red-600 text-6xl font-script -rotate-12 opacity-80 border-2 border-alerta-red-600 px-4 py-2 rounded-full">
                  Cultura
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: Estilo "Shopify Tag" (Inspirado en imagen 3) */}
          <div className="bg-black rounded-[40px] p-8 h-[300px] flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="bg-alerta-red w-16 h-16 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-3xl">★</span>
            </div>
            <h4 className="text-4xl font-black text-alerta-pink uppercase italic">
              Feminismo <br/> Radical
            </h4>
            {/* Elemento que se sale de la caja */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-white/10 text-9xl font-black rotate-90">
              POLITICA
            </div>
          </div>

        </div>

        {/* SECCIÓN DE "MOODBOARD" (Inspirado en imagen 1) */}
        <div className="mt-20 border-t-2 border-black pt-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h5 className="font-mono text-sm mb-4">MOODBOARD / REFERENCIAS</h5>
              <p className="text-3xl font-serif italic leading-tight">
                "Buscamos referencias visuales para hackear la normalización del sistema."
              </p>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              {/* Mini collage de tus imágenes */}
              <img src="/descarga.jfif" className="w-full aspect-square object-cover rounded-lg rotate-3" />
              <img src="/descarga (2).jpg" className="w-full aspect-square object-cover rounded-lg -rotate-6" />
              <img src="/descarga (1).jfif" className="w-full aspect-square object-cover rounded-lg rotate-12" />
              <img src="/logo_sinfondo.png" className="w-full aspect-square object-contain bg-white rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}