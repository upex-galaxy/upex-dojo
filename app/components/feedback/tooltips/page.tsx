"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"

export default function TooltipsPage() {
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6">Tooltips</h1>
      <div className="space-y-4">
        <TooltipProvider>
          <div className="flex space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onMouseEnter={() => setHoveredTooltip("tooltip1")}
                  onMouseLeave={() => setHoveredTooltip(null)}
                >
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onMouseEnter={() => setHoveredTooltip("tooltip2")}
                  onMouseLeave={() => setHoveredTooltip(null)}
                >
                  And me
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is another tooltip</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <div className="mt-4">
        <p>Currently hovered tooltip: {hoveredTooltip || "None"}</p>
      </div>
    </ComponentLayout>
  )
}

