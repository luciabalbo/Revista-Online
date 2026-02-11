import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nota = notas.find((n) => n.slug === slug);
  if (!nota) return notFound();

  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-bordo selection:text-white pb-0 overflow-x-hidden">
      {/* TEXTURA DE PAPEL SUTIL */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]"></div>

      {/* NAVBAR: Limpio y elegante */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-sansita font-black text-xl uppercase tracking-tighter">
          Alerta <span className="text-bordo italic text-2xl">Flequillo</span>
        </Link>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <Link href="/" className="hover:text-celeste transition-colors">Notas</Link>
          <Link href="/nosotras" className="hover:text-celeste transition-colors">Nosotras</Link>
        </div>
      </nav>

      {/* HEADER: Color real y título equilibrado */}
      <header className="relative w-full h-[70vh] flex flex-col justify-end items-center px-6 pb-20 bg-black">
        <img 
          src={nota.imagen} 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          alt={nota.titulo}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl">
          <span className="bg-celeste text-white font-sansita font-bold text-[10px] uppercase tracking-[0.4em] px-4 py-1.5 mb-6 inline-block">
            {nota.categoria}
          </span>
          <h1 className="font-sansita font-bold text-5xl md:text-7xl leading-[0.9] tracking-tight text-white italic lowercase drop-shadow-xl">
            {nota.titulo}
          </h1>
        </div>
      </header>

      {/* SECCIÓN BAJADA Y AUTOR */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 border-b border-black/5">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
             <h2 className="font-sansita font-bold text-2xl md:text-4xl leading-tight text-black italic mb-8">
               "{nota.bajada}"
             </h2>
             <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-bordo"></div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold">
                  {nota.autor} <span className="text-gray-400 font-normal">/ {nota.fecha || 'Feb 2026'}</span>
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* CUERPO DE TEXTO (Sin letra capital, más puro) */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 py-20">
        <div className="md:col-span-7 md:col-start-3 font-montserrat text-lg md:text-xl leading-[1.8] text-gray-800 space-y-10">
          {nota.cuerpo || "Relato en proceso..."}
          
          {/* CITA DE DISEÑO */}
          <div className="py-12 my-12 border-y-4 border-celeste flex flex-col items-center">
             <span className="text-4xl text-celeste font-serif mb-4">“</span>
             <p className="font-sansita font-bold text-3xl text-center italic leading-tight lowercase max-w-lg">
               La comunicación es un acto de rebeldía constante.
             </p>
          </div>
        </div>

        {/* SIDEBAR INTERACTIVA */}
        <aside className="md:col-span-2 sticky top-32 h-fit space-y-12">
           <div className="group cursor-pointer">
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-4">Interactuar</p>
              <button className="w-full bg-black text-white py-4 rounded-full font-sansita font-bold italic text-sm hover:bg-bordo transition-all shadow-lg">
                Charlar nota
              </button>
           </div>
           <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-4">Compartir</p>
              <div className="flex flex-col gap-3 font-mono text-[10px] uppercase font-bold tracking-tighter">
                <a href="#" className="hover:text-celeste">Instagram</a>
                <a href="#" className="hover:text-celeste">TikTok</a>
              </div>
           </div>
        </aside>
      </main>

      {/* FOOTER: DISEÑO DE IMPACTO TIPO REVISTA */}
      <footer className="bg-black text-white pt-32 pb-16 px-8 relative overflow-hidden">
        {/* Línea de color de marca arriba */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-celeste via-bordo to-celeste"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-20 relative">
            <h2 className="font-sansita font-black text-8xl md:text-[14vw] leading-none uppercase tracking-[ -0.05em] opacity-10 select-none">
              Alerta Flequillo
            </h2>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-sansita font-bold text-4xl md:text-6xl italic leading-none">
                Seamos la <span className="text-bordo">resistencia</span> creativa.
              </h3>
            </div>
          </div>

          <Link 
            href="/" 
            className="bg-white text-black px-12 py-4 rounded-full font-sansita font-black uppercase text-sm hover:bg-celeste hover:text-white transition-all shadow-2xl mb-20"
          >
            Ir a la portada
          </Link>

          <div className="w-full pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <p>© 2026 Alerta Flequillo - Hecho con amor, desing by lula.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}