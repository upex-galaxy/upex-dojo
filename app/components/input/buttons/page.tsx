"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

export default function ButtonsPage() {
  const [clickCount, setClickCount] = useState(0)
  const [doubleClickCount, setDoubleClickCount] = useState(0)
  const [rightClickCount, setRightClickCount] = useState(0)

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
  }

  const handleDoubleClick = () => {
    setDoubleClickCount((prev) => prev + 1)
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setRightClickCount((prev) => prev + 1)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">
        Buttons
      </h1>
      <div className="space-y-4" data-testid="buttons-container">
        <div data-testid="button-section">
          <Button onClick={handleClick} data-testid="click-button">
            Click me
          </Button>
          <p data-testid="click-count">Clicked: {clickCount} times</p>
        </div>
        <div data-testid="button-section">
          <Button onDoubleClick={handleDoubleClick} data-testid="double-click-button">
            Double click me
          </Button>
          <p data-testid="double-click-count">Double clicked: {doubleClickCount} times</p>
        </div>
        <div data-testid="button-section">
          <Button onContextMenu={handleRightClick} data-testid="right-click-button">
            Right click me
          </Button>
          <p data-testid="right-click-count">Right clicked: {rightClickCount} times</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
