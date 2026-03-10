"use client";
import { useState, use } from 'react';
import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion';

export default function ComunidadPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const planes = [
    { 
        nombre: "Cortate el flequillo", 
        precio: "$3.000", 
        desc: "Aporte mensual básico para sostener la red.",
        estilo: "bg-white text-black shadow-[10px_10px_0px_#FB9160] border-2 border-black" 
    },
    { 
        nombre: "Lo personal es flequillo", 
        precio: "$6.000", 
        desc: "Aporte medio para impulsar nuevas notas.",
        estilo: "bg-[#FB9160] text-white shadow-[10px_10px_0px_#000] border-2 border-black" 
    },
    { 
        nombre: "El flequillo ya no es un prejuicio, es una orden de restricción", 
        precio: "$10.000", 
        desc: "Aporte premium para bancar la autogestión total.",
        estilo: "bg-black text-white shadow-[10px_10px_0px_#FB9160] border-2 border-white/20" 
    }
  ];

  // Limpiador de slugs para los links del nav
  const getSlug = (item: string) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#FB9160] selection:text-white overflow-x-hidden">
      {/* TEXTURA ANALÓGICA */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#FB9160] z-[300] origin-left" style={{ scaleX }} />
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
      {/* ESPACIADOR PARA EL NAV FIJO */}
      <div className="h-18" />
      {/* HEADER TIPO COLLAGE */}
      <header className="pt-40 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
            <motion.div 
                initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
                animate={{ rotate: -2, scale: 1, opacity: 1 }}
                className="inline-block bg-black text-white px-6 py-2 mb-8 font-mono text-xs tracking-[0.8em] uppercase"
            >
                Comunidad
            </motion.div>
            <h1 className="font-sansita text-3xl md:text-[5vw] leading-[0.8] tracking-tighter ">
                Bancá el periodismo <br/> 
                <span className="text-[#A52502] relative">
                    feminista
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none"><path d="M5 15C50 5 150 5 295 15" stroke="#FB9160" strokeWidth="4" strokeLinecap="round"/></svg>
                </span>
            </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-40">
        
        {/* SECCIÓN INTRODUCCIÓN CON EFECTO PAPEL */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-center">
            <div className="lg:col-span-7 bg-white p-10 md:p-16 border border-black/10 shadow-sm relative">
                {/* Bordes rasgados decorativos (simulados) */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
                
                <div className="font-montserrat text-xl md:text-2xl leading-[1.8] text-gray-900 space-y-8 text-justify">
                    <p>
                        En un contexto de sobreinformación, donde las fake news y twitter parecen colonizar nuestras conexiones, seguimos apostando por la comunicación colectiva, por el periodismo crítico y feminista, en la militancia y la participación política.
                    </p>
                    <p className="font-sansita text-3xl italic text-[#1C8394]">
                        Ayúdanos y se parte de nuestra comunidad. Sumate a Alerta Flequillo con una suscripción mensual.
                    </p>
                </div>
            </div>

            {/* CAJA DEL LIBRO (LOOK STICKER/RECORTADO) */}
            <motion.div 
                whileHover={{ rotate: 0 }}
                className="lg:col-span-5 bg-black text-white p-10 rotate-3 border-2 border-dashed border-[#FB9160] relative group"
            >
                <span className="absolute -top-4 -right-4 bg-[#FB9160] text-black font-mono text-xs font-bold px-4 py-2 rounded-full group-hover:scale-110 transition-transform">¡REGALO!</span>
                <h3 className="font-sansita text-3xl mb-6 italic lowercase">¿Sabías que...?</h3>
                <p className="font-montserrat text-lg leading-relaxed opacity-90">
                    con un año de suscripción te regalamos un libro para leer juntas en el verano. Mandanos un mail solicitándolo y coordinamos el envío.
                </p>
            </motion.div>
        </section>

        {/* GRILLA DE PLANES (BRUTALISMO) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {planes.map((plan, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className={`${plan.estilo} p-10 flex flex-col justify-between min-h-[400px] cursor-pointer group`}
                >
                    <div>
                        <h3 className="font-sansita text-3xl leading-tight mb-4">{plan.nombre}</h3>
                        <p className="font-montserrat text-sm opacity-80 mb-8">{plan.desc}</p>
                    </div>
                    <div className="mt-auto">
                        <span className="font-sansita text-5xl block mb-6">{plan.precio}</span>
                        <div className="w-full py-4 border-t border-current font-mono text-[10px] uppercase tracking-widest flex justify-between items-center group-hover:text-[#1C8394] transition-colors">
                            Suscribirme <span>→</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>

        {/* SECCIÓN ESCRIBIR (LOOK MANIFIESTO - OPTIMIZADO MOBILE) */}
        <section className="relative overflow-hidden bg-white py-20 px-4 md:p-24 text-center">
            <div className="relative z-10 max-w-[90vw] md:max-w-3xl mx-auto flex flex-col items-center">
                
                {/* Título: Ajustado a 4xl en mobile para que el <br/> no genere huecos raros */}
                <h2 className="font-sansita text-4xl md:text-7xl mb-10 tracking-tighter leading-[0.9]">
                    ¿Querés escribir <br className="hidden md:block"/> 
                    <span className="text-[#FB9160]">con nosotras?</span>
                </h2>

                {/* Texto: Reducido a text-lg en mobile para mejor legibilidad */}
                <div className="font-montserrat text-lg md:text-xl leading-relaxed md:leading-[1.8] mb-12 text-gray-700 max-w-[85vw] md:max-w-none">
                    <p>
                        Como un medio que pone resistencia a los tiempos que acechan, creemos que es importante priorizar la pluralidad de voces. Si considerás que podés hacer algún aporte ya sea desde la redacción, diseño gráfico o el fotoperiodismo, contactanos.
                    </p>
                </div>

                {/* Botón: Ahora es responsivo (text-sm en mobile) y no se desborda */}
                <a 
                    href="mailto:alertaflequillo@gmail.com" 
                    className="w-full md:w-auto inline-block bg-black text-white text-sm md:text-xl font-sansita px-6 md:px-12 py-5 md:py-6 hover:bg-[#FB9160] hover:text-black transition-all transform hover:-rotate-2 shadow-xl"
                >
                    alertaflequillo@gmail.com
                </a>

                <p className="mt-10 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-black/40">
                    ¡Ayudanos a hacer crecer este proyecto!
                </p>
            </div>
        </section>
      </main>

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
    </article>
  );
}