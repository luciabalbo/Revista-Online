"use client";
import { useState, use } from 'react';
import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion';

export default function NosotrasPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 }); 
  // Limpiador de slugs para los links del nav
  const getSlug = (item: string) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#FB9160] selection:text-white overflow-x-hidden">
       {/* TEXTURA DE GRANO (Overlay sutil para look analógico) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#1C8394] z-[300] origin-left" style={{ scaleX }} />
      {/* NAVBAR ESTILO "FEMINISMO Y POLÍTICA" */}
      <nav className="fixed top-0 w-full z-[250] bg-white/80 backdrop-blur-xl border-b border-black/5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-24">
          <Link href="/" className="h-full flex items-center group">
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -2 }}
              src="/AlertaFlequillo.png" 
              alt="Logo" 
              className="h-[70%] md:h-[90%] w-auto object-contain transition-all" 
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10">
            {['Arte y Cultura', 'Feminismo y Politica', 'Streaming', 'Nosotras'].map((item) => (
              <Link 
                key={item} 
                href={`/${getSlug(item)}`} 
                className="relative group block font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-black whitespace-nowrap"
              >
                <div className="relative overflow-hidden h-[20px] flex flex-col justify-start"> 
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                  <span className="absolute top-full left-0 text-[#1C8394] transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
                </div>
              </Link>
            ))}
            <Link href="/comunidad" className="bg-black text-white px-6 py-2 shadow-[4px_4px_0px_#FB9160] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[9px] font-black tracking-widest">
              Comunidad
            </Link>
          </div>

{/* BOTONES MOBILE UNIFICADOS */}
          <div className="flex lg:hidden items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="p-2"
            >
              <div className="flex flex-col gap-1.5 items-end">
                {/* Usamos bg-black si tu nav de esa página es blanco */}
                <div className="w-8 h-1 bg-black"></div>
                <div className="w-5 h-1 bg-black"></div>
                <div className="w-8 h-1 bg-black"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

{/* OVERLAY DEL MENÚ MOBILE (IGUAL AL HOME) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#1C8394] z-[500] flex flex-col items-center justify-center lg:hidden"
          >
            {/* BOTÓN CERRAR */}
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="absolute top-8 right-8 text-black p-4"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-8 px-10 text-center">
              {['Arte y Cultura', 'Feminismo y Politica', 'Streaming', 'Nosotras', 'Fotoperiodismo'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link 
                    href={`/${getSlug(item)}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="text-1xl text-white uppercase hover:text-[#000] transition-colors block"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              
              <Link 
                href="/comunidad" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 bg-black text-white px-8 py-3 uppercase tracking-widest shadow-[8px_8px_0px_#FB9160] rotate-2 active:rotate-0 transition-all text-sm"
              >
                Súmate a la comunidad
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ESPACIADOR PARA EL NAV FIJO */}
      <div className="h-5" />
      {/* HEADER MANIFIESTO */}
      <header className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-[#390D02] font-bold text-xs uppercase tracking-[0.8em] mb-8"
        >
          Manifiesto
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-sansita font-bold text-5xl md:text-[7vw] leading-[0.8] tracking-tighter"
        >
          Nosotras <span className="text-[#1C8394]">.</span>
        </motion.h1>
      </header>

      {/* FOTO GRUPAL (Placeholder para que pongas la suya) */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
        >
          <img 
            src="/nosotras.PNG" // CAMBIÁ ESTO POR TU FOTO EN /public
            alt="Integrantes de Alerta Flequillo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          {/*<p className="absolute bottom-8 left-8 font-mono text-white text-[10px] uppercase tracking-widest">
            Tanti, Córdoba — 2024/2026
          </p>*/}
        </motion.div>
      </section>

      {/* MANIFIESTO - ESTILO ENFANT TERRIBLE */}
      <main className="max-w-6xl mx-auto px-6 pb-40">
        
        {/* BLOQUE DE DOS COLUMNAS */}
        <div className="md:columns-2 gap-12 text-justify font-montserrat text-base md:text-lg leading-[1.8] text-gray-800 space-y-6 md:space-y-0">
          <p className="mb-6 first-letter:text-8xl first-letter:font-sansita first-letter:mr-4 first-letter:float-left first-letter:text-[#FB9160] first-letter:leading-[0.8]">
            Alerta flequillo comienza como una iniciativa radial en el interior de nuestra provincia. En el 2024 nos encontramos en el centro cultural Otilia, en la localidad de Tanti, con la idea de construir un canal que privilegie el protagonismo de las mujeres y disidencias, una red que invite a compañeras a conectarse y discutir ideas.
          </p>
          
          <p className="mb-6">
            En esta revista confluyen nuestras iniciativas, en parte impulsadas por el incipiente gobierno de Javier Milei, que desde sus comienzos marcó sus ideales fascistas, su explícito antifeminismo y rechazo ante cualquier tipo de diversidad. Acompañados por afirmaciones concretas sobre la no existencia de la desigualdad de género, que podemos encontrar pregonadas en su canal oficial de comunicación, al que dedica varias horas diarias de trabajo: su cuenta de Twitter.
            Somos estudiantes de comunicación social y letras, pero esperamos ser muchas más y de diferentes sectores, lugares y localidades. 
          </p>

          <p className="mb-6">
            Como parte de la universidad pública, nos parece de suma importancia aclarar que esas manos de estudiante son las que redactan. Nos proponemos esta instancia como una más en nuestro recorrido universitario y como personas.
          </p>
          
          <p className="mb-6">
            Pensamos en Alerta Flequillo como un espacio de encuentro y comunidad. Ya sea de forma radial o gráfica. Un lugar donde podamos compartir ideas, no solo desde la universidad y multimedia, sino también sobre historias cercanas, cotidianas, las que podamos caminar y relatar.
          </p>

          <p className="mb-6">
            Creemos fielmente que no hace falta ir muy lejos para encontrar a quienes por siglos realizaron y realizan los trabajos de cuidado, las que nos criaron, las que se organizan, las que mueven el mundo. Allí donde los medios hegemónicos no llegan, o prefieren no llegar, donde no hay negocio.
          </p>
        </div>

        {/* BLOQUE FINAL - MISMO ANCHO QUE LAS COLUMNAS (6xl) */}
        <div className="max-w-6xl mx-auto mt-8 text-justify font-montserrat md:text-lg leading-[1.8] text-gray-800">
          <p>
            Discutiendo no solo sobre feminismos, pero comprendiendo que estos nos conforman como militantes, estudiantes, trabajadoras, mamás.{" "}
            <span className="font-bold text-black">
              Desde la comunicación colectiva y autogestionada, desde el pensamiento crítico, por fuera de la inconcebible búsqueda de la objetividad.
            </span>
          </p>
        </div>
      </main>

      {/* --- SECCIÓN EQUIPO / INTEGRANTES --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-black/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {/* REPETIR ESTE BLOQUE POR CADA INTEGRANTE */}
          <div className="flex items-center gap-6 group">
            {/* Foto Circular */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <div className="absolute inset-0 bg-[#FB9160] rounded-full translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
              <img 
                src="/nosotras.PNG" // Cambiar por ruta real
                alt="Nombre Integrante"
                className="relative w-full h-full object-cover rounded-full border-2 border-black grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Información */}
            <div className="flex flex-col">
              <span className="text-[#1C8394] font-mono text-[10px] uppercase tracking-widest font-black mb-1">
                Redacción
              </span>
              <h3 className="font-sansita text-2xl md:text-3xl font-bold leading-tight">
                Valentina Terrango
              </h3>
              <button className="mt-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-[#FB9160] transition-colors flex items-center gap-2">
                + Info
              </button>
            </div>
          </div>
          {/* FIN BLOQUE INTEGRANTE */}

          {/* EJEMPLO 2 */}
          <div className="flex items-center gap-6 group">
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <div className="absolute inset-0 bg-[#1C8394] rounded-full translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
              <img 
                src="/integrantes/foto2.jpg"
                className="relative w-full h-full object-cover rounded-full border-2 border-black grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#FB9160] font-mono text-[10px] uppercase tracking-widest font-black mb-1">
                Arte
              </span>
              <h3 className="font-sansita text-2xl md:text-3xl font-bold leading-tight">
                Celeste
              </h3>
              <button className="mt-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-[#1C8394] transition-colors flex items-center gap-2">
                + Info
              </button>
            </div>
          </div>

                    {/* REPETIR ESTE BLOQUE POR CADA INTEGRANTE */}
          <div className="flex items-center gap-6 group">
            {/* Foto Circular */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <div className="absolute inset-0 bg-[#FB9160] rounded-full translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
              <img 
                src="/integrantes/foto1.jpg" // Cambiar por ruta real
                alt="Nombre Integrante"
                className="relative w-full h-full object-cover rounded-full border-2 border-black grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Información */}
            <div className="flex flex-col">
              <span className="text-[#1C8394] font-mono text-[10px] uppercase tracking-widest font-black mb-1">
                Redacción
              </span>
              <h3 className="font-sansita text-2xl md:text-3xl font-bold leading-tight">
                Clara
              </h3>
              <button className="mt-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-[#FB9160] transition-colors flex items-center gap-2">
                + Info
              </button>
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
              <a href="/feminismo-y-politica" className="hover:text-lila transition-colors hover:scale-105 duration-300">Feminismo y política</a>
              <a href="/arte-y-cultura" className="hover:text-verde transition-colors hover:scale-105 duration-300">Arte y cultura</a>
              <a href="/streaming" className="hover:text-bordo transition-colors hover:scale-105 duration-300">Streaming</a>
              <a href="/nosotras" className="hover:text-celeste transition-colors hover:scale-105 duration-300">Nosotras</a>
            </div>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <span className="text-celeste font-mono font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="hidden md:block w-8 h-[2px] bg-celeste"></span> CONTACTO <span className="md:hidden w-8 h-[2px] bg-celeste"></span>
            </span>
            
            <a href="mailto:alertaflequillo@gmail.com" className="font-sansita text-[15px] md:text-2xl hover:text-naranja transition-colors break-all underline underline-offset-4 decoration-white/20">
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
    </article>
  );
}