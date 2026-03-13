"use client";

export default function ShareButton({ titulo }: { titulo: string }) {
  const handleShare = async () => {
  const url = window.location.href;

  try {
    // 1. Intentamos el método moderno (Mobile)
    if (navigator.share) {
      await navigator.share({
        title: `Alerta Flequillo - ${titulo}`,
        url: url
      });
    } else {
      // 2. Método "a prueba de balas" para copiar en PC
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy'); // Este no falla en localhost
        alert("¡Link copiado al portapapeles! 🖇️");
      } catch (err) {
        console.error('No se pudo copiar', err);
      }
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

  return (
    <button 
      onClick={handleShare}
      className="bg-[#1C8394] text-white px-8 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
    >
      Compartir registro
    </button>
  );
}