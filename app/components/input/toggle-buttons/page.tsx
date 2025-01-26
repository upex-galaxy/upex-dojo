"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"
import { ComponentLayout } from "@/components/component-layout"

export default function ToggleButtonsPage() {
  const [switchState, setSwitchState] = React.useState(false)
  const [toggleGroup, setToggleGroup] = React.useState<string[]>([])

  return (
    <ComponentLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Toggle Buttons</h1>
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Switch</h2>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" checked={switchState} onCheckedChange={setSwitchState} />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            <p>Switch state: {switchState ? "On" : "Off"}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Toggle Group</h2>
            <ToggleGroup type="multiple" value={toggleGroup} onValueChange={setToggleGroup}>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <p>Toggle Group state: {toggleGroup.join(", ") || "None"}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Toggle Button</h2>
            <Button variant="outline" onClick={() => setSwitchState(!switchState)}>
              {switchState ? "Turn Off" : "Turn On"}
            </Button>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}

