"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

export default function ProgressBarsPage() {
  const [progress, setProgress] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const simulateLoading = () => {
    setIsLoading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Progress Bars</h1>
      <div className="space-y-8" data-testid="progress-container">
        <div className="space-y-2" data-testid="static-progress-section">
          <h2 className="text-xl font-semibold" data-testid="static-progress-title">Static Progress Bar</h2>
          <Progress value={66} className="w-[60%]" data-testid="static-progress-bar" />
          <p data-testid="static-progress-value">Progress: 66%</p>
        </div>

        <div className="space-y-2" data-testid="dynamic-progress-section">
          <h2 className="text-xl font-semibold" data-testid="dynamic-progress-title">Dynamic Progress Bar</h2>
          <Progress value={progress} className="w-[60%]" data-testid="dynamic-progress-bar" />
          <p data-testid="dynamic-progress-value">Progress: {progress}%</p>
        </div>

        <div className="space-y-2" data-testid="loading-progress-section">
          <h2 className="text-xl font-semibold" data-testid="loading-progress-title">Simulated Loading</h2>
          <Progress value={isLoading ? progress : 0} className="w-[60%]" data-testid="loading-progress-bar" />
          <p data-testid="loading-progress-value">Progress: {isLoading ? progress : 0}%</p>
          <Button onClick={simulateLoading} disabled={isLoading} data-testid="start-loading-button">
            {isLoading ? "Loading..." : "Start Loading"}
          </Button>
        </div>
      </div>
    </ComponentLayout>
  )
}
