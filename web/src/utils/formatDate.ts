interface formatDateDTO {
  date: string | number | Date
  hoursView?: boolean
}

export default function formatDate({ date, hoursView }: formatDateDTO): string {
  const newDate = new Date(date)
  let opts: any
  if (hoursView) {
    opts = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }
  } else {
    opts = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
  }
  return newDate.toLocaleString('pt-BR', opts)
}

// Teste
