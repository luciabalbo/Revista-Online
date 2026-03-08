import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Notas de la Revista',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Amigable (Slug)',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'volanta',
      title: 'Volanta',
      type: 'string',
      description: 'Texto corto arriba del título (ej: ARTE Y CULTURA)',
    }),
    defineField({
      name: 'bajada',
      title: 'Bajada',
      type: 'string',
      description: 'Texto que acompaña al título',
    }),
    defineField({
      name: 'copete',
      title: 'Copete',
      type: 'text',
      description: 'Resumen destacado antes del cuerpo',
    }),
    defineField({
      name: 'autor',
      title: 'Autor/a',
      type: 'string',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true, // Esto permite a tus amigas elegir qué parte de la foto se ve en el recorte
      },
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'cuerpo',
      title: 'Cuerpo de la nota',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block', // Esto es lo que permite negritas, links y listas
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      author: 'autor',
      media: 'imagen',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `Por ${author}`}
    },
  },
})