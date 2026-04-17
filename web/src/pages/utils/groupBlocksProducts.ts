export default function groupBlocksProducts(
  array: any[],
  tamanhoDoBloco: number,
): any[][] {
  return array.reduce((acumulador, elemento, indice) => {
    const indiceDoBloco = Math.floor(indice / tamanhoDoBloco)

    if (!acumulador[indiceDoBloco]) {
      acumulador[indiceDoBloco] = []
    }

    acumulador[indiceDoBloco].push(elemento)

    return acumulador
  }, [])
}
