// Esta query trae todas las galerías para la página principal
export const GALERIAS_QUERY = `*[_type == "galeria"] | order(fecha desc) {
  "id": _id,
  titulo,
  "slug": slug.current,
  autor,
  fecha,
  "imagen": imagenPortada.asset->url
}`;

// Esta query trae los detalles de UNA sola galería
export const GALERIA_DETALLE_QUERY = `*[_type == "galeria" && slug.current == $slug][0] {
  titulo,
  bajada,
  fecha,
  autor,
  "fotos": fotos[].asset->url
}`;