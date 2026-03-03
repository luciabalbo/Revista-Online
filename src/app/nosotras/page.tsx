"use client";
import { useState, use } from 'react';
import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NosotrasPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#FB9160] selection:text-white overflow-x-hidden">
       {/* TEXTURA DE GRANO (Overlay sutil para look analógico) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

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
            {['Arte y Cultura', 'Feminismo', 'Streaming', 'Nosotras'].map((item) => (
              <Link key={item} href="#" className="relative group overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                <span className="absolute top-full left-0 text-[#FB9160] transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
              </Link>
            ))}
            <Link href="/apoyanos" className="bg-black text-white px-6 py-2 shadow-[4px_4px_0px_#FB9160] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[9px]">
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
      {/* HEADER MANIFIESTO */}
      <header className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-[#FB9160] font-bold text-xs uppercase tracking-[0.8em] mb-8"
        >
          Manifiesto
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-sansita font-bold text-7xl md:text-[10vw] leading-[0.8] tracking-tighter"
        >
          Nosotras <span className="text-[#FB9160]">.</span>
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
            src="/foto-integrantes.jpg" // CAMBIÁ ESTO POR TU FOTO EN /public
            alt="Integrantes de Alerta Flequillo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <p className="absolute bottom-8 left-8 font-mono text-white text-[10px] uppercase tracking-widest">
            Tanti, Córdoba — 2024/2026
          </p>
        </motion.div>
      </section>

      {/* CUERPO DEL TEXTO (Formato Editorial) */}
      <main className="max-w-7xl mx-auto px-6 pb-40 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Columna Izquierda: Introducción fuerte */}
        <div className="lg:col-span-5 lg:col-start-2">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-sansita text-4xl md:text-5xl italic leading-tight mb-12"
          >
            "Construir un canal que privilegie el protagonismo de las mujeres y disidencias."
          </motion.p>
          <div className="h-[1px] w-20 bg-[#FB9160] mb-12"></div>
        </div>

        {/* Columna Derecha: El texto principal justificado */}
        <div className="lg:col-span-5 text-justify font-montserrat text-lg md:text-xl leading-[1.8] text-gray-800 space-y-8">
          <p className="first-letter:text-7xl first-letter:font-sansita first-letter:mr-3 first-letter:float-left first-letter:text-[#FB9160]">
            Alerta flequillo comienza como una iniciativa radial en el interior de nuestra provincia. En el 2024 nos encontramos en el centro cultural Otilia, en la localidad de Tanti, con la idea de construir un canal que privilegie el protagonismo de las mujeres y disidencias, una red que invite a compañeras a conectarse y discutir ideas.
          </p>
          
          <p>
            En esta revista confluyen nuestras iniciativas, en parte impulsadas por el incipiente gobierno de Javier Milei, que desde sus comienzos marcó sus ideales fascistas, su explícito antifeminismo y rechazo ante cualquier tipo de diversidad.
          </p>

          <blockquote className="py-10 border-y border-black/5 font-sansita text-3xl italic text-center text-black">
            La comunicación colectiva y autogestionada por fuera de la objetividad.
          </blockquote>

          <p>
            Somos estudiantes de comunicación social y letras, pero esperamos ser muchas más y de diferentes sectores, lugares y localidades. Como parte de la universidad pública, nos parece de suma importancia aclarar que <strong>esas manos de estudiante son las que redactan</strong>. Nos proponemos esta instancia como una más en nuestro recorrido universitario y como personas.
          </p>

          <p>
            Creemos fielmente que no hace falta ir muy lejos para encontrar a quienes por siglos realizaron y realizan los trabajos de cuidado, las que nos criaron, las que se organizan, las que mueven el mundo. Allí donde los medios hegemónicos no llegan, o prefieren no llegar, donde no hay negocio.
          </p>
        </div>
      </main>

      {/* FOOTER - BOTÓN VOLVER */}
      <footer className="bg-black py-32 px-6 text-center">
        <Link href="/" className="group inline-block">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.5em] mb-4 block">Volver a la realidad</span>
          <h2 className="font-sansita text-5xl md:text-7xl text-white italic group-hover:text-[#FB9160] transition-colors">ir a la portada →</h2>
        </Link>
      </footer>
    </article>
  );
}