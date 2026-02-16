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
          <PaginationItem key={i} data-testid={`pagination-item-${i}`}>
            <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i} data-testid={`pagination-link-${i}`}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <PaginationItem key={i} data-testid={`pagination-ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }
    }
    return pageNumbers
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Pagination</h1>
      <div className="space-y-4" data-testid="pagination-container">
        <Pagination data-testid="pagination">
          <PaginationContent data-testid="pagination-content">
            <PaginationItem data-testid="pagination-item-previous">
              <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} data-testid="pagination-previous" />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem data-testid="pagination-item-next">
              <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} data-testid="pagination-next" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div data-testid="pagination-state">
          <p data-testid="current-page">Current Page: {currentPage}</p>
          <p data-testid="total-pages">Total Pages: {totalPages}</p>
        </div>
        <div data-testid="pagination-buttons">
          <Button onClick={() => handlePageChange(1)} className="mr-2" data-testid="first-page-button">
            First Page
          </Button>
          <Button onClick={() => handlePageChange(totalPages)} data-testid="last-page-button">Last Page</Button>
        </div>
      </div>
    </ComponentLayout>
  )
}
