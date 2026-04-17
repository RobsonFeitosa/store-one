import MainLayout from '@/components/components/Layout/Main'

import { HomeContainer } from './styles'
import Slide from '@/components/Slide'
import { Analitics } from '../script/analytics'
import ProductsCarousel from './ProductsCarousel'
import EmphasisSession from './EmphasisSession'
import ServicesCarousel from './ServicesCarousel'
import BestSellers from './BestSellers'
import TopCategories from './TopCategories'
import Brands from './Brands'

export default function Home() {
  return (
    <MainLayout>
      <HomeContainer>
        <Analitics />

        <Slide />

        <ProductsCarousel />

        <EmphasisSession />

        <ServicesCarousel />

        <BestSellers />

        <TopCategories />

        <Brands />
      </HomeContainer>
    </MainLayout>
  )
}
