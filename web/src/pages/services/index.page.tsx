import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export { default } from '../products-origim'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { '@StoreOne:user': userOnCookies } = parseCookies({ req })

    const user = userOnCookies ? JSON.parse(userOnCookies) : null

    const response = await api.get(URLs.PRODUCTS)

    return {
      props: {
        user,
        isProduct: false,
        productsInital: response.data,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
