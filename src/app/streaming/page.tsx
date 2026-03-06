"use client";
import { useState, useEffect } from 'react';
import Link from "next/link"; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Streaming() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const colorStreaming = "#A52502"; // Un lila vibrante

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    // Limpiador de slugs para los links del nav
  const getSlug = (item: string) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      
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
                  <span className="absolute top-full left-0 text-[#A52502] transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
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
            className="fixed inset-0 bg-[#A52502] z-[500] flex flex-col items-center justify-center lg:hidden"
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
      <div className="h-15" />

      {/* --- HERO: EL VIVO (CENTRADITO EN MOBILE / GRID EN DESKTOP) --- */}
      <section className="relative pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* COLUMNA TEXTO: Centrada en mobile (items-center text-center) / Izquierda en desktop (lg:items-start lg:text-left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6"
          >
            <span className="inline-block bg-[#A52502] text-black font-black text-[9px] md:text-[10px] px-3 py-1 uppercase tracking-widest rotate-2">
              On Air: Programa Especial
            </span>
            
            {/* Título: Controlado con max-w-[90vw] para que no se corte en mobile */}
            <h1 className="font-sansita text-4xl md:text-8xl leading-[0.9] md:leading-[0.8] tracking-tighter italic max-w-[90vw] md:max-w-none">
              ¿Querés ver el programa <span className="text-[#A52502]">especial</span> de Alerta?
            </h1>
            
            {/* Bajada: max-w-[85vw] para mobile según tu lógica de Home */}
            <p className="font-montserrat text-sm md:text-lg text-white/60 max-w-[85vw] md:max-w-md leading-relaxed">
              Dale play a nuestro vivo más reciente. Un recorrido por todo lo que nos mueve, con invitadas y debate en tiempo real.
            </p>
            
            <a 
              href="https://youtube.com/@alertaflequillo-y3p?si=_6cXUWHjlb2qjLof" 
              target="_blank"
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-[#A52502] transition-colors shadow-lg">
                <span className="text-xl">▶</span>
              </div>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-[#A52502]">
                Ir a nuestro canal
              </span>
            </a>
          </motion.div>

          {/* COLUMNA VIDEO: Siempre centrada respecto a su contenedor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video bg-zinc-900 border-2 border-white shadow-[10px_10px_0px_#A52502] md:shadow-[15px_15px_0px_#A52502] overflow-hidden group"
          >
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/eaUp-ATFty4" 
              title="Alerta Flequillo Live"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN RADIO REVÉS --- */}
      <section className="bg-white text-black py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-sansita text-5xl md:text-7xl leading-none tracking-tighter mb-6 italic">
                Alerta en <br/> <span className="text-[#A52502] underline decoration-4 underline-offset-8">Radio Revés</span>
              </h2>
              <p className="font-montserrat text-lg font-medium leading-relaxed">
                Estos son nuestros programas en Radio Revés, un espacio para estudiantes de la Facultad de Ciencias de la Comunicación (UNC). Nuestra casa, nuestro ruido.
              </p>
            </div>
            
            <a 
              href="https://youtube.com/playlist?list=PLlVHaf3LC_larx0gKlu4ya40zg3khp_tj&si=imVTlj7zC_FWiqsn"
              target="_blank"
              className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#8B5CF6] transition-all shadow-[8px_8px_0px_#8B5CF6] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              Ver Playlist 2025
            </a>
          </div>

          {/* GRILLA DE PLAYLIST (Representación) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3].map((i) => (
                <div key={i} className="group relative aspect-video bg-zinc-100 border-2 border-black overflow-hidden">
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="bg-white text-black px-4 py-2 font-bold text-xs">VER PROGRAMA</span>
                   </div>
                   <img 
                    src={`/stikers/fondo.jpg`} // Aquí irían las miniaturas de los programas
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    alt="Programa Radio Revés" 
                   />
                   <div className="absolute bottom-4 left-4 bg-black text-white px-2 py-1 font-mono text-[10px] z-20">
                      PROGRAMA #{i} - 2025
                   </div>
                </div>
             ))}
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
              <a href="/feminismo-politica" className="hover:text-lila transition-colors hover:scale-105 duration-300">Feminismo y política</a>
              <a href="/arte-cultura" className="hover:text-verde transition-colors hover:scale-105 duration-300">Arte y cultura</a>
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
    </main>
  );
}