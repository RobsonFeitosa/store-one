import { GetStaticPaths, GetStaticProps } from 'next'
import { parseCookies } from 'nookies'

export { default } from '../../products-origim/slugs'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugs = params?.slug as string[]
  console.log({ slugs })

  const [slug, id] = slugs

  const { '@LemonadeTechnologies:user': userOnCookies } = parseCookies()

  const user = userOnCookies ? JSON.parse(userOnCookies) : null

  return {
    props: {
      slug,
      id,
      user,
      type: 'product',
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
