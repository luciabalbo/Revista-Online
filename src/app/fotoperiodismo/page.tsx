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
      
      {/* TEXTURA DE GRANO (Look analógico de Nosotras) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* NAVBAR ESTILO "NOSOTRAS" */}
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

          <div className="hidden lg:flex items-center gap-10">
            {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => (
              <Link 
                key={item} 
                href={`/${getSlug(item)}`} 
                className="relative group block font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-black whitespace-nowrap"
              >
                <div className="relative overflow-hidden h-[20px] flex flex-col justify-start"> 
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                  <span className="absolute top-full left-0 text-[#00AEEF] transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
                </div>
              </Link>
            ))}
            <Link href="/comunidad" className="bg-black text-white px-6 py-2 shadow-[4px_4px_0px_#00AEEF] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[9px] font-black tracking-widest">
              Comunidad
            </Link>
          </div>

          {/* HAMBURGUESA MOBILE */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 z-[160]">
            <div className={`h-0.5 w-8 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`h-0.5 w-8 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`h-0.5 w-8 bg-black mt-1.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* ESPACIADOR PARA EL NAV FIJO */}
      <div className="h-24" />

      {/* --- HEADER --- */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b-4 border-negro pb-8">
          <h1 className="font-sansita text-7xl md:text-9xl leading-none tracking-tighter italic">
            foto<span className="text-[#00AEEF]">periodismo</span>.
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-negro/40">
            Crónicas visuales / {galerias.length} Coberturas
          </p>
        </div>
      </header>

      {/* --- GRILLA --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {galerias.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden bg-negro"
            >
              <img 
                src={item.imagen} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
                alt={item.titulo}
              />
              <div className="absolute inset-0 bg-[#00AEEF]/10 group-hover:bg-transparent transition-colors" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="font-mono text-[9px] text-[#00AEEF] font-black uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   {item.fecha} — {item.autor}
                </span>
                <h3 className="font-sansita text-3xl leading-none italic">
                  {item.titulo}
                </h3>
                <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                  <Link href={`/fotoperiodismo/${item.id}`} className="text-[10px] font-black uppercase tracking-widest border-b border-white">
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
          <span className="text-[#00AEEF] font-mono text-xs tracking-[0.5em] uppercase mb-8 block">Colaborá</span>
          <h2 className="font-sansita text-5xl md:text-6xl mb-10 italic">¿Tenés fotos de alguna lucha?</h2>
          <a href="mailto:alertaflequillo@gmail.com" className="inline-block bg-white text-negro px-10 py-4 font-black uppercase tracking-widest shadow-[6px_6px_0px_#00AEEF] hover:shadow-none transition-all">
            Mandar Material
          </a>
        </div>
      </footer>

      {/* MENÚ MOBILE OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#f8f7f2] z-[140] flex flex-col items-center justify-center p-10 lg:hidden"
          >
            {['Arte y Cultura', 'Feminismo y Política', 'Streaming', 'Nosotras'].map((item) => (
              <Link 
                key={item} 
                href={`/${getSlug(item)}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-sansita mb-8 italic hover:text-[#00AEEF]"
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}