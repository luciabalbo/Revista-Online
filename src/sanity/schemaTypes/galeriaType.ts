import {defineField, defineType} from 'sanity'

export const galeriaType = defineType({
  name: 'galeria',
  title: 'Fotoperiodismo',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', type: 'string', title: 'Título de la Cobertura' }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      title: 'Slug', 
      options: { source: 'titulo' } 
    }),
    defineField({ name: 'autor', type: 'string', title: 'Fotógrafa/o' }),
    defineField({ name: 'fecha', type: 'date', title: 'Fecha de la cobertura' }),
    defineField({ name: 'bajada', type: 'text', title: 'Bajada / Introducción' }),
    defineField({
      name: 'imagenPortada',
      type: 'image',
      title: 'Imagen de Portada (Grilla)',
      options: { hotspot: true }
    }),
    defineField({
      name: 'fotos',
      type: 'array',
      title: 'Fotos de la Galería',
      of: [{ type: 'image', options: { hotspot: true } }]
    })
  ]
})