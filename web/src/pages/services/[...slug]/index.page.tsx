import { IProductDTO } from '@/pages/dtos/product.dto'
import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { GetStaticPaths, GetStaticProps } from 'next'
import { parseCookies } from 'nookies'

export { default } from '../../products-origim/slugs'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get(URLs.PRODUCTS)

  const paths = response.data[0].map((product: IProductDTO) => ({
    params: {
      slug: [product.slug, product.id],
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugs = params?.slug as string[]
  const [slug, id] = slugs

  const url = [URLs.PRODUCTS, '/', slug, '/code/', id].join('')
  const response = await api.get(url)

  const { '@LemonadeTechnologies:user': userOnCookies } = parseCookies()

  const user = userOnCookies ? JSON.parse(userOnCookies) : null

  return {
    props: {
      slug,
      id,
      user,
      isProduct: false,
      initialProduct: response.data,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
