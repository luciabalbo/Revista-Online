import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER CON LOGO */}
      <header className="py-8 border-b-2 border-black flex flex-col items-center">
        <div className="relative w-full max-w-2xl h-48 md:h-64">
          <Image 
            src="/logo.png" 
            alt="Alerta Flequillo Logo" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </header>

      {/* NAV CON TUS COLORES */}
      <nav className="bg-alerta-blood text-alerta-pink py-3 px-4 flex justify-center gap-8 text-xs font-bold uppercase tracking-widest border-b-2 border-black">
        <a href="#" className="hover:text-white transition-colors">Inicio</a>
        <a href="#" className="hover:text-white transition-colors">Feminismo y Política</a>
        <a href="#" className="hover:text-white transition-colors">Arte y Cultura</a>
        <a href="#" className="hover:text-white transition-colors">Nosotras</a>
        <a href="#" className="hover:text-white transition-colors">Contacto</a>
        <a href="#" className="hover:text-white transition-colors">Apoyanos</a>
      </nav>

      {/* NOTA PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
        <div className="lg:col-span-8">
          <article className="group cursor-pointer">
            <div className="bg-alerta-pink aspect-video mb-6 border-2 border-black shadow-[10px_10px_0px_0px_#4B0706] transition-transform group-hover:-translate-y-1">
              {/* Aquí se verá la imagen cuando la subas */}
            </div>
            <span className="font-mono text-alerta-red font-bold uppercase text-sm">Editorial</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-[0.9] mt-4 mb-6 text-alerta-blood">
              PROGRAMAR ES <br/> NUESTRA VENGANZA
            </h2>
            <p className="text-xl leading-relaxed text-gray-800 max-w-2xl">
              Un manifiesto sobre por qué las pibas tenemos que ocupar los espacios de código y construcción digital.
            </p>
          </article>
        </div>

        {/* COLUMNA LATERAL */}
        <aside className="lg:col-span-4 border-l-2 border-black pl-8 space-y-10">
          <h3 className="font-mono bg-alerta-red text-white inline-block px-2 py-1 text-sm">LO ÚLTIMO</h3>
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <h4 className="text-2xl font-serif font-bold leading-tight hover:text-alerta-red cursor-pointer">
                  Título de una nota secundaria que impacta.
                </h4>
                <p className="text-sm font-mono text-gray-500 mt-2">Por Alerta Flequillo</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}