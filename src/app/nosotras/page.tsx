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
            {['Arte y Cultura', 'Feminismo y politica', 'Streaming', 'Nosotras'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
              className="relative group block font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-negro whitespace-nowrap"
            >
              <div className="relative overflow-hidden h-[20px] flex flex-col justify-start"> 
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                <span className="absolute top-full left-0 text-celeste transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
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

			{/* MANIFIESTO - COLUMNA ÚNICA */}
      <main className="max-w-3xl mx-auto px-6 pb-40">
        
        <div className="text-justify font-montserrat text-lg md:text-xl leading-[1.9] text-gray-800 space-y-12">
          <p className="first-letter:text-8xl first-letter:font-sansita first-letter:mr-4 first-letter:float-left first-letter:text-[#FB9160]">
            Alerta flequillo comienza como una iniciativa radial en el interior de nuestra provincia. En el 2024 nos encontramos en el centro cultural Otilia, en la localidad de Tanti, con la idea de construir un canal que privilegie el protagonismo de las mujeres y disidencias, una red que invite a compañeras a conectarse y discutir ideas.
          </p>
          
          <p>
            En esta revista confluyen nuestras iniciativas, en parte impulsadas por el incipiente gobierno de Javier Milei, que desde sus comienzos marcó sus ideales fascistas, su explícito antifeminismo y rechazo ante cualquier tipo de diversidad. Acompañados por afirmaciones concretas sobre la no existencia de la desigualdad de género, que podemos encontrar pregonadas en su canal oficial de comunicación, al que dedica varias horas diarias de trabajo: su cuenta de Twitter.
          </p>

          <p>
            Somos estudiantes de comunicación social y letras, pero esperamos ser muchas más y de diferentes sectores, lugares y localidades.
          </p>
        </div>

        {/* 1º SEPARADOR */}
        <motion.div 
          whileInView={{ opacity: [0, 1] }}
          className="py-24 my-20 border-y border-black/5 text-center px-4"
        >
          <p className="font-sansita font-bold text-1xl md:text-3xl  leading-tight">
            "Como parte de la universidad pública, nos parece de suma importancia aclarar que <span className="text-[#A52502]">esas manos de estudiante son las que redactan</span>."
          </p>
        </motion.div>

        <div className="text-justify font-montserrat text-lg md:text-xl leading-[1.9] text-gray-800 space-y-12">
          <p>
            Nos proponemos esta instancia como una más en nuestro recorrido universitario y como personas. 
          </p>
          
          <p>
            Pensamos en Alerta Flequillo como un espacio de encuentro y comunidad. Ya sea de forma radial o gráfica. Un lugar donde podamos compartir ideas, no solo desde la universidad y multimedia, sino también sobre historias cercanas, cotidianas, las que podamos caminar y relatar. Creemos fielmente que no hace falta ir muy lejos para encontrar a quienes por siglos realizaron y realizan los trabajos de cuidado, las que nos criaron, las que se organizan, las que mueven el mundo.
          </p>
        </div>

        {/* 2º SEPARADOR */}
        <motion.div 
          whileInView={{ scaleX: [0.9, 1] }}
          className="py-24 my-20 bg-[#390D02] text-white px-10 text-center"
        >
          <p className="font-sansita font-bold text-3xl md:text-5xl leading-tight ">
            Allí donde los medios hegemónicos no llegan, o prefieren no llegar, <span className="text-[#FB9160]">donde no hay negocio</span>.
          </p>
        </motion.div>

        <div className="text-justify font-montserrat text-lg md:text-xl leading-[1.9] text-gray-800 space-y-12">
          <p>
          	Discutiendo no solo sobre feminismos, pero comprendiendo que estos nos conforman como militantes, estudiantes, trabajadoras, mamás. Desde la comunicación colectiva y autogestionada, desde el pensamiento crítico, por fuera de la inconcebible búsqueda de la objetividad.
          </p>
        </div>

      </main>

			{/* --- FOOTER --- */}
      <footer className="bg-negro text-white pt-28 pb-12 px-6 border-t-[12px] border-bordo relative overflow-hidden">

        {/* CONTENEDOR PRINCIPAL: Ahora con grid de 3 columnas para alineación simétrica */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 items-start">
          
          {/* COLUMNA 1: LOGO (Alineado a la izquierda) */}
          <div className="flex justify-start">
            <div className="relative w-56 h-56 md:w-64 md:h-64 group">
              <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-bordo/50"></div>
              <div className="absolute inset-2 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
              
              <div className="absolute inset-2 rounded-full overflow-hidden bg-negro shadow-2xl z-20 border-[4px] border-white/10">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full object-cover"
                >
                  <source src="/videologo.mp4" type="video/mp4" />
                  <div className="w-full h-full bg-bordo flex items-center justify-center text-white font-bold text-4xl font-sansita">af</div>
                </video>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN (Centro) */}
          <div className="flex flex-col gap-6 md:pl-8">
            <span className="text-bordo font-mono font-black text-xs tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-bordo"></span> SECCIONES
            </span>
            <div className="flex flex-col gap-4 font-sansita text-2xl">
              <a href="/feminismo-politica" className="hover:text-celeste transition-colors hover:pl-2 duration-300">feminismo y política</a>
              <a href="/arte-cultura" className="hover:text-naranja transition-colors hover:pl-2 duration-300">arte y cultura</a>
              <a href="/streaming" className="hover:text-lila transition-colors hover:pl-2 duration-300">streaming</a>
              <a href="/nosotras" className="hover:text-verde transition-colors hover:pl-2 duration-300">nosotras</a>
            </div>
          </div>

          {/* COLUMNA 3: CONTACTO (Derecha) */}
          <div className="flex flex-col gap-6 md:pl-8">
            <span className="text-celeste font-mono font-black text-xs tracking-[0.5em] mb-2 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-celeste"></span> CONTACTO
            </span>
            
            <a href="mailto:alertaflequillo@gmail.com" className="font-sansita text-2xl hover:text-bordo transition-colors break-all underline underline-offset-8 decoration-white/20">
              alertaflequillo@gmail.com
            </a>

            <div className="flex gap-3 mt-4">
              {['IG', 'TK', 'YT'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 bg-negro border-2 border-white flex items-center justify-center font-mono font-black text-xs relative group overflow-hidden shadow-[3px_3px_0px_#fff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{social}</span>
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 ${
                    social === 'IG' ? 'bg-lila' : social === 'TK' ? 'bg-naranja' : 'bg-verde'
                  }`}></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE CRÉDITOS: Sticker integrado al medio */}
        <div className="w-[80vw] mx-auto mt-24 pt-12 border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            
            {/* Lado Izquierdo */}
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 text-center md:text-left">
              © 2026 ALERTA FLEQUILLO — <span className="text-white/60">HECHO CON AMOR</span>
            </p>

            {/* STICKER CENTRAL: Ahora ubicado entre los dos textos de créditos */}
            <div className="group relative">
              <div className="bg-white text-negro px-4 py-2 font-mono font-black text-[10px] -rotate-2 shadow-[5px_5px_0px_#A52502] group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 cursor-pointer uppercase whitespace-nowrap">
                Design by Lula
              </div>
            </div>

            {/* Lado Derecho */}
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.5em] text-white/30">
              <span className="hover:text-white cursor-help transition-colors italic">privacidad?</span>
              <span className="text-white/60">Córdoba, Argentina</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}