"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"
import { Home, ChevronRight, Slash } from "lucide-react"

const pages = ["Home", "Products", "Electronics", "Computers", "Laptops", "Gaming Laptops"]

export default function BreadcrumbsPage() {
  const [currentDepth, setCurrentDepth] = useState(pages.length)
  const [clickedLink, setClickedLink] = useState<string | null>(null)

  const handleLinkClick = (page: string) => {
    setClickedLink(page)
  }

  const increaseDepth = () => setCurrentDepth((prev) => Math.min(pages.length, prev + 1))
  const decreaseDepth = () => setCurrentDepth((prev) => Math.max(1, prev - 1))
  const resetDepth = () => setCurrentDepth(pages.length)

  const currentPages = pages.slice(0, currentDepth)

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Breadcrumbs</h1>
      <div className="space-y-8" data-testid="breadcrumbs-container">
        <div className="space-y-4" data-testid="basic-breadcrumb-section">
          <h2 className="text-xl font-semibold" data-testid="basic-breadcrumb-title">Basic Breadcrumb</h2>
          <Breadcrumb data-testid="breadcrumb-basic">
            <BreadcrumbList data-testid="breadcrumb-list">
              {currentPages.map((page, index) => (
                <BreadcrumbItem key={page} data-testid={`breadcrumb-item-${index}`}>
                  {index < currentPages.length - 1 ? (
                    <>
                      <BreadcrumbLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick(page)
                        }}
                        data-testid={`breadcrumb-link-${index}`}
                      >
                        {index === 0 ? <Home className="h-4 w-4" /> : page}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator data-testid={`breadcrumb-separator-${index}`} />
                    </>
                  ) : (
                    <BreadcrumbPage data-testid="breadcrumb-current-page">{page}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-4" data-testid="ellipsis-breadcrumb-section">
          <h2 className="text-xl font-semibold" data-testid="ellipsis-breadcrumb-title">Breadcrumb with Ellipsis</h2>
          <Breadcrumb data-testid="breadcrumb-ellipsis">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleLinkClick("Home"); }} data-testid="breadcrumb-ellipsis-home">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis data-testid="breadcrumb-ellipsis-icon" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleLinkClick("Computers"); }} data-testid="breadcrumb-ellipsis-computers">
                  Computers
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage data-testid="breadcrumb-ellipsis-current">Laptops</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-4" data-testid="custom-separator-section">
          <h2 className="text-xl font-semibold" data-testid="custom-separator-title">Custom Separators</h2>
          <Breadcrumb data-testid="breadcrumb-custom">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleLinkClick("Home"); }} data-testid="breadcrumb-custom-home">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator data-testid="breadcrumb-custom-sep-1">
                <Slash className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleLinkClick("Products"); }} data-testid="breadcrumb-custom-products">
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator data-testid="breadcrumb-custom-sep-2">
                <Slash className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage data-testid="breadcrumb-custom-current">Category</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="space-y-4" data-testid="controls-section">
          <h2 className="text-xl font-semibold">Depth Controls</h2>
          <div className="flex gap-2" data-testid="depth-controls">
            <Button onClick={decreaseDepth} variant="outline" data-testid="decrease-depth">
              Decrease Depth
            </Button>
            <Button onClick={increaseDepth} variant="outline" data-testid="increase-depth">
              Increase Depth
            </Button>
            <Button onClick={resetDepth} variant="secondary" data-testid="reset-depth">
              Reset
            </Button>
          </div>
        </div>

        <div data-testid="breadcrumbs-state">
          <h2 className="text-lg font-semibold">Breadcrumbs State:</h2>
          <p data-testid="current-depth">Current Depth: {currentDepth}</p>
          <p data-testid="last-clicked">Last Clicked: {clickedLink || "None"}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
