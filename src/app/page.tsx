import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER CON LOGO AGRANDADO */}
      <header className="flex flex-col items-center overflow-hidden">
        <div className="relative w-full max-w-5xl h-[250px] md:h-[400px] -mb-6 md:-mb-10 transition-transform hover:scale-105 duration-500"> 
          <Image 
            src="/logo_sinfondo.png" 
            alt="Alerta Flequillo Logo" 
            fill 
            className="object-contain"
            priority
            unoptimized
            quality={100}
          />
        </div>
        
        {/* El video que tenías comentado, si lo querés activar, ya tiene el tamaño grande también */}
        {/* <div className="mt-8 w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-black shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110">
            <source src="/videologo.mp4" type="video/mp4" />
          </video>
        </div> 
        */}
      </header>
      
      {/* NAV CON TUS COLORES */}
      <nav className="sticky top-0 z-10 bg-black text-white py-4 flex flex-wrap justify-center gap-6 text-sm font-black uppercase tracking-widest -rotate-1 shadow-xl">
        <a href="#" className="hover:text-red-500 underline decoration-red-600 underline-offset-4">Inicio</a>
        <a href="#" className="hover:text-red-500">Feminismo y Política</a>
        <a href="#" className="hover:text-red-500">Arte y Cultura</a>
        <a href="#" className="hover:text-red-500">Nosotras</a>
        <a href="#" className="hover:text-red-500">Contacto</a>
        <a href="#" className="bg-white text-black px-2 py-0.5 rotate-2 hover:bg-red-600 hover:text-white transition-all">Apoyanos</a>
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