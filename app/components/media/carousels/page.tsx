"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CarouselsPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [autoPlay, setAutoPlay] = React.useState(false)
  const totalSlides = 8

  const slides = React.useMemo(
    () =>
      Array.from({ length: totalSlides }).map((_, index) => (
        <Card key={index} className="w-full h-40 flex-shrink-0">
          <CardContent className="flex items-center justify-center h-full">
            <span className="text-4xl font-semibold">{index + 1}</span>
          </CardContent>
        </Card>
      )),
    [],
  )

  React.useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
      }, 3000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoPlay])

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)
  }

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
  }

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Carousels</h1>
      <div className="space-y-4">
        <div className="relative overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={toggleAutoPlay}>{autoPlay ? "Pause" : "Auto-play"}</Button>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Carousel State:</h2>
          <p>Current Slide: {currentSlide + 1}</p>
          <p>Total Slides: {totalSlides}</p>
          <p>Auto-play: {autoPlay ? "On" : "Off"}</p>
        </div>
      </div>
    </div>
  )
}

