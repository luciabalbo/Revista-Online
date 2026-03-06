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

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      
      {/* NAVBAR CON BLUR Y ANIMACIÓN */}
      <nav className="fixed top-0 w-full z-[150] bg-white/80 backdrop-blur-xl border-b border-black/5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-24">
          <Link href="/" className="h-full flex items-center group">
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -2 }}
              src="/AlertaFlequillo.png" 
              alt="Logo" 
              className="h-[70%] md:h-[90%] w-auto object-contain transition-all" 
            />
          </Link>

          <div className="hidden lg:flex items-center gap-10 font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold">
            {['Arte y Cultura', 'Feminismo y politica', 'Streaming', 'Nosotras'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
              className="relative group block font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-negro whitespace-nowrap"
            >
              <div className="relative overflow-hidden h-[20px] flex flex-col justify-start"> 
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                <span className="absolute top-full left-0 text-bordo transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
              </div>
            </Link>
            ))}
            <Link href="/comunidad" className="bg-black text-white px-6 py-2 shadow-[4px_4px_0px_#FB9160] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[9px]">
              Comunidad
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 z-[160]">
            <div className={`h-0.5 w-8 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`h-0.5 w-8 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`h-0.5 w-8 bg-black mt-1.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* --- HERO: EL VIVO --- */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="inline-block bg-[#A52502] text-black font-black text-[10px] px-3 py-1 uppercase tracking-widest rotate-2">
              On Air: Programa Especial
            </span>
            <h1 className="font-sansita text-6xl md:text-8xl leading-[0.8] tracking-tighter italic">
              ¿Querés ver el programa <span className="text-[#A52502]">especial</span> de Alerta?
            </h1>
            <p className="font-montserrat text-lg text-white/60 max-w-md leading-relaxed">
              Dale play a nuestro vivo más reciente. Un recorrido por todo lo que nos mueve, con invitadas y debate en tiempo real.
            </p>
            <a 
              href="https://youtube.com/@alertaflequillo-y3p?si=_6cXUWHjlb2qjLof" 
              target="_blank"
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-[#A52502] transition-colors">
                <span className="text-xl">▶</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-[#A52502]">Ir a nuestro canal</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video bg-zinc-900 border-2 border-white shadow-[15px_15px_0px_#A52502] overflow-hidden group"
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

      {/* --- FOOTER ESPECIAL STREAMING --- */}
      <footer className="py-20 px-6 text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-10">
          <img src="/logo_sinfondo.png" alt="Logo" className="h-20 mx-auto" />
          <h3 className="font-sansita text-3xl md:text-5xl italic">No te pierdas de nada. <br/> Seguinos en YouTube.</h3>
          <div className="flex justify-center gap-6">
             <a href="https://youtube.com/@alertaflequillo-y3p" className="w-16 h-16 rounded-full border border-white flex items-center justify-center hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all text-2xl">YT</a>
             <a href="#" className="w-16 h-16 rounded-full border border-white flex items-center justify-center hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all text-2xl">IG</a>
          </div>
          <p className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase">Alerta Flequillo Streaming - 2026</p>
        </div>
      </footer>

      {/* MENU MOBILE OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-black z-[300] flex flex-col items-center justify-center p-10">
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white text-2xl font-black">X</button>
             {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-sansita text-white mb-8 hover:text-[#8B5CF6]">
                  {item}
                </Link>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}