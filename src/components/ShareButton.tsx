"use client";

import { useEffect, useState } from "react";

export default function ShareButton({ titulo, bajada }: { titulo: string, bajada: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    // Si el navegador soporta compartir (Cualquier celu moderno)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Alerta Flequillo: ${titulo}`,
          text: bajada, // Esto es lo que aparece como mensaje
          url: url,     // Al enviar la URL, la app (WPP/IG) busca la miniatura
        });
      } catch (err) {
        console.log("Se canceló el compartido");
      }
    } else {
      // Si estás en PC (donde no hay menú de apps), copiamos el link
      await navigator.clipboard.writeText(url);
      alert("¡Link copiado! (En PC no hay menú de apps, usá Ctrl+V)");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="bg-[#1C8394] text-white px-8 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-[5px_5px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
    >
      Compartir nota
    </button>
  );
}