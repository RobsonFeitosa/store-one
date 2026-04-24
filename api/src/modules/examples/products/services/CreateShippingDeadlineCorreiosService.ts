import { injectable, inject } from 'tsyringe'

import { calcularPrecoPrazo, rastrearEncomendas } from 'correios-brasil'

import Correios from 'node-correios'
const correios = new Correios()

@injectable()
class CreateShippingDeadlineCorreiosService {
  constructor() {}

  public async execute(slug: string, product_id: string): Promise<any> {
    const codRastreio = ['OU341933668BR', 'LB290784401HK'] // array de códigos de rastreios

    await rastrearEncomendas(codRastreio).then((response) => {
      console.log(response)
    })

    // correios
    //   .calcPreco({
    //     nCdServico: '40010',
    //     sCepOrigem: '80620100',
    //     sCepDestino: '77020104',
    //     nVlPeso: '1',
    //     nCdFormato: '1',
    //     nVlComprimento: '27',
    //     nVlAltura: '8',
    //     nVlLargura: '10',
    //     nVlDiametro: '18',
    //   })
    //   .then((result: any) => {
    //     console.log(result)
    //   })
    //   .catch((error: any) => {
    //     console.log('asdfasdf')
    //     console.log(error)
    //   })
    return ''
  }
}

export default CreateShippingDeadlineCorreiosService
