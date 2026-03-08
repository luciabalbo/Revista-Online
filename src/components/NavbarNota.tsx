"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavbarNota() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Limpiador de slugs para los links del nav
  const getSlug = (item: string) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  return (
    <>
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
                  <span className="absolute top-full left-0 text-[#FB9160] transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
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
            className="fixed inset-0 bg-[#FB9160] z-[500] flex flex-col items-center justify-center lg:hidden"
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
    </>
  );
}