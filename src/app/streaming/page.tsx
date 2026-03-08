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

      {/* HERO SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants} className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block bg-[#A52502] text-white text-[10px] px-4 py-1.5 uppercase font-bold tracking-[0.2em] shadow-[4px_4px_0px_#fff] -rotate-1">
              On Air: Programa Especial
            </span>
            <h1 className="font-sansita text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
              ¿Querés ver el programa <span className="text-[#A52502] italic">especial</span> de Alerta?
            </h1>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://youtube.com/@alertaflequillo" 
              target="_blank"
              className="inline-flex bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest items-center gap-3 shadow-[0_10px_30px_rgba(165,37,2,0.3)] hover:bg-[#A52502] hover:text-white transition-all"
            >
              <span>▶</span> IR AL CANAL
            </motion.a>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="order-1 lg:order-2 relative w-full aspect-video bg-black border-[3px] border-white shadow-[15px_15px_0px_#A52502]"
          >
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/eaUp-ATFty4" title="Alerta Flequillo Live" allowFullScreen></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* SECCIÓN VIDEOS */}
      <section className="bg-white text-black py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h2 className="font-sansita text-5xl md:text-8xl mb-16 tracking-tighter">
            Alerta en <span className="text-[#A52502]">Radio Revés</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Array de videos con IDs reales */}
            {[
              { id: "rT2QvkmtUN8", titulo: "Programa #1" },
              { id: "f-Z_Uv5H_0Y", titulo: "Programa #2" },
              { id: "6vXqV-8G_wM", titulo: "Programa #3" }
            ].map((video, idx) => (
              <motion.a 
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                className="group block space-y-4"
              >
                <div className="relative aspect-video border-2 border-black overflow-hidden shadow-[8px_8px_0px_#000] group-hover:shadow-[8px_8px_0px_#A52502] transition-all">
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                    alt={video.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-sansita text-2xl uppercase italic">{video.titulo}</h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}