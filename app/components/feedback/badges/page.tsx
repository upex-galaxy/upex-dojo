"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

const statusOptions = ["active", "pending", "inactive", "error"] as const
type Status = typeof statusOptions[number]

export default function BadgesPage() {
  const [count, setCount] = useState(5)
  const [status, setStatus] = useState<Status>("active")

  const incrementCount = () => setCount((prev) => prev + 1)
  const decrementCount = () => setCount((prev) => Math.max(0, prev - 1))
  const resetCount = () => setCount(5)

  const cycleStatus = () => {
    const currentIndex = statusOptions.indexOf(status)
    const nextIndex = (currentIndex + 1) % statusOptions.length
    setStatus(statusOptions[nextIndex])
  }

  const getStatusVariant = (s: Status) => {
    switch (s) {
      case "active": return "default"
      case "pending": return "secondary"
      case "inactive": return "outline"
      case "error": return "destructive"
    }
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Badges</h1>
      <div className="space-y-8" data-testid="badges-container">
        <div className="space-y-4" data-testid="variants-section">
          <h2 className="text-xl font-semibold" data-testid="variants-title">Badge Variants</h2>
          <div className="flex flex-wrap gap-4" data-testid="badges-list">
            <Badge variant="default" data-testid="badge-default">Default</Badge>
            <Badge variant="secondary" data-testid="badge-secondary">Secondary</Badge>
            <Badge variant="outline" data-testid="badge-outline">Outline</Badge>
            <Badge variant="destructive" data-testid="badge-destructive">Destructive</Badge>
          </div>
        </div>

        <div className="space-y-4" data-testid="counter-section">
          <h2 className="text-xl font-semibold" data-testid="counter-title">Counter Badge</h2>
          <div className="flex items-center gap-4">
            <Badge variant="default" data-testid="counter-badge">
              Notifications: {count}
            </Badge>
            <div className="flex gap-2" data-testid="counter-controls">
              <Button size="sm" onClick={decrementCount} data-testid="decrement-button">-</Button>
              <Button size="sm" onClick={incrementCount} data-testid="increment-button">+</Button>
              <Button size="sm" variant="outline" onClick={resetCount} data-testid="reset-button">Reset</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4" data-testid="status-section">
          <h2 className="text-xl font-semibold" data-testid="status-title">Status Badge</h2>
          <div className="flex items-center gap-4">
            <Badge variant={getStatusVariant(status)} data-testid="status-badge">
              Status: {status}
            </Badge>
            <Button onClick={cycleStatus} variant="outline" data-testid="cycle-status-button">
              Change Status
            </Button>
          </div>
        </div>

        <div className="space-y-4" data-testid="examples-section">
          <h2 className="text-xl font-semibold" data-testid="examples-title">Common Use Cases</h2>
          <div className="flex flex-wrap gap-4" data-testid="examples-list">
            <Badge className="bg-green-500 hover:bg-green-600" data-testid="badge-new">New</Badge>
            <Badge className="bg-blue-500 hover:bg-blue-600" data-testid="badge-featured">Featured</Badge>
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black" data-testid="badge-beta">Beta</Badge>
            <Badge className="bg-purple-500 hover:bg-purple-600" data-testid="badge-premium">Premium</Badge>
            <Badge variant="destructive" data-testid="badge-deprecated">Deprecated</Badge>
          </div>
        </div>

        <div data-testid="badges-state">
          <h2 className="text-lg font-semibold">Badges State:</h2>
          <p data-testid="current-count">Counter Value: {count}</p>
          <p data-testid="current-status">Current Status: {status}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
