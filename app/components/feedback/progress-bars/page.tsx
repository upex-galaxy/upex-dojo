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
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Progress Bars</h1>
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Static Progress Bar</h2>
            <Progress value={66} className="w-[60%]" />
            <p>Progress: 66%</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Dynamic Progress Bar</h2>
            <Progress value={progress} className="w-[60%]" />
            <p>Progress: {progress}%</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Simulated Loading</h2>
            <Progress value={isLoading ? progress : 0} className="w-[60%]" />
            <p>Progress: {isLoading ? progress : 0}%</p>
            <Button onClick={simulateLoading} disabled={isLoading}>
              {isLoading ? "Loading..." : "Start Loading"}
            </Button>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}

