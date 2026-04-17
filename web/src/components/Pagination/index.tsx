import { BtnPagination, Li, PaginationContainer } from './styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  console.log({ currentPage, totalPages })

  return (
    <PaginationContainer>
      {totalPages !== 1 ? (
        <ul>
          {pageNumbers.map((page) => (
            <Li key={page} selected={page === currentPage}>
              <BtnPagination onClick={() => onPageChange(page)}>
                {page}
              </BtnPagination>
            </Li>
          ))}
        </ul>
      ) : (
        <div />
      )}
    </PaginationContainer>
  )
}
