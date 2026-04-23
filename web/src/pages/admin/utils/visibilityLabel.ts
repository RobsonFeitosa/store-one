export default function visibilityLabel(value: string | undefined) {
  switch (value) {
    case 'public':
      return 'Público'
    case 'private':
      return 'Privado'
    default:
      return 'Público'
  }
}

