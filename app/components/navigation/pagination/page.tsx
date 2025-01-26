"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ComponentLayout } from "@/components/component-layout"

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }
    }
    return pageNumbers
  }

  return (
    <ComponentLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Pagination</h1>
        <div className="space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
              </PaginationItem>
              {renderPageNumbers()}
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div>
            <p>Current Page: {currentPage}</p>
            <p>Total Pages: {totalPages}</p>
          </div>
          <div>
            <Button onClick={() => handlePageChange(1)} className="mr-2">
              First Page
            </Button>
            <Button onClick={() => handlePageChange(totalPages)}>Last Page</Button>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}

