"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from 'lucide-react'
import { ComponentLayout } from "@/components/component-layout"

export default function ToggleButtonsPage() {
  const [switchState, setSwitchState] = React.useState(false)
  const [toggleGroup, setToggleGroup] = React.useState<string[]>([])

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Toggle Buttons</h1>
      <div className="space-y-8" data-testid="toggles-container">
        <div className="space-y-2" data-testid="switch-section">
          <h2 className="text-xl font-semibold" data-testid="switch-title">Switch</h2>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" checked={switchState} onCheckedChange={setSwitchState} data-testid="switch-toggle" />
            <Label htmlFor="airplane-mode" data-testid="switch-label">Airplane Mode</Label>
          </div>
          <p data-testid="switch-state">Switch state: {switchState ? "On" : "Off"}</p>
        </div>

        <div className="space-y-2" data-testid="toggle-group-section">
          <h2 className="text-xl font-semibold" data-testid="toggle-group-title">Toggle Group</h2>
          <ToggleGroup type="multiple" value={toggleGroup} onValueChange={setToggleGroup} data-testid="toggle-group">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" data-testid="toggle-bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" data-testid="toggle-italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline" data-testid="toggle-underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <p data-testid="toggle-group-state">Toggle Group state: {toggleGroup.join(", ") || "None"}</p>
        </div>

        <div className="space-y-2" data-testid="toggle-button-section">
          <h2 className="text-xl font-semibold" data-testid="toggle-button-title">Toggle Button</h2>
          <Button variant="outline" onClick={() => setSwitchState(!switchState)} data-testid="toggle-button">
            {switchState ? "Turn Off" : "Turn On"}
          </Button>
        </div>
      </div>
    </ComponentLayout>
  )
}
