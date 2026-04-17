export const cpf = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const formatPhoneNumber = (str: string): string => {
  const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/
  const strvalue = str.replace(/[^0-9]/g, '').slice(0, 11)

  const result = strvalue.replace(regex, '($1) $2-$3')
  return result
}

export const formatCep = (str: string): string => {
  const re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/

  if (re.test(str)) {
    return str.replace(re, '$1.$2-$3')
  }
  return ''
}

export const removeMask = (str: string): string => {
  return str.replace(/[^0-9]+/g, '')
}
