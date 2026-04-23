export default function publishedLabel(value: string | undefined) {
  switch (value) {
    case 'draft':
      return 'Rascunho'
    case 'published':
      return 'Publicado'
    case 'trash':
      return 'Lixeira'
    default:
      return 'Rascunho'
  }
}

