"use client";
import { useState, useEffect } from 'react';
import Link from "next/link"; 
import { motion, AnimatePresence } from 'framer-motion';

const galerias = [
  { id: 1, titulo: "Paro nacional docente", fecha: "02/10/2026", imagen: "/fotos/paro.jpg", autor: "Lula P." },
  { id: 2, titulo: "Corsos cordobeses: memoria y crítica", fecha: "15/02/2026", imagen: "/fotos/corsos.jpg", autor: "Valentina T." },
  { id: 3, titulo: "Libertad para los detenidos", fecha: "12/03/2026", imagen: "/fotos/marcha.jpg", autor: "Lula P." },
  { id: 4, titulo: "Justicia por Camila", fecha: "27/11/2025", imagen: "/fotos/camila.jpg", autor: "Bianca D." },
  { id: 5, titulo: "25N: Ni Una Menos", fecha: "25/11/2025", imagen: "/fotos/25n.jpg", autor: "Valentina T." },
  { id: 6, titulo: "Las tareas de cuidado", fecha: "23/11/2025", imagen: "/fotos/cuidados.jpg", autor: "Lula P." },
];

export default function Fotoperiodismo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Limpiador de slugs para los links del nav
  const getSlug = (item: string) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  return (
    <main className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#00AEEF] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* NAVBAR */}
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
                <div className="w-8 h-1 bg-black"></div>
                <div className="w-5 h-1 bg-black"></div>
                <div className="w-8 h-1 bg-black"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY DEL MENÚ MOBILE */}
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
      <div className="h-24" />

      {/* --- HEADER --- */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b-4 border-negro pb-8">
          <h1 className="font-sansita text-5xl md:text-7xl leading-none tracking-tighter">
            foto<span className="text-[#1C8394]">periodismo</span>.
          </h1>
          <p className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.5em] text-negro/40">
            Crónicas visuales / {galerias.length} Coberturas
          </p>
        </div>
      </header>

      {/* --- GRILLA CORREGIDA --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {galerias.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-negro"
            >
              <img 
                src={item.imagen} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
                alt={item.titulo}
              />
              
              {/* Overlay: siempre visible en mobile, con hover en desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-[#00AEEF]/10 md:group-hover:bg-transparent transition-all duration-500" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                {/* Info: Siempre visible en mobile, opacity-0 en desktop con hover */}
                <span className="font-mono text-[9px] text-[#00AEEF] font-black uppercase tracking-widest mb-2 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                   {item.fecha} — {item.autor}
                </span>
                <h3 className="font-sansita text-2xl md:text-3xl leading-tight md:leading-none">
                  {item.titulo}
                </h3>
                
                {/* Botón: Siempre visible en mobile, h-0 en desktop con hover */}
                <div className="mt-4 overflow-hidden transition-all duration-300 md:h-0 md:group-hover:h-8">
                  <Link href={`/fotoperiodismo/${item.id}`} className="text-[10px] font-black uppercase tracking-widest border-b border-[#00AEEF] md:border-white">
                    Ver Galería →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-negro text-white py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-sansita text-3xl md:text-5xl mb-10">¿Tenés fotos de alguna lucha?</h2>
          <a href="mailto:alertaflequillo@gmail.com" className="inline-block bg-white text-negro px-10 py-4 font-black uppercase tracking-widest shadow-[6px_6px_0px_#00AEEF] hover:shadow-none transition-all">
            Mandar Material
          </a>
        </div>
      </footer>
    </main>
  );
}