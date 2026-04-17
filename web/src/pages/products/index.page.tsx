import { api } from '@/utils/handleClient'
import { URLs } from '@/utils/urlBuilder'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export { default } from '../products-origim'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await api.get(URLs.PRODUCTS)

  const { '@LemonadeTechnologies:user': userOnCookies } = parseCookies({ req })

  const user = userOnCookies ? JSON.parse(userOnCookies) : null

  return {
    props: {
      user,
      isProduct: true,
      productsInital: response.data,
    },
  }
}
