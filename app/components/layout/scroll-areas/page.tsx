"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ComponentLayout } from "@/components/component-layout"

const tags = Array.from({ length: 50 }).map((_, i) => `Tag ${i + 1}`)

const artworks = [
  { artist: "Pablo Picasso", art: "Guernica" },
  { artist: "Vincent van Gogh", art: "Starry Night" },
  { artist: "Leonardo da Vinci", art: "Mona Lisa" },
  { artist: "Claude Monet", art: "Water Lilies" },
  { artist: "Salvador Dalí", art: "The Persistence of Memory" },
  { artist: "Edvard Munch", art: "The Scream" },
  { artist: "Johannes Vermeer", art: "Girl with a Pearl Earring" },
  { artist: "Rembrandt", art: "The Night Watch" },
]

export default function ScrollAreasPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState({ vertical: 0, horizontal: 0 })

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Scroll Areas</h1>
      <div className="space-y-8" data-testid="scroll-areas-container">
        <div className="space-y-4" data-testid="vertical-scroll-section">
          <h2 className="text-xl font-semibold" data-testid="vertical-scroll-title">Vertical Scroll Area</h2>
          <ScrollArea className="h-72 w-48 rounded-md border" data-testid="vertical-scroll-area">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none" data-testid="tags-heading">Tags</h4>
              {tags.map((tag) => (
                <div key={tag}>
                  <Button
                    variant={selectedTag === tag ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => handleTagClick(tag)}
                    data-testid={`tag-${tag.replace(" ", "-").toLowerCase()}`}
                  >
                    {tag}
                  </Button>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="space-y-4" data-testid="horizontal-scroll-section">
          <h2 className="text-xl font-semibold" data-testid="horizontal-scroll-title">Horizontal Scroll Area</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border" data-testid="horizontal-scroll-area">
            <div className="flex w-max space-x-4 p-4">
              {artworks.map((artwork, index) => (
                <figure key={artwork.art} className="shrink-0" data-testid={`artwork-${index}`}>
                  <div className="overflow-hidden rounded-md">
                    <div
                      className="aspect-[3/4] h-40 w-32 bg-muted flex items-center justify-center"
                      data-testid={`artwork-image-${index}`}
                    >
                      <span className="text-4xl">🎨</span>
                    </div>
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground" data-testid={`artwork-title-${index}`}>
                      {artwork.art}
                    </span>
                    <br />
                    <span data-testid={`artwork-artist-${index}`}>{artwork.artist}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" data-testid="horizontal-scrollbar" />
          </ScrollArea>
        </div>

        <div className="space-y-4" data-testid="both-scroll-section">
          <h2 className="text-xl font-semibold" data-testid="both-scroll-title">Both Directions</h2>
          <ScrollArea className="h-48 w-full max-w-md rounded-md border" data-testid="both-scroll-area">
            <div className="w-[800px] p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Large Content Area</h4>
              <p className="text-sm text-muted-foreground">
                This scroll area can scroll both vertically and horizontally. The content is wider and taller than the container.
              </p>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-40 bg-muted rounded-md flex items-center justify-center"
                    data-testid={`grid-item-${i}`}
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div data-testid="scroll-areas-state">
          <h2 className="text-lg font-semibold">Scroll Areas State:</h2>
          <p data-testid="selected-tag">Selected Tag: {selectedTag || "None"}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
