import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nota = notas.find((n) => n.slug === slug);
  if (!nota) return notFound();

  return (
    <article className="min-h-screen bg-[#f8f7f2] text-black selection:bg-bordo selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          <Link href="/" className="h-full flex items-center">
            <img src="/AlertaFlequillo.png" alt="Logo" className="h-[120%] w-auto object-contain py-2" />
          </Link>
          <div className="hidden lg:flex items-center gap-8 font-montserrat text-[11px] uppercase tracking-[0.2em] font-bold">
            <Link href="/" className="hover:text-bordo underline decoration-bordo underline-offset-4">Inicio</Link>
            <Link href="/categorias/feminismo" className="hover:text-naranja transition-colors">Feminismo y Política</Link>
            <Link href="/categorias/arte" className="hover:text-celeste transition-colors">Arte y Cultura</Link>
            <Link href="/nosotras" className="hover:text-lila transition-colors">Nosotras</Link>
            <Link href="/contacto" className="hover:text-verde transition-colors">Contacto</Link>
            <Link href="/apoyanos" className="bg-white text-black border border-black px-4 py-1.5 -rotate-2 hover:rotate-0 hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black">
              APOYANOS
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. INTRO DE LA NOTA (Antes del banner) */}
      <header className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <span className="text-celeste font-montserrat font-bold text-xs md:text-sm uppercase tracking-[0.5em] mb-6 block">
          {nota.categoria}
        </span>
        
        <h2 className="font-montserrat font-medium text-xl md:text-2xl leading-relaxed text-gray-600 mb-8 max-w-3xl mx-auto">
          "{nota.bajada}"
        </h2>

        <h1 className="font-sansita font-bold text-6xl md:text-[10vw] leading-[0.85] tracking-tighter italic lowercase mb-10">
          {nota.titulo}
        </h1>

        <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-400 font-bold">
          {nota.autor} — {nota.fecha || '2026'}
        </p>
      </header>

      {/* 2. BANNER PARALLAX */}
      <section 
        className="w-full h-[70vh] md:h-[90vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: `url(${nota.imagen})` }}
      >
        {/* Overlay sutil para dar profundidad */}
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* 3. CUERPO DE LA NOTA */}
      <main className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Columna de Texto Principal */}
        <div className="lg:col-span-8 lg:col-start-3">
          <div className="font-montserrat text-lg md:text-2xl leading-[1.9] text-gray-800 space-y-12">
            {nota.cuerpo || "Relato en proceso..."}
            
            {/* Cita de cierre o destacada */}
            <div className="py-20 border-y border-black/10 text-center">
               <p className="font-sansita font-bold text-3xl md:text-5xl italic leading-tight lowercase">
                 la comunicación es un acto de rebeldía constante.
               </p>
            </div>
          </div>
        </div>

        {/* Sidebar de Compartir (Sticky) */}
        <aside className="lg:col-span-2">
           <div className="sticky top-32 space-y-10">
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Difundir</p>
              <div className="flex flex-col gap-4 font-mono text-[10px] uppercase font-bold text-gray-600">
                <a href="#" className="hover:text-celeste">X Twitter</a>
                <a href="#" className="hover:text-verde">WhatsApp</a>
                <a href="#" className="hover:text-lila">Mail</a>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-full font-sansita font-bold italic text-xs hover:bg-bordo transition-all shadow-lg">
                Charlar nota
              </button>
           </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-32 px-8 text-center relative overflow-hidden">
        <h2 className="font-sansita font-bold text-5xl md:text-8xl italic mb-12 relative z-10">
          Seamos la <span className="text-bordo">resistencia</span> creativa.
        </h2>
        <Link href="/" className="inline-block bg-white text-black px-12 py-4 rounded-full font-sansita font-black uppercase text-sm hover:bg-celeste transition-all relative z-10">
          Volver a inicio
        </Link>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.05] text-[20vw] font-sansita font-black select-none pointer-events-none">
          FLEQUILLO
        </div>
      </footer>
    </article>
  );
}