import Skeleton from 'react-loading-skeleton'
import {
  Loading,
  LoadingBtns,
  LoadingFrete,
  LoadingHeader,
  LoadingProductOrigimContainer,
  LoadingTumbs,
} from './styles'

export default function LoadingProductOrigim() {
  return (
    <LoadingProductOrigimContainer>
      <Loading>
        <div>
          <Skeleton count={1} height={403} borderRadius={8} />

          <LoadingTumbs>
            <Skeleton count={1} height={100} borderRadius={8} />
            <Skeleton count={1} height={100} borderRadius={8} />
            <Skeleton count={1} height={100} borderRadius={8} />
            <Skeleton count={1} height={100} borderRadius={8} />
          </LoadingTumbs>
        </div>
        <div>
          <LoadingHeader>
            <Skeleton count={1} height={40} width={300} borderRadius={8} />
            <Skeleton count={1} height={40} width={150} borderRadius={8} />
          </LoadingHeader>

          <Skeleton count={1} height={180} borderRadius={8} />

          <LoadingBtns>
            <Skeleton count={1} height={50} width={100} borderRadius={8} />
            <Skeleton count={1} height={50} width={200} borderRadius={8} />
            <Skeleton count={1} height={50} width={200} borderRadius={8} />
          </LoadingBtns>

          <Skeleton count={1} height={40} width={300} borderRadius={8} />

          <LoadingFrete>
            <Skeleton count={1} height={70} width={400} borderRadius={8} />
          </LoadingFrete>
        </div>
      </Loading>
    </LoadingProductOrigimContainer>
  )
}
