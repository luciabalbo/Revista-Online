"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link"; 
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
// 1. IMPORTAMOS EL CLIENTE DE SANITY
import { client } from '@/sanity/lib/client'; 

export default function FeminismoYPolitica() {
  const router = useRouter();
  
  // 2. NUEVOS ESTADOS PARA SANITY
  const [notas, setNotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });  
  const scrollRef = useRef<HTMLDivElement>(null);

  const colorSeccion = "#154B52"; 

  // 3. EFECTO PARA TRAER NOTAS FILTRADAS DESDE SANITY
  useEffect(() => {
    const fetchNotas = async () => {
      // Pedimos notas que tengan alguna de esas 3 variantes en la volanta
      const query = `*[_type == "post" && (volanta == "Arte" || volanta == "Cultura" || volanta == "Arte y Cultura")] | order(fecha desc) {
        "id": _id,
        titulo,
        volanta,
        bajada,
        autor,
        fecha,
        "slug": slug.current,
        "imagen": imagen.asset->url
      }`;
      const data = await client.fetch(query);
      setNotas(data);
      setLoading(false);
    };
    fetchNotas();
  }, []);

  // 4. LÓGICA DE BÚSQUEDA
  const notasFiltradas = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return notas;
    return notas.filter((nota) => {
      const target = `${nota.titulo} ${nota.autor} ${nota.bajada}`.toLowerCase();
      return target.includes(term);
    });
  }, [searchTerm, notas]);

  const notasBanner = notas.slice(0, 3); 
  const notasGrilla = notasFiltradas;    

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSlug = (item: string) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  if (loading) return <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center font-sansita text-2xl">Cargando sección...</div>;

  return (
    <main className="min-h-screen bg-[#f8f7f2] overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#154B52] z-[300] origin-left" style={{ scaleX }} />
      
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
                  <span className="absolute top-full left-0 text-[#154B52] transition-transform duration-500 group-hover:-translate-y-full text-sm tracking-normal font-montserrat">{item}</span>
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
            className="fixed inset-0 bg-[#154B52] z-[500] flex flex-col items-center justify-center lg:hidden"
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

      {/* --- BANNER ARTE Y CULTURA --- */}
      <section className="relative w-full h-[75vh] md:h-[85vh] bg-black overflow-hidden">
        <div 
          ref={scrollRef} 
          className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {notasBanner.map((nota) => (
            <div key={nota.id} className="min-w-full h-full snap-center relative flex-shrink-0 group">
              <img 
                src={nota.imagen} 
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.6] md:brightness-[0.8]" 
                alt={nota.titulo} 
              />
              
              {/* Overlay: Gradiente oscuro desde abajo para que el texto blanco resalte siempre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />
              
              {/* CONTENEDOR DE TEXTO */}
              <div className="relative h-full w-full flex flex-col justify-center items-center text-center z-20 px-4">
                
                <div className="max-w-[90vw] md:max-w-5xl flex flex-col items-center">
                  
                  {/* VOLANTA / CATEGORÍA */}
                  <span className="mb-4 inline-block bg-[#154B52] text-white font-montserrat text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black px-4 py-1.5 shadow-lg">
                    Destacado de hoy
                  </span>

                  {/* Título: Ajustado a 4xl en mobile para evitar desbordes laterales */}
                  <Link href={`/notas/${nota.slug}`}>
                    <h2 className="font-sansita font-bold text-4xl md:text-7xl text-white leading-[0.95] tracking-tighter italic hover:text-[#154B52] transition-all duration-500 drop-shadow-2xl">
                      {nota.titulo}
                    </h2>
                  </Link>

                  {/* Bajada: Limitada al 85% del ancho de pantalla y máximo 3 líneas en mobile */}
                  <p className="mt-4 font-montserrat text-white/90 text-sm md:text-xl max-w-[85vw] md:max-w-3xl leading-relaxed line-clamp-3 md:line-clamp-none">
                    {nota.bajada}
                  </p>

                  {/* Botón */}
                  <Link 
                    href={`/notas/${nota.slug}`} 
                    className="mt-8 md:mt-10 group/btn flex items-center gap-3 text-white uppercase text-[9px] md:text-[10px] tracking-[0.3em] font-black transition-all"
                  >
                    <span className="border-b-2 border-[#154B52] pb-1 group-hover/btn:text-[#154B52] transition-colors">
                      Leer Nota
                    </span>
                    <span className="text-lg group-hover/btn:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* --- TÍTULO DE SECCIÓN --- */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-negro pb-6">
          <h1 className="font-sansita text-4xl md:text-6xl text-negro leading-none tracking-tighter">
            Arte <span className="text-verde">& Cultura</span>
          </h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-negro/40">Periodismo con flequillo</p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: ARCHIVO DE NOTAS --- */}
      <section id="archivo-notas" className="bg-[#f8f7f2] pb-24 px-4 -mt-1 pt-16 md:pt-20">
        <div className="max-w-[80%] mx-auto"> 

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-0 items-stretch">
            {notasGrilla.map((nota, i) => (
                <motion.article 
                  key={nota.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="group flex"
                >
                  <Link href={`/notas/${nota.slug}`} className="flex flex-col w-full">
                    
                    <div className="relative aspect-square mb-4 overflow-hidden border-2 border-negro shadow-[8px_8px_0px_#000] group-hover:shadow-none group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300">
                      <img src={nota.imagen} className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700" alt={nota.titulo} />
                    </div>
                    
                    {/* Contenedor de texto */}
                    <div className="flex flex-col flex-grow">
                      <span 
                        className="inline-block font-black text-[var(--cat-color)] font-montserrat text-[9px] px-2 py-0.5 uppercase tracking-widest mb-2 self-start transition-colors duration-300 group-hover:bg-negro group-hover:text-white"
                        style={{ '--cat-color': colorSeccion } as any}
                      >
                        {nota.volanta}
                      </span>

                      <h3 className="font-sansita text-2xl text-negro leading-none group-hover:text-bordo transition-colors">
                        {nota.titulo}
                      </h3>

                      <p className="font-montserrat text-sm text-negro/60 mt-2 mb-4 line-clamp-2">
                        {nota.bajada}
                      </p>
                    </div>

                    {/* PIE DE CARD */}
                    <div className="mt-auto pt-1 border-t border-negro/10 flex justify-between items-end">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[8px] uppercase text-negro/40 font-black tracking-[0.2em]">
                          Escrito por
                        </span>
                        <p className="font-mono text-[9px] uppercase font-black text-negro group-hover:underline decoration-1 underline-offset-2"
                          style={{ textDecorationColor: colorSeccion }}>
                          {nota.autor}
                        </p>
                      </div>

                      <div 
                        style={{ borderColor: colorSeccion, color: colorSeccion }}
                        className="relative w-6 h-6 flex items-center justify-center transition-all duration-300 hover:text-white overflow-hidden"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colorSeccion;
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = colorSeccion;
                        }}
                      >
                        <span className="text-lg font-bold">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

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
    </main>
  );
}