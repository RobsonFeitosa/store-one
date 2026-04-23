import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { GetStaticPaths, GetStaticProps } from 'next'
import { parseCookies } from 'nookies'

export { default } from '../../products-origim/slugs'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slugs = context.params?.slug as string[]
  const [slug, id] = slugs
  const url = `${URLs.PRODUCTS}/${slug}/code/${id}`
  const { '@StoreOne:token': tokenOnCookies } = parseCookies()

  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${tokenOnCookies}`
    }
  });

  const productData = response.data?.result || response.data

  console.log({ productData })
  return {
    props: {
      slug,
      id,
      isProduct: true,
      initialProduct: productData,
    },
    revalidate: 60 * 60 * 24, // 1 dia
  }
}
