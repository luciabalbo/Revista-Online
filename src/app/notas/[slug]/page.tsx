import notas from '@/app/notas.json'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NotaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const nota = notas.find((n) => n.slug === slug);

  if (!nota) return notFound();

  return (
    <article className="min-h-screen bg-white">
      {/* BOTÓN VOLVER: Estética "Leer Más" de la Home */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 bg-white text-negro px-6 py-2 font-sansita font-bold uppercase border-4 border-celeste hover:bg-celeste hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
      >
        Volver
      </Link>

      {/* HEADER: Centrado, masivo y en minúsculas */}
      <header className="relative h-[85vh] bg-negro overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <img 
          src={nota.imagen} 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale contrast-125" 
          alt={nota.titulo}
        />
        
        {/* Overlay para que el texto explote */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="relative z-10 w-full max-w-7xl">
          {/* Categoría: Celeste y separada */}
          <span className="text-celeste font-sansita font-[900] text-sm md:text-base uppercase tracking-[0.5em] mb-6 block drop-shadow-md">
            {nota.categoria}
          </span>
          
          {/* Título: Gigante, en minúsculas y Sansita 900 */}
          <h1 className="text-white text-6xl md:text-[12vw] font-sansita font-[900] leading-[0.8] tracking-tighter italic lowercase drop-shadow-2xl">
            {nota.titulo}
          </h1>

          {/* Autor: Firma con la línea bordó */}
          <div className="mt-12 flex flex-col items-center">
             <div className="h-2 w-20 bg-bordo mb-4 shadow-lg"></div>
             <p className="font-mono text-white text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
               Por {nota.autor}
             </p>
          </div>
        </div>
      </header>

      {/* CUERPO DE LA NOTA */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Bajada: Centrada y con estilo de bloque */}
        <div className="flex flex-col items-center mb-20 text-center">
          <p className="text-2xl md:text-5xl font-sansita font-[900] italic leading-[1] text-negro max-w-3xl lowercase">
            {nota.bajada}
          </p>
          <div className="h-4 w-48 bg-celeste mt-10"></div>
        </div>
        
        {/* Contenido: Montserrat para lectura */}
        <div className="max-w-2xl mx-auto font-montserrat text-xl md:text-2xl leading-relaxed text-gray-900 whitespace-pre-line space-y-8">
          {nota.cuerpo || "Contenido próximamente..."}
        </div>

        {/* Cierre: Branding final */}
        <div className="mt-32 pt-16 border-t-8 border-negro flex flex-col items-center">
          <h4 className="font-sansita font-[900] text-7xl leading-none uppercase text-center">
            Alerta <br /> <span className="text-bordo italic">Flequillo</span>
          </h4>
          <Link 
            href="/" 
            className="mt-12 bg-white text-negro px-12 py-4 font-sansita font-bold uppercase border-4 border-celeste hover:bg-celeste hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Ver más ediciones
          </Link>
        </div>
      </main>
    </article>
  );
}