import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER CON LOGO AGRANDADO */}
      <header className="flex flex-col items-center overflow-hidden">
        <div className="relative w-full max-w-2xl h-[180px] md:h-[350px] -mb-4 md:-mb-8 transition-transform hover:scale-105 duration-500"> 
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
      <nav className="sticky top-0 z-10 bg-black text-white mt-10 py-4 flex flex-wrap justify-center gap-6 text-sm font-black uppercase tracking-widest -rotate-1 shadow-xl">
        <a href="#" className="hover:text-alerta-red underline decoration-alerta-red underline-offset-4">Inicio</a>
        <a href="#" className="hover:text-alerta-red">Feminismo y Política</a>
        <a href="#" className="hover:text-alerta-red">Arte y Cultura</a>
        <a href="#" className="hover:text-alerta-red">Nosotras</a>
        <a href="#" className="hover:text-alerta-red">Contacto</a>
        <a href="#" className="bg-white text-black px-2 py-0.5 rotate-2 hover:bg-alerta-red hover:text-white transition-all">Apoyanos</a>
      </nav>
      
      {/* NOTA PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
        <div className="lg:col-span-8">
          <article className="group cursor-pointer">
            <div className="bg-white aspect-video mb-6 border-2 border-black shadow-[10px_10px_0px_0px_#4B0706] transition-transform group-hover:-translate-y-1">
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

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
  
        {/* --- NOTA PRINCIPAL (El "Gran Impacto") --- */}
        <div className="lg:col-span-7 relative group">
          {/* Imagen con marco irregular */}
          <div className="relative bg-black p-2 rotate-1 shadow-[15px_15px_0px_0px_#4B0706] transition-transform group-hover:-rotate-1 duration-300">
            <div className="aspect-[4/5] bg-gray-300 relative overflow-hidden border-2 border-white">
              {/* Acá iría la foto de la nota, por ahora un placeholder con estilo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <img src="/stikers/descarga.jfif" className="w-full h-full object-cover grayscale contrast-125" alt="Nota principal" />
            </div>
            
            {/* Etiqueta tipo cinta adhesiva */}
            <span className="absolute -top-4 -left-4 bg-alerta-red text-white font-mono px-4 py-1 text-sm -rotate-6 border-2 border-black z-30">
              EDITORIAL #01
            </span>
          </div>

          {/* Título que pisa la imagen (como en tu inspo) */}
          <h2 className="relative z-20 -mt-20 ml-4 text-6xl md:text-8xl font-black text-white uppercase leading-[0.8] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            PROGRAMAR <br />
            <span className="text-alerta-red italic">ES NUESTRA</span> <br />
            VENGANZA
          </h2>
        </div>

        {/* --- COLUMNA LATERAL (Moodboard Style) --- */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
          
          {/* Texto descriptivo con fondo tipo "resaltador" */}
          <div className="bg-[#fffbeb] p-6 border-2 border-black -rotate-2 shadow-[8px_8px_0px_0px_black]">
            <p className="font-serif text-xl leading-tight text-black">
              "No queremos solo usar la tecnología, queremos <span className="bg-alerta-red text-white px-1">romperla</span> y volverla a armar a nuestra imagen y semejanza."
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-tighter text-gray-600">
              — Escrito por la colectiva Alerta Flequillo
            </p>
          </div>

          {/* Botón de acción estilo Punk */}
          <button className="self-start bg-black text-white px-8 py-4 font-black uppercase tracking-widest border-4 border-alerta-red hover:bg-alerta-red hover:translate-x-2 hover:-translate-y-2 transition-all shadow-[10px_10px_0px_0px_black]">
            Leer Manifiesto Completo
          </button>
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Título de sección inspirado en tu inspo de letras gigantes */}
        <div className="mb-12 relative">
          <h3 className="text-[12vw] font-black leading-none text-black/5 absolute -top-10 left-0 select-none">
            CATEGORIAS
          </h3>
          <h3 className="text-4xl font-bold relative z-10 border-l-8 border-alerta-red pl-4">
            EXPLORÁ EL CAOS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: Estilo "ASK" Rojo (Inspirado en imagen 3) */}
          <div className="bg-alerta-red rounded-[40px] p-8 h-[300px] relative overflow-hidden group cursor-pointer">
            <h4 className="text-8xl font-black text-white leading-none tracking-tighter transition-transform group-hover:scale-110 duration-500">
              ARTE
            </h4>
            <div className="absolute bottom-6 right-8 bg-white text-black p-4 rounded-full rotate-12 group-hover:rotate-0 transition-all">
              <span className="font-bold tracking-widest">VER MÁS</span>
            </div>
          </div>

          {/* CARD 2: Estilo "Filling Pieces" con Sticker (Inspirado en imagen 3 y 1) */}
          <div className="bg-white rounded-[40px] border-2 border-black p-2 h-[300px] relative overflow-hidden group">
            <div className="w-full h-full rounded-[30px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src="/stikers/fondo.jpg" className="w-full h-full object-cover" alt="Cultura" />
              {/* Overlay de texto escrito a mano (Estilo imagen 4) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-red-600 text-6xl font-script -rotate-12 opacity-80 border-2 border-alerta-red-600 px-4 py-2 rounded-full">
                  Cultura
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: Estilo "Shopify Tag" (Inspirado en imagen 3) */}
          <div className="bg-black rounded-[40px] p-8 h-[300px] flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="bg-alerta-red w-16 h-16 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-3xl">★</span>
            </div>
            <h4 className="text-4xl font-black text-alerta-pink uppercase italic">
              Feminismo <br/> Radical
            </h4>
            {/* Elemento que se sale de la caja */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-white/10 text-9xl font-black rotate-90">
              POLITICA
            </div>
          </div>

        </div>

        {/* SECCIÓN DE "MOODBOARD" (Inspirado en imagen 1) */}
        <div className="mt-20 border-t-2 border-black pt-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h5 className="font-mono text-sm mb-4">MOODBOARD / REFERENCIAS</h5>
              <p className="text-3xl font-serif italic leading-tight">
                "Buscamos referencias visuales para hackear la normalización del sistema."
              </p>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              {/* Mini collage de tus imágenes */}
              <img src="/descarga.jfif" className="w-full aspect-square object-cover rounded-lg rotate-3" />
              <img src="/descarga (2).jpg" className="w-full aspect-square object-cover rounded-lg -rotate-6" />
              <img src="/descarga (1).jfif" className="w-full aspect-square object-cover rounded-lg rotate-12" />
              <img src="/logo_sinfondo.png" className="w-full aspect-square object-contain bg-white rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}