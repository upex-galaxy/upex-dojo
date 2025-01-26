"use client"

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
      <h1 className="text-3xl font-bold mb-6">Buttons</h1>
      <div className="space-y-4">
        <div>
          <Button onClick={handleClick}>Click me</Button>
          <p>Clicked: {clickCount} times</p>
        </div>
        <div>
          <Button onDoubleClick={handleDoubleClick}>Double click me</Button>
          <p>Double clicked: {doubleClickCount} times</p>
        </div>
        <div>
          <Button onContextMenu={handleRightClick}>Right click me</Button>
          <p>Right clicked: {rightClickCount} times</p>
        </div>
      </div>
    </ComponentLayout>
  )
}

