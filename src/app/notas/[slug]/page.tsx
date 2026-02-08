import notas from '@/app/notas.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function NotaPage({ params }: { params: { slug: string } }) {
  // Buscamos la nota por el slug
  const nota = notas.find((n) => n.slug === params.slug);

  if (!nota) return notFound();

  return (
    <article className="min-h-screen bg-white">
      {/* HEADER IMPACTANTE */}
      <header className="relative h-[80vh] bg-negro overflow-hidden">
        <img 
          src={nota.imagen} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-negro via-transparent">
          <span className="bg-white text-negro px-3 py-1 font-mono font-bold text-xs mb-6 self-start uppercase">
            {nota.categoria}
          </span>
          <h1 className="text-white text-6xl md:text-9xl font-sansita font-[900] leading-[0.8] uppercase tracking-tighter">
            {nota.titulo}
          </h1>
          <p className="mt-8 font-mono text-white/70 uppercase tracking-widest">
            {nota.autor} — {nota.fecha}
          </p>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-2xl md:text-4xl font-bold italic mb-12 leading-tight border-l-8 border-bordo pl-8 text-negro">
          {nota.bajada}
        </p>
        
        {/* El 'whitespace-pre-line' es clave para que respete los saltos de línea del JSON */}
        <div className="font-montserrat text-xl leading-relaxed text-gray-800 whitespace-pre-line space-y-6">
          {nota.cuerpo}
        </div>

        <div className="mt-20 pt-10 border-t-2 border-negro">
          <Link href="/" className="font-mono font-black uppercase hover:text-bordo transition-colors">
            ← Volver a la trinchera
          </Link>
        </div>
      </main>
    </article>
  );
}