import axios from 'axios'

export const correiosPrazo = axios.create({
  baseURL: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx',
})
