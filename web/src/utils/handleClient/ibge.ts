import axios from 'axios'

export const ibge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/',
})
