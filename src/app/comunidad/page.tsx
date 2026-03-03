"use client";
import { useState, use } from 'react';
import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComunidadPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  const planes = [
    { 
        nombre: "Cortate el flequillo", 
        precio: "$3.000", 
        desc: "Aporte mensual básico para sostener la red.",
        estilo: "bg-white text-black shadow-[10px_10px_0px_#A52502] border-2 border-black" 
    },
    { 
        nombre: "Lo personal es flequillo", 
        precio: "$6.000", 
        desc: "Aporte medio para impulsar nuevas notas.",
        estilo: "bg-[#A52502] text-white shadow-[10px_10px_0px_#000] border-2 border-black" 
    },
    { 
        nombre: "El flequillo ya no es un prejuicio, es una orden de restricción", 
        precio: "$10.000", 
        desc: "Aporte premium para bancar la autogestión total.",
        estilo: "bg-black text-white shadow-[10px_10px_0px_#A52502] border-2 border-white/20" 
    }
  ];

  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-[#FB9160] selection:text-white overflow-x-hidden">
      {/* TEXTURA ANALÓGICA */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[200] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
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
                        <div className="w-full py-4 border-t border-current font-mono text-[10px] uppercase tracking-widest flex justify-between items-center group-hover:text-[#FB9160] transition-colors">
                            Suscribirme <span>→</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>

        {/* SECCIÓN ESCRIBIR (LOOK MANIFIESTO) */}
        <section className="relative overflow-hidden bg-white p-12 md:p-24 text-center">
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="font-sansita text-3xl md:text-6xl mb-12 tracking-tighter">
                    ¿Queres escribir <br/> <span className="text-[#FB9160]">con nosotras?</span>
                </h2>
                <div className="font-montserrat text-xl leading-[1.8] mb-12 text-gray-700">
                    <p>Como un medio que pone resistencia a los tiempos que acechan, creemos que es importante priorizar la pluralidad de voces. Si consideras que podés hacer algún aporte ya sea desde la redacción, diseño gráfico o el fotoperiodismo, contactanos.</p>
                </div>
                <a 
                    href="mailto:alertaflequillo@gmail.com" 
                    className="inline-block bg-black text-white text-xl font-sansita italic px-12 py-6 hover:bg-[#FB9160] hover:text-black transition-all transform hover:-rotate-2"
                >
                    alertaflequillo@gmail.com
                </a>
                <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.5em] text-black/40">¡Ayudanos a hacer crecer este proyecto!</p>
            </div>
        </section>
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