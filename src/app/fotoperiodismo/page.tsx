"use client";
import { useState, useEffect } from 'react';
import Link from "next/link"; 
import { motion, AnimatePresence } from 'framer-motion';

// Simulamos los datos de las galerías (esto después puede ir a tu notas.json)
const galerias = [
  { id: 1, titulo: "Paro nacional docente", fecha: "02/10/2026", imagen: "/fotos/paro.jpg", autor: "Lula P." },
  { id: 2, titulo: "Corsos cordobeses: memoria y crítica", fecha: "15/02/2026", imagen: "/fotos/corsos.jpg", autor: "Valentina T." },
  { id: 3, titulo: "Libertad para los detenidos", fecha: "12/03/2026", imagen: "/fotos/marcha.jpg", autor: "Lula P." },
  { id: 4, titulo: "Justicia por Camila", fecha: "27/11/2025", imagen: "/fotos/camila.jpg", autor: "Bianca D." },
  { id: 5, titulo: "25N: Ni Una Menos", fecha: "25/11/2025", imagen: "/fotos/25n.jpg", autor: "Valentina T." },
  { id: 6, titulo: "Las tareas de cuidado", fecha: "23/11/2025", imagen: "/fotos/cuidados.jpg", autor: "Lula P." },
];

export default function Fotoperiodismo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const colorFoto = "#00AEEF"; // El celeste de tu botón de galería

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f2] overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[150] transition-all duration-700 ${
          isScrolled ? 'bg-negro py-2 shadow-2xl' : 'bg-transparent' 
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo_sinfondo.png" alt="Logo" className={`h-12 transition-all ${isScrolled ? 'brightness-0 invert' : ''}`} />
          </Link>
          <div className="hidden lg:flex items-center gap-10 font-montserrat text-[10px] font-black uppercase tracking-[0.3em]">
             <Link href="/arte-y-cultura" className="hover:text-verde">Arte y Cultura</Link>
             <Link href="/feminismo-y-politica" className="hover:text-bordo">Feminismo y Política</Link>
             <Link href="/fotoperiodismo" className="text-[#00AEEF]">Fotoperiodismo</Link>
          </div>
        </div>
      </nav>

      {/* --- HEADER ESTILO ALERTA --- */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-b-4 border-negro">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <h1 className="font-sansita text-7xl md:text-9xl leading-none tracking-tighter italic">
            foto<span className="text-[#00AEEF]">periodismo</span>.
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-negro/40">
            Nuestra mirada en la calle
          </p>
        </div>
      </header>

      {/* --- GRILLA DE FOTOPERIODISMO (ESTILO ENFANT + ALERTA) --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {galerias.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden bg-negro cursor-pointer"
            >
              {/* Imagen con Overlay de Color (Estilo Enfant) */}
              <img 
                src={item.imagen} 
                alt={item.titulo}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-[#00AEEF]/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Textos sobre la imagen */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity">
                <span className="font-mono text-[9px] text-[#00AEEF] font-bold uppercase tracking-widest mb-2">
                  {item.fecha} — Por {item.autor}
                </span>
                <h3 className="font-sansita text-3xl text-white leading-none italic group-hover:text-[#00AEEF] transition-colors">
                  {item.titulo}
                </h3>
                
                {/* Botón que aparece en hover */}
                <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                  <div className="inline-block bg-white text-negro px-4 py-2 font-black text-[10px] uppercase tracking-widest">
                    Ver Galería →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- BOTÓN DE CARGA O PAGINACIÓN --- */}
      <div className="flex justify-center pb-32">
        <button className="border-2 border-negro px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#00AEEF] hover:text-white transition-all shadow-[6px_6px_0px_#000] active:shadow-none translate-x-1">
          Cargar más coberturas
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-negro text-white py-20 px-6 text-center border-t-[12px] border-[#00AEEF]">
        <h2 className="font-sansita text-4xl mb-6 italic">¿Tenés fotos de alguna lucha?</h2>
        <p className="font-montserrat text-white/60 mb-10 max-w-md mx-auto">Queremos que Alerta sea una red. Escribinos para compartir tus coberturas fotográficas.</p>
        <a href="mailto:alertaflequillo@gmail.com" className="bg-[#00AEEF] text-white px-8 py-4 font-black uppercase tracking-tighter hover:bg-white hover:text-negro transition-all">
          Mandar Material
        </a>
      </footer>
    </main>
  );
}