const formatValue = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return 'R$ 0,00'
  }

  return Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}


export default formatValue

export const formatValueForHundred = (value: number): string => {
  const reduceValue = value / 100
  return formatValue(reduceValue)
}
