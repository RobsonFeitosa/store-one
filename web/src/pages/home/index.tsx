import MainLayout from '@/components/components/Layout/Main'

import { HomeContainer } from './styles'
import Slide from '@/components/Slide'
import { Analitics } from '../script/analytics'
import dynamic from 'next/dynamic'

const ProductsCarousel = dynamic(() => import('./ProductsCarousel'))
const EmphasisSession = dynamic(() => import('./EmphasisSession'))
const ServicesCarousel = dynamic(() => import('./ServicesCarousel'))
const BestSellers = dynamic(() => import('./BestSellers'))
const TopCategories = dynamic(() => import('./TopCategories'))
const Brands = dynamic(() => import('./Brands'))

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
