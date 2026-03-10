"use client";
import { useState } from 'react';
import Link from "next/link"; 
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion';

export default function Streaming() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- CORRECCIÓN DE TIPADO PARA GETSLUG ---
  const getSlug = (item: string): string => 
    item.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');

  // --- CORRECCIÓN DE TIPADO PARA VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white selection:bg-[#A52502] selection:text-white overflow-x-hidden">
      
      {/* BARRA DE PROGRESO */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#A52502] z-[300] origin-left" style={{ scaleX }} />

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
      <div className="h-25" />

    {/* HERO SECTION - CLEAN & PROFESSIONAL PROTOTYPE */}
      <div className="w-full bg-[#f8f7f2]">
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        className="relative min-h-[85vh] flex items-center py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto bg-[#f8f7f2]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full bg-[#f8f7f2]">
            
            {/* TEXTO: FOCO EN LA LEGIBILIDAD */}
            <motion.div variants={itemVariants} className="lg:col-span-6 space-y-10 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <span className="bg-[#A52502] text-white text-[11px] px-5 py-2 uppercase font-black tracking-[0.3em] shadow-[4px_4px_0px_#000]">
                  AL AIRE: PROGRAMA ESPECIAL
                </span>
              </div>

              <h1 className="font-sansita text-4xl md:text-6xl lg:text-[80px] leading-[1] tracking-tighter text-black">
                ¿Querés ver el <br />
                <span className="text-[#A52502]">programa especial</span> <br /> 
                de Alerta?
              </h1>

              <div className="max-w-xl mx-auto lg:mx-0">
                
                <div className="pt-5 flex justify-center lg:justify-start">
                  <motion.a 
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://youtube.com/@alertaflequillo-y3p?si=woeJQ4sYlutz5hua" 
                    target="_blank"
                    className="bg-black text-white py-5 px-10 font-black uppercase text-[11px] tracking-[0.2em] shadow-[8px_8px_0px_#A52502] hover:shadow-none transition-all"
                  >
                    ▶ IR AL CANAL
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* MEDIA: LA MINIATURA PURA */}
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-6"
            >
              <div className="relative group">
                {/* Marco sólido minimalista */}
                <div className="absolute inset-0 bg-[#A52502] translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                
                <div className="relative aspect-video bg-black border-[3px] border-black overflow-hidden shadow-2xl">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/eaUp-ATFty4" 
                    title="Alerta Flequillo Live" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

{/* SECCIÓN ARCHIVO: RADIO REVÉS - LISTA VERTICAL */}
      <section className="bg-black py-32 px-4 relative overflow-hidden border-t border-white/10">
        {/* Decoración lateral */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#A52502]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* COLUMNA IZQUIERDA: INFO (Se mantiene igual pero con mejor grid span) */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-sansita text-5xl md:text-7xl text-white leading-[1] text-center lg:text-left">
              Estos son nuestros programas en <br /> 
              <span className="text-[#A52502] not-italic">Radio Revés</span>
            </h2>
            <p className="text-center lg:text-left font-montserrat text-base text-white/50 leading-relaxed uppercase tracking-widest font-bold max-w-sm">
              Un espacio para estudiantes de la Facultad de Ciencias de la Comunicación (FCC)
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link 
                href="https://youtube.com/playlist?list=PLlVHaf3LC_larx0gKlu4ya40zg3khp_tj"
                target="_blank" 
                className="inline-block border-b-2 border-[#A52502] text-[#A52502] font-black text-xs pb-1 hover:text-white hover:border-white transition-all uppercase tracking-widest"
              >
                VER TODA LA PLAYLIST +
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: LOS PROGRAMAS (Uno abajo del otro) */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            {[
              { id: "rT2QvkmtUN8"},
              { id: "tp2i0CW02A4"},
            ].map((v) => (
              <motion.a 
                key={v.id}
                whileHover={{ x: 10 }} // Animación hacia la derecha en vez de hacia arriba
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                className="group flex flex-col md:flex-row gap-6 items-center border-b border-white/10 pb-12 last:border-0"
              >
                {/* Miniatura más grande para formato lista */}
                <div className="relative w-full md:w-80 aspect-video border-2 border-white/20 overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} 
                    className="w-full h-full group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  
                  {/* Play Icon central que aparece en hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#A52502] p-3 rounded-full">
                      <span className="text-white">▶</span>
                    </div>
                  </div>
                </div>

                {/* Info del programa al costado */}
                <div className="flex flex-col gap-2 w-full text-center md:text-left">
                  <span className="font-mono text-[#A52502] text-[10px] font-black tracking-[0.3em]">
                    RADIO REVÉS
                  </span>
                  <p className="text-white/40 font-mono text-[11px] mt-2 group-hover:text-white/60 transition-colors">
                    Hacé clic para revivir esta transmisión en YouTube →
                  </p>
                </div>
              </motion.a>
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
              {[
                { name: 'IG', url: 'https://www.instagram.com/alerta_flequillo?igsh=MWt0Y2lxczBqMWxyeA==' },
                { name: 'TK', url: 'https://www.tiktok.com/@alerta_flequillo?_r=1&_t=ZS-94X9xQvScia' },
                { name: 'YT', url: 'https://youtube.com/@alertaflequillo-y3p?si=dzuH3SKIKCjRytf3' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 md:w-10 md:h-10 bg-negro border-2 border-white flex items-center justify-center font-mono font-black text-[10px] md:text-xs text-white shadow-[3px_3px_0px_#fff] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all hover:bg-white hover:text-negro"
                >
                  {social.name}
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