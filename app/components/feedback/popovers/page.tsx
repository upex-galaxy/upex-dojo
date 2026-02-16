"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"

export default function PopoversPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ width: "100%", maxWidth: "300px", height: "25px", maxHeight: "none" })
  const [lastAction, setLastAction] = useState<string | null>(null)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    setLastAction(open ? "Popover opened" : "Popover closed")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setLastAction(`Changed ${field} to ${value}`)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Popovers</h1>
      <div className="space-y-8" data-testid="popovers-container">
        <div className="space-y-4" data-testid="basic-popover-section">
          <h2 className="text-xl font-semibold" data-testid="basic-popover-title">Basic Popover</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" data-testid="basic-popover-trigger">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" data-testid="basic-popover-content">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none" data-testid="popover-title">Dimensions</h4>
                  <p className="text-sm text-muted-foreground" data-testid="popover-description">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width" data-testid="width-label">Width</Label>
                    <Input
                      id="width"
                      value={formData.width}
                      onChange={(e) => handleInputChange("width", e.target.value)}
                      className="col-span-2 h-8"
                      data-testid="width-input"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth" data-testid="max-width-label">Max. width</Label>
                    <Input
                      id="maxWidth"
                      value={formData.maxWidth}
                      onChange={(e) => handleInputChange("maxWidth", e.target.value)}
                      className="col-span-2 h-8"
                      data-testid="max-width-input"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height" data-testid="height-label">Height</Label>
                    <Input
                      id="height"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="col-span-2 h-8"
                      data-testid="height-input"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight" data-testid="max-height-label">Max. height</Label>
                    <Input
                      id="maxHeight"
                      value={formData.maxHeight}
                      onChange={(e) => handleInputChange("maxHeight", e.target.value)}
                      className="col-span-2 h-8"
                      data-testid="max-height-input"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4" data-testid="controlled-popover-section">
          <h2 className="text-xl font-semibold" data-testid="controlled-popover-title">Controlled Popover</h2>
          <div className="flex gap-4 items-center">
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button variant="outline" data-testid="controlled-popover-trigger">
                  {isOpen ? "Close Popover" : "Open Popover"}
                </Button>
              </PopoverTrigger>
              <PopoverContent data-testid="controlled-popover-content">
                <p data-testid="controlled-popover-text">This is a controlled popover. You can programmatically control its state.</p>
                <Button
                  className="mt-2"
                  onClick={() => setIsOpen(false)}
                  data-testid="close-from-inside"
                >
                  Close from inside
                </Button>
              </PopoverContent>
            </Popover>
            <Button onClick={() => setIsOpen(!isOpen)} variant="secondary" data-testid="toggle-externally">
              Toggle Externally
            </Button>
          </div>
        </div>

        <div className="space-y-4" data-testid="positions-section">
          <h2 className="text-xl font-semibold" data-testid="positions-title">Popover Positions</h2>
          <div className="flex flex-wrap gap-4" data-testid="position-buttons">
            {(["top", "bottom", "left", "right"] as const).map((side) => (
              <Popover key={side}>
                <PopoverTrigger asChild>
                  <Button variant="outline" data-testid={`popover-trigger-${side}`}>
                    {side.charAt(0).toUpperCase() + side.slice(1)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent side={side} data-testid={`popover-content-${side}`}>
                  <p>Popover on the {side}</p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>

        <div data-testid="popovers-state">
          <h2 className="text-lg font-semibold">Popovers State:</h2>
          <p data-testid="controlled-state">Controlled Popover: {isOpen ? "Open" : "Closed"}</p>
          <p data-testid="last-action">Last Action: {lastAction || "None"}</p>
          <p data-testid="form-data">Form Data: {JSON.stringify(formData)}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
