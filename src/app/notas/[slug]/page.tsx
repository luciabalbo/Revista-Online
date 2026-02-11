import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nota = notas.find((n) => n.slug === slug);
  if (!nota) return notFound();

  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-bordo selection:text-white overflow-x-hidden">
      {/* TEXTURA DE PAPEL SUTIL */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]"></div>

      {/* NAVBAR: Logo a la izquierda con tamaño impactante y menú a la derecha */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5 px-6 py-2 md:py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO: Más grande y con aire, como en la referencia */}
          <Link href="/" className="group flex items-center py-1">
            <img 
              src="/AlertaFlequillo.png" 
              alt="Alerta Flequillo Logo"
              className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105 duration-300" 
            />
          </Link>

          {/* MENÚ COMPLETO: Tipografía Montserrat, elegante y espaciada */}
          <div className="hidden lg:flex items-center gap-10 font-montserrat text-[11px] uppercase tracking-[0.25em] font-bold">
            <Link href="/" className="hover:text-bordo underline decoration-bordo underline-offset-4">Inicio</Link>
            <a href="#" className="hover:text-naranja">Feminismo y Política</a>
            <a href="#" className="hover:text-celeste">Arte y Cultura</a>
            <a href="#" className="hover:text-lila">Nosotras</a>
            <a href="#" className="hover:text-verde">Contacto</a>
            <a href="#" className="bg-white text-black px-2 py-0.5 rotate-2 hover:bg-bordo hover:text-white transition-all">Apoyanos</a>
          </div>

          {/* MENÚ MÓVIL */}
          <button className="lg:hidden text-black uppercase font-mono text-[11px] font-bold border-b-2 border-black">
            Menú
          </button>
        </div>
      </nav>

      {/* HEADER: EL TÍTULO PISA LA IMAGEN (Como en la foto) */}
      <header className="relative w-full h-[85vh] flex items-center justify-center bg-black overflow-hidden">
        <img 
          src={nota.imagen} 
          className="absolute inset-0 w-full h-full object-cover opacity-70" 
          alt={nota.titulo}
        />
        {/* Overlay degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        
        <div className="relative z-10 text-center px-6">
          <span className="bg-celeste text-white font-sansita font-bold text-[10px] uppercase tracking-[0.4em] px-3 py-1 mb-6 inline-block">
            {nota.categoria}
          </span>
          {/* TÍTULO GIGANTE E ITÁLICO */}
          <h1 className="font-sansita font-bold text-7xl md:text-[10vw] leading-[0.8] tracking-tighter text-white italic lowercase drop-shadow-2xl">
            {nota.titulo}
          </h1>
          <div className="mt-8 flex flex-col items-center">
             <div className="h-12 w-[1px] bg-white/50"></div>
             <p className="mt-4 font-mono text-[10px] text-white/70 uppercase tracking-[0.4em]">Por {nota.autor}</p>
          </div>
        </div>
      </header>

      {/* CUERPO DE LA NOTA: Diseño de Grilla Editorial */}
      <main className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        
        {/* LA BAJADA: Flota a la izquierda en desktop */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-32">
            <h2 className="font-sansita font-bold text-3xl md:text-4xl leading-[1.1] text-black italic mb-8 lowercase">
              "{nota.bajada}"
            </h2>
            <div className="h-[2px] w-12 bg-bordo mb-4"></div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {nota.autor} — {nota.fecha || '2026'}
            </p>
          </div>
        </aside>

        {/* EL TEXTO: Columna central pura */}
        <div className="md:col-span-8 lg:col-span-6 lg:col-start-5">
          <div className="font-montserrat text-lg md:text-xl leading-[1.9] text-gray-800 space-y-10">
            {nota.cuerpo || "Relato en proceso..."}
            
            {/* CITA INTERMEDIA ESTILO ANFIBIA */}
            <div className="py-16 my-16 border-y border-black/10 flex flex-col items-center text-center">
               <span className="text-5xl text-celeste font-serif mb-6">“</span>
               <p className="font-sansita font-bold text-3xl italic leading-tight lowercase">
                 la comunicación es un acto de rebeldía constante.
               </p>
               <div className="h-1 w-20 bg-celeste/30 mt-8"></div>
            </div>
          </div>
        </div>

        {/* SIDEBAR DERECHA: Interacción */}
        <aside className="hidden lg:block lg:col-span-2 lg:col-start-11">
           <div className="sticky top-32 space-y-12">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Comunidad</p>
                <button className="w-full bg-black text-white py-4 rounded-full font-sansita font-bold italic text-sm hover:bg-bordo transition-all shadow-xl active:scale-95">
                  Charlar nota
                </button>
              </div>
              <div className="border-t border-black/5 pt-8">
                <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Difundir</p>
                <div className="flex flex-col gap-3 font-mono text-[10px] uppercase font-bold tracking-tighter text-gray-600">
                  <a href="#" className="hover:text-celeste">Instagram</a>
                  <a href="#" className="hover:text-celeste">TikTok</a>
                </div>
              </div>
           </div>
        </aside>
      </main>

      {/* FOOTER GIGANTE: CAPAS Y PROFUNDIDAD */}
      <footer className="bg-black text-white pt-48 pb-20 px-8 relative overflow-hidden">
        {/* FONTO GIGANTE (Flequillo) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center z-0 opacity-[0.07] pointer-events-none">
          <h2 className="font-sansita font-black text-[25vw] leading-none uppercase tracking-tighter">
            FLEQUILLO
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 text-center">
          <h3 className="font-sansita font-bold text-5xl md:text-7xl italic leading-none mb-12">
            Seamos la <span className="text-bordo">resistencia</span> creativa.
          </h3>

          <Link 
            href="/" 
            className="bg-white text-black px-14 py-5 rounded-full font-sansita font-black uppercase text-sm hover:bg-celeste hover:text-white transition-all shadow-2xl scale-110 mb-24"
          >
            Volver
          </Link>

          <div className="w-full pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            <p>© 2026 Alerta Flequillo — Hecho por pibas</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}