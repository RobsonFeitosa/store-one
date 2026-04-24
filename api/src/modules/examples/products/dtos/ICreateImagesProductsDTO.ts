interface IImagesProduct {
  product_id: string
  picture: string
  primary: boolean
}

export default interface ICreateImagesProductsDTO {
  images: IImagesProduct[]
}
