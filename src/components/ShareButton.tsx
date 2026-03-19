"use client";
import { useEffect, useState } from "react";

export default function ShareButton({ 
  titulo, 
  bajada, 
  texto = "Compartir nota",
  color = "#1C8394" // Celeste por defecto
}: { 
  titulo: string, 
  bajada?: string, 
  texto?: string,
  color?: string // Agregamos esta prop
}) { 
  const [url, setUrl] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Alerta Flequillo - ${titulo}`,
          text: bajada || "Mirá este registro de Alerta Flequillo", // Si no hay bajada, usa este texto
          url: url,
        });
      } catch (err) {
        console.log("Cancelado");
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("¡Link copiado! 🖇️");
    }
  };

  return (
    <button 
      onClick={handleShare}
      style={{ backgroundColor: color }}
      className="text-white px-8 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-[5px_5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-w-[200px] cursor-pointer"
    >
      {copiado ? "¡LINK COPIADO! 🖇️" : texto}
    </button>
  );
}